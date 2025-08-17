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

const Projects = () => {
  const [filter, setFilter] = useState("Featured");
  const [animatedCounts, setAnimatedCounts] = useState({
    totalProjects: 0,
    technologies: 0,
    liveProjects: 0
  });

  // Animated counter hook
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-24 pb-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Enhanced Background Elements with Workspace Stock Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/8"></div>
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?w=1920&h=1080&fit=crop&auto=format&q=20"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl animate-pulse opacity-40 animation-delay-2000"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Compact Header Section */}
          <div className="text-center mb-8 fade-in">
            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
              Featured <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">Projects</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Explore my latest work in web development and innovative solutions
            </p>
          </div>

          {/* Enhanced Project Filters */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            {filters.map((filterName) => (
              <Button
                key={filterName}
                onClick={() => setFilter(filterName)}
                variant={filter === filterName ? "default" : "outline"}
                className={`${
                  filter === filterName
                    ? "bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground shadow-lg"
                    : "border-primary/30 text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5"
                } hover:scale-105 hover:shadow-lg transition-all duration-300 text-sm px-4 py-2.5 rounded-full font-medium backdrop-blur-sm`}
              >
                {filterName}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/10 flex items-center justify-center shadow-lg">
                {filter === "All Projects" && <HiCode className="w-6 h-6 text-primary" />}
                {filter === "Featured" && <HiStar className="w-6 h-6 text-primary" />}
                {filter === "Frontend" && <FaPalette className="w-6 h-6 text-primary" />}
                {filter === "AI & ML" && <FaRobot className="w-6 h-6 text-primary" />}
                {filter === "Full Stack" && <FaLink className="w-6 h-6 text-primary" />}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">{filter}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {filteredProjects.map((project, index) => (
                <Card key={index} className="group relative overflow-hidden bg-gradient-to-br from-card via-card to-card/90 border border-border/50 shadow-lg hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 hover:scale-[1.02] transition-all duration-500">
                  {/* Enhanced Background Pattern */}
                  <div className="absolute inset-0 opacity-3">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-full blur-2xl"></div>
                  </div>

                  <div className="relative p-6">
                    <div className="relative overflow-hidden rounded-lg mb-4">
                      {project.featured && (
                        <Badge className="absolute top-3 left-3 z-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg text-xs hover:scale-105 transition-transform duration-200">
                          <HiStar className="w-3 h-3 mr-1" />
                          <span>Featured</span>
                        </Badge>
                      )}
                      <Badge className={`absolute top-3 right-3 z-20 shadow-lg text-xs hover:scale-105 transition-transform duration-200 ${
                        project.status === "Live" ? "bg-gradient-to-r from-green-500 to-green-600" :
                        project.status === "In Progress" ? "bg-gradient-to-r from-yellow-500 to-yellow-600" :
                        "bg-gradient-to-r from-blue-500 to-blue-600"
                      } text-white`}>
                        {project.status === "Live" && <HiGlobeAlt className="w-3 h-3 mr-1" />}
                        {project.status === "In Progress" && <FaClock className="w-3 h-3 mr-1" />}
                        {project.status === "Completed" && <HiCheckCircle className="w-3 h-3 mr-1" />}
                        <span>{project.status}</span>
                      </Badge>

                      {/* Interactive Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex items-center justify-center gap-3">
                        {project.demo && (
                          <Button
                            size="sm"
                            className="bg-primary/90 hover:bg-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <HiExternalLink className="w-4 h-4 mr-1" />
                              Demo
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 shadow-lg transform hover:scale-105 transition-all duration-200"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="w-4 h-4 mr-1" />
                            Code
                          </a>
                        </Button>
                      </div>

                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                        <p className="text-muted-foreground leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 6).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs hover:bg-primary/20 hover:text-primary transition-all duration-200 bg-primary/5 border border-primary/20 hover:scale-105">
                            {tag}
                          </Badge>
                        ))}
                        {project.tags.length > 6 && (
                          <Badge variant="outline" className="text-xs border-primary/30 hover:border-primary/50 transition-colors">
                            +{project.tags.length - 6}
                          </Badge>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                          asChild
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <FaGithub className="w-4 h-4 mr-2" />
                            Source
                          </a>
                        </Button>
                        {project.demo && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60 hover:scale-105 transition-all duration-300"
                            asChild
                          >
                            <a href={project.demo} target="_blank" rel="noopener noreferrer">
                              <HiExternalLink className="w-4 h-4 mr-2" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* GitHub CTA Section */}
          <div className="text-center mt-20">
            <div className="mb-4">
              <a href={socialLinks.github.url} target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold rounded-full hover:scale-105 transition-all duration-300 shadow-lg">
                  View More Projects on GitHub
                  <FaGithub className="w-5 h-5 ml-2" />
                </Button>
              </a>
            </div>
            <p className="text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Discover additional projects and open-source contributions on my GitHub profile
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Projects;
