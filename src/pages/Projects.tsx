import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { HiExternalLink, HiStar, HiCode } from "react-icons/hi";
import { HiBolt, HiGlobeAlt } from "react-icons/hi2";
import { FaGithub, FaPalette, FaRobot, FaLink, FaClock } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { personalInfo, socialLinks, projects, achievements } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

const Projects = () => {
  const [filter, setFilter] = useState("Featured");
  const [animatedCounts, setAnimatedCounts] = useState({
    totalProjects: 0,
    technologies: 0,
    liveProjects: 0
  });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepDuration = duration / steps;

    const targetCounts = {
      totalProjects: parseInt(achievements.stats.totalProjects.replace('+', '')),
      technologies: 8,
      liveProjects: projects.filter(p => p.status === 'Live').length
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      setAnimatedCounts({
        totalProjects: Math.round(targetCounts.totalProjects * easeProgress),
        technologies: Math.round(targetCounts.technologies * easeProgress),
        liveProjects: Math.round(targetCounts.liveProjects * easeProgress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const filters = ["All Projects", "Featured", "Frontend", "AI & ML", "Full Stack"];

  const filteredProjects = projects.filter(project => {
    if (filter === "All Projects") return true;
    if (filter === "Featured") return project.featured;
    return project.category === filter;
  });

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const backgroundVariants = {
    animate: {
      y: [0, -15, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const backgroundVariants2 = {
    animate: {
      y: [0, 15, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
    }
  };

  const filterButtonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const projectCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    whileHover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.15)",
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    whileHover: {
      scale: 1.1,
      transition: { duration: 0.5 }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const badgeVariants = {
    whileHover: { scale: 1.1 },
    transition: { duration: 0.2 }
  };

  const glowVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const sectionHeaderVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    whileHover: { scale: 1.1, rotate: 5 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/8"></div>
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1920&h=1080&fit=crop&auto=format&q=20"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60"
          variants={backgroundVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl opacity-40"
          variants={backgroundVariants2}
          animate="animate"
        />
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-8"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Featured <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore my latest work in web development and innovative solutions
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filters.map((filterName) => (
              <motion.div
                key={filterName}
                variants={containerVariants}
                whileHover="whileHover"
                whileTap="whileTap"
              >
                <Button
                  onClick={() => setFilter(filterName)}
                  variant={filter === filterName ? "default" : "outline"}
                  className={`${
                    filter === filterName
                      ? "bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground shadow-lg"
                      : "border-primary/30 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5"
                  } transition-all duration-300 text-sm px-4 py-2.5 rounded-full font-medium backdrop-blur-sm`}
                >
                  {filterName}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          <div>
            <motion.div
              className="flex items-center gap-3 mb-10"
              variants={sectionHeaderVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {filter === "All Projects" && <HiCode className="w-6 h-6 text-primary" />}
                {filter === "Featured" && <HiStar className="w-6 h-6 text-primary" />}
                {filter === "Frontend" && <FaPalette className="w-6 h-6 text-primary" />}
                {filter === "AI & ML" && <FaRobot className="w-6 h-6 text-primary" />}
                {filter === "Full Stack" && <FaLink className="w-6 h-6 text-primary" />}
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{filter}</h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={`${filter}-${index}`}
                    variants={projectCardVariants}
                    whileHover="whileHover"
                    layout
                  >
                    <Card className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/90 border border-border/50 shadow-lg h-full">
                      <div className="absolute inset-0 opacity-3">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-full blur-2xl"></div>
                      </div>

                      <div className="relative p-6 h-full flex flex-col">
                        <div className="relative overflow-hidden rounded-lg mb-4">
                          {project.featured && (
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Badge className="absolute top-3 left-3 z-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg text-xs">
                                <HiStar className="w-3 h-3 mr-1" />
                                <span>Featured</span>
                              </Badge>
                            </motion.div>
                          )}
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge className={`absolute top-3 right-3 z-20 shadow-lg text-xs ${
                              project.status === "Live" ? "bg-gradient-to-r from-green-500 to-green-600" :
                              project.status === "In Progress" ? "bg-gradient-to-r from-yellow-500 to-yellow-600" :
                              "bg-gradient-to-r from-blue-500 to-blue-600"
                            } text-white`}>
                              {project.status === "Live" && <HiGlobeAlt className="w-3 h-3 mr-1" />}
                              {project.status === "In Progress" && <FaClock className="w-3 h-3 mr-1" />}
                              {project.status === "Completed" && <HiCheckCircle className="w-3 h-3 mr-1" />}
                              <span>{project.status}</span>
                            </Badge>
                          </motion.div>

                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10 flex items-center justify-center gap-3"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {project.demo && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-lg hover:shadow-xl backdrop-blur-sm"
                                  asChild
                                >
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <HiExternalLink className="w-4 h-4 mr-1" />
                                    Demo
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-foreground/10 backdrop-blur-sm border-foreground/20 text-foreground hover:bg-foreground/20 shadow-lg"
                                asChild
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <FaGithub className="w-4 h-4 mr-1" />
                                  Code
                                </a>
                              </Button>
                            </motion.div>
                          </motion.div>

                          <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-44 object-cover"
                            variants={imageVariants}
                            whileHover="whileHover"
                            loading="lazy"
                          />
                        </div>

                        <div className="space-y-4 flex-1 flex flex-col">
                          <div className="flex-1">
                            <motion.h3
                              className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300"
                              whileHover={{ color: "hsl(var(--primary))" }}
                              transition={{ duration: 0.2 }}
                            >
                              {project.title}
                            </motion.h3>
                            <motion.p
                              className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300"
                              whileHover={{ color: "hsl(var(--muted-foreground))" }}
                            >
                              {project.description}
                            </motion.p>
                          </div>

                          <motion.div
                            className="flex flex-wrap gap-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {project.tags.slice(0, 6).map((tag, tagIndex) => (
                              <motion.div
                                key={tagIndex}
                                variants={badgeVariants}
                                whileHover="whileHover"
                              >
                                <Badge variant="secondary" className="text-xs bg-primary/5 border border-primary/20 hover:bg-primary/20 hover:text-primary transition-all duration-200">
                                  {tag}
                                </Badge>
                              </motion.div>
                            ))}
                            {project.tags.length > 6 && (
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge variant="outline" className="text-xs border-primary/30 hover:border-primary/50 transition-colors">
                                  +{project.tags.length - 6}
                                </Badge>
                              </motion.div>
                            )}
                          </motion.div>

                          <motion.div
                            className="flex gap-3 pt-2"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
                                asChild
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <FaGithub className="w-4 h-4 mr-2" />
                                  Source
                                </a>
                              </Button>
                            </motion.div>
                            {project.demo && (
                              <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="w-full border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 transition-all duration-300"
                                  asChild
                                >
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <HiExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                          </motion.div>
                        </div>

                        <motion.div
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold rounded-full shadow-lg transition-all duration-300">
                  View More Projects on GitHub
                  <FaGithub className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </motion.div>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Discover additional projects and open-source contributions on my GitHub profile
            </p>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
