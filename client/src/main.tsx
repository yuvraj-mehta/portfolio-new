import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloadPortfolioData } from './services/portfolioApi'

// Initiate pre-fetch immediately as JS bundle executes
preloadPortfolioData();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
