import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiPaperAirplane,
  HiRefresh,
  HiCheckCircle,
  HiExclamationCircle,
  HiClock,
  HiChatAlt,
  HiStar,
} from "react-icons/hi";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFileAlt,
  FaRocket,
} from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from "react-icons/si";
import { HiLink, HiUsers } from "react-icons/hi";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  personalInfo,
  socialLinks,
  socialMediaLinks,
  quickLinks,
  contactMethods,
} from "@/data";
import { motion, AnimatePresence } from "framer-motion";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form data:", data);
      setSubmitStatus("success");
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (error) {
      setSubmitStatus("error");
      toast.error(
        "Failed to send message. Please try again or contact me directly."
      );
    } finally {
      setIsSubmitting(false);
    }
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
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

  const contactMethodVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.05 },
    }),
  };

  const socialLinkVariants = {
    whileHover: {
      backgroundColor: "hsl(var(--primary) / 0.1)",
      scale: 1.05,
      boxShadow: "0 10px 25px -5px hsl(var(--primary) / 0.1)",
      transition: { duration: 0.3 },
    },
  };

  const formInputVariants = {
    focus: {
      borderColor: "hsl(var(--primary))",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />

      <div className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>

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
              <span className="mr-2">💬</span>
              Let's Connect
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Get in Touch with</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Let's discuss your next project or
              opportunity
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Contact Information */}
            <motion.div
              className="lg:col-span-1 space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="portfolio-card !p-4">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiMail className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">
                        Contact Information
                      </h3>
                    </div>

                    <motion.div
                      className="space-y-3"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {contactMethods.map((method, index) => (
                        <motion.div
                          key={index}
                          className="group flex items-center gap-3 p-2 rounded-lg"
                          custom={index}
                          variants={contactMethodVariants}
                          whileHover={{
                            backgroundColor: "hsl(var(--primary) / 0.05)",
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              method.preferred
                                ? "bg-primary/20"
                                : "bg-primary/10"
                            }`}
                            whileHover={{
                              backgroundColor: method.preferred
                                ? "hsl(var(--primary) / 0.3)"
                                : "hsl(var(--primary) / 0.2)",
                              scale: 1.1,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <method.icon className="w-4 h-4 text-primary" />
                          </motion.div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <motion.h4
                                className="text-sm sm:text-base font-semibold"
                                whileHover={{ color: "hsl(var(--primary))" }}
                                transition={{ duration: 0.2 }}
                              >
                                {method.label}
                              </motion.h4>
                              {method.preferred && (
                                <motion.div
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs flex-shrink-0">
                                    <HiStar className="w-3 h-3 mr-1" />
                                    Preferred
                                  </Badge>
                                </motion.div>
                              )}
                            </div>
                            <p className="text-muted-foreground text-xs sm:text-sm break-words">
                              {method.value}
                            </p>
                            <motion.div
                              className="flex items-center gap-1 text-xs text-muted-foreground mt-1"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HiClock className="w-3 h-3 flex-shrink-0" />
                              <span className="break-words">
                                {method.responseTime}
                              </span>
                            </motion.div>
                          </div>
                          {method.href && (
                            <motion.a
                              href={method.href}
                              className="text-primary hover:text-primary-glow"
                              initial={{ opacity: 0 }}
                              whileHover={{ opacity: 1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <HiPaperAirplane className="w-4 h-4" />
                            </motion.a>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-xl border border-primary/10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-lg font-bold text-primary">
                            24h
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Response Time
                          </div>
                        </motion.div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="text-lg font-bold text-primary">
                            {personalInfo.status.availability}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Current Status
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Quick Links & Social Combined */}
              <motion.div variants={cardVariants}>
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="portfolio-card !p-4">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiLink className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold">
                        Quick Links
                      </h3>
                    </div>

                    <motion.div
                      className="space-y-2 mb-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {quickLinks.map((link, index) => {
                        const getIcon = () => {
                          switch (link.name) {
                            case "Resume":
                              return <FaFileAlt className="w-4 h-4" />;
                            case "LeetCode":
                              return <SiLeetcode className="w-4 h-4" />;
                            case "GeeksforGeeks":
                              return <SiGeeksforgeeks className="w-4 h-4" />;
                            case "CodeChef":
                              return <SiCodechef className="w-4 h-4" />;
                            case "Projects":
                              return <FaRocket className="w-4 h-4" />;
                            default:
                              return <HiLink className="w-4 h-4" />;
                          }
                        };

                        return (
                          <motion.a
                            key={index}
                            href={link.href}
                            target={
                              link.href.startsWith("http") ? "_blank" : "_self"
                            }
                            rel={
                              link.href.startsWith("http")
                                ? "noopener noreferrer"
                                : ""
                            }
                            className="group flex items-center space-x-3 p-2 rounded-xl text-sm"
                            custom={index}
                            variants={contactMethodVariants}
                            whileHover={{
                              backgroundColor: "hsl(var(--primary) / 0.1)",
                              scale: 1.05,
                              boxShadow:
                                "0 10px 15px -3px hsl(var(--primary) / 0.1)",
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
                              whileHover={{
                                backgroundColor: "hsl(var(--primary))",
                                color: "hsl(var(--primary-foreground))",
                                scale: 1.2,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {getIcon()}
                            </motion.div>
                            <motion.span
                              className="font-medium"
                              whileHover={{ color: "hsl(var(--primary))" }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.name}
                            </motion.span>
                          </motion.a>
                        );
                      })}
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div className="lg:col-span-2" variants={cardVariants}>
              <motion.div
                whileHover={{
                  boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.1)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className="portfolio-card">
                  <div className="flex items-center mb-8">
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HiPaperAirplane className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl sm:text-3xl font-bold">
                      Send Me a <span className="gradient-text">Message</span>
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 gap-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div className="space-y-2" variants={cardVariants}>
                        <Label htmlFor="name" className="text-sm font-medium">
                          * Name
                        </Label>
                        <Input
                          id="name"
                          {...register("name")}
                          placeholder="Your name"
                          className={`bg-muted/50 border-border focus:border-primary ${
                            errors.name
                              ? "border-destructive focus:border-destructive"
                              : ""
                          }`}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              className="text-sm text-destructive mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <motion.div className="space-y-2" variants={cardVariants}>
                        <Label htmlFor="email" className="text-sm font-medium">
                          * Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          {...register("email")}
                          placeholder="your.email@example.com"
                          className={`bg-muted/50 border-border focus:border-primary ${
                            errors.email
                              ? "border-destructive focus:border-destructive"
                              : ""
                          }`}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              className="text-sm text-destructive mt-1"
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ duration: 0.2 }}
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>

                    <motion.div className="space-y-2" variants={cardVariants}>
                      <Label htmlFor="subject" className="text-sm font-medium">
                        * Subject
                      </Label>
                      <Input
                        id="subject"
                        {...register("subject")}
                        placeholder="What is this regarding?"
                        className={`bg-muted/50 border-border focus:border-primary ${
                          errors.subject
                            ? "border-destructive focus:border-destructive"
                            : ""
                        }`}
                      />
                      <AnimatePresence>
                        {errors.subject && (
                          <motion.p
                            className="text-sm text-destructive mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.subject.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div className="space-y-2" variants={cardVariants}>
                      <Label htmlFor="message" className="text-sm font-medium">
                        * Message
                      </Label>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Your message here..."
                        rows={6}
                        className={`bg-muted/50 border-border focus:border-primary resize-none ${
                          errors.message
                            ? "border-destructive focus:border-destructive"
                            : ""
                        }`}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            className="text-sm text-destructive mt-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-hero w-full"
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="inline-block"
                            >
                              <HiRefresh className="w-5 h-5 mr-2" />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <HiPaperAirplane className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>

                    <AnimatePresence>
                      {submitStatus === "success" && (
                        <motion.div
                          className="flex items-center justify-center text-sm"
                          style={{ color: "hsl(var(--skill-database))" }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.5 }}
                          >
                            <HiCheckCircle className="w-4 h-4 mr-2" />
                          </motion.div>
                          Message sent successfully!
                        </motion.div>
                      )}

                      {submitStatus === "error" && (
                        <motion.div
                          className="flex items-center justify-center text-destructive text-sm"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <HiExclamationCircle className="w-4 h-4 mr-2" />
                          Failed to send message. Please try again.
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  <motion.div
                    className="mt-6 p-4 rounded-xl border"
                    style={{
                      backgroundColor: `hsl(var(--skill-database) / 0.1)`,
                      borderColor: `hsl(var(--skill-database) / 0.2)`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    whileHover={{
                      boxShadow:
                        "0 10px 20px -5px hsl(var(--skill-database) / 0.1)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                        style={{
                          backgroundColor: `hsl(var(--skill-database) / 0.2)`,
                        }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiChatAlt
                          className="w-4 h-4"
                          style={{ color: "hsl(var(--skill-database))" }}
                        />
                      </motion.div>
                      <div>
                        <p className="text-sm text-foreground font-medium mb-1">
                          Response Guarantee
                        </p>
                        <p className="text-sm text-muted-foreground">
                          I typically respond within <strong>24 hours</strong>.
                          For urgent matters, reach out via{" "}
                          <strong>email</strong> or <strong>LinkedIn</strong>{" "}
                          for faster response.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>

              {/* Social Links - Horizontal Card */}
              <motion.div variants={cardVariants} className="mt-8">
                <motion.div
                  whileHover={{
                    boxShadow: "0 20px 25px -5px hsl(var(--primary) / 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="portfolio-card !p-6">
                    <div className="flex items-center mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <HiUsers className="w-6 h-6 text-primary" />
                      </motion.div>
                      <h3 className="text-2xl font-bold">Connect With Me</h3>
                    </div>

                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {socialMediaLinks.map((link, index) => (
                        <motion.a
                          key={index}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center p-4 rounded-xl border border-border/50"
                          variants={socialLinkVariants}
                          whileHover="whileHover"
                          custom={index}
                        >
                          <motion.div
                            className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0"
                            whileHover={{
                              backgroundColor: "hsl(var(--primary))",
                              color: "hsl(var(--primary-foreground))",
                              scale: 1.2,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.2 }}
                            >
                              <link.icon className="w-6 h-6" />
                            </motion.div>
                          </motion.div>
                          <div className="flex-1">
                            <motion.div
                              className="font-medium"
                              whileHover={{ color: "hsl(var(--primary))" }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.name}
                            </motion.div>
                            <motion.div
                              className="text-sm text-muted-foreground"
                              whileHover={{
                                color: "hsl(var(--primary) / 0.7))",
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {link.description}
                            </motion.div>
                          </div>
                        </motion.a>
                      ))}
                    </motion.div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
