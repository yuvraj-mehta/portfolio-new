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
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data = await response.json();
      this.cache.set(cacheKey, { data, timestamp: Date.now() });
      return data;
    } catch (error) {
      console.error('GitHub API fetch error:', error);
      // Return cached data if available, even if expired
      if (cached) {
        return cached.data;
      }
      throw error;
    }
  }

  async getRecentCommits(limit: number = 10): Promise<GitHubCommit[]> {
    try {
      // Get user's repositories first
      const repos = await this.fetchWithCache(`${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=5`);
      
      const allCommits: GitHubCommit[] = [];
      
      // Fetch commits from multiple repositories
      for (const repo of repos.slice(0, 3)) { // Limit to 3 most recent repos
        try {
          const commits = await this.fetchWithCache(
            `${this.baseUrl}/repos/${repo.full_name}/commits?author=${this.username}&per_page=5`
          );
          
          const commitsWithRepo = commits.map((commit: GitHubCommit) => ({
            ...commit,
            repository: {
              name: repo.name,
              full_name: repo.full_name
            }
          }));
          
          allCommits.push(...commitsWithRepo);
        } catch (error) {
          console.error(`Error fetching commits for ${repo.name}:`, error);
        }
      }
      
      // Sort by date and limit
      return allCommits
        .sort((a, b) => new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime())
        .slice(0, limit);
    } catch (error) {
      console.error('Error fetching commits:', error);
      return [];
    }
  }

  async getUserRepositories(limit: number = 6): Promise<GitHubRepository[]> {
    try {
      const repos = await this.fetchWithCache(
        `${this.baseUrl}/users/${this.username}/repos?sort=updated&per_page=${limit}`
      );
      return repos.filter((repo: GitHubRepository) => !repo.name.includes('.github.io'));
    } catch (error) {
      console.error('Error fetching repositories:', error);
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
      return {
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      return { publicRepos: 0, followers: 0, following: 0 };
    }
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
