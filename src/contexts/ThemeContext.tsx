import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'purple' | 'cyberpunk' | 'glassmorphism' | 'glass-dream' | 'ocean-depth';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: Array<{
    id: Theme;
    name: string;
    color: string;
    description: string;
  }>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Revolutionary theme system with unique visual identities
export const themes = [
  {
    id: 'purple' as Theme,
    name: 'Purple Dream',
    color: 'hsl(262, 80%, 65%)',
    description: 'Classic elegant portfolio'
  },
  {
    id: 'cyberpunk' as Theme,
    name: 'Cyberpunk',
    color: 'hsl(180, 100%, 50%)',
    description: 'Futuristic hacker aesthetic with neon grids'
  },
  {
    id: 'glassmorphism' as Theme,
    name: 'Glass Morphism',
    color: 'hsl(220, 100%, 70%)',
    description: 'Frosted glass with blur effects'
  },
  {
    id: 'glass-dream' as Theme,
    name: 'Purple Glass Dream',
    color: 'hsl(262, 80%, 65%)',
    description: 'Elegant purple with dreamy glass effects'
  },
  {
    id: 'ocean-depth' as Theme,
    name: 'Ocean Depth',
    color: 'hsl(205, 100%, 45%)',
    description: 'Deep blue ocean with aquatic vibes'
  }
];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('purple');

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme;
    if (savedTheme && themes.find(t => t.id === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    
    // Remove all theme classes
    document.documentElement.removeAttribute('data-theme');
    
    // Apply new theme
    if (theme !== 'purple') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    themes
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
