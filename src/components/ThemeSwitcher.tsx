import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { HiX, HiSparkles, HiSun, HiMoon } from 'react-icons/hi';
import { HiComputerDesktop, HiBolt } from 'react-icons/hi2';
import { FaPalette } from 'react-icons/fa';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  const currentTheme = themes.find(t => t.id === theme);

  return (
    <>
      {/* Enhanced Theme Toggle Button */}
      <div className="fixed top-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          variant="outline"
          size="sm"
          className="glass border-border/50 hover:bg-primary/10 group bg-gradient-to-r from-primary/5 to-primary-glow/5 hover:scale-105 transition-all duration-300 shadow-sm"
        >
          <HiComputerDesktop className="w-4 h-4 mr-2 text-primary group-hover:text-primary-glow transition-colors duration-300" />
          <span>Themes</span>
        </Button>
      </div>

      {/* Theme Selector Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="portfolio-card max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary-glow/20 flex items-center justify-center">
                  <FaPalette className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Choose Your Vibe</h2>
                  <p className="text-sm text-muted-foreground">Select a theme that matches your style</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
              >
                <HiX className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {themes.map((themeOption) => (
                <div
                  key={themeOption.id}
                  onClick={() => {
                    setTheme(themeOption.id);
                    setIsOpen(false);
                  }}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    theme === themeOption.id
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {theme === themeOption.id && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      Active
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: themeOption.color }}
                    />
                    <div>
                      <h3 className="font-semibold">{themeOption.name}</h3>
                      <p className="text-xs text-muted-foreground">{themeOption.description}</p>
                    </div>
                  </div>

                  {/* Theme Preview */}
                  <div className="space-y-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        background: `linear-gradient(135deg, ${themeOption.color}, ${themeOption.color}99)` 
                      }}
                    />
                    <div className="flex gap-1">
                      <div 
                        className="flex-1 h-1 rounded"
                        style={{ backgroundColor: `${themeOption.color}66` }}
                      />
                      <div 
                        className="flex-1 h-1 rounded"
                        style={{ backgroundColor: `${themeOption.color}33` }}
                      />
                      <div 
                        className="flex-1 h-1 rounded"
                        style={{ backgroundColor: `${themeOption.color}66` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium">Current Theme:</span>
                <Badge variant="outline">{currentTheme?.name}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Your theme preference is automatically saved and will be remembered for your next visit.
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default ThemeSwitcher;
