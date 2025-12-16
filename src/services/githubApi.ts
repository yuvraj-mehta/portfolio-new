// GitHub API service for fetching commit activity and repository data
export interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
    url: string;
  };
  html_url: string;
  repository?: {
    name: string;
    full_name: string;
  };
}

export interface GitHubRepository {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export interface GitHubActivity {
  type: 'commit' | 'repository' | 'star';
  title: string;
  description: string;
  time: string;
  url: string;
  repository: string;
  icon: string;
}

class GitHubApiService {
  private baseUrl = 'https://api.github.com';
  private username = 'yuvraj-mehta'; // Replace with actual GitHub username
  
  // Cache for API responses to avoid rate limiting
  private cache = new Map<string, { data: any; timestamp: number }>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes
  private isApiAvailable = true;

  private async fetchWithCache(url: string): Promise<any> {
    const cacheKey = url;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Add GitHub token if available (optional)
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`
        }
      });

      if (!response.ok) {
        // Mark API as unavailable if rate limited or error
        if (response.status === 403 || response.status === 401) {
          this.isApiAvailable = false;
          console.warn(`GitHub API rate limited (${response.status}). Using fallback.`);
        } else {
          console.warn(`GitHub API error: ${response.status}`);
        }
        
        // Return cached data if available, even if expired (graceful degradation)
        if (cached) {
          return cached.data;
        }
        // If no cache and error, return empty array to prevent crashes
        return [];
      }

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      this.isApiAvailable = true;
      return data;
    } catch (error) {
      console.warn('GitHub API fetch failed, using fallback:', error);
      this.isApiAvailable = false;
      
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      // Return empty data to prevent crashes
      return [];
    }
  }

  async getRecentCommits(limit: number = 10): Promise<GitHubCommit[]> {
    try {
      // Get user's repositories first
      const repos = await this.fetchWithCache(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=5`);
      
      // If no repos data, return empty array
      if (!Array.isArray(repos) || repos.length === 0) {
        return [];
      }
      
      const allCommits: GitHubCommit[] = [];
      
      // Fetch commits from multiple repositories
      for (const repo of repos.slice(0, 3)) { // Limit to 3 most recent repos
        try {
          const commits = await this.fetchWithCache(
            `${this.baseUrl}/repos/${repo.full_name}/commits?author=${this.username}&per_page=5`
          );
          
          if (Array.isArray(commits) && commits.length > 0) {
            const commitsWithRepo = commits.map((commit: GitHubCommit) => ({
              ...commit,
              repository: {
                name: repo.name,
                full_name: repo.full_name
              }
            }));
            
            allCommits.push(...commitsWithRepo);
          }
        } catch (error) {
          console.warn(`Error fetching commits for ${repo.name}:`, error);
        }
      }
      
      // Sort by date and limit
      return allCommits
        .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
        .slice(0, limit);
    } catch (error) {
      console.warn('Error fetching commits, returning empty array:', error);
      return [];
    }
  }

  async getUserRepositories(limit: number = 6): Promise<GitHubRepository[]> {
    try {
      const repos = await this.fetchWithCache(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=${limit}`
      );
      if (!Array.isArray(repos)) {
        return [];
      }
      return repos.filter((repo: GitHubRepository) => !repo.name.includes('.github.io'));
    } catch (error) {
      console.warn('Error fetching repositories, returning empty array:', error);
      return [];
    }
  }

  async getUserStats(): Promise<{
    publicRepos: number;
    followers: number;
    following: number;
  }> {
    try {
      const user = await this.fetchWithCache(`${this.baseUrl}/users/${this.username}`);
      if (!user || typeof user !== 'object') {
        return { publicRepos: 0, followers: 0, following: 0 };
      }
      return {
        publicRepos: user.public_repos || 0,
        followers: user.followers || 0,
        following: user.following || 0
      };
    } catch (error) {
      console.warn('Error fetching user stats, returning defaults:', error);
      return { publicRepos: 0, followers: 0, following: 0 };
    }
  }

  getIsApiAvailable(): boolean {
    return this.isApiAvailable;
  }

  formatCommitActivity(commits: GitHubCommit[]): GitHubActivity[] {
    return commits.map(commit => ({
      type: 'commit' as const,
      title: this.truncateCommitMessage(commit.commit.message),
      description: `${commit.repository?.name || 'Repository'} • ${this.formatTimeAgo(commit.commit.author.date)}`,
      time: this.formatTimeAgo(commit.commit.author.date),
      url: commit.html_url,
      repository: commit.repository?.name || 'Unknown',
      icon: 'git-commit'
    }));
  }

  private truncateCommitMessage(message: string): string {
    const firstLine = message.split('\n')[0];
    return firstLine.length > 50 ? firstLine.substring(0, 50) + '...' : firstLine;
  }

  private formatTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return `${Math.floor(diffInSeconds / 604800)}w ago`;
  }
}

export const githubApi = new GitHubApiService();
