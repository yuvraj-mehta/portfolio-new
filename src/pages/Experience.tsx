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

const Experience = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop&auto=format&q=20"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-glow/5 rounded-full blur-3xl opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Journey
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Experience of</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Leadership roles and technical contributions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Professional Experience with Timeline */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center mr-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Professional Experience</h2>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block"></div>
                
                <div className="space-y-8">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute left-2 top-6 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg hidden sm:block z-10">
                        <div className="absolute inset-1 bg-primary/60 rounded-full"></div>
                      </div>
                      
                      <Card className="portfolio-card slide-up hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 sm:ml-8 cursor-pointer" onClick={() => toggleCard(index)}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge
                                variant={exp.status === "Currently Active" ? "default" : "secondary"}
                                className={`text-xs ${exp.status === "Currently Active" ? "bg-green-500/10 text-green-500 border-green-500/20" : ""}`}
                              >
                                {exp.status || exp.type}
                              </Badge>
                              <Badge variant="outline" className="text-xs">{exp.type}</Badge>
                            </div>

                            <h3 className="text-lg sm:text-xl font-bold leading-tight">{exp.title}</h3>
                            <p className="text-primary font-semibold text-sm sm:text-base">{exp.company}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mt-1">
                              <span>📍</span>
                              <span>{exp.location}</span>
                            </p>
                          </div>

                          <div className="mt-2 sm:mt-0 flex items-center gap-2">
                            <Badge variant="outline" className="text-primary border-primary/40 text-xs hover:bg-primary/10 transition-colors duration-200">
                              <span className="mr-1">📅</span>
                              <span>{exp.period}</span>
                            </Badge>
                            <div className="text-muted-foreground hover:text-primary transition-colors">
                              {expandedCards.includes(index) ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Compact description when collapsed */}
                        {!expandedCards.includes(index) && (
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {exp.description.split('.')[0]}.
                          </p>
                        )}

                        {/* Expanded content */}
                        {expandedCards.includes(index) && (
                          <div className="space-y-4 animate-in slide-in-from-top-4 duration-300">
                            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{exp.description}</p>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                <span className="text-yellow-500 mr-2">⭐</span>
                                <span>Key Highlights</span>
                              </h4>
                              <ul className="space-y-2">
                                {exp.highlights.map((highlight, idx) => (
                                  <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start p-2 rounded-lg hover:bg-primary/5 transition-colors duration-200">
                                    <span className="text-yellow-500 mr-2 mt-0.5">⭐</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                <FaTools className="w-4 h-4 text-primary mr-2" />
                                <span>Technologies & Skills</span>
                              </h4>
                              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                {exp.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs hover:bg-primary/20 hover:text-primary transition-colors duration-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Achievements Sidebar */}
            <div className="space-y-8 sm:space-y-10 mt-12 lg:mt-0">
              <div className="flex items-center mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center mr-4">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold">Achievements</h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {achievements.awards.map((achievement, index) => (
                  <Card key={index} className="portfolio-card slide-up hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 transition-all duration-300">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 flex items-center justify-center flex-shrink-0 mt-1 hover:bg-primary/20 transition-colors duration-200">
                        {achievement.category === "competition" && <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />}
                        {achievement.category === "technical" && <Code2 className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />}
                        {achievement.category === "leadership" && <Users className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />}
                        {achievement.category === "sports" && <Medal className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <h3 className="font-semibold text-xs sm:text-sm leading-tight flex-1">{achievement.title}</h3>
                          <Badge variant="outline" className="text-[10px] sm:text-xs flex-shrink-0 hover:bg-primary/10 transition-colors duration-200">
                            {achievement.year}
                          </Badge>
                        </div>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed">{achievement.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Experience;
