import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { personalInfo, skills } from "@/data/portfolioData";

// React Icons imports
import { 
  FaReact, 
  FaNodeJs, 
  FaJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaPython, 
  FaJava, 
  FaGitAlt, 
  FaDocker,
  FaDatabase
} from "react-icons/fa";
import { 
  SiTypescript, 
  SiTailwindcss, 
  SiNextdotjs, 
  SiRedux, 
  SiVuedotjs, 
  SiMongodb, 
  SiMysql, 
  SiWebpack,
  SiExpress
} from "react-icons/si";
import { 
  TbApi, 
  TbBrandCpp, 
  TbDatabase,
  TbTool,
  TbCode,
  TbWorld,
  TbServer
} from "react-icons/tb";
import { MdWeb, MdStorage, MdCode, MdBuild } from "react-icons/md";
import { VscCode } from "react-icons/vsc";

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Web Development");

  const skillCategories = [
    { name: "Web Development", icon: MdWeb },
    { name: "Database", icon: MdStorage },
    { name: "Languages", icon: MdCode },
    { name: "Tools", icon: MdBuild }
  ];

  // Add icon mapping to skills data
  const iconMap = {
    "React": FaReact,
    "JavaScript": FaJs,
    "TypeScript": SiTypescript,
    "HTML5": FaHtml5,
    "CSS3": FaCss3Alt,
    "Tailwind CSS": SiTailwindcss,
    "Next.js": SiNextdotjs,
    "Redux": SiRedux,
    "Vue": SiVuedotjs,
    "Node.js": FaNodeJs,
    "RESTful APIs": TbApi,
    "Express.js": SiExpress,
    "MongoDB": SiMongodb,
    "SQL": SiMysql,
    "Database Design": TbDatabase,
    "C++": TbBrandCpp,
    "Java": FaJava,
    "Python": FaPython,
    "Git & GitHub": FaGitAlt,
    "VS Code": VscCode,
    "Webpack": SiWebpack,
    "Docker": FaDocker
  };

  const skillsData = skills;

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Frontend": return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "Backend": return "bg-green-500/20 text-green-300 border border-green-500/30";
      case "Database": return "bg-purple-500/20 text-purple-300 border border-purple-500/30";
      case "Languages": return "bg-orange-500/20 text-orange-300 border border-orange-500/30";
      case "Tools": return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30";
      default: return "bg-gray-500/20 text-gray-300 border border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeSwitcher />
      
      <div className="relative pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-glow/10 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <span className="mr-2">🚀</span>
              Technical Expertise
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Skills of</span>{" "}
              <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {personalInfo.tagline} • Modern technologies and tools for scalable applications
            </p>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  variant={activeCategory === category.name ? "default" : "outline"}
                  className={`
                    px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                    ${activeCategory === category.name 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                    }
                  `}
                >
                  <IconComponent className="mr-2 w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>

          {/* Skills Sections */}
          <div className="space-y-16">
            {Object.entries(skillsData[activeCategory] || {}).map(([sectionName, skills]) => (
              <div key={sectionName}>
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">{sectionName}</h3>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {skills.map((skill, index) => {
                    const IconComponent = iconMap[skill.name] || TbCode;
                    return (
                      <Card
                        key={`${sectionName}-${index}`}
                        className="group bg-card/40 backdrop-blur-sm border-border/30 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 hover:scale-105 cursor-pointer"
                      >
                        <div className="p-4">
                          {/* Icon and Name Row */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}>
                              <IconComponent className="w-6 h-6" />
                            </div>
                            <h4 className="font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-300">
                              {skill.name}
                            </h4>
                          </div>

                          {/* Level Badge */}
                          <Badge className={`
                            ${getLevelColor(sectionName)}
                            text-xs font-medium px-2 py-1 rounded-md w-full justify-center
                            transition-all duration-300 group-hover:scale-105
                          `}>
                            {skill.level || sectionName}
                          </Badge>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Skills;
