import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  HiDownload,
  HiMail,
  HiExternalLink,
  HiCode,
  HiLocationMarker,
  HiCalendar,
  HiHand,
  HiSparkles,
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTrophy } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import {
  personalInfo,
  socialLinks,
  achievements,
  pageInterests,
  aboutPageData,
} from "@/data";
import { motion } from "framer-motion";

const About = () => {
  const navigate = useNavigate();

  const achievementStats = aboutPageData.achievementStats;

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleResumeDownload = () => {
    window.open(personalInfo.resume, "_blank");
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.1 },
    },
    whileHover: { scale: 1.05 },
  };

  const backgroundVariants = {
    animate: {
      y: [0, -10, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const backgroundVariants2 = {
    animate: {
      y: [0, 10, 0],
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const interestItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };

  const profileImageVariants = {
    whileHover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  const socialLinkVariants = {
    whileHover: {
      color: "hsl(var(--primary))",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />

      <div className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/8"></div>
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1920&h=1080&fit=crop&auto=format&q=20"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60"
          variants={backgroundVariants}
          animate="animate"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl opacity-40"
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
              <HiHand className="w-4 h-4 mr-2" />
              Personal Background
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Get to Know</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="lg:col-span-5" variants={cardVariants}>
              <motion.div
                whileHover={{
                  boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.05)",
                  y: -4,
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="portfolio-card h-full">
                  <motion.div className="relative overflow-hidden rounded-xl mb-4">
                    <motion.img
                      src={personalInfo.profileImage}
                      alt={`${personalInfo.name} - ${personalInfo.title}`}
                      className="w-full aspect-square object-cover rounded-xl"
                      variants={profileImageVariants}
                      whileHover="whileHover"
                    />

                    <motion.div
                      className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm flex items-center gap-1"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaTrophy className="w-3 h-3" />
                      <span>{achievements.leetcode.percentile}</span>
                    </motion.div>

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold mb-1">
                        {personalInfo.name}
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        {personalInfo.title} & {personalInfo.course} Student
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiLocationMarker className="w-4 h-4 text-primary" />
                        <span>
                          {personalInfo.university},{" "}
                          {personalInfo.location.split(",")[1]}
                        </span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiCalendar className="w-4 h-4 text-primary" />
                        <span>Computer Science Student</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center gap-2"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <HiCode className="w-4 h-4 text-primary" />
                        <span>2+ Years Experience</span>
                      </motion.div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          size="sm"
                          className="w-full"
                          onClick={handleContactClick}
                        >
                          <HiMail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </motion.div>
                      <motion.div
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={handleResumeDownload}
                        >
                          <HiDownload className="w-4 h-4 mr-2" />
                          Resume
                        </Button>
                      </motion.div>
                    </div>

                    <div className="flex gap-3 pt-2 border-t">
                      <motion.a
                        href={socialLinks.github.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variants={socialLinkVariants}
                        whileHover="whileHover"
                      >
                        <FaGithub className="w-4 h-4" />
                        GitHub
                      </motion.a>
                      <motion.a
                        href={socialLinks.linkedin.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variants={socialLinkVariants}
                        whileHover="whileHover"
                      >
                        <FaLinkedin className="w-4 h-4" />
                        LinkedIn
                      </motion.a>
                      <motion.a
                        href={socialLinks.leetcode.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-muted-foreground"
                        variants={socialLinkVariants}
                        whileHover="whileHover"
                      >
                        <HiExternalLink className="w-4 h-4" />
                        LeetCode
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div className="lg:col-span-7" variants={cardVariants}>
              <motion.div
                whileHover={{
                  boxShadow: "0 25px 50px -12px hsl(var(--primary) / 0.05)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="portfolio-card h-full">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <HiSparkles className="w-5 h-5 text-primary" />
                      <h3 className="text-lg font-bold">My Journey</h3>
                    </div>

                    <div className="space-y-3 text-sm leading-relaxed">
                      <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                      >
                        {personalInfo.bio.intro}
                      </motion.p>

                      <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                      >
                        {personalInfo.bio.robotics}
                      </motion.p>

                      <motion.p
                        className="text-muted-foreground"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                      >
                        {personalInfo.bio.interests}
                      </motion.p>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-sm">
                        What Drives Me
                      </h4>
                      <motion.div
                        className="grid grid-cols-2 gap-3 mb-6"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {pageInterests.map((interest, index) => (
                          <motion.div
                            key={index}
                            className="flex items-start gap-2 p-2 rounded-lg"
                            custom={index}
                            variants={interestItemVariants}
                            whileHover={{
                              backgroundColor: "hsl(var(--primary) / 0.05)",
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <interest.icon
                              className={`w-4 h-4 ${interest.color} mt-0.5`}
                            />
                            <div>
                              <div className="font-medium text-xs">
                                {interest.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {interest.description}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>

                      <div className="pt-4 border-t">
                        <h4 className="font-semibold mb-3 text-sm">
                          Achievements
                        </h4>
                        <motion.div
                          className="grid grid-cols-2 gap-3"
                          variants={containerVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          {achievementStats.map((achievement, index) => (
                            <motion.div
                              key={index}
                              className="text-center p-3 rounded-lg bg-primary/5"
                              custom={index}
                              variants={statItemVariants}
                              whileHover={{
                                backgroundColor: "hsl(var(--primary) / 0.1)",
                                scale: 1.05,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                className={`text-lg font-bold ${achievement.color}`}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.15 }}
                                transition={{ duration: 0.2 }}
                              >
                                {achievement.value}
                              </motion.div>
                              <motion.div
                                className="text-xs text-muted-foreground"
                                initial={{
                                  color: "hsl(var(--muted-foreground))",
                                }}
                                whileHover={{ color: "hsl(var(--primary))" }}
                                transition={{ duration: 0.2 }}
                              >
                                {achievement.label}
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
