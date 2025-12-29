import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState, useEffect } from "react";
import {
  codingPlatformsApi,
  AllPlatformStats,
} from "@/services/codingPlatformsApi";
import { achievements, socialLinks } from "@/data";
import { motion } from "framer-motion";

import {
  SiLeetcode,
  SiCodechef,
  SiGeeksforgeeks,
  SiCodeforces,
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
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdLeaderboard, MdTrendingUp } from "react-icons/md";

const Coding = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    total: 0,
    platforms: [0, 0, 0, 0],
  });

  const [apiData, setApiData] = useState<AllPlatformStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fallbackData = {
    leetcode: {
      totalSolved: parseInt(achievements.leetcode.problemsSolved),
      problemsSolved: { easy: 180, medium: 85, hard: 12 },
      rating: parseInt(achievements.leetcode.rating),
    },
    codeforces: {
      problemsSolved: parseInt(achievements.codeforces.problemsSolved),
      rating: parseInt(achievements.codeforces.rating),
      rank: achievements.codeforces.rank,
    },
    codechef: {
      problemsSolved: parseInt(achievements.codechef.problemsSolved),
      rating: parseInt(achievements.codechef.rating),
      stars: 2,
    },
    gfg: {
      problemsSolved: parseInt(achievements.geeksforgeeks.problemsSolved),
      score: 500,
      rank: parseInt(achievements.geeksforgeeks.rank),
    },
  };

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
        throw new Error("No data received from API");
      }
    } catch (error) {
      console.error("Failed to fetch coding data:", error);
      setApiError(
        error instanceof Error ? error.message : "Failed to fetch data"
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCodingData();
  }, []);

  const getCurrentData = () => {
    if (apiData) {
      return {
        leetcode:
          apiData.leetcode?.problemsSolved?.total ||
          fallbackData.leetcode.totalSolved,
        codeforces:
          apiData.codeforces?.problemsSolved?.total ||
          fallbackData.codeforces.problemsSolved,
        codechef:
          apiData.codechef?.problemsSolved?.total ||
          fallbackData.codechef.problemsSolved,
        gfg:
          apiData.gfg?.problemsSolved?.total || fallbackData.gfg.problemsSolved,
      };
    }
    return {
      leetcode: fallbackData.leetcode.totalSolved,
      codeforces: fallbackData.codeforces.problemsSolved,
      codechef: fallbackData.codechef.problemsSolved,
      gfg: fallbackData.gfg.problemsSolved,
    };
  };

  const currentData = getCurrentData();
  const targetTotal =
    currentData.leetcode +
    currentData.codeforces +
    currentData.codechef +
    currentData.gfg;
  const targetPlatforms = [
    currentData.leetcode,
    currentData.gfg,
    currentData.codechef,
    currentData.codeforces,
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedCounts({
        total: Math.round(targetTotal * easeProgress),
        platforms: targetPlatforms.map((target) =>
          Math.round(target * easeProgress)
        ),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetTotal, ...targetPlatforms]);

  const codingStats = [
    {
      platform: "LeetCode",
      solved:
        apiData?.leetcode?.problemsSolved?.total ||
        fallbackData.leetcode.totalSolved,
      rating: apiData?.leetcode?.profile?.rating
        ? Math.round(apiData.leetcode.profile.rating).toString()
        : fallbackData.leetcode.rating.toString(),
      rank: apiData?.leetcode?.contests?.topPercentage
        ? `Top ${apiData.leetcode.contests.topPercentage}%`
        : achievements.leetcode.percentile,
      color: "text-accent",
      bgColor: "from-accent/20 to-primary-glow/20",
      borderColor: "border-accent/30",
      icon: SiLeetcode,
      url: socialLinks.leetcode.url,
      lastActive: "2024",
      joinedDate: "Jan 2023",
      difficulty: apiData?.leetcode?.problemsSolved || {
        easy: 150,
        medium: 65,
        hard: 13,
      },
      recentActivity: "Solved 'Binary Tree Inorder Traversal' - 2 days ago",
    },
    {
      platform: "GeeksforGeeks",
      solved: apiData?.gfg?.problemsSolved?.total || 130,
      rating: apiData?.gfg?.profile?.rank || "Rank #1058",
      streak: apiData?.gfg?.profile?.currentStreak
        ? `${apiData.gfg.profile.currentStreak}+ day streak`
        : "35+ day streak",
      color: "text-primary",
      bgColor: "from-primary/20 to-primary-glow/20",
      borderColor: "border-primary/30",
      icon: SiGeeksforgeeks,
      url: socialLinks.geeksforgeeks.url,
      lastActive: "2024",
      joinedDate: "Mar 2023",
      difficulty: apiData?.gfg?.problemsSolved || {
        easy: 45,
        medium: 20,
        hard: 5,
      },
      recentActivity: "Completed 'Array Rotation' challenge - 1 day ago",
    },
    {
      platform: "CodeChef",
      solved: apiData?.codechef?.problemsSolved?.total || 25,
      rating: apiData?.codechef?.profile?.rating?.toString() || "1451",
      rank: apiData?.codechef?.achievements?.stars
        ? `${apiData.codechef.achievements.stars} Coder`
        : "2★ Coder (Division 3)",
      color: "text-accent",
      bgColor: "from-accent/20 to-primary/20",
      borderColor: "border-accent/30",
      icon: SiCodechef,
      url: socialLinks.codechef.url,
      lastActive: "2024",
      joinedDate: "Feb 2023",
      difficulty: apiData?.codechef?.problemsSolved || {
        easy: 18,
        medium: 6,
        hard: 1,
      },
      recentActivity: "Participated in Starters 186 - 1 week ago",
    },
    {
      platform: "Codeforces",
      solved: apiData?.codeforces?.problemsSolved?.total || 27,
      rating: apiData?.codeforces?.profile?.rating?.toString() || "1030",
      rank: apiData?.codeforces?.profile?.rank || "Newbie",
      color: "text-secondary",
      bgColor: "from-secondary/20 to-muted/20",
      borderColor: "border-secondary/30",
      icon: SiCodeforces,
      url: socialLinks.codeforces.url,
      lastActive: "2024",
      joinedDate: "Apr 2023",
      difficulty: apiData?.codeforces?.problemsSolved || {
        easy: 8,
        medium: 2,
        hard: 0,
      },
      recentActivity: "Solved problem A in Div 3 contest - 2 weeks ago",
    },
  ];

  const totalProblems = codingStats.reduce(
    (sum, platform) => sum + platform.solved,
    0
  );

  const codingAchievements = [
    {
      title: "LeetCode Consistency Champion",
      description: `Maintained active problem-solving streak with ${
        apiData?.leetcode?.problemsSolved?.total ||
        fallbackData.leetcode.totalSolved
      }+ problems solved, achieving top ${
        apiData?.leetcode?.contests?.topPercentage ||
        achievements.leetcode.percentile.replace("Top ", "").replace("%", "")
      }% global ranking`,
      icon: FaTrophy,
      color: "text-primary-glow",
      bgColor: "from-primary-glow/20 to-accent/20",
      borderColor: "border-primary-glow/30",
      metric: `${
        apiData?.leetcode?.problemsSolved?.total ||
        fallbackData.leetcode.totalSolved
      } Problems`,
    },
    {
      title: "Contest Performer",
      description: `Best rank ${
        apiData?.leetcode?.contests?.bestRank || 6851
      } in LeetCode contests with ${
        apiData?.leetcode?.contests?.attendedCount || 14
      } contests attended, demonstrating competitive programming skills`,
      icon: FaMedal,
      color: "text-accent",
      bgColor: "from-accent/20 to-destructive/20",
      borderColor: "border-accent/30",
      metric: `Rank ${apiData?.leetcode?.contests?.bestRank || 6851}`,
    },
    {
      title: "LeetCode Rating Champion",
      description: `Achieved a competitive rating of ${Math.round(
        apiData?.leetcode?.profile?.rating || fallbackData.leetcode.rating
      )} on LeetCode with ${
        apiData?.leetcode?.achievements?.streaks?.totalActiveDays || 149
      } total active coding days, demonstrating consistent algorithmic excellence`,
      icon: FaFire,
      color: "text-primary",
      bgColor: "from-primary/20 to-primary-glow/20",
      borderColor: "border-primary/30",
      metric: `${Math.round(
        apiData?.leetcode?.profile?.rating || fallbackData.leetcode.rating
      )} Rating`,
    },
    {
      title: "Multi-Platform Excellence",
      description: `Active across 4+ competitive programming platforms with ${targetTotal}+ total problems solved and consistent performance growth`,
      icon: FaStar,
      color: "text-accent",
      bgColor: "from-accent/20 to-secondary/20",
      borderColor: "border-accent/30",
      metric: "4 Platforms",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const backgroundVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const backgroundVariants2 = {
    animate: {
      y: [0, 15, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const platformCardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    whileHover: {
      scale: 1.02,
      boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.1)",
      borderColor: "hsl(var(--primary) / 0.5)",
    },
  };

  const achievementCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
    whileHover: {
      scale: 1.05,
      y: -4,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />

      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"
          variants={backgroundVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl opacity-20"
          variants={backgroundVariants2}
          animate="animate"
        />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-secondary/5 rounded-full blur-2xl opacity-15"></div>

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4 shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FaTrophy className="w-4 h-4" />
              </motion.div>
              <span>Competitive Programming</span>
              <motion.div
                className="ml-1 w-2 h-2 bg-primary rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Algorithm{" "}
              <span className="gradient-text relative inline-block">
                Mastery
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-primary-glow rounded-full opacity-60"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Solving{" "}
              <span className="text-primary font-semibold">
                {targetTotal}+ problems
              </span>{" "}
              across multiple platforms with{" "}
              <span className="text-primary font-semibold">
                consistent excellence
              </span>{" "}
              and{" "}
              <span className="text-primary font-semibold">
                competitive performance
              </span>
            </motion.p>

            <motion.div
              className="flex items-center justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-2 px-3 py-2 bg-card/50 rounded-lg border border-border/50">
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaSync className="w-4 h-4 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm text-muted-foreground">
                      Loading...
                    </span>
                  </>
                ) : apiError ? (
                  <>
                    <FaExclamationTriangle className="w-4 h-4 text-accent" />
                    <span className="text-sm text-accent">
                      Using offline data
                    </span>
                  </>
                ) : (
                  <>
                    <FaWifi className="w-4 h-4 text-primary" />
                    <span className="text-sm text-primary">Live data</span>
                  </>
                )}
              </div>

              {lastUpdated && (
                <motion.div
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Updated: {lastUpdated.toLocaleTimeString()}
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => fetchCodingData(true)}
                  disabled={isRefreshing}
                  size="sm"
                  variant="outline"
                  className="px-3 py-1"
                >
                  {isRefreshing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <FaSync className="w-3 h-3" />
                    </motion.div>
                  ) : (
                    <FaSync className="w-3 h-3" />
                  )}
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex items-center justify-center gap-6 text-sm"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20"
              >
                <FaTrophy className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground font-medium">
                  4 Platforms
                </span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 px-3 py-2 bg-primary/5 rounded-lg border border-primary/20"
              >
                <FaCode className="w-4 h-4 text-primary" />
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  {animatedCounts.total}
                </span>
                <span className="text-muted-foreground font-medium">
                  Total Solved
                </span>
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-2 px-3 py-2 bg-accent/5 rounded-lg border border-accent/20"
              >
                <FaStar className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground font-medium">
                  LeetCode{" "}
                  {apiData?.leetcode?.contests?.topPercentage
                    ? `Top ${apiData.leetcode.contests.topPercentage}%`
                    : achievements.leetcode.percentile}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              variants={itemVariants}
            >
              <FaChartLine className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Platform Statistics
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {codingStats.map((platform, index) => {
                const IconComponent = platform.icon;
                return (
                  <motion.div
                    key={index}
                    variants={platformCardVariants}
                    whileHover="whileHover"
                  >
                    <Card className="group relative overflow-hidden bg-card/70 border border-border/50 rounded-xl transition-all duration-300 backdrop-blur-sm">
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className={`w-10 h-10 rounded-lg ${platform.bgColor} flex items-center justify-center`}
                              whileHover={{ scale: 1.15, rotate: 10 }}
                              transition={{ duration: 0.3 }}
                            >
                              <IconComponent
                                className={`w-6 h-6 ${platform.color}`}
                              />
                            </motion.div>
                            <div>
                              <h3 className="text-lg font-semibold text-foreground mb-1">
                                {platform.platform}
                              </h3>
                              <motion.div
                                className="flex items-center gap-1 mt-1"
                                whileHover={{ x: 2 }}
                                transition={{ duration: 0.2 }}
                              >
                                <FaClock className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  Joined {platform.joinedDate}
                                </span>
                              </motion.div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <motion.a
                              href={platform.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-primary border-primary/50 hover:bg-primary/10 hover:border-primary text-xs px-3 py-1"
                              >
                                Visit
                              </Button>
                            </motion.a>
                            <div className="flex items-center gap-1">
                              <motion.div
                                className="w-2 h-2 bg-primary rounded-full"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              <span className="text-xs text-muted-foreground">
                                Active
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <motion.div
                              className="text-3xl font-bold text-foreground mb-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                              {animatedCounts.platforms[index]}
                            </motion.div>
                            <div className="text-sm text-muted-foreground">
                              Problems Solved
                            </div>
                          </div>

                          <div className="text-right space-y-2">
                            <motion.div
                              className="flex items-center justify-end gap-2"
                              whileHover={{ x: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {platform.rating && (
                                <>
                                  <span className="text-xs text-foreground/70">
                                    Rating: {platform.rating}
                                  </span>
                                  <MdTrendingUp className="w-3 h-3 text-primary-glow" />
                                </>
                              )}
                            </motion.div>
                            <motion.div
                              className="flex items-center justify-end gap-2"
                              whileHover={{ x: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <span className="text-xs text-foreground/70">
                                {platform.platform === "LeetCode" &&
                                  platform.rank}
                                {platform.platform === "CodeChef" &&
                                  platform.rank}
                                {platform.platform === "GeeksforGeeks" &&
                                  platform.streak}
                                {platform.platform === "Codeforces" &&
                                  platform.rank}
                              </span>
                              {platform.platform === "LeetCode" && (
                                <MdLeaderboard className="w-3 h-3 text-secondary" />
                              )}
                              {platform.platform === "CodeChef" && (
                                <FaMedal className="w-3 h-3 text-accent" />
                              )}
                              {platform.platform === "GeeksforGeeks" && (
                                <FaFire className="w-3 h-3 text-primary" />
                              )}
                              {platform.platform === "Codeforces" && (
                                <FaBolt className="w-3 h-3 text-secondary" />
                              )}
                            </motion.div>
                          </div>
                        </div>

                        <motion.div
                          className="text-xs text-muted-foreground border-t border-border/50 pt-3"
                          whileHover={{ color: "hsl(var(--primary))" }}
                          transition={{ duration: 0.2 }}
                        >
                          {platform.platform === "LeetCode" &&
                            `Solved ${platform.solved}+ problems across all difficulty levels`}
                          {platform.platform === "CodeChef" &&
                            `${platform.rank} with ${
                              apiData?.codechef?.contests?.attendedCount || 9
                            } contests attended`}
                          {platform.platform === "GeeksforGeeks" &&
                            `Solved ${platform.solved}+ problems with ${
                              apiData?.gfg?.profile?.currentStreak || 7
                            } day current streak`}
                          {platform.platform === "Codeforces" &&
                            `${platform.rank} with ${
                              apiData?.codeforces?.contests?.attendedCount || 7
                            } contests attended`}
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="flex items-center gap-3 mb-8"
              variants={itemVariants}
            >
              <FaTrophy className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                Notable Achievements
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {codingAchievements.map((achievement, index) => {
                const IconComponent = achievement.icon;
                return (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={achievementCardVariants}
                    whileHover="whileHover"
                  >
                    <Card
                      className={`
                        group bg-gradient-to-br ${achievement.bgColor}
                        border ${achievement.borderColor}
                        hover:border-primary/40 hover:bg-card/60
                        transition-all duration-300 cursor-pointer
                        backdrop-blur-sm
                      `}
                    >
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <motion.div
                            className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0"
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            transition={{ duration: 0.3 }}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${achievement.color}`}
                            />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-bold text-base text-foreground leading-tight">
                                {achievement.title}
                              </h3>
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge
                                  className={`
                                  ${achievement.color} bg-transparent border-current text-xs font-medium ml-2 flex-shrink-0
                                `}
                                >
                                  {achievement.metric}
                                </Badge>
                              </motion.div>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {achievement.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <MdTrendingUp className="w-4 h-4" />
              <span>Continuous Growth</span>
            </motion.div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Actively solving problems and participating in contests to improve
              algorithmic thinking and competitive programming skills. Always
              looking for new challenges and opportunities to grow.
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Coding;
