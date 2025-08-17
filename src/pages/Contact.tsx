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
  HiStar
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaInstagram, FaFileAlt, FaRocket } from "react-icons/fa";
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
import { personalInfo, socialLinks, quickLinks } from "@/data/portfolioData";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters")
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission - replace with actual email service
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For now, just show success message
      console.log('Form data:', data);
      setSubmitStatus('success');
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      reset();
    } catch (error) {
      setSubmitStatus('error');
      toast.error('Failed to send message. Please try again or contact me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Using centralized data
  const contactMethods = [
    {
      icon: HiMail,
      label: "Email",
      value: personalInfo.email,
      href: socialLinks.email.url,
      preferred: true,
      responseTime: "Within 24 hours"
    },
    {
      icon: HiPhone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      preferred: false,
      responseTime: "For urgent matters"
    },
    {
      icon: HiLocationMarker,
      label: "Location",
      value: personalInfo.location,
      href: null,
      preferred: false,
      responseTime: "Available for meetings"
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      value: socialLinks.linkedin.username,
      href: socialLinks.linkedin.url,
      preferred: true,
      responseTime: "Within 12 hours"
    }
  ];

  const socialMediaLinks = [
    {
      name: "GitHub",
      icon: FaGithub,
      href: socialLinks.github.url,
      description: "Check out my code",
      color: "text-gray-400",
      bgColor: "from-gray-500/20 to-gray-600/20",
      borderColor: "border-gray-500/30"
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: socialLinks.linkedin.url,
      description: "Let's connect professionally",
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-blue-600/20",
      borderColor: "border-blue-500/30"
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: socialLinks.instagram.url,
      description: "Follow for updates",
      color: "text-pink-400",
      bgColor: "from-pink-500/20 to-purple-500/20",
      borderColor: "border-pink-500/30"
    },
    {
      name: "Email",
      icon: HiMail,
      href: socialLinks.email.url,
      description: "Send me a message",
      color: "text-red-400",
      bgColor: "from-red-500/20 to-orange-500/20",
      borderColor: "border-red-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <span className="mr-2">💬</span>
              Let's Connect
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Get in Touch with</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Let's discuss your next project or opportunity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="portfolio-card slide-up hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 !p-4">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <HiMail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">Contact Information</h3>
                </div>

                {/* Enhanced Contact Methods */}
                <div className="space-y-3">
                  {contactMethods.map((method, index) => (
                    <div key={index} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 transition-all duration-300">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        method.preferred ? 'bg-primary/20 group-hover:bg-primary/30' : 'bg-primary/10 group-hover:bg-primary/20'
                      }`}>
                        <method.icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors">{method.label}</h4>
                          {method.preferred && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs flex-shrink-0">
                              <HiStar className="w-3 h-3 mr-1" />
                              Preferred
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-xs sm:text-sm break-words">{method.value}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <HiClock className="w-3 h-3 flex-shrink-0" />
                          <span className="break-words">{method.responseTime}</span>
                        </div>
                      </div>
                      {method.href && (
                        <a
                          href={method.href}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-300 text-primary hover:text-primary-glow"
                        >
                          <HiPaperAirplane className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-4 p-3 bg-gradient-to-r from-primary/5 to-primary-glow/5 rounded-xl border border-primary/10">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">24h</div>
                      <div className="text-xs text-muted-foreground">Response Time</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{personalInfo.status.availability}</div>
                      <div className="text-xs text-muted-foreground">Current Status</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Links & Social Combined */}
              <Card className="portfolio-card slide-up !p-4">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <HiLink className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Quick Links</h3>
                </div>

                <div className="space-y-2 mb-6">
                  {quickLinks.map((link, index) => {
                    const getIcon = () => {
                      switch(link.name) {
                        case "Resume": return <FaFileAlt className="w-4 h-4" />;
                        case "LeetCode": return <SiLeetcode className="w-4 h-4" />;
                        case "GeeksforGeeks": return <SiGeeksforgeeks className="w-4 h-4" />;
                        case "CodeChef": return <SiCodechef className="w-4 h-4" />;
                        case "Projects": return <FaRocket className="w-4 h-4" />;
                        default: return <HiLink className="w-4 h-4" />;
                      }
                    };

                    return (
                      <a
                        key={index}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : "_self"}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : ""}
                        className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                          {getIcon()}
                        </div>
                        <span className="group-hover:text-primary transition-colors font-medium">{link.name}</span>
                      </a>
                    );
                  })}
                </div>

              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="portfolio-card slide-up">
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <HiPaperAirplane className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">
                    Send Me a <span className="gradient-text">Message</span>
                  </h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        * Name
                      </Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Your name"
                        className={`bg-muted/50 border-border focus:border-primary ${
                          errors.name ? 'border-destructive focus:border-destructive' : ''
                        }`}
                      />
                      {errors.name && (
                        <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        * Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="your.email@example.com"
                        className={`bg-muted/50 border-border focus:border-primary ${
                          errors.email ? 'border-destructive focus:border-destructive' : ''
                        }`}
                      />
                      {errors.email && (
                        <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-sm font-medium">
                      * Subject
                    </Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder="What is this regarding?"
                      className={`bg-muted/50 border-border focus:border-primary ${
                        errors.subject ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    />
                    {errors.subject && (
                      <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      * Message
                    </Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder="Your message here..."
                      rows={6}
                      className={`bg-muted/50 border-border focus:border-primary resize-none ${
                        errors.message ? 'border-destructive focus:border-destructive' : ''
                      }`}
                    />
                    {errors.message && (
                      <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-hero w-full"
                  >
                    {isSubmitting ? (
                      <>
                        <HiRefresh className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <HiPaperAirplane className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {submitStatus === 'success' && (
                    <div className="flex items-center justify-center text-green-600 text-sm">
                      <HiCheckCircle className="w-4 h-4 mr-2" />
                      Message sent successfully!
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center justify-center text-destructive text-sm">
                      <HiExclamationCircle className="w-4 h-4 mr-2" />
                      Failed to send message. Please try again.
                    </div>
                  )}
                </form>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/20">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center mt-0.5">
                      <HiChatAlt className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-foreground font-medium mb-1">
                        Response Guarantee
                      </p>
                      <p className="text-sm text-muted-foreground">
                        I typically respond within <strong>24 hours</strong>. For urgent matters,
                        reach out via <strong>email</strong> or <strong>LinkedIn</strong> for faster response.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Links - Horizontal Card */}
              <Card className="portfolio-card slide-up mt-8 !p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <HiUsers className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Connect With Me</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialMediaLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-border/50 hover:border-primary/30"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300 mr-4 flex-shrink-0">
                        <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium group-hover:text-primary transition-colors">{link.name}</div>
                        <div className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors">{link.description}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
