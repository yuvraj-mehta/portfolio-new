import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import {
  HiChevronDown,
  HiChevronUp,
  HiAcademicCap,
  HiBookOpen,
  HiUsers,
  HiLocationMarker,
  HiCalendar,
  HiSparkles,
  HiBadgeCheck
} from "react-icons/hi";
import { FaTrophy, FaChartBar, FaRobot } from "react-icons/fa";
import { personalInfo, educationTimeline, certificationsList } from "@/data/portfolioData";
import { motion, AnimatePresence } from "framer-motion";

const Education = () => {
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

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, delay: i * 0.05 }
    })
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-28 pb-8 px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
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
              <HiAcademicCap className="w-4 h-4 mr-2" />
              Academic Journey
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Education of</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Academic foundation and continuous learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <motion.div
              className="lg:col-span-2 space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="flex items-center mb-8" variants={cardVariants}>
                <motion.div
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  <HiAcademicCap className="w-6 h-6 text-primary" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold">Academic Timeline</h2>
              </motion.div>

              <div className="relative">
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block"></div>
                
                <motion.div className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
                  {educationTimeline.map((entry, index) => (
                    <motion.div key={entry.id} className="relative" variants={cardVariants}>
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
                          className="portfolio-card sm:ml-8 cursor-pointer p-4 md:p-6"
                          onClick={() => toggleCard(entry.id)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                            <div className="flex flex-wrap items-center gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge className={entry.status === "Currently Pursuing" ? "bg-green-500/10 text-green-500 border-green-500/20 text-xs" : "bg-secondary text-secondary-foreground text-xs"}>
                                  {entry.status || entry.type}
                                </Badge>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge variant="outline" className="text-xs">
                                  {entry.type}
                                </Badge>
                              </motion.div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge variant="outline" className="text-primary border-primary/40 text-xs whitespace-nowrap flex items-center gap-1">
                                  <HiCalendar className="w-3 h-3" />
                                  {entry.period}
                                </Badge>
                              </motion.div>
                              <motion.div
                                animate={{ color: expandedCards.includes(entry.id) ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))" }}
                                transition={{ duration: 0.2 }}
                              >
                                {expandedCards.includes(entry.id) ? (
                                  <HiChevronUp className="w-4 h-4" />
                                ) : (
                                  <HiChevronDown className="w-4 h-4" />
                                )}
                              </motion.div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h3 className="text-lg sm:text-xl font-bold leading-tight">{entry.institution}</h3>
                            <p className="text-primary font-semibold text-sm sm:text-base mt-1">{entry.degree}</p>
                            <motion.p
                              className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mt-2"
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HiLocationMarker className="w-3 h-3" />
                              {entry.location}
                            </motion.p>
                          </div>

                          {!expandedCards.includes(entry.id) && (
                            <motion.p
                              className="text-muted-foreground text-xs sm:text-sm leading-relaxed"
                              initial={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {entry.description.split('.')[0]}.
                            </motion.p>
                          )}

                          <AnimatePresence>
                            {expandedCards.includes(entry.id) && (
                              <motion.div
                                className="space-y-4 sm:space-y-6 pt-4 border-t"
                                variants={expandedContentVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                              >
                                <motion.p
                                  className="text-muted-foreground text-sm sm:text-base"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  {entry.description}
                                </motion.p>

                                <motion.div
                                  className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.15 }}
                                >
                                  <div>
                                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                      <HiBookOpen className="w-5 h-5 text-primary mr-2" />
                                      Key Courses
                                    </h4>
                                    <motion.ul
                                      className="space-y-1.5 sm:space-y-2"
                                      variants={containerVariants}
                                      initial="hidden"
                                      animate="visible"
                                    >
                                      {entry.keyPoints.courses.map((course, idx) => (
                                        <motion.li
                                          key={idx}
                                          className="text-xs sm:text-sm text-muted-foreground flex items-start"
                                          custom={idx}
                                          variants={listItemVariants}
                                        >
                                          <span className="text-primary mr-2 mt-0.5 flex-shrink-0">•</span>
                                          <span className="break-words">{course}</span>
                                        </motion.li>
                                      ))}
                                    </motion.ul>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                      <FaTrophy className="w-5 h-5 mr-2" style={{ color: 'hsl(39, 100%, 60%)' }} />
                                      Achievements
                                    </h4>
                                    <motion.ul
                                      className="space-y-1.5 sm:space-y-2"
                                      variants={containerVariants}
                                      initial="hidden"
                                      animate="visible"
                                    >
                                      {entry.keyPoints.achievements.map((achievement, idx) => (
                                        <motion.li
                                          key={idx}
                                          className="text-xs sm:text-sm text-muted-foreground flex items-start"
                                          custom={idx}
                                          variants={listItemVariants}
                                        >
                                          <HiSparkles className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                          <span className="break-words">{achievement}</span>
                                        </motion.li>
                                      ))}
                                    </motion.ul>
                                  </div>
                                </motion.div>

                                {entry.keyPoints.activities && (
                                  <motion.div
                                    className="pt-4 border-t border-border"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, delay: 0.25 }}
                                  >
                                    <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                      <HiUsers className="w-5 h-5 text-primary mr-2" />
                                      Activities & Involvement
                                    </h4>
                                    <motion.div
                                      className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4"
                                      variants={containerVariants}
                                      initial="hidden"
                                      animate="visible"
                                    >
                                      {entry.keyPoints.activities.map((activity, idx) => (
                                        <motion.div
                                          key={idx}
                                          className="text-xs sm:text-sm"
                                          custom={idx}
                                          variants={listItemVariants}
                                          whileHover={{ backgroundColor: "hsl(var(--primary) / 0.05)" }}
                                          transition={{ duration: 0.2 }}
                                        >
                                          <span className="font-medium break-words">{activity.role}</span>
                                          <p className="text-muted-foreground mt-1 break-words">{activity.detail}</p>
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  </motion.div>
                                )}
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
              className="space-y-10"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={cardVariants}>
                <motion.div className="flex items-center mb-8" variants={cardVariants}>
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiBadgeCheck className="w-6 h-6 text-primary" />
                  </motion.div>
                  <h2 className="text-xl sm:text-2xl font-bold">Certifications</h2>
                </motion.div>

                <motion.div className="space-y-6" variants={containerVariants} initial="hidden" animate="visible">
                  {certificationsList.map((cert, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      whileHover={{
                        boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.1)",
                        y: -2
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="portfolio-card">
                        <div className="flex items-start gap-3">
                          <motion.div
                            className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1"
                            whileHover={{ scale: 1.15 }}
                            transition={{ duration: 0.2 }}
                          >
                            <cert.badge className="w-4 h-4" style={cert.colorStyle} />
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-sm">{cert.title}</h3>
                              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Badge variant="outline" className="text-xs">
                                  {cert.year}
                                </Badge>
                              </motion.div>
                            </div>
                            <p className="text-xs text-primary font-medium mb-2">Issued by {cert.issuer}</p>
                            <p className="text-xs text-muted-foreground">{cert.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Education;
