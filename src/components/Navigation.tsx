import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HiMenuAlt3,
  HiX,
  HiDownload,
  HiCode,
  HiSparkles,
  HiUser,
  HiBriefcase,
  HiAcademicCap,
  HiCog,
  HiTerminal,
  HiFolder,
  HiMail,
  HiHome,
  HiEye
} from "react-icons/hi";
import { personalInfo } from "@/data/portfolioData";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Overview", href: "/", icon: HiEye },
    { name: "About", href: "/about", icon: HiUser },
    { name: "Experience", href: "/experience", icon: HiBriefcase },
    { name: "Education", href: "/education", icon: HiAcademicCap },
    { name: "Skills", href: "/skills", icon: HiCog },
    { name: "Coding", href: "/coding", icon: HiTerminal },
    { name: "Projects", href: "/projects", icon: HiFolder },
    { name: "Contact", href: "/contact", icon: HiMail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Simple Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <Avatar className="h-8 w-8">
              <AvatarImage src={personalInfo.profileImage} alt={personalInfo.name} />
              <AvatarFallback className="bg-primary text-primary-foreground font-bold text-sm">
                <HiCode className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-semibold text-foreground">{personalInfo.name.split(' ')[0]}</span>
          </Link>

          {/* Minimal Clean Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
                {/* Simple underline for active state */}
                {isActive(item.href) && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-foreground"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Simple Resume Button */}
          <div className="hidden lg:flex items-center">
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              asChild
            >
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
                <HiDownload className="w-4 h-4 mr-2" />
                Resume
              </a>
            </Button>
          </div>

          {/* Simple Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <HiX className="h-5 w-5" /> : <HiMenuAlt3 className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-6 pt-4 pb-6 space-y-1 bg-card border-t border-border">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-foreground bg-muted"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
          <div className="px-4 pt-4 border-t border-border mt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              asChild
            >
              <a href={personalInfo.resume} target="_blank" rel="noopener noreferrer">
                <HiDownload className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
