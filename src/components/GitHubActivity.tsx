import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  GitBranch, 
  GitCommit, 
  ExternalLink, 
  Loader2,
  RefreshCw,
  TrendingUp,
  Star,
  GitFork,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { githubApi, GitHubCommit, GitHubRepository } from '@/services/githubApi';
import { socialLinks } from '@/data/portfolioData';

interface GitHubActivityProps {
  className?: string;
}

const GitHubActivity = ({ className = '' }: GitHubActivityProps) => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [stats, setStats] = useState({ publicRepos: 0, followers: 0, following: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCommits, setShowCommits] = useState(true);
  const [showRepos, setShowRepos] = useState(false);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [commitsData, reposData, statsData] = await Promise.all([
        githubApi.getRecentCommits(8),
        githubApi.getUserRepositories(6),
        githubApi.getUserStats()
      ]);

      setCommits(commitsData);
      setRepositories(reposData);
      setStats(statsData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching GitHub data:', err);
      setError('Failed to load GitHub activity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchGitHubData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (dateString: string): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return `${Math.floor(diffInDays / 7)}w ago`;
  };

  const getCommitIcon = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('fix') || lowerMessage.includes('bug')) {
      return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
    }
    if (lowerMessage.includes('feat') || lowerMessage.includes('add')) {
      return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
    }
    if (lowerMessage.includes('update') || lowerMessage.includes('improve')) {
      return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
    }
    return <div className="w-2 h-2 bg-gray-500 rounded-full"></div>;
  };

  if (loading && commits.length === 0) {
    return (
      <Card className={`p-6 border-primary/20 ${className}`}>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Loading GitHub activity...</p>
          </div>
        </div>
      </Card>
    );
  }

  if (error && commits.length === 0) {
    return (
      <Card className={`p-6 border-primary/20 ${className}`}>
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <FaGithub className="w-6 h-6 text-red-500" />
          </div>
          <p className="text-sm text-muted-foreground mb-3">{error}</p>
          <Button onClick={fetchGitHubData} size="sm" variant="outline">
            <RefreshCw className="w-3 h-3 mr-2" />
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`border-primary/20 bg-gradient-to-r from-primary/5 to-primary-glow/5 ${className}`}>
      {/* GitHub Header */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
              <FaGithub className="w-4 h-4 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">GitHub Activity</h3>
          </div>
          <div className="flex items-center gap-2">
            {loading && <Loader2 className="w-4 h-4 text-primary animate-spin" />}
            <Button 
              onClick={fetchGitHubData} 
              size="sm" 
              variant="ghost"
              className="p-2"
              disabled={loading}
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              onClick={() => setIsExpanded(!isExpanded)} 
              size="sm" 
              variant="ghost"
              className="p-2"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.publicRepos}</div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{stats.followers}</div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{commits.length}</div>
            <div className="text-xs text-muted-foreground">Recent Commits</div>
          </div>
        </div>

        {/* Compact Recent Activity Preview */}
        {!isExpanded && commits.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Latest Activity</span>
              <Badge variant="outline" className="text-xs">Live</Badge>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50 hover:bg-background/70 transition-colors">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                <GitCommit className="w-3 h-3 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{commits[0].commit.message.split('\n')[0]}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs px-2 py-0.5">
                    {commits[0].repository?.name || 'Repository'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(commits[0].commit.author.date)}
                  </span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setIsExpanded(true)} 
              variant="outline" 
              size="sm" 
              className="w-full text-xs"
            >
              View All Activity
              <ChevronDown className="w-3 h-3 ml-2" />
            </Button>
          </div>
        )}

        {lastUpdated && (
          <div className="text-xs text-muted-foreground text-center mt-4">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-primary/10">
          {/* Tab Navigation */}
          <div className="flex gap-1 p-4 bg-background/30">
            <Button 
              onClick={() => { setShowCommits(true); setShowRepos(false); }}
              size="sm" 
              variant={showCommits ? "default" : "ghost"}
              className="flex-1"
            >
              <GitCommit className="w-3 h-3 mr-2" />
              Commits ({commits.length})
            </Button>
            <Button 
              onClick={() => { setShowCommits(false); setShowRepos(true); }}
              size="sm" 
              variant={showRepos ? "default" : "ghost"}
              className="flex-1"
            >
              <GitBranch className="w-3 h-3 mr-2" />
              Repositories ({repositories.length})
            </Button>
          </div>

          {/* Commits Tab */}
          {showCommits && (
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-3">
                {commits.length > 0 ? (
                  commits.map((commit, index) => (
                    <div
                      key={commit.sha}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                      onClick={() => window.open(commit.html_url, '_blank')}
                    >
                      <div className="relative w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1 group-hover:bg-primary/20 transition-all duration-300">
                        <GitCommit className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <div className="absolute -bottom-1 -right-1">
                          {getCommitIcon(commit.commit.message)}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                              {commit.commit.message.split('\n')[0]}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs px-2 py-0.5">
                                {commit.repository?.name || 'Repository'}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {formatTimeAgo(commit.commit.author.date)}
                              </span>
                            </div>
                          </div>
                          <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <GitBranch className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No recent commits found</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Repositories Tab */}
          {showRepos && repositories.length > 0 && (
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="grid grid-cols-1 gap-3">
                {repositories.map((repo, index) => (
                  <div
                    key={repo.full_name}
                    className="group p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                    onClick={() => window.open(repo.html_url, '_blank')}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                        {repo.name}
                      </h4>
                      <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                    
                    {repo.description && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            <span className="text-xs text-muted-foreground">{repo.language}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-muted-foreground">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-muted-foreground">{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-4 border-t border-primary/10 bg-background/30">
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="w-3 h-3 mr-2" />
                  View Profile
                </a>
              </Button>
              <Button asChild size="sm" className="flex-1">
                <a href={`${socialLinks.github.url}?tab=repositories`} target="_blank" rel="noopener noreferrer">
                  <TrendingUp className="w-3 h-3 mr-2" />
                  All Repositories
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default GitHubActivity;
