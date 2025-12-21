import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useState } from "react";
import {
  Briefcase,
  Trophy,
  Users,
  Zap,
  Medal,
  Code2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { FaTools } from "react-icons/fa";
import { personalInfo, experiences, achievements } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

const Experience = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 }
    },
    whileHover: { scale: 1.05 }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const expandedContentVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };

  const highlightItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.05 }
    })
  };

  const badgeItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: i * 0.05 }
    })
  };

  const achievementVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 }
    })
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/8"></div>
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format&q=20"
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
            className="text-center mb-16"
            variants={headerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileHover="whileHover"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Journey
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Experience of</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Leadership roles and technical contributions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <motion.div
              className="lg:col-span-2 space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center mb-8" variants={cardVariants}>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Briefcase className="w-6 h-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold">Professional Experience</h2>
              </motion.div>

              <div className="relative">
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block"></div>
                
                <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                  {experiences.map((exp, index) => (
                    <motion.div key={index} className="relative" variants={cardVariants}>
                      <div className="absolute left-2 top-6 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg hidden sm:block z-10">
                        <motion.div
                          className="absolute inset-1 bg-primary/60 rounded-full"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <motion.div
                        whileHover={{
                          boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card
                          className="portfolio-card sm:ml-8 cursor-pointer"
                          onClick={() => toggleCard(index)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge
                                    variant={exp.status === "Currently Active" ? "default" : "secondary"}
                                    className={`text-xs ${exp.status === "Currently Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}`}
                                  >
                                    {exp.status || exp.type}
                                  </Badge>
                                </motion.div>
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge variant="outline" className="text-xs">
                                    {exp.type}
                                  </Badge>
                                </motion.div>
                              </div>

                              <h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.title}</h3>
                              <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                              <motion.p
                                className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mt-1"
                                whileHover={{ x: 4 }}
                                transition={{ duration: 0.2 }}
                              >
                                <span>📍</span>
                                <span>{exp.location}</span>
                              </motion.p>
                            </div>

                            <div className="mt-2 sm:mt-0 flex items-center gap-2">
                              <motion.div whileHover={{ backgroundColor: "hsl(var(--primary) / 0.1)" }} transition={{ duration: 0.2 }}>
                                <Badge variant="outline" className="text-primary border-primary/40 text-xs">
                                  <span className="mr-1">📅</span>
                                  <span>{exp.period}</span>
                                </Badge>
                              </motion.div>
                              <motion.div
                                className="text-muted-foreground"
                                animate={{ color: expandedCards.includes(index) ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                                transition={{ duration: 0.2 }}
                              >
                                {expandedCards.includes(index) ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </motion.div>
                            </div>
                          </div>

                          {!expandedCards.includes(index) && (
                            <motion.p
                              className="text-muted-foreground text-sm leading-relaxed line-clamp-2"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {exp.description.split('.')[0]}.
                            </motion.p>
                          )}

                          <AnimatePresence>
                            {expandedCards.includes(index) && (
                              <motion.div
                                className="space-y-4 pt-4 border-t"
                                variants={expandedContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <motion.p
                                  className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  {exp.description}
                                </motion.p>

                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.15 }}
                                >
                                  <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                    <span className="mr-2" style={{ color: 'hsl(var(--highlight-achievement))' }}>⭐</span>
                                    <span>Key Highlights</span>
                                  </h4>
                                  <motion.ul
                                    className="space-y-2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                  >
                                    {exp.highlights.map((highlight, idx) => (
                                      <motion.li
                                        key={idx}
                                        className="text-xs sm:text-sm text-muted-foreground flex items-start p-2 rounded-lg"
                                        custom={idx}
                                        variants={highlightItemVariants}
                                        whileHover={{ backgroundColor: "hsl(var(--primary) / 0.05)" }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <span className="mr-2 mt-0.5" style={{ color: 'hsl(var(--highlight-achievement))' }}>⭐</span>
                                        <span>{highlight}</span>
                                      </motion.li>
                                    ))}
                                  </motion.ul>
                                </motion.div>

                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                  <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                    <FaTools className="w-4 h-4 text-primary mr-2" />
                                    <span>Technologies & Skills</span>
                                  </h4>
                                  <motion.div
                                    className="flex flex-wrap gap-1.5 sm:gap-2"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                  >
                                    {exp.skills.map((skill, idx) => (
                                      <motion.div
                                        key={idx}
                                        custom={idx}
                                        variants={badgeItemVariants}
                                        whileHover={{
                                          backgroundColor: "hsl(var(--primary) / 0.2)",
                                          color: "hsl(var(--primary))"
                                        }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <Badge variant="secondary" className="text-xs">
                                          {skill}
                                        </Badge>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-8 sm:space-y-10 mt-12 lg:mt-0"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center mb-6 sm:mb-8" variants={cardVariants}>
                <motion.div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mr-4"
                  style={{ backgroundColor: `hsl(var(--highlight-achievement) / 0.2)` }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'hsl(var(--highlight-achievement))' }} />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold">Achievements</h2>
              </motion.div>

              <motion.div
                className="space-y-3 sm:space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {achievements.awards.map((achievement, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={achievementVariants}
                    whileHover={{
                      boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.1)",
                      y: -2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="portfolio-card">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <motion.div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0 mt-1"
                          whileHover={{ backgroundColor: "hsl(var(--primary) / 0.2)" }}
                          transition={{ duration: 0.2 }}
                        >
                          {achievement.category === "competition" && <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />}
                          {achievement.category === "technical" && <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />}
                          {achievement.category === "leadership" && <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />}
                          {achievement.category === "sports" && <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />}
                        </motion.div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2 gap-2">
                            <h3 className="font-semibold text-xs sm:text-sm leading-tight flex-1">{achievement.title}</h3>
                            <motion.div whileHover={{ backgroundColor: "hsl(var(--primary) / 0.1)" }} transition={{ duration: 0.2 }}>
                              <Badge variant="outline" className="text-[10px] sm:text-xs flex-shrink-0">
                                {achievement.year}
                              </Badge>
                            </motion.div>
                          </div>
                          <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Experience;
