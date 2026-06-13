import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import ChatbotMotionFixed from "./components/ChatbotMotionFixed";

const Overview = React.lazy(() => import("./pages/Overview"));
const About = React.lazy(() => import("./pages/About"));
const Experience = React.lazy(() => import("./pages/Experience"));
const Education = React.lazy(() => import("./pages/Education"));
const Skills = React.lazy(() => import("./pages/Skills"));
const Coding = React.lazy(() => import("./pages/Coding"));
const Projects = React.lazy(() => import("./pages/Projects"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const Chat = React.lazy(() => import("./pages/Chat"));

const queryClient = new QueryClient();

// Simple loading fallback
const PageLoader = () => null;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PortfolioProvider>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/about" element={<About />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/education" element={<Education />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/coding" element={<Coding />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/chat" element={<Chat />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            {/* Floating portfolio Q&A chat */}
            <ChatbotMotionFixed />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </PortfolioProvider>
  </QueryClientProvider>
);

export default App;

