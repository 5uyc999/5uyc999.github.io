import { useState, type ComponentType } from "react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

type ChatbotComponent = ComponentType<{ initiallyOpen?: boolean }>;

const ChatbotLauncher = () => {
  const [Chatbot, setChatbot] = useState<ChatbotComponent | null>(null);
  const [loading, setLoading] = useState(false);

  const openChat = async () => {
    if (loading || Chatbot) return;
    setLoading(true);
    const module = await import("@/components/Chatbot");
    setChatbot(() => module.default);
    setLoading(false);
  };

  if (Chatbot) return <Chatbot initiallyOpen />;

  return (
    <Button
      type="button"
      size="icon"
      onClick={openChat}
      disabled={loading}
      className="fixed bottom-[12rem] md:bottom-[10rem] left-4 md:left-5 z-50 h-11 w-11 md:h-14 md:w-14 rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
      aria-label="فتح المحادثة"
    >
      <Bot className="h-7 w-7" />
    </Button>
  );
};

export default ChatbotLauncher;