import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { askPortfolio } from "@/services/ragApi";
import { motion } from "framer-motion";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  "Tell me about your BookHive project and tech stack",
  "What's your competitive programming journey and LeetCode rating?",
  "What robotics projects have you built at NIT Patna?",
  "What's your experience with the MERN stack?",
  "What roles are you looking for and what domains interest you?",
];

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const STORAGE_KEY = "portfolio_chat_messages";

  // Load messages from localStorage on mount
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setMessages(JSON.parse(raw));
      }
    } catch {}
  }, []);

  // Save messages to localStorage
  const persistMessages = (msgs: Message[]) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch {}
  };

  const sendMessage = async (text?: string) => {
    const query = (text || input).trim();
    if (!query || loading) return;

    setError(null);
    setLoading(true);

    const userMsg: Message = { role: "user", content: query };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    persistMessages(newMessages);
    setInput("");

    try {
      const answer = await askPortfolio(query);
      const assistantMsg: Message = { role: "assistant", content: answer };
      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      persistMessages(finalMessages);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  // Simple markdown renderer for bold text and paragraphs
  const renderMarkdown = (text: string) => {
    // Split by double newlines for paragraphs
    const paragraphs = text.split(/\n\n+/);

    return paragraphs.map((paragraph, pIndex) => {
      const parts: (string | JSX.Element)[] = [];
      let lastIndex = 0;
      const boldRegex = /\*\*([^*]+)\*\*/g;
      let match;
      const matches: { index: number; end: number; text: string }[] = [];

      while ((match = boldRegex.exec(paragraph)) !== null) {
        matches.push({
          index: match.index,
          end: match.index + match[0].length,
          text: match[1],
        });
      }

      matches.forEach((m, idx) => {
        parts.push(paragraph.substring(lastIndex, m.index));
        parts.push(
          <strong key={`bold-${idx}`} className="font-semibold">
            {m.text}
          </strong>
        );
        lastIndex = m.end;
      });
      parts.push(paragraph.substring(lastIndex));

      return (
        <p key={pIndex} className={pIndex > 0 ? "mt-3" : ""}>
          {parts}
        </p>
      );
    });
  };

  const clearChat = () => {
    setMessages([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <Navigation />
      <div className="absolute top-20 right-4 z-40 hidden sm:block">
        <ThemeSwitcher />
      </div>

      <main className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 border-r border-white/5 bg-black/20 overflow-y-auto pt-20 flex flex-col">
          <div className="p-4 space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-semibold">
                  YM
                </div>
                <h2 className="text-sm font-semibold text-white">
                  Portfolio Chat
                </h2>
              </div>
              <Button
                onClick={clearChat}
                variant="outline"
                size="sm"
                className="w-full h-8 border-white/10 bg-white/5 hover:bg-white/10"
              >
                New chat
              </Button>
            </div>

            {/* Prompts */}
            <div className="space-y-2">
              {quickPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => setInput(p)}
                  className="w-full text-left text-sm text-white/60 hover:text-white px-3 py-2 rounded transition-colors hover:bg-white/5"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden pt-20">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-6 py-8 space-y-6">
              {messages.length === 0 ? (
                <p className="text-sm text-white/50">
                  Ask anything about my portfolio.
                </p>
              ) : (
                messages.map((m, i) => (
                  <motion.div
                    key={i}
                    className={
                      m.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div
                      className={
                        m.role === "user"
                          ? "max-w-[80%] rounded-3xl bg-white text-black px-5 py-3"
                          : "max-w-[85%] rounded-3xl bg-white/10 text-white px-5 py-3"
                      }
                    >
                      <div className="text-sm leading-relaxed">
                        {m.role === "assistant"
                          ? renderMarkdown(m.content)
                          : m.content}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
              {loading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-flex items-center gap-2 rounded-3xl bg-white/10 px-5 py-3 text-sm text-white/60">
                    <span>Thinking</span>
                    <span className="inline-block h-1 w-1 rounded-full bg-white/60 animate-bounce" />
                    <span className="inline-block h-1 w-1 rounded-full bg-white/60 animate-bounce [animation-delay:120ms]" />
                    <span className="inline-block h-1 w-1 rounded-full bg-white/60 animate-bounce [animation-delay:240ms]" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-white/5 bg-black/10 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl px-6 py-6">
              <div className="relative">
                <Textarea
                  placeholder="Ask anything…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  disabled={loading}
                  className="min-h-[56px] max-h-32 resize-none rounded-3xl border border-white/10 bg-white/5 text-white placeholder:text-white/40 pr-14 py-4 px-5 focus:border-white/20 focus:bg-white/10 transition-colors"
                />
                <Button
                  onClick={() => sendMessage()}
                  disabled={loading || !input.trim()}
                  size="icon"
                  className="absolute right-2 bottom-2 h-10 w-10 rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-50 disabled:bg-white/50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                  </svg>
                </Button>
              </div>
              {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
