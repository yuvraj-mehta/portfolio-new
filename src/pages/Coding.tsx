import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState, useEffect } from "react";
import { codingPlatformsApi, AllPlatformStats } from "@/services/codingPlatformsApi";
import { achievements, socialLinks } from "@/data/portfolioData";

// React Icons imports
import {
  SiLeetcode,
  SiCodechef,
  SiGeeksforgeeks,
  SiCodeforces
} from "react-icons/si";
import {
  FaTrophy,
  FaMedal,
  FaBullseye,
  FaBolt,
  FaCode,
  FaChartLine,
  FaExternalLinkAlt,
  FaClock,
  FaStar,
  FaFire,
  FaSync,
  FaWifi,
  FaExclamationTriangle
} from "react-icons/fa";
import {
  MdLeaderboard,
  MdTrendingUp
} from "react-icons/md";

const Coding = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    total: 0,
    platforms: [0, 0, 0, 0]
  });

  const [apiData, setApiData] = useState<AllPlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fallback data from centralized achievements
  const fallbackData = {
    leetcode: {
      totalSolved: parseInt(achievements.leetcode.problemsSolved),
      problemsSolved: { easy: 180, medium: 85, hard: 12 },
      rating: parseInt(achievements.leetcode.rating)
    },
    codeforces: {
      problemsSolved: parseInt(achievements.codeforces.problemsSolved),
      rating: parseInt(achievements.codeforces.rating),
      rank: achievements.codeforces.rank
    },
    codechef: {
      problemsSolved: parseInt(achievements.codechef.problemsSolved),
      rating: parseInt(achievements.codechef.rating),
      stars: 2
    },
    gfg: {
      problemsSolved: parseInt(achievements.geeksforgeeks.problemsSolved),
      score: 500,
      rank: parseInt(achievements.geeksforgeeks.rank)
    }
  };

  // Fetch API data
  const fetchCodingData = async (isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setApiError(null);

    try {
      const data = await codingPlatformsApi.getAllPlatformData();
      if (data) {
        setApiData(data);
        setLastUpdated(new Date());
        setApiError(null);
      } else {
        throw new Error('No data received from API');
      }
    } catch (error) {
      console.error('Failed to fetch coding data:', error);
      setApiError(error instanceof Error ? error.message : 'Failed to fetch data');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchCodingData();
  }, []);

  // Get current data (API data with fallback)
  const getCurrentData = () => {
    if (apiData) {
      return {
        leetcode: apiData.leetcode?.problemsSolved?.total || fallbackData.leetcode.totalSolved,
        codeforces: apiData.codeforces?.problemsSolved?.total || fallbackData.codeforces.problemsSolved,
        codechef: apiData.codechef?.problemsSolved?.total || fallbackData.codechef.problemsSolved,
        gfg: apiData.gfg?.problemsSolved?.total || fallbackData.gfg.problemsSolved
      };
    }
    return {
      leetcode: fallbackData.leetcode.totalSolved,
      codeforces: fallbackData.codeforces.problemsSolved,
      codechef: fallbackData.codechef.problemsSolved,
      gfg: fallbackData.gfg.problemsSolved
    };
  };

  const currentData = getCurrentData();
  const targetTotal = currentData.leetcode + currentData.codeforces + currentData.codechef + currentData.gfg;
  const targetPlatforms = [currentData.leetcode, currentData.gfg, currentData.codechef, currentData.codeforces];

  // Animated counter hook
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 50;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      setAnimatedCounts({
        total: Math.round(targetTotal * easeProgress),
        platforms: targetPlatforms.map(target => Math.round(target * easeProgress))
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetTotal, ...targetPlatforms]);

  // Generate coding stats with real-time data
  const codingStats = [
    {
      platform: "LeetCode",
      solved: apiData?.leetcode?.problemsSolved?.total || fallbackData.leetcode.totalSolved,
      rating: apiData?.leetcode?.profile?.rating ? Math.round(apiData.leetcode.profile.rating).toString() : fallbackData.leetcode.rating.toString(),
      rank: apiData?.leetcode?.contests?.topPercentage ? `Top ${apiData.leetcode.contests.topPercentage}%` : achievements.leetcode.percentile,
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-yellow-500/20",
      borderColor: "border-orange-500/30",
      icon: SiLeetcode,
      url: socialLinks.leetcode.url,
      lastActive: "2024",
      joinedDate: "Jan 2023",
      difficulty: apiData?.leetcode?.problemsSolved || { easy: 150, medium: 65, hard: 13 },
      recentActivity: "Solved 'Binary Tree Inorder Traversal' - 2 days ago"
    },
    {
      platform: "GeeksforGeeks",
      solved: apiData?.gfg?.problemsSolved?.total || 130,
      rating: apiData?.gfg?.profile?.rank || "Rank #1058",
      streak: apiData?.gfg?.profile?.currentStreak ? `${apiData.gfg.profile.currentStreak}+ day streak` : "35+ day streak",
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      icon: SiGeeksforgeeks,
      url: socialLinks.geeksforgeeks.url,
      lastActive: "2024",
      joinedDate: "Mar 2023",
      difficulty: apiData?.gfg?.problemsSolved || { easy: 45, medium: 20, hard: 5 },
      recentActivity: "Completed 'Array Rotation' challenge - 1 day ago"
    },
    {
      platform: "CodeChef",
      solved: apiData?.codechef?.problemsSolved?.total || 25,
      rating: apiData?.codechef?.profile?.rating?.toString() || "1451",
      rank: apiData?.codechef?.achievements?.stars ? `${apiData.codechef.achievements.stars} Coder` : "2★ Coder (Division 3)",
      color: "text-amber-400",
      bgColor: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/30",
      icon: SiCodechef,
      url: socialLinks.codechef.url,
      lastActive: "2024",
      joinedDate: "Feb 2023",
      difficulty: apiData?.codechef?.problemsSolved || { easy: 18, medium: 6, hard: 1 },
      recentActivity: "Participated in Starters 186 - 1 week ago"
    },
    {
      platform: "Codeforces",
      solved: apiData?.codeforces?.problemsSolved?.total || 27,
      rating: apiData?.codeforces?.profile?.rating?.toString() || "1030",
      rank: apiData?.codeforces?.profile?.rank || "Newbie",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      icon: SiCodeforces,
      url: socialLinks.codeforces.url,
      lastActive: "2024",
      joinedDate: "Apr 2023",
      difficulty: apiData?.codeforces?.problemsSolved || { easy: 8, medium: 2, hard: 0 },
      recentActivity: "Solved problem A in Div 3 contest - 2 weeks ago"
    }
  ];

  // Calculate total dynamically
  const totalProblems = codingStats.reduce((sum, platform) => sum + platform.solved, 0);

  // Enhanced coding achievements with real-time API data
  const codingAchievements = [
    {
      title: "LeetCode Consistency Champion",
      description: `Maintained active problem-solving streak with ${apiData?.leetcode?.problemsSolved?.total || fallbackData.leetcode.totalSolved}+ problems solved, achieving top ${apiData?.leetcode?.contests?.topPercentage || achievements.leetcode.percentile.replace('Top ', '').replace('%', '')}% global ranking`,
      icon: FaTrophy,
      color: "text-yellow-400",
      bgColor: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      metric: `${apiData?.leetcode?.problemsSolved?.total || fallbackData.leetcode.totalSolved} Problems`
    },
    {
      title: "Contest Performer",
      description: `Best rank ${apiData?.leetcode?.contests?.bestRank || 6851} in LeetCode contests with ${apiData?.leetcode?.contests?.attendedCount || 14} contests attended, demonstrating competitive programming skills`,
      icon: FaMedal,
      color: "text-orange-400",
      bgColor: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      metric: `Rank ${apiData?.leetcode?.contests?.bestRank || 6851}`
    },
    {
      title: "LeetCode Rating Champion",
      description: `Achieved a competitive rating of ${Math.round(apiData?.leetcode?.profile?.rating || fallbackData.leetcode.rating)} on LeetCode with ${apiData?.leetcode?.achievements?.streaks?.totalActiveDays || 149} total active coding days, demonstrating consistent algorithmic excellence`,
      icon: FaFire,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      metric: `${Math.round(apiData?.leetcode?.profile?.rating || fallbackData.leetcode.rating)} Rating`
    },
    {
      title: "Multi-Platform Excellence",
      description: `Active across 4+ competitive programming platforms with ${targetTotal}+ total problems solved and consistent performance growth`,
      icon: FaStar,
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      metric: "4 Platforms"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-2xl opacity-15"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-12 fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300">
              <FaTrophy className="w-4 h-4 animate-pulse" />
              <span>Competitive Programming</span>
              <div className="ml-1 w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 animate-fade-in-up">
              Algorithm <span className="gradient-text relative inline-block">
                Mastery
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow rounded-full opacity-60"></div>
              </span>
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300 mb-6">
              Solving <span className="text-primary font-semibold">{targetTotal}+ problems</span> across multiple platforms with{" "}
              <span className="text-primary font-semibold">consistent excellence</span> and{" "}
              <span className="text-primary font-semibold">competitive performance</span>
            </p>

            {/* Data Status and Refresh */}
            <div className="flex items-center justify-center gap-4 mb-6 animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border/50">
                {isLoading ? (
                  <>
                    <FaSync className="w-4 h-4 text-muted-foreground animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                  </>
                ) : apiError ? (
                  <>
                    <FaExclamationTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-600">Using offline data</span>
                  </>
                ) : (
                  <>
                    <FaWifi className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600">Live data</span>
                  </>
                )}
              </div>

              {lastUpdated && (
                <div className="text-xs text-muted-foreground">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              )}

              <Button
                onClick={() => fetchCodingData(true)}
                disabled={isRefreshing}
                size="sm"
                variant="outline"
                className="px-3 py-1"
              >
                {isRefreshing ? (
                  <FaSync className="w-3 h-3 animate-spin" />
                ) : (
                  <FaSync className="w-3 h-3" />
                )}
              </Button>
            </div>

            {/* Inline Stats Display */}
            <div className="flex items-center justify-center gap-6 text-sm animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/5 rounded-lg border border-green-500/20">
                <FaTrophy className="w-4 h-4 text-green-500" />
                <span className="text-muted-foreground font-medium">4 Platforms</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20">
                <FaCode className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {animatedCounts.total}
                </span>
                <span className="text-muted-foreground font-medium">Total Solved</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-orange-500/5 rounded-lg border border-orange-500/20">
                <FaStar className="w-4 h-4 text-orange-500" />
                <span className="text-muted-foreground font-medium">
                  LeetCode {apiData?.leetcode?.contests?.topPercentage ? `Top ${apiData.leetcode.contests.topPercentage}%` : achievements.leetcode.percentile}
                </span>
              </div>
            </div>
          </div>

          {/* Platform Statistics */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaChartLine className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Platform Statistics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {codingStats.map((platform, index) => {
                const IconComponent = platform.icon;
                return (
                  <Card
                    key={index}
                    className="group relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 rounded-xl transition-all duration-300 hover:border-slate-600/70 hover:scale-[1.02]"
                  >
                    <div className="p-6">
                      {/* Header with platform icon and visit button */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${platform.bgColor} flex items-center justify-center`}>
                            <IconComponent className={`w-6 h-6 ${platform.color}`} />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-1">
                              {platform.platform}
                            </h3>
                            <div className="flex items-center gap-1 mt-1">
                              <FaClock className="w-3 h-3 text-slate-500" />
                              <span className="text-xs text-slate-500">Joined {platform.joinedDate}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <a href={platform.url} target="_blank" rel="noopener noreferrer">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-400 border-blue-400/50 hover:bg-blue-400/10 hover:border-blue-400 text-xs px-3 py-1"
                            >
                              Visit
                            </Button>
                          </a>
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-slate-400">Active</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start justify-between mb-4">
                        {/* Main problem count */}
                        <div>
                          <div className="text-3xl font-bold text-white mb-1">
                            {animatedCounts.platforms[index]}
                          </div>
                          <div className="text-sm text-slate-400">
                            Problems Solved
                          </div>
                        </div>

                        {/* Stats with icons */}
                        <div className="text-right space-y-2">
                          <div className="flex items-center justify-end gap-2">
                            {platform.rating && (
                              <>
                                <span className="text-xs text-slate-300">Rating: {platform.rating}</span>
                                <MdTrendingUp className="w-3 h-3 text-yellow-400" />
                              </>
                            )}
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-xs text-slate-300">
                              {platform.platform === "LeetCode" && platform.rank}
                              {platform.platform === "CodeChef" && platform.rank}
                              {platform.platform === "GeeksforGeeks" && platform.streak}
                              {platform.platform === "Codeforces" && platform.rank}
                            </span>
                            {platform.platform === "LeetCode" && <MdLeaderboard className="w-3 h-3 text-blue-400" />}
                            {platform.platform === "CodeChef" && <FaMedal className="w-3 h-3 text-amber-400" />}
                            {platform.platform === "GeeksforGeeks" && <FaFire className="w-3 h-3 text-green-400" />}
                            {platform.platform === "Codeforces" && <FaBolt className="w-3 h-3 text-blue-400" />}
                          </div>
                        </div>
                      </div>


                      {/* Bottom description text */}
                      <div className="text-xs text-slate-400 border-t border-slate-700/50 pt-3">
                        {platform.platform === "LeetCode" && `Solved ${platform.solved}+ problems across all difficulty levels`}
                        {platform.platform === "CodeChef" && `${platform.rank} with ${apiData?.codechef?.contests?.attendedCount || 9} contests attended`}
                        {platform.platform === "GeeksforGeeks" && `Solved ${platform.solved}+ problems with ${apiData?.gfg?.profile?.currentStreak || 7} day current streak`}
                        {platform.platform === "Codeforces" && `${platform.rank} with ${apiData?.codeforces?.contests?.attendedCount || 7} contests attended`}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>


          {/* Notable Achievements */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <FaTrophy className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Notable Achievements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {codingAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <Card
                    key={index}
                    className={`
                      group bg-gradient-to-br ${achievement.bgColor}
                      border ${achievement.borderColor}
                      hover:border-primary/40 hover:bg-card/60
                      transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer
                      backdrop-blur-sm
                    `}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className={`w-5 h-5 ${achievement.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors duration-300 leading-tight">
                              {achievement.title}
                            </h3>
                            <Badge className={`
                              ${achievement.color} bg-transparent border-current text-xs font-medium ml-2 flex-shrink-0
                            `}>
                              {achievement.metric}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Progress Summary */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <MdTrendingUp className="w-4 h-4" />
              <span>Continuous Growth</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Actively solving problems and participating in contests to improve algorithmic thinking and competitive programming skills.
              Always looking for new challenges and opportunities to grow.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Coding;
