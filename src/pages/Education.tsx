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
import { FaTrophy, FaGlobe, FaChartBar, FaRobot } from "react-icons/fa";
import { personalInfo } from "@/data/portfolioData";

const Education = () => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);

  const toggleCard = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const educationEntries = [
    {
      id: 0,
      status: "Currently Pursuing",
      type: "Bachelor of Technology",
      period: "2023 - 2027",
      institution: "National Institute of Technology, Patna",
      degree: "B.Tech in Computer Science and Engineering",
      location: "Patna, Bihar",
      description: "Pursuing comprehensive computer science education with focus on algorithms, data structures, and modern software development practices. Active participant in technical clubs and research projects.",
      keyPoints: {
        courses: ["Data Structures & Algorithms", "Database Management Systems", "Operating Systems", "Computer Networks"],
        achievements: ["Maintaining CGPA of 7.69/10", "Merit List Recognition", "Technical Workshop Facilitation", "Competitive Programming Participant"],
        activities: [
          { role: "Class Representative", detail: "CSE Department" },
          { role: "Competitive Programming Participant", detail: "Multiple Contests" },
          { role: "Robotics Club Member", detail: "Building Combat & Soccer Bots" },
          { role: "MUN 2023", detail: "Best Delegate Award" }
        ]
      }
    },
    {
      id: 1,
      type: "Higher Secondary",
      period: "2021 - 2022",
      institution: "Pragya Bharti Public School, Gaya",
      degree: "Class XII (CBSE)",
      location: "Gaya, Bihar",
      description: "Completed higher secondary education with focus on science and mathematics subjects.",
      keyPoints: {
        courses: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
        achievements: ["Scored 88.8% in CBSE Class 12", "School Merit List", "Perfect Attendance", "Academic Excellence Award"]
      }
    },
    {
      id: 2,
      type: "Secondary",
      period: "2019 - 2020",
      institution: "Pragya Bharti Public School, Gaya",
      degree: "Class X (CBSE)",
      location: "Gaya, Bihar",
      description: "Completed secondary education with strong foundation in core subjects.",
      keyPoints: {
        courses: ["Science", "Mathematics", "Social Studies", "English", "Hindi"],
        achievements: ["Scored 90% in CBSE Class 10", "Academic Excellence Award"]
      }
    }
  ];

  const certifications = [
    {
      title: "Web Development Bootcamp",
      issuer: "Udemy",
      year: "2023",
      description: "Comprehensive full-stack web development course covering HTML, CSS, JavaScript, React, and Node.js",
      badge: FaGlobe,
      color: "text-blue-500"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="pt-28 pb-8 px-4 sm:px-6 md:px-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <HiAcademicCap className="w-4 h-4 mr-2" />
              Academic Journey
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Education of</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Academic foundation and continuous learning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Academic Timeline with Expandable Cards */}
            <div className="lg:col-span-2 space-y-10">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                  <HiAcademicCap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold">Academic Timeline</h2>
              </div>

              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary/60 via-primary/30 to-transparent hidden sm:block"></div>
                
                <div className="space-y-8">
                  {educationEntries.map((entry, index) => (
                    <div key={entry.id} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute left-2 top-6 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg hidden sm:block z-10">
                        <div className="absolute inset-1 bg-primary/60 rounded-full"></div>
                      </div>
                      
                      <Card className="portfolio-card slide-up hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 sm:ml-8 cursor-pointer p-4 md:p-6" onClick={() => toggleCard(entry.id)}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge className={entry.status === "Currently Pursuing" ? "bg-green-500/10 text-green-500 border-green-500/20 text-xs" : "bg-secondary text-secondary-foreground text-xs"}>
                              {entry.status || entry.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">{entry.type}</Badge>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-2 flex-shrink-0">
                            <Badge variant="outline" className="text-primary border-primary/40 text-xs whitespace-nowrap flex items-center gap-1">
                              <HiCalendar className="w-3 h-3" />
                              {entry.period}
                            </Badge>
                            <div className="text-muted-foreground hover:text-primary transition-colors">
                              {expandedCards.includes(entry.id) ? (
                                <HiChevronUp className="w-4 h-4" />
                              ) : (
                                <HiChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="text-lg sm:text-xl font-bold leading-tight">{entry.institution}</h3>
                          <p className="text-primary font-semibold text-sm sm:text-base mt-1">{entry.degree}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-2 mt-2">
                            <HiLocationMarker className="w-3 h-3" />
                            {entry.location}
                          </p>
                        </div>

                        {/* Compact description when collapsed */}
                        {!expandedCards.includes(entry.id) && (
                          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                            {entry.description.split('.')[0]}.
                          </p>
                        )}

                        {/* Expanded content */}
                        {expandedCards.includes(entry.id) && (
                          <div className="space-y-4 sm:space-y-6 animate-in slide-in-from-top-4 duration-300">
                            <p className="text-muted-foreground text-sm sm:text-base">{entry.description}</p>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                              <div>
                                <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                  <HiBookOpen className="w-5 h-5 text-primary mr-2" />
                                  Key Courses
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2">
                                  {entry.keyPoints.courses.map((course, idx) => (
                                    <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start">
                                      <span className="text-primary mr-2 mt-0.5 flex-shrink-0">•</span>
                                      <span className="break-words">{course}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                  <FaTrophy className="w-5 h-5 text-yellow-500 mr-2" />
                                  Achievements
                                </h4>
                                <ul className="space-y-1.5 sm:space-y-2">
                                  {entry.keyPoints.achievements.map((achievement, idx) => (
                                    <li key={idx} className="text-xs sm:text-sm text-muted-foreground flex items-start">
                                      <HiSparkles className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span className="break-words">{achievement}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Activities section only for current education */}
                            {entry.keyPoints.activities && (
                              <div className="pt-4 border-t border-border">
                                <h4 className="font-semibold mb-3 flex items-center text-sm sm:text-base">
                                  <HiUsers className="w-5 h-5 text-primary mr-2" />
                                  Activities & Involvement
                                </h4>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                                  {entry.keyPoints.activities.map((activity, idx) => (
                                    <div key={idx} className="text-xs sm:text-sm">
                                      <span className="font-medium break-words">{activity.role}</span>
                                      <p className="text-muted-foreground mt-1 break-words">{activity.detail}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications & Learning Stats */}
            <div className="space-y-10">
              {/* Certifications */}
              <div>
                <div className="flex items-center mb-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mr-4">
                    <HiBadgeCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold">Certifications</h2>
                </div>

                <div className="space-y-6">
                  {certifications.map((cert, index) => (
                    <Card key={index} className="portfolio-card slide-up hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <cert.badge className={`w-4 h-4 ${cert.color}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-sm">{cert.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {cert.year}
                            </Badge>
                          </div>
                          <p className="text-xs text-primary font-medium mb-2">Issued by {cert.issuer}</p>
                          <p className="text-xs text-muted-foreground">{cert.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Education;
