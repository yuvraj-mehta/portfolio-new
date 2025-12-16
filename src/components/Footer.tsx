import {
  Github,
  Linkedin,
  Mail,
  Twitter,
  MapPin,
  Zap,
  Heart,
  Calendar,
  Edit,
  FileText
} from "lucide-react";
import { FaStar, FaMagic, FaLaptopCode } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks, SiCodechef } from "react-icons/si";
import { Link } from "react-router-dom";
import { footerData, socialLinks } from "@/data/portfolioData";

const Footer = () => {
  return (
    <footer className="text-foreground mt-20" style={{ backgroundColor: 'hsl(var(--card))' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-8 py-6 sm:py-12">

        {/* Mobile-First: Simplified Brand Section */}
        <div className="text-center mb-6 sm:hidden">
          <h3 className="text-xl font-bold text-foreground mb-3">{footerData.brand.name}</h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {footerData.brand.title} specializing in modern web technologies
          </p>

          {/* Essential Social Links Only */}
          <div className="flex justify-center gap-3 mb-6">
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: `hsl(var(--primary) / 0.2)`,
                color: 'hsl(var(--muted-foreground))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.3)`;
                e.currentTarget.style.color = `hsl(var(--foreground))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.2)`;
                e.currentTarget.style.color = `hsl(var(--muted-foreground))`;
              }}
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: `hsl(var(--primary) / 0.2)`,
                color: 'hsl(var(--muted-foreground))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.3)`;
                e.currentTarget.style.color = `hsl(var(--foreground))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.2)`;
                e.currentTarget.style.color = `hsl(var(--muted-foreground))`;
              }}
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href={socialLinks.email.url}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: `hsl(var(--primary) / 0.2)`,
                color: 'hsl(var(--muted-foreground))',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.3)`;
                e.currentTarget.style.color = `hsl(var(--foreground))`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `hsl(var(--primary) / 0.2)`;
                e.currentTarget.style.color = `hsl(var(--muted-foreground))`;
              }}
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Compact Contact */}
          <div className="text-sm text-muted-foreground mb-6">
            <div className="flex items-center justify-center mb-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{footerData.contact.location}</span>
            </div>
          </div>

          {/* Essential Links Only */}
          <div className="flex justify-center gap-4 mb-6 text-sm">
            <a
              href={footerData.sections.quickLinks[0].href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume
            </a>
            <Link to="/projects" className="text-muted-foreground hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>

        {/* Tablet: Simplified Content */}
        <div className="hidden sm:block md:hidden">
          <div className="grid grid-cols-2 gap-8 mb-10">
            {/* Brand Section - Simplified */}
            <div className="space-y-5">
              <h3 className="text-xl font-bold text-foreground">{footerData.brand.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {footerData.brand.title} specializing in modern web technologies
              </p>
              <div className="flex gap-3">
                <a
                  href={socialLinks.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.email.url}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Essential Links Only */}
            <div className="space-y-5">
              <h4 className="text-foreground font-semibold text-lg">Quick Links</h4>
              <div className="space-y-4 text-sm">
                <a
                  href={footerData.sections.quickLinks[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FileText className="w-4 h-4 mr-3" />
                  Resume
                </a>
                <Link
                  to="/projects"
                  className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Zap className="w-4 h-4 mr-3" />
                  Projects
                </Link>
                <Link to="/about" className="block text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Simplified Stats for Tablet */}
          <div className="grid grid-cols-2 gap-8 py-8 border-t border-border border-b border-border mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <FaStar className="w-5 h-5" style={{ color: `hsl(var(--primary))` }} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium ml-2">Total Visitors</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{footerData.stats.totalVisitors}</div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <FaLaptopCode className="w-5 h-5" style={{ color: `hsl(var(--accent))` }} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium ml-2">DSA Skills</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-5 h-5" style={{ color: `hsl(var(--accent))` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Full Content */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-8 mb-8 lg:mb-12">

            {/* Brand Section */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-5">{footerData.brand.name}</h3>
              <p className="text-muted-foreground text-sm sm:text-base mb-5 sm:mb-6 leading-relaxed">
                {footerData.brand.description}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={socialLinks.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.twitter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="https://dribbble.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Edit className="w-4 h-4" />
                </a>
                <a
                  href={socialLinks.email.url}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                  style={{ backgroundColor: `hsl(var(--primary) / 0.2)` }}
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 sm:mb-5 text-base sm:text-lg">Contact</h4>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{footerData.contact.location}</span>
                </div>
                <div className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{footerData.contact.emailDisplay}</span>
                </div>
              </div>
            </div>

            {/* Quick Links Section */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 sm:mb-5 text-base sm:text-lg">Quick Links</h4>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                {footerData.sections.quickLinks.map((link, index) => {
                  const IconComponent = link.icon === 'FileText' ? FileText :
                    link.icon === 'SiLeetcode' ? SiLeetcode :
                    link.icon === 'SiGeeksforgeeks' ? SiGeeksforgeeks :
                    link.icon === 'SiCodechef' ? SiCodechef :
                    Zap;

                  return link.external ? (
                    <a
                      key={index}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={index}
                      to={link.href}
                      className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation Section */}
            <div>
              <h4 className="text-foreground font-semibold mb-4 sm:mb-5 text-base sm:text-lg">Navigation</h4>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                {footerData.sections.navigation.map((navItem, index) => (
                  <Link
                    key={index}
                    to={navItem.href}
                    className="block text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {navItem.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section - Desktop only */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 py-6 lg:py-8 border-t border-border border-b border-border">
            <div className="text-center py-2 lg:py-3">
              <div className="flex items-center justify-center mb-3 lg:mb-4">
                <FaStar className="w-4 h-4 lg:w-5 lg:h-5 mr-2" style={{ color: `hsl(var(--primary))` }} />
                <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider font-medium">Total Visitors</span>
              </div>
              <div className="text-xl lg:text-2xl font-bold text-foreground">{footerData.stats.totalVisitors}</div>
            </div>

            <div className="text-center py-2 lg:py-3">
              <div className="flex items-center justify-center mb-3 lg:mb-4">
                <FaMagic className="w-4 h-4 lg:w-5 lg:h-5 mr-2" style={{ color: `hsl(var(--primary))` }} />
                <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider font-medium">Last Updated</span>
              </div>
              <div className="text-lg lg:text-2xl font-bold text-foreground">{footerData.stats.lastUpdated}</div>
            </div>

            <div className="text-center py-2 lg:py-3">
              <div className="flex items-center justify-center mb-3 lg:mb-4">
                <FaLaptopCode className="w-4 h-4 lg:w-5 lg:h-5 mr-2" style={{ color: `hsl(var(--accent))` }} />
                <span className="text-xs lg:text-sm text-muted-foreground uppercase tracking-wider font-medium">DSA Skills</span>
              </div>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-4 h-4 lg:w-5 lg:h-5" style={{ color: `hsl(var(--accent))` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Simple Mobile Stats */}
        <div className="sm:hidden border-t border-border py-4 mb-4">
          <div className="flex justify-center gap-6 text-center">
            <div>
              <div className="text-lg font-bold text-foreground">{footerData.stats.totalProblems}</div>
              <div className="text-xs text-muted-foreground">Problems</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{footerData.stats.totalProjects}</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{footerData.stats.yearsExperience}</div>
              <div className="text-xs text-muted-foreground">Years</div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-4 md:pt-8 text-center">
          <p className="text-muted-foreground text-sm mb-1">
            © {footerData.copyright.year} {footerData.copyright.owner}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs flex items-center justify-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3" style={{ color: 'hsl(var(--destructive))' }} />
            <span>using {footerData.copyright.tech}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
