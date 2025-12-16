import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Theme = 'cyberpunk' | 'ocean-depth' | 'midnight' | 'cosmic' | 'cosmic-white';

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
    id: 'cyberpunk' as Theme,
    name: 'Cyberpunk',
    color: 'hsl(180, 100%, 50%)',
    description: 'Futuristic hacker aesthetic with neon grids'
  },
  {
    id: 'ocean-depth' as Theme,
    name: 'Ocean Depth',
    color: 'hsl(205, 100%, 45%)',
    description: 'Deep blue ocean with aquatic vibes'
  },
  {
    id: 'midnight' as Theme,
    name: 'Midnight',
    color: 'hsl(0, 0%, 8%)',
    description: 'True dark theme with striking neon accents'
  },
  {
    id: 'cosmic' as Theme,
    name: 'Cosmic',
    color: 'hsl(200, 100%, 50%)',
    description: 'Pitch black universe with stars and nebula'
  },
  {
    id: 'cosmic-white' as Theme,
    name: 'Cosmic White',
    color: 'hsl(45, 100%, 65%)',
    description: 'Black night sky with white moon, stars, and golden accents'
  }
];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('cyberpunk');

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
    document.documentElement.setAttribute('data-theme', theme);
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
