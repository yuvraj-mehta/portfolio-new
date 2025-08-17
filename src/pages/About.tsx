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
  HiSparkles
} from "react-icons/hi";
import { FaGithub, FaLinkedin, FaTrophy, FaRobot, FaRunning, FaPuzzlePiece, FaBullseye } from "react-icons/fa";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { personalInfo, socialLinks, achievements, interests, aboutPageData } from "@/data/portfolioData";

const About = () => {
  const navigate = useNavigate();

  // Use centralized interests data with actual icon components
  const pageInterests = [
    { icon: FaRobot, name: "Robotics", description: "Building combat & soccer bots", color: "text-blue-500" },
    { icon: FaRunning, name: "Athletics", description: "Bronze in 50m Hurdles", color: "text-green-500" },
    { icon: FaPuzzlePiece, name: "Problem Solving", description: "Competitive programming", color: "text-purple-500" },
    { icon: FaBullseye, name: "Mentoring", description: "Leading workshops", color: "text-red-500" },
  ];

  // Using centralized achievement stats
  const achievementStats = aboutPageData.achievementStats;

  const handleContactClick = () => {
    navigate('/contact');
  };

  const handleResumeDownload = () => {
    // Open resume in new tab
    window.open(personalInfo.resume, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-28 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/8"></div>
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1920&h=1080&fit=crop&auto=format&q=20"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl animate-pulse opacity-40 animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <HiHand className="w-4 h-4 mr-2" />
              Personal Background
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Get to Know</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline}
            </p>
          </div>

          {/* Enhanced Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
            {/* Profile Card - Better balanced */}
            <div className="lg:col-span-5">
              <Card className="portfolio-card group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={personalInfo.profileImage}
                    alt={`${personalInfo.name} - ${personalInfo.title}`}
                    className="w-full aspect-square object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-2 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      <FaTrophy className="w-3 h-3" />
                      <span>{achievements.leetcode.percentile}</span>
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold mb-1">{personalInfo.name}</h2>
                    <p className="text-sm text-muted-foreground">{personalInfo.title} & {personalInfo.course} Student</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="w-4 h-4 text-primary" />
                      <span>{personalInfo.university}, {personalInfo.location.split(',')[1]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiCalendar className="w-4 h-4 text-primary" />
                      <span>Computer Science Student</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <HiCode className="w-4 h-4 text-primary" />
                      <span>2+ Years Experience</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={handleContactClick}>
                      <HiMail className="w-4 h-4 mr-2" />
                      Contact
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={handleResumeDownload}>
                      <HiDownload className="w-4 h-4 mr-2" />
                      Resume
                    </Button>
                  </div>

                  <div className="flex gap-3 pt-2 border-t">
                    <a
                      href={socialLinks.github.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      GitHub
                    </a>
                    <a
                      href={socialLinks.linkedin.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                    <a
                      href={socialLinks.leetcode.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <HiExternalLink className="w-4 h-4" />
                      LeetCode
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* Bio & Story - Better balanced */}
            <div className="lg:col-span-7">
              <Card className="portfolio-card h-full">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <HiSparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold">My Journey</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p className="text-muted-foreground">
                      {personalInfo.bio.intro}
                    </p>

                    <p className="text-muted-foreground">
                      {personalInfo.bio.robotics}
                    </p>

                    <p className="text-muted-foreground">
                      {personalInfo.bio.interests}
                    </p>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-3 text-sm">What Drives Me</h4>
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {pageInterests.map((interest, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors">
                          <interest.icon className={`w-4 h-4 ${interest.color} mt-0.5`} />
                          <div>
                            <div className="font-medium text-xs">{interest.name}</div>
                            <div className="text-xs text-muted-foreground">{interest.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats Row - Moved below What Drives Me */}
                    <div className="pt-4 border-t">
                      <h4 className="font-semibold mb-3 text-sm">Achievements</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {achievementStats.map((achievement, index) => (
                          <div key={index} className="text-center p-3 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors group">
                            <div className={`text-lg font-bold ${achievement.color} group-hover:scale-110 transition-transform duration-300`}>
                              {achievement.value}
                            </div>
                            <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors duration-200">
                              {achievement.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
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

export default About;
