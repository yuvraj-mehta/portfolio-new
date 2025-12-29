import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Download,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Zap,
  Target,
  Activity,
  CircleDot,
  Eye,
  ArrowRight,
  ChevronRight,
  Code,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaReact,
  FaNodeJs,
  FaGraduationCap,
  FaTrophy,
  FaStar,
  FaBriefcase,
  FaRocket,
  FaCode,
  FaBook,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLink,
} from "react-icons/fa";
import { HiHand } from "react-icons/hi";
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiNextdotjs,
} from "react-icons/si";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BiGitCommit } from "react-icons/bi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import GitHubActivity from "@/components/GitHubActivity";
import { Hero } from "@/components/Hero";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  personalInfo,
  socialLinks,
  achievements,
  projects,
  skills,
  interests,
  overviewData,
} from "@/data";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
    },
  }),
};

const skillBarVariants = {
  initial: { scaleX: 0, originX: 0 },
  animate: (delay: number) => ({
    scaleX: 1,
    transition: {
      duration: 0.8,
      delay: 0.3 + delay,
      ease: "easeOut",
    },
  }),
};

const pulseVariants = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Optimized typewriter effect
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    const timeoutId = setTimeout(() => {
      setDisplayText((prev) => {
        const nextText = text.slice(0, prev.length + 1);
        if (nextText === text) {
          setIsComplete(true);
        }
        return nextText;
      });
    }, speed);

    return () => clearTimeout(timeoutId);
  }, [displayText, text, speed, isComplete]);

  return displayText;
};

// Optimized image component with loading states
const ProjectImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div
        className={`${className} bg-gradient-to-br from-primary/10 to-primary-glow/5 flex items-center justify-center border border-primary/20`}
      >
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaCode className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-primary">Project Preview</p>
          <p className="text-xs text-foreground/60 mt-1">
            Click to view live demo
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div
          className={`${className} bg-muted/60 flex items-center justify-center absolute inset-0 z-10 border border-border/30`}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-primary/70 border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            <p className="text-xs text-foreground/60">Loading preview...</p>
          </motion.div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
};

const Overview = () => {
  // Memoized static data
  const highlights = useMemo(() => overviewData.highlights, []);
  const quickActions = useMemo(() => overviewData.quickActions, []);
  const recentActivities = useMemo(() => overviewData.recentActivities, []);
  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured).slice(0, 3),
    []
  );
  const skillLevels = useMemo(() => overviewData.skillLevels, []);
  const currentStatus = useMemo(() => overviewData.currentStatus, []);
  const contactInfo = useMemo(() => overviewData.contactInfo, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* SEO Meta Tags */}
      <title>
        {personalInfo.name} - {personalInfo.title} | Portfolio Overview
      </title>
      <meta
        name="description"
        content={`${personalInfo.title} & ${personalInfo.course} Student at ${personalInfo.university}. Specialized in React, Node.js, and modern web technologies. ${achievements.leetcode.problemsSolved} LeetCode problems solved.`}
      />
      <meta
        name="keywords"
        content={`Full Stack Developer, React, Node.js, TypeScript, ${personalInfo.university}, LeetCode, Portfolio`}
      />
      <meta
        property="og:title"
        content={`${personalInfo.name} - ${personalInfo.title} Portfolio`}
      />
      <meta
        property="og:description"
        content="Full Stack Developer specializing in modern web technologies. Check out my projects and skills."
      />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      {/* Navigation and Theme Switcher */}
      <Navigation />
      <ThemeSwitcher />

      {/* Hero Section */}
      <Hero />

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Main Content Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Technical Skills Card */}
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={cardHoverVariants.hover}>
                    <Card className="p-6 border-primary/30">
                      <div className="flex items-center mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, hsl(var(--accent) / 0.3) 0%, hsl(var(--primary) / 0.3) 100%)`,
                          }}
                        >
                          <Activity
                            className="w-5 h-5"
                            style={{ color: `hsl(var(--accent))` }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Technical Skills
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {skillLevels.map((skill, index) => (
                          <motion.div
                            key={index}
                            custom={index}
                            variants={listItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <skill.icon className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-foreground">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-xs text-foreground/60">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-primary to-primary-glow h-1.5 rounded-full"
                                custom={index}
                                variants={skillBarVariants}
                                initial="initial"
                                animate="animate"
                                style={{ width: `${skill.level}%` }}
                              ></motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        <Link to="/skills">View All Skills</Link>
                      </Button>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Coding Achievements Card */}
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={cardHoverVariants.hover}>
                    <Card className="p-6 border-primary/30">
                      <div className="flex items-center mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg"
                          style={{
                            background: `linear-gradient(135deg, hsl(var(--accent) / 0.3) 0%, hsl(var(--primary) / 0.3) 100%)`,
                          }}
                        >
                          <FaTrophy
                            className="w-5 h-5"
                            style={{ color: `hsl(var(--accent))` }}
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Coding Achievements
                        </h3>
                      </div>

                      <motion.div
                        className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground">
                            Total Solved
                          </span>
                          <Badge className="bg-primary/20 text-primary border-primary/30 font-bold">
                            {parseInt(
                              achievements.leetcode.problemsSolved.replace(
                                "+",
                                ""
                              )
                            ) +
                              parseInt(
                                achievements.codechef.problemsSolved.replace(
                                  "+",
                                  ""
                                )
                              ) +
                              parseInt(
                                achievements.codeforces.problemsSolved.replace(
                                  "+",
                                  ""
                                )
                              ) +
                              parseInt(
                                achievements.geeksforgeeks.problemsSolved.replace(
                                  "+",
                                  ""
                                )
                              )}
                            + Problems
                          </Badge>
                        </div>
                      </motion.div>

                      <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {[
                          {
                            name: "LeetCode",
                            rating: achievements.leetcode.rating,
                            problems: achievements.leetcode.problemsSolved,
                            color: "orange",
                          },
                          {
                            name: "CodeChef",
                            rating: achievements.codechef.rating,
                            problems: achievements.codechef.problemsSolved,
                            color: "amber",
                          },
                          {
                            name: "Codeforces",
                            rating: achievements.codeforces.rating,
                            problems: achievements.codeforces.problemsSolved,
                            color: "blue",
                          },
                          {
                            name: "GeeksforGeeks",
                            rating: null,
                            problems: achievements.geeksforgeeks.problemsSolved,
                            color: "green",
                          },
                        ].map((platform, idx) => (
                          <motion.div
                            key={platform.name}
                            variants={itemVariants}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm font-medium text-foreground">
                              {platform.name}
                            </span>
                            <div className="flex gap-2">
                              {platform.rating && (
                                <Badge
                                  className={`bg-${platform.color}-500/20 text-${platform.color}-200 border-${platform.color}-500/30 text-xs flex items-center gap-1`}
                                >
                                  <FaStar className="w-2.5 h-2.5" />
                                  {platform.rating}
                                </Badge>
                              )}
                              <Badge
                                className={`bg-${platform.color}-500/10 text-${platform.color}-300 border-${platform.color}-500/20 text-xs flex items-center gap-1`}
                              >
                                <Target className="w-2.5 h-2.5" />
                                {platform.problems}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        <Link to="/coding">View Profiles & Stats</Link>
                      </Button>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Current Status Card */}
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={cardHoverVariants.hover}>
                    <Card className="p-6 border-primary/30">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/30 flex items-center justify-center mr-3 shadow-lg">
                          <Target className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">
                          Current Status
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Zap
                            className="w-4 h-4"
                            style={{ color: `hsl(var(--accent))` }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            Learning:
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 pl-6">
                          {currentStatus.learning}
                        </p>

                        <div className="flex items-center gap-2">
                          <MapPin
                            className="w-4 h-4"
                            style={{ color: `hsl(var(--primary))` }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            Location:
                          </span>
                        </div>
                        <p className="text-sm text-foreground/70 pl-6">
                          {currentStatus.location}
                        </p>
                      </div>
                      <Button asChild size="sm" className="w-full mt-4">
                        <Link to="/contact">Let's Connect</Link>
                      </Button>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Contact Information Card */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    whileHover={cardHoverVariants.hover}
                    className="p-4 border-2 border-primary/40 hover:border-primary/60 rounded-lg shadow-xl backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70"
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-2 shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.3) 100%)`,
                        }}
                      >
                        <FaEnvelope
                          className="w-4 h-4"
                          style={{ color: `hsl(var(--primary))` }}
                        />
                      </div>
                      <h3 className="text-base font-semibold text-foreground">
                        Contact
                      </h3>
                    </div>

                    <motion.div
                      className="flex items-center gap-2 mb-3 p-2 rounded-lg border"
                      style={{
                        background: `linear-gradient(90deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--primary) / 0.1) 100%)`,
                        borderColor: `hsl(var(--accent) / 0.3)`,
                      }}
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: `hsl(var(--accent))` }}
                        variants={pulseVariants}
                        animate="animate"
                      ></motion.div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: `hsl(var(--accent))` }}
                      >
                        Available • {contactInfo.location}
                      </span>
                    </motion.div>

                    <motion.div
                      className="grid grid-cols-2 gap-1 mb-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {contactInfo.socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variants={itemVariants}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center justify-center gap-1 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                        >
                          <social.icon className={`w-3 h-3 ${social.color}`} />
                          <span className="text-xs text-foreground">
                            {social.name}
                          </span>
                        </motion.a>
                      ))}
                    </motion.div>

                    <motion.a
                      href={`mailto:${contactInfo.email}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-r from-primary/15 to-primary-glow/15 hover:from-primary/25 hover:to-primary-glow/25 border border-primary/30 transition-all"
                    >
                      <FaEnvelope className="w-3 h-3 text-primary" />
                      <span className="text-xs text-foreground">
                        Send Email
                      </span>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Interests Card */}
                <motion.div variants={itemVariants}>
                  <motion.div
                    whileHover={cardHoverVariants.hover}
                    className="p-6 border-2 border-primary/30 rounded-lg shadow-lg backdrop-blur-sm bg-gradient-to-br from-card/95 to-card/80 relative overflow-hidden group"
                  >
                    <div
                      className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"
                      style={{
                        background: `linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.05) 100%)`,
                      }}
                    ></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-primary-glow/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: `linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.3) 100%)`,
                          }}
                        >
                          <FaStar
                            className="w-4 h-4"
                            style={{ color: `hsl(var(--primary))` }}
                          />
                        </div>
                        <h3 className="text-base font-semibold text-foreground">
                          Interests & Hobbies
                        </h3>
                      </div>

                      <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {overviewData.interestsAndHobbies.map(
                          (interest, index) => {
                            const IconComponent = interest.icon;
                            return (
                              <motion.div
                                key={index}
                                variants={listItemVariants}
                                custom={index}
                                whileHover={{ x: 5 }}
                                className="flex items-center gap-3 p-2 rounded-lg bg-primary/10 hover:bg-primary/15 transition-all cursor-pointer"
                              >
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 10 }}
                                  style={{ color: `hsl(var(--primary))` }}
                                >
                                  <IconComponent className="w-4 h-4" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-sm text-foreground">
                                    {interest.name}
                                  </div>
                                  <p className="text-xs text-foreground/70 line-clamp-1">
                                    {interest.description}
                                  </p>
                                </div>
                              </motion.div>
                            );
                          }
                        )}
                      </motion.div>

                      <motion.div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                          background: `linear-gradient(90deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)`,
                          borderColor: `hsl(var(--primary) / 0.3)`,
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div
                          className="flex items-center gap-2 text-xs mb-1"
                          style={{ color: `hsl(var(--primary))` }}
                        >
                          <FaTrophy className="w-3 h-3" />
                          <span className="font-medium">
                            Recent Achievement
                          </span>
                        </div>
                        <p className="text-xs text-foreground/80">
                          Bronze medal in 50m Hurdles at{" "}
                          {personalInfo.university} Intramurals
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* GitHub Activity */}
                <motion.div variants={itemVariants}>
                  <GitHubActivity />
                </motion.div>

                {/* Recent Activity Card */}
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={cardHoverVariants.hover}>
                    <Card className="p-6 border-primary/30">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                            <Activity className="w-4 h-4 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Recent Activity
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <motion.div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: "hsl(var(--accent))" }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          ></motion.div>
                          <Badge variant="outline" className="text-xs">
                            Real-time
                          </Badge>
                        </div>
                      </div>

                      <motion.div
                        className="space-y-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                      >
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={index}
                            variants={listItemVariants}
                            custom={index}
                            whileHover={{
                              x: 5,
                              backgroundColor: "var(--hover-bg)",
                            }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all cursor-pointer"
                          >
                            <motion.div
                              className="relative w-8 h-8 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: `hsl(var(--primary) / 0.2)`,
                              }}
                              whileHover={{ scale: 1.1 }}
                            >
                              <activity.icon
                                className="w-4 h-4"
                                style={{ color: `hsl(var(--primary))` }}
                              />
                              {activity.isLive && (
                                <motion.div
                                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                                  style={{
                                    backgroundColor: `hsl(var(--accent))`,
                                  }}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                ></motion.div>
                              )}
                            </motion.div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate text-foreground">
                                  {activity.title}
                                </h4>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs px-2 py-0.5"
                                  >
                                    {activity.badge}
                                  </Badge>
                                  <span className="text-xs text-foreground/60">
                                    {activity.time}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-foreground/60 mt-1 line-clamp-2">
                                {activity.description}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="flex gap-2 mt-6">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Link to="/experience">
                            <Clock className="w-3 h-3 mr-2" />
                            Full Timeline
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <a
                            href={socialLinks.github.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub className="w-3 h-3 mr-2" />
                            GitHub Activity
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Featured Projects Card */}
                <motion.div variants={itemVariants}>
                  <motion.div whileHover={cardHoverVariants.hover}>
                    <Card className="p-6 border-primary/30">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                            <FaRocket className="w-4 h-4 text-primary" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Featured Projects
                          </h3>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {featuredProjects.length} Live
                        </Badge>
                      </div>

                      <Carousel className="w-full">
                        <CarouselContent>
                          {featuredProjects.map((project, index) => (
                            <CarouselItem key={index}>
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="block group p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer hover:shadow-lg"
                                onClick={() =>
                                  window.open(
                                    project.demo || project.github,
                                    "_blank"
                                  )
                                }
                              >
                                <div
                                  className="relative w-full h-[200px] bg-muted/60 rounded-lg overflow-hidden mb-4 shadow-lg"
                                  style={{ aspectRatio: "2880/1560" }}
                                >
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full"
                                  >
                                    <ProjectImage
                                      src={project.image}
                                      alt={project.title}
                                      className="w-full h-full object-cover object-top"
                                    />
                                  </motion.div>
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                  <motion.div
                                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ y: -10 }}
                                    whileHover={{ y: 0 }}
                                  >
                                    <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                                      Click to view
                                    </div>
                                  </motion.div>
                                  <div className="absolute top-2 right-2 flex items-center gap-2">
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {project.category}
                                    </Badge>
                                    {project.status === "Live" && (
                                      <motion.div
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                          backgroundColor: `hsl(var(--accent))`,
                                        }}
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                        }}
                                      ></motion.div>
                                    )}
                                  </div>
                                  <motion.div
                                    className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ y: 10, opacity: 0 }}
                                    whileHover={{ y: 0, opacity: 1 }}
                                  >
                                    {project.demo && (
                                      <motion.button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(project.demo, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-8 h-8 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-colors"
                                        aria-label="View live demo"
                                      >
                                        <ExternalLink className="w-4 h-4" />
                                      </motion.button>
                                    )}
                                    {project.github && (
                                      <motion.button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          window.open(project.github, "_blank");
                                        }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-8 h-8 bg-foreground/80 hover:bg-foreground rounded-full flex items-center justify-center text-background transition-colors"
                                        aria-label="View GitHub repository"
                                      >
                                        <FaCode className="w-4 h-4" />
                                      </motion.button>
                                    )}
                                  </motion.div>
                                </div>
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-base group-hover:text-primary transition-colors text-foreground">
                                    {project.title}
                                  </h4>
                                  <p className="text-sm text-foreground/70 line-clamp-2">
                                    {project.description}
                                  </p>
                                  <motion.div
                                    className="flex flex-wrap gap-1"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                  >
                                    {project.tags
                                      .slice(0, 4)
                                      .map((tag, tagIndex) => (
                                        <motion.span
                                          key={tagIndex}
                                          variants={itemVariants}
                                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                        >
                                          {tag}
                                        </motion.span>
                                      ))}
                                    {project.tags.length > 4 && (
                                      <span className="text-xs text-foreground/60 px-2 py-1">
                                        +{project.tags.length - 4}
                                      </span>
                                    )}
                                  </motion.div>
                                </div>
                              </motion.div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-2" />
                        <CarouselNext className="right-2" />
                      </Carousel>

                      <div className="flex gap-2 mt-6">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1"
                        >
                          <Link to="/projects">
                            <Eye className="w-3 h-3 mr-2" />
                            View All Projects
                          </Link>
                        </Button>
                        <Button asChild size="sm" className="flex-1">
                          <a
                            href={socialLinks.github.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaGithub className="w-3 h-3 mr-2" />
                            GitHub Profile
                          </a>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                </motion.div>

                {/* Education & Background */}
                <motion.div
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {/* About Summary */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={cardHoverVariants.hover}
                      className="p-6 border-2 border-primary/40 rounded-lg shadow-xl backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 relative overflow-hidden group"
                    >
                      <div
                        className="absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.05) 100%)`,
                        }}
                      ></div>
                      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-primary-glow/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--accent) / 0.3) 0%, hsl(var(--primary) / 0.3) 100%)`,
                            }}
                          >
                            <FaGraduationCap
                              className="w-5 h-5"
                              style={{ color: `hsl(var(--accent))` }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              About Me
                            </h3>
                            <p
                              className="text-xs font-medium"
                              style={{ color: `hsl(var(--accent))` }}
                            >
                              Developer & Problem Solver
                            </p>
                          </div>
                        </div>

                        <motion.div
                          className="space-y-4 mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <p className="text-sm text-foreground/80 leading-relaxed">
                            {personalInfo.bio.intro}
                          </p>
                        </motion.div>

                        <motion.div
                          className="space-y-2 mb-6"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {[
                            { icon: MapPin, text: personalInfo.location },
                            {
                              icon: Calendar,
                              text: "Graduating 2027 • Current Year • CGPA: 7.68/10",
                            },
                            {
                              icon: CircleDot,
                              text: `${personalInfo.status.availability} for opportunities`,
                            },
                          ].map((item, idx) => (
                            <motion.div
                              key={idx}
                              variants={listItemVariants}
                              custom={idx}
                              className="flex items-center gap-2 text-xs text-foreground/70"
                            >
                              <item.icon
                                className="w-3 h-3"
                                style={{ color: `hsl(var(--accent))` }}
                              />
                              <span>{item.text}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        <Button
                          asChild
                          size="sm"
                          className="w-full group-hover:scale-105 transition-transform duration-300"
                        >
                          <Link to="/about">
                            <Eye className="w-3 h-3 mr-2" />
                            View Full Profile
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Education */}
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={cardHoverVariants.hover}
                      className="p-6 border-2 border-primary/30 rounded-lg shadow-lg backdrop-blur-sm bg-gradient-to-br from-card/95 to-card/80 relative overflow-hidden group"
                    >
                      <div
                        className="absolute top-0 left-0 w-24 h-24 rounded-full -translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"
                        style={{
                          background: `linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.05) 100%)`,
                        }}
                      ></div>
                      <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-accent/5 rounded-full translate-y-10 translate-x-10 group-hover:scale-125 transition-transform duration-700"></div>

                      <div className="relative z-10">
                        <div className="flex items-center mb-6">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300"
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--primary) / 0.3) 0%, hsl(var(--accent) / 0.3) 100%)`,
                            }}
                          >
                            <FaGraduationCap
                              className="w-5 h-5"
                              style={{ color: `hsl(var(--primary))` }}
                            />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground">
                              Education
                            </h3>
                            <p
                              className="text-xs font-medium"
                              style={{ color: `hsl(var(--primary))` }}
                            >
                              Academic Journey
                            </p>
                          </div>
                        </div>

                        <motion.div
                          className="space-y-4"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {/* Current Education */}
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 hover:border-primary/40 transition-all relative"
                          >
                            <motion.div
                              className="absolute top-2 right-2 w-2 h-2 rounded-full"
                              style={{ backgroundColor: `hsl(var(--accent))` }}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            ></motion.div>
                            <div className="flex items-start gap-3">
                              <motion.div
                                className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mt-1"
                                whileHover={{ scale: 1.1 }}
                              >
                                <FaBook className="w-4 h-4 text-primary" />
                              </motion.div>
                              <div className="flex-1">
                                <div className="font-bold text-sm text-foreground mb-1">
                                  B.Tech {personalInfo.course}
                                </div>
                                <div className="text-sm text-primary font-semibold mb-1">
                                  {personalInfo.university}
                                </div>
                                <div className="flex items-center gap-3 text-xs text-foreground/60">
                                  <span>2023 - 2027</span>
                                  <Badge
                                    className="text-xs"
                                    style={{
                                      backgroundColor: `hsl(var(--accent) / 0.2)`,
                                      color: `hsl(var(--accent))`,
                                      borderColor: `hsl(var(--accent) / 0.3)`,
                                    }}
                                  >
                                    CGPA: 7.68
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </motion.div>

                          {/* Previous Education */}
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ x: 4 }}
                            className="p-3 rounded-lg bg-muted/20 border border-border/50"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-lg bg-muted/40 flex items-center justify-center">
                                <FaGraduationCap className="w-3 h-3 text-foreground/60" />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-sm text-foreground">
                                  Class 12th • Science Stream
                                </div>
                                <div className="text-xs text-foreground/60">
                                  2022 • 88.88% • Pragya Bharti Public School
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="mt-6 flex gap-3"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="flex-1"
                          >
                            <Button
                              asChild
                              variant="outline"
                              size="sm"
                              className="w-full"
                            >
                              <Link to="/education">
                                <FaBook className="w-3 h-3 mr-2" />
                                Academic Details
                              </Link>
                            </Button>
                          </motion.div>
                          <motion.div
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            className="flex-1"
                          >
                            <Button asChild size="sm" className="w-full">
                              <a
                                href={personalInfo.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-3 h-3 mr-2" />
                                Resume
                              </a>
                            </Button>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Overview;
