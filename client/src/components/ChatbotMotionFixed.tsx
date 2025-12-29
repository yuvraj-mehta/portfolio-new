import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { askPortfolio } from "@/services/ragApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

type Message = { role: "user" | "assistant"; content: string };

export default function ChatbotMotionFixed() {
  const [open, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const STORAGE_KEY = "portfolio_chat_messages";
  const OPEN_KEY = "portfolio_chat_open";
  const hasLoadedRef = useRef<boolean>(false);

  const persistMessages = (next: Message[]): void => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`Storage write failed: ${msg}`);
    }
  };

  const clearChat = () => {
    setMessages(() => {
      const next: Message[] = [];
      persistMessages(next);
      return next;
    });
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  };

  // Hydrate messages
  useEffect(() => {
    try {
      const raw =
        typeof window !== "undefined"
          ? window.localStorage.getItem(STORAGE_KEY)
          : null;
      if (raw) {
        const parsed = JSON.parse(raw) as Message[];
        if (Array.isArray(parsed)) {
          setMessages(parsed);
          requestAnimationFrame(() => {
            if (scrollRef.current)
              scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          });
        }
      }
      hasLoadedRef.current = true;
    } catch {}
  }, []);

  // Note: We persist messages immediately within setMessages calls to avoid
  // any chance of writing stale or empty data during initial mount.

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        try {
          const parsed: Message[] = e.newValue
            ? (JSON.parse(e.newValue) as Message[])
            : [];
          if (Array.isArray(parsed)) {
            setMessages(parsed);
            requestAnimationFrame(() => {
              if (scrollRef.current)
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            });
          }
        } catch {}
      } else if (e.key === OPEN_KEY) {
        setOpen(e.newValue === "true");
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", onStorage);
      return () => window.removeEventListener("storage", onStorage);
    }
  }, []);

  // Removed: Don't auto-open chatbot on page load

  // Persist open state
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(OPEN_KEY, open ? "true" : "false");
      }
    } catch {}
  }, [open]);

  const submit = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setError(null);
    setLoading(true);
    setMessages((m) => {
      const userMsg: Message = { role: "user", content: q };
      const next: Message[] = [...m, userMsg];
      persistMessages(next);
      return next;
    });
    setInput("");
    try {
      const answer = await askPortfolio(q);
      setMessages((m) => {
        const assistantMsg: Message = { role: "assistant", content: answer };
        const next: Message[] = [...m, assistantMsg];
        persistMessages(next);
        return next;
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(msg);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => {
        if (scrollRef.current)
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative w-[360px] sm:w-[420px] max-w-[calc(100vw-1rem)]">
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="origin-bottom-right"
            >
              <Card className="w-full shadow-xl border border-border">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base">Portfolio Q&A</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        Ask about projects, skills, and experience.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Minimize chat"
                        onClick={() => setOpen(false)}
                        className="h-9 w-9 rounded-lg hover:bg-slate-700 hover:scale-110 transition-all duration-200"
                        title="Minimize"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 12H6" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => window.open("/chat", "_blank")}
                        className="gap-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-blue-500/50 hover:scale-105 transition-all duration-200"
                        title="Open chat page"
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
                          <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
                        </svg>
                        Open
                      </Button>
                      <Button
                        size="sm"
                        onClick={clearChat}
                        className="gap-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg hover:shadow-red-500/50 hover:scale-105 transition-all duration-200"
                        title="Clear chat"
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
                          <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                          <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                          <path d="M3 21v-5h5" />
                        </svg>
                        Clear
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Tell me about BookHive",
                        "What are your backend skills?",
                        "Recent GitHub activity?",
                      ].map((s, i) => (
                        <Badge
                          key={i}
                          className="cursor-pointer"
                          variant="secondary"
                          onClick={() => setInput(s)}
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  ) : null}

                  <div
                    ref={scrollRef}
                    className="rounded-md border bg-background"
                  >
                    <ScrollArea className="h-64 p-3">
                      {messages.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Ask anything about my portfolio.
                        </p>
                      ) : (
                        <motion.div
                          className="space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.06 } },
                          }}
                        >
                          {messages.map((m, i) => (
                            <motion.div
                              key={i}
                              className={
                                m.role === "user" ? "text-right" : "text-left"
                              }
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.18 }}
                            >
                              <div
                                className={
                                  m.role === "user"
                                    ? "inline-block max-w-[85%] rounded-2xl bg-primary text-primary-foreground px-3 py-2 shadow-sm"
                                    : "inline-block max-w-[85%] rounded-2xl bg-muted px-3 py-2 shadow-sm"
                                }
                              >
                                <span className="text-sm whitespace-pre-wrap leading-relaxed">
                                  {m.content}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                          {loading ? (
                            <motion.div
                              className="text-left"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <div className="inline-flex items-center gap-2 rounded-2xl bg-muted px-3 py-2">
                                <span className="text-sm text-muted-foreground">
                                  Thinking
                                </span>
                                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/60 animate-bounce" />
                                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:120ms]" />
                                <span className="inline-block h-1 w-1 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:240ms]" />
                              </div>
                            </motion.div>
                          ) : null}
                        </motion.div>
                      )}
                    </ScrollArea>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      placeholder="Type your question…"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          submit();
                        }
                      }}
                      disabled={loading}
                      className="min-h-12 max-h-24 resize-none"
                    />
                    <div className="flex items-center justify-between">
                      <Button
                        onClick={submit}
                        disabled={loading || input.trim().length === 0}
                        className="gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
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
                        {loading ? "Sending…" : "Send"}
                      </Button>
                      {error ? (
                        <span className="text-xs text-destructive">
                          {error}
                        </span>
                      ) : null}
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Press Enter to send, Shift+Enter for newline.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="trigger"
              initial={{ opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="absolute bottom-0 right-0"
            >
              <Button
                className="h-12 w-12 rounded-full shadow-lg grid place-items-center"
                variant="default"
                onClick={() => setOpen(true)}
                aria-label="Open chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8z" />
                </svg>
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
