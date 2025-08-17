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
  Code
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
  FaLink
} from "react-icons/fa";
import { HiHand } from "react-icons/hi";
import {
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiNextdotjs
} from "react-icons/si";
import {
  HiChatBubbleLeftRight
} from "react-icons/hi2";
import {
  BiGitCommit
} from "react-icons/bi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import GitHubActivity from "@/components/GitHubActivity";
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { personalInfo, socialLinks, achievements, skills, projects, interests } from "@/data/portfolioData";

// Optimized typewriter effect with reduced re-renders
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;
    
    const timeoutId = setTimeout(() => {
      setDisplayText(prev => {
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

// Optimized image component with better loading states
const ProjectImage = ({ src, alt, className }: { src: string; alt: string; className?: string }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  if (error) {
    return (
      <div className={`${className} bg-gradient-to-br from-primary/10 to-primary-glow/5 flex items-center justify-center border border-primary/20`}>
        <div className="text-center p-4">
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <FaCode className="w-6 h-6 text-primary" />
          </div>
          <p className="text-sm font-medium text-primary">Project Preview</p>
          <p className="text-xs text-foreground/60 mt-1">Click to view live demo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {loading && (
        <div className={`${className} bg-muted/60 flex items-center justify-center absolute inset-0 z-10 border border-border/30`}>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-primary/70 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-foreground/60">Loading preview...</p>
          </div>
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
  // Optimized typewriter with memoization
  const typewriterText = useTypewriter(personalInfo.title + " & Problem Solver", 120);

  // Memoized static data to prevent unnecessary re-renders
  const highlights = useMemo(() => [
    { icon: FaGraduationCap, title: "B.Tech CS", subtitle: personalInfo.university, year: "2025", progress: 75, trend: "+5%", isLive: false },
    { icon: FaCode, title: achievements.stats.totalProjects, subtitle: "Full Stack", year: achievements.stats.yearsExperience, progress: 85, trend: "+3 this month", isLive: true },
    { icon: FaTrophy, title: "DSA Expert", subtitle: achievements.leetcode.problemsSolved + " Problems", year: "LeetCode", progress: 90, trend: "+50 this week", isLive: true },
    { icon: FaBriefcase, title: "Experience", subtitle: "Internships & Projects", year: "Active", progress: 80, trend: "Growing", isLive: false }
  ], []);

  const quickActions = useMemo(() => [
    { icon: FaEnvelope, label: "Send Email", href: socialLinks.email.url, type: "external" },
    { icon: Download, label: "Download Resume", href: personalInfo.resume, type: "download" },
    { icon: HiChatBubbleLeftRight, label: "Schedule Call", href: "/contact", type: "internal" },
    { icon: FaGithub, label: "View GitHub", href: socialLinks.github.url, type: "external" }
  ], []);

  const recentActivities = useMemo(() => [
    {
      icon: BiGitCommit,
      title: "Portfolio Enhancement",
      description: "Updated portfolio with modern design and better UX",
      time: "2 days ago",
      type: "project",
      isLive: true,
      badge: "Live"
    },
    {
      icon: FaTrophy,
      title: "LeetCode Milestone",
      description: "Solved 50+ problems this month, reached 500+ total",
      time: "1 week ago",
      type: "achievement",
      isLive: false,
      badge: "Achievement"
    },
    {
      icon: FaRocket,
      title: "Project Deployment",
      description: "Deployed E-commerce platform with CI/CD pipeline",
      time: "3 days ago",
      type: "deployment",
      isLive: true,
      badge: "Deployed"
    },
    {
      icon: FaBook,
      title: "Learning Next.js 14",
      description: "Completed advanced Next.js course with App Router",
      time: "2 weeks ago",
      type: "learning",
      isLive: false,
      badge: "Completed"
    }
  ], []);

  const featuredProjects = useMemo(() => projects.filter(project => project.featured).slice(0, 3), []);

  const skillLevels = useMemo(() => [
    { name: "React", level: 90, icon: FaReact, category: "Frontend" },
    { name: "Node.js", level: 85, icon: FaNodeJs, category: "Backend" },
    { name: "TypeScript", level: 80, icon: SiTypescript, category: "Language" },
    { name: "MongoDB", level: 75, icon: SiMongodb, category: "Database" },
    { name: "Next.js", level: 85, icon: SiNextdotjs, category: "Framework" },
    { name: "Express", level: 80, icon: SiExpress, category: "Backend" }
  ], []);

  const currentStatus = useMemo(() => ({
    availability: personalInfo.status.availability,
    currentFocus: "Building Full-Stack Projects with Next.js",
    learning: "Advanced React Patterns & System Design",
    lookingFor: "Internships & Full-time Opportunities",
    location: personalInfo.location + " (" + personalInfo.status.workMode + ")",
    lastUpdated: "Updated 2 days ago"
  }), []);

  const contactInfo = useMemo(() => ({
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    timezone: "IST (UTC +5:30)",
    availability: personalInfo.status.availability,
    preferredContact: "Email or LinkedIn",
    responseTime: "Within 24 hours",
    socialLinks: [
      {
        name: "GitHub",
        icon: FaGithub,
        url: socialLinks.github.url,
        username: "@" + socialLinks.github.username,
        color: "text-gray-300 hover:text-white"
      },
      {
        name: "LinkedIn",
        icon: FaLinkedin,
        url: socialLinks.linkedin.url,
        username: socialLinks.linkedin.username,
        color: "text-blue-400 hover:text-blue-300"
      },
      {
        name: "Twitter",
        icon: FaTwitter,
        url: socialLinks.twitter.url,
        username: socialLinks.twitter.username,
        color: "text-sky-400 hover:text-sky-300"
      },
      {
        name: "Email",
        icon: FaEnvelope,
        url: socialLinks.email.url,
        username: socialLinks.email.address,
        color: "text-red-400 hover:text-red-300"
      }
    ]
  }), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 relative overflow-hidden">
      {/* Background gradient overlay with animation */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 animate-pulse opacity-50 pointer-events-none"></div>
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/8 via-transparent to-transparent pointer-events-none"></div>

      {/* Content wrapper */}
      <div className="relative z-10">
      {/* SEO Meta Tags */}
      <title>{personalInfo.name} - {personalInfo.title} | Portfolio Overview</title>
      <meta name="description" content={`${personalInfo.title} & ${personalInfo.course} Student at ${personalInfo.university}. Specialized in React, Node.js, and modern web technologies. ${achievements.leetcode.problemsSolved} LeetCode problems solved.`} />
      <meta name="keywords" content={`Full Stack Developer, React, Node.js, TypeScript, ${personalInfo.university}, LeetCode, Portfolio`} />
      <meta property="og:title" content={`${personalInfo.name} - ${personalInfo.title} Portfolio`} />
      <meta property="og:description" content="Full Stack Developer specializing in modern web technologies. Check out my projects and skills." />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />

      <Navigation />
      <ThemeSwitcher />

      {/* Hero Section - Inspired by Previous Portfolio */}
      <section className="relative pt-20 pb-16 min-h-screen flex items-center overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/[0.08] via-primary-glow/[0.04] to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-gradient-radial from-primary-glow/[0.06] to-transparent rounded-full blur-2xl opacity-30 animate-pulse animation-delay-1000"></div>

        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-24 items-center">

            {/* Left Content - Hero Text */}
            <div className="space-y-6 md:space-y-8 fade-in order-2 lg:order-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">

              {/* Status Badge */}
              <div className="inline-flex items-center px-4 py-2.5 rounded-full bg-gradient-to-r from-primary/15 to-primary-glow/10 border-2 border-primary/25 text-primary text-sm font-semibold shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <Code className="w-4 h-4 mr-2 animate-pulse" />
                <span>Full Stack Developer</span>
                <div className="ml-3 w-2 h-2 bg-primary rounded-full animate-pulse shadow-lg shadow-primary/50"></div>
              </div>

              {/* Main Heading */}
              <div className="space-y-4 md:space-y-6">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                  <span className="block text-muted-foreground text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-3 md:mb-4 animate-fade-in-up flex items-center gap-2">
                    <HiHand className="w-6 h-6 lg:w-8 lg:h-8" /> Hello, I'm
                  </span>
                  <span className="gradient-text relative inline-block animate-fade-in-up animation-delay-300 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent drop-shadow-2xl">
                    {personalInfo.name}
                  </span>
                </h1>

                {/* Tagline */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 leading-relaxed animate-fade-in-up animation-delay-500">
                  <span className="text-foreground font-semibold">{personalInfo.course} student</span> at{" "}
                  <span className="text-primary font-bold">{personalInfo.university}</span>{" "}
                  passionate about building{" "}
                  <span className="text-primary font-bold">full stack applications</span> with focus on{" "}
                  <span className="text-primary-glow font-bold">user-friendly interfaces</span>.
                </p>

                {/* Key Skills/Tech */}
                <div className="animate-fade-in-up animation-delay-600">
                  <p className="text-sm font-bold text-foreground/70 mb-3 flex items-center justify-center lg:justify-start gap-2">
                    <FaStar className="w-4 h-4 text-primary animate-pulse" />
                    <span>Skilled in</span>
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                    {["React", "Node.js", "TypeScript", "MongoDB", "Next.js"].map((tech, index) => (
                      <div key={index} className="flex items-center gap-2 bg-primary/10 border border-primary/20 px-3 py-2 rounded-full hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-lg backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        <span className="text-xs font-semibold text-foreground">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 animate-fade-in-up animation-delay-800">
                <Button
                  className="group relative overflow-hidden px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold bg-gradient-to-r from-primary via-primary-glow to-accent hover:from-accent hover:via-primary-glow hover:to-primary shadow-2xl hover:shadow-3xl hover:shadow-primary/40 transition-all duration-500 border-0 rounded-2xl hover:scale-105 md:hover:scale-110 active:scale-95 backdrop-blur-sm transform hover:-translate-y-1"
                  asChild
                >
                  <Link to="/contact">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3">
                      Contact Me
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="group px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-bold border-2 border-primary/60 text-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-glow/10 hover:text-primary shadow-xl hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 rounded-2xl hover:scale-105 md:hover:scale-110 active:scale-95 backdrop-blur-sm bg-background/60 hover:border-primary transform hover:-translate-y-1"
                  asChild
                >
                  <Link to="/projects">
                    <span className="flex items-center justify-center gap-2 md:gap-3">
                      View Work
                      <ExternalLink className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </Link>
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex justify-center lg:justify-start space-x-4 animate-fade-in-up animation-delay-1000">
                <a
                  href={socialLinks.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-2 border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-gray-900 hover:border-gray-700 transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-gray-500/30"
                >
                  <FaGithub className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href={socialLinks.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-2 border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-blue-500/30"
                >
                  <FaLinkedin className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
                <a
                  href={socialLinks.email.url}
                  className="group relative w-12 h-12 rounded-2xl bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border-2 border-border/60 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-red-600 hover:border-red-500 transition-all duration-300 hover:scale-125 hover:shadow-xl hover:shadow-red-500/30"
                >
                  <FaEnvelope className="w-5 h-5 group-hover:scale-110 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              </div>
            </div>

            {/* Right Content - Profile Image - Hidden on Mobile/Tablet */}
            <div className="hidden lg:block relative slide-up order-1 lg:order-2">
              <div className="relative flex justify-center w-full max-w-lg xl:max-w-xl mx-auto">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary-glow/30 to-primary/20 rounded-full blur-2xl animate-pulse opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary-glow/15 to-primary/15 rounded-full blur-xl animate-pulse opacity-40 animation-delay-1000"></div>

                {/* Profile Image Container */}
                <div className="relative z-10 w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/40 shadow-2xl hover:shadow-primary/50 hover:shadow-2xl transition-all duration-500 hover:scale-110 group mx-auto cursor-pointer backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/25 to-primary-glow/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} - ${personalInfo.title}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Status Badge */}
                  <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500/95 to-emerald-500/95 backdrop-blur-sm text-white text-sm px-3 py-2 rounded-full font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110 border-2 border-white/30">
                    <span className="animate-pulse">●</span> Available
                  </div>
                </div>

                {/* Achievement Float Cards - Hidden on small screens */}
                <div className="hidden md:block absolute top-4 -right-2 lg:-right-4 w-20 h-16 md:w-24 md:h-20 bg-card/98 backdrop-blur-lg rounded-2xl border-2 border-primary/40 p-2 md:p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-125 animate-float z-20">
                  <div className="flex justify-center mb-1 md:mb-2">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <FaRocket className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-primary font-bold text-center">{achievements.stats.totalProjects}</div>
                  <div className="text-[8px] md:text-[10px] text-foreground/80 text-center font-medium">Projects</div>
                </div>

                <div className="hidden md:block absolute bottom-4 -left-2 lg:-left-4 w-20 h-16 md:w-24 md:h-20 bg-card/98 backdrop-blur-lg rounded-2xl border-2 border-primary/40 p-2 md:p-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-125 animate-float animation-delay-1000 z-20">
                  <div className="flex justify-center mb-1 md:mb-2">
                    <div className="w-6 h-6 md:w-7 md:h-7 rounded-xl bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center shadow-lg">
                      <FaTrophy className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    </div>
                  </div>
                  <div className="text-xs md:text-sm text-primary font-bold text-center">{achievements.leetcode.problemsSolved}</div>
                  <div className="text-[8px] md:text-[10px] text-foreground/80 text-center font-medium">Problems</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid - Reorganized for Portfolio Overview */}
      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column - Core Skills & Capabilities */}
            <div className="lg:col-span-1 space-y-6">

              {/* Skills Overview - Most Important for Portfolio */}
              <Card className="p-6 border-primary/30">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center mr-3 shadow-lg">
                    <Activity className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Technical Skills</h3>
                </div>
                <div className="space-y-3">
                  {skillLevels.map((skill, index) => (
                    <div key={index} className="">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">{skill.name}</span>
                        </div>
                        <span className="text-xs text-foreground/60">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-muted/60 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-primary to-primary-glow h-1.5 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-4">
                  <Link to="/skills">View All Skills</Link>
                </Button>
              </Card>

              {/* Coding Achievements - Key Portfolio Highlight */}
              <Card className="p-6 border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center mr-3 shadow-lg">
                    <FaTrophy className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Coding Achievements</h3>
                </div>

                {/* Total Problems Summary */}
                <div className="mb-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Total Solved</span>
                    <Badge className="bg-primary/20 text-primary border-primary/30 font-bold">
                      {parseInt(achievements.leetcode.problemsSolved.replace('+', '')) +
                       parseInt(achievements.codechef.problemsSolved.replace('+', '')) +
                       parseInt(achievements.codeforces.problemsSolved.replace('+', '')) +
                       parseInt(achievements.geeksforgeeks.problemsSolved.replace('+', ''))}+ Problems
                    </Badge>
                  </div>
                </div>

                {/* Platform Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">LeetCode</span>
                    <div className="flex gap-2">
                      <Badge className="bg-orange-500/20 text-orange-200 border-orange-500/30 text-xs flex items-center gap-1">
                        <FaStar className="w-2.5 h-2.5" />
                        {achievements.leetcode.rating}
                      </Badge>
                      <Badge className="bg-orange-500/10 text-orange-300 border-orange-500/20 text-xs flex items-center gap-1">
                        <Target className="w-2.5 h-2.5" />
                        {achievements.leetcode.problemsSolved}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">CodeChef</span>
                    <div className="flex gap-2">
                      <Badge className="bg-amber-500/20 text-amber-200 border-amber-500/30 text-xs flex items-center gap-1">
                        <FaStar className="w-2.5 h-2.5" />
                        {achievements.codechef.rating}
                      </Badge>
                      <Badge className="bg-amber-500/10 text-amber-300 border-amber-500/20 text-xs flex items-center gap-1">
                        <Target className="w-2.5 h-2.5" />
                        {achievements.codechef.problemsSolved}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Codeforces</span>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-500/20 text-blue-200 border-blue-500/30 text-xs flex items-center gap-1">
                        <FaStar className="w-2.5 h-2.5" />
                        {achievements.codeforces.rating}
                      </Badge>
                      <Badge className="bg-blue-500/10 text-blue-300 border-blue-500/20 text-xs flex items-center gap-1">
                        <Target className="w-2.5 h-2.5" />
                        {achievements.codeforces.problemsSolved}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">GeeksforGeeks</span>
                    <Badge className="bg-green-500/20 text-green-200 border-green-500/30 text-xs flex items-center gap-1">
                      <Target className="w-2.5 h-2.5" />
                      {achievements.geeksforgeeks.problemsSolved}
                    </Badge>
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full mt-4">
                  <Link to="/coding">View Profiles & Stats</Link>
                </Button>
              </Card>

              {/* Current Focus & Availability */}
              <Card className="p-6 border-primary/30">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary-glow/30 flex items-center justify-center mr-3 shadow-lg">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Current Status</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-foreground">Learning:</span>
                  </div>
                  <p className="text-sm text-foreground/70 pl-6">{currentStatus.learning}</p>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-foreground">Location:</span>
                  </div>
                  <p className="text-sm text-foreground/70 pl-6">{currentStatus.location}</p>
                </div>
                <Button asChild size="sm" className="w-full mt-4">
                  <Link to="/contact">Let's Connect</Link>
                </Button>
              </Card>

              {/* Contact Information */}
              <Card className="p-4 border-2 border-primary/40 hover:border-primary/60 shadow-xl hover:shadow-2xl hover:shadow-blue-500/15 transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-indigo-500/30 flex items-center justify-center mr-2 shadow-lg">
                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">Contact</h3>
                </div>

                {/* Compact Status */}
                <div className="flex items-center gap-2 mb-3 p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-green-300">Available • {contactInfo.location}</span>
                </div>

                {/* Compact Social Links */}
                <div className="grid grid-cols-2 gap-1 mb-3">
                  {contactInfo.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center gap-1 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                    >
                      <social.icon className={`w-3 h-3 ${social.color} transition-colors duration-300`} />
                      <span className="text-xs text-foreground">{social.name}</span>
                    </a>
                  ))}
                </div>

                {/* Primary Contact */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-r from-primary/15 to-primary-glow/15 hover:from-primary/25 hover:to-primary-glow/25 border border-primary/30 transition-all duration-300 group"
                >
                  <FaEnvelope className="w-3 h-3 text-primary" />
                  <span className="text-xs text-foreground group-hover:text-primary transition-colors duration-300">Send Email</span>
                </a>
              </Card>

              {/* Interests & Hobbies */}
              <Card className="p-6 border-2 border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-purple-500/15 transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-card/95 to-card/80 hover:-translate-y-1 relative overflow-hidden group">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-primary-glow/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>

                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaStar className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">Interests & Hobbies</h3>
                  </div>

                  <div className="space-y-3">
                    {interests.map((interest, index) => {
                      const IconComponent = interest.icon;
                      return (
                        <div key={index} className="group/item flex items-center gap-3 p-2 rounded-lg bg-primary/10 hover:bg-primary/15 transition-all duration-300 cursor-pointer">
                          <div className="text-purple-400 group-hover/item:scale-125 transition-transform duration-300">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-sm text-foreground group-hover/item:text-primary transition-colors duration-300">
                              {interest.name}
                            </div>
                            <p className="text-xs text-foreground/70 line-clamp-1">
                              {interest.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30">
                    <div className="flex items-center gap-2 text-xs text-purple-400 mb-1">
                      <FaTrophy className="w-3 h-3" />
                      <span className="font-medium">Recent Achievement</span>
                    </div>
                    <p className="text-xs text-foreground/80">
                      Bronze medal in 50m Hurdles at {personalInfo.university} Intramurals
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column - Projects & Activity */}
            <div className="lg:col-span-2 space-y-6">

              {/* GitHub Activity - Shows active development */}
              <GitHubActivity />

              {/* Recent Activity Timeline - Recent work showcase */}
              <Card className="p-6 border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                      <Activity className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <Badge variant="outline" className="text-xs">
                      Real-time
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="group flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 cursor-pointer"
                    >
                      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        activity.type === 'project' ? 'bg-blue-500/20 group-hover:bg-blue-500/30' :
                        activity.type === 'achievement' ? 'bg-yellow-500/20 group-hover:bg-yellow-500/30' :
                        activity.type === 'learning' ? 'bg-green-500/20 group-hover:bg-green-500/30' :
                        activity.type === 'deployment' ? 'bg-purple-500/20 group-hover:bg-purple-500/30' :
                        'bg-gray-500/20 group-hover:bg-gray-500/30'
                      }`}>
                        <activity.icon className={`w-4 h-4 transition-transform duration-300 ${
                          activity.type === 'project' ? 'text-blue-400' :
                          activity.type === 'achievement' ? 'text-yellow-400' :
                          activity.type === 'learning' ? 'text-green-400' :
                          activity.type === 'deployment' ? 'text-purple-400' :
                          'text-gray-400'
                        }`} />
                        {activity.isLive && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium text-sm group-hover:text-primary transition-colors truncate text-foreground">
                            {activity.title}
                          </h4>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <Badge variant="secondary" className="text-xs px-2 py-0.5">
                              {activity.badge}
                            </Badge>
                            <span className="text-xs text-foreground/60">{activity.time}</span>
                          </div>
                        </div>
                        <p className="text-xs text-foreground/60 mt-1 line-clamp-2">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-6">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to="/experience">
                      <Clock className="w-3 h-3 mr-2" />
                      Full Timeline
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-3 h-3 mr-2" />
                      GitHub Activity
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Featured Projects - Key Portfolio Showcase */}
              <Card className="p-6 border-primary/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mr-3">
                      <FaRocket className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Featured Projects</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {featuredProjects.length} Live
                  </Badge>
                </div>

                <Carousel className="w-full">
                  <CarouselContent>
                    {featuredProjects.map((project, index) => (
                      <CarouselItem key={index}>
                        <a
                          href={project.demo || project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group p-4 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 cursor-pointer hover:shadow-lg"
                        >
                          <div className="relative w-full h-[200px] bg-muted/60 rounded-lg overflow-hidden mb-4 shadow-lg" style={{ aspectRatio: '2880/1560' }}>
                            <ProjectImage
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                                Click to view
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                {project.category}
                              </Badge>
                              {project.status === 'Live' && (
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              )}
                            </div>
                            <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              {project.demo && (
                                <a
                                  href={project.demo}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-8 h-8 bg-primary/90 hover:bg-primary rounded-full flex items-center justify-center text-primary-foreground transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              )}
                              {project.github && (
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-8 h-8 bg-foreground/80 hover:bg-foreground rounded-full flex items-center justify-center text-background transition-colors"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <FaCode className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h4 className="font-semibold text-base group-hover:text-primary transition-colors text-foreground">
                              {project.title}
                            </h4>
                            <p className="text-sm text-foreground/70 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.tags.slice(0, 4).map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 4 && (
                                <span className="text-xs text-foreground/60 px-2 py-1">+{project.tags.length - 4}</span>
                              )}
                            </div>
                          </div>
                        </a>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>

                <div className="flex gap-2 mt-6">
                  <Button asChild variant="outline" size="sm" className="flex-1">
                    <Link to="/projects">
                      <Eye className="w-3 h-3 mr-2" />
                      View All Projects
                    </Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="w-3 h-3 mr-2" />
                      GitHub Profile
                    </a>
                  </Button>
                </div>
              </Card>

              {/* Education & Background Info */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* About Summary */}
                <Card className="p-6 border-2 border-primary/40 hover:border-primary/60 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/15 transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-card/90 to-card/70 hover:-translate-y-1 relative overflow-hidden group">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-500/10 to-green-500/5 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-primary/10 to-primary-glow/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaGraduationCap className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">About Me</h3>
                        <p className="text-xs text-emerald-400 font-medium">Developer & Problem Solver</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {personalInfo.bio.intro}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs text-foreground/70">
                        <MapPin className="w-3 h-3 text-emerald-400" />
                        <span>{personalInfo.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/70">
                        <Calendar className="w-3 h-3 text-emerald-400" />
                        <span>Graduating 2027 • Current Year • CGPA: 7.68/10</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-foreground/70">
                        <CircleDot className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 font-medium">{personalInfo.status.availability} for opportunities</span>
                      </div>
                    </div>

                    <Button asChild size="sm" className="w-full group-hover:scale-105 transition-transform duration-300">
                      <Link to="/about">
                        <Eye className="w-3 h-3 mr-2" />
                        View Full Profile
                      </Link>
                    </Button>
                  </div>
                </Card>

                {/* Education */}
                <Card className="p-6 border-2 border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-blue-500/15 transition-all duration-500 backdrop-blur-sm bg-gradient-to-br from-card/95 to-card/80 hover:-translate-y-1 relative overflow-hidden group">
                  {/* Background decoration */}
                  <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-purple-500/5 rounded-full -translate-y-12 -translate-x-12 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/10 to-accent/5 rounded-full translate-y-10 translate-x-10 group-hover:scale-125 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center mr-3 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <FaGraduationCap className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground">Education</h3>
                        <p className="text-xs text-blue-400 font-medium">Academic Journey</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Current Education */}
                      <div className="group/item p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary-glow/10 border border-primary/20 hover:border-primary/40 transition-all duration-300 relative">
                        <div className="absolute top-2 right-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center mt-1 group-hover/item:scale-110 transition-transform duration-300">
                            <FaBook className="w-4 h-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-sm text-foreground mb-1">B.Tech {personalInfo.course}</div>
                            <div className="text-sm text-primary font-semibold mb-1">{personalInfo.university}</div>
                            <div className="flex items-center gap-3 text-xs text-foreground/60">
                              <span>2023 - 2027</span>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">CGPA: 7.68</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Previous Education */}
                      <div className="p-3 rounded-lg bg-muted/20 border border-border/50">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-lg bg-muted/40 flex items-center justify-center">
                            <FaGraduationCap className="w-3 h-3 text-foreground/60" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-foreground">Class 12th • Science Stream</div>
                            <div className="text-xs text-foreground/60">2022 • 88.88% • Pragya Bharti Public School</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex gap-3">
                      <Button asChild variant="outline" size="sm" className="flex-1 group-hover:scale-105 transition-transform duration-300">
                        <Link to="/education" className="flex items-center justify-center">
                          <FaBook className="w-3 h-3 mr-2" />
                          Academic Details
                        </Link>
                      </Button>
                      <Button asChild size="sm" className="flex-1 group-hover:scale-105 transition-transform duration-300">
                        <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <Download className="w-3 h-3 mr-2" />
                          Resume
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>

            </div>
          </div>
        </div>
      </section>

        <Footer />
      </div>
    </div>
  );
};

export default Overview;
