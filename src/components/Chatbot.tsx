import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type Msg = { role: "user" | "assistant"; content: string };

interface ChatbotProps {
  initiallyOpen?: boolean;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const Chatbot = ({ initiallyOpen = false }: ChatbotProps) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin") || location.pathname === "/reset-password";
  const [open, setOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "مرحباً! أنا مساعد مؤسسة لمس. كيف يمكنني مساعدتك؟ 😊" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("فشل الاتصال");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && prev.length > newMessages.length) {
                  return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: assistantSoFar } : m));
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", content: "عذراً، حدث خطأ. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة على 0503689200" }]);
    }
    setLoading(false);
  };

  if (isAdmin) return null;

  return (
    <>
      {/* Toggle button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-[12rem] md:bottom-[10rem] left-4 md:left-5 z-50 w-11 h-11 md:w-14 md:h-14 rounded-full bg-[#2563eb] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
          aria-label="فتح المحادثة"
        >
          <Bot className="h-7 w-7" />
        </button>
      )}

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 left-6 z-50 w-[350px] max-w-[calc(100vw-3rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: "500px", maxHeight: "calc(100vh - 8rem)" }}>
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <p className="font-bold text-sm">مساعد لمس</p>
                <p className="text-xs opacity-80">متاح الآن للمساعدة</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="hover:bg-white/10 rounded-full p-1"><X className="h-5 w-5" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" dir="rtl">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none [&>p]:mb-1 [&>p:last-child]:mb-0">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : msg.content}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border shrink-0">
            <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex gap-2" dir="rtl">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="اكتب رسالتك..."
                className="flex-1 bg-muted rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
                disabled={loading}
              />
              <button type="submit" disabled={!input.trim() || loading} className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 disabled:opacity-50 hover:bg-primary/90 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
