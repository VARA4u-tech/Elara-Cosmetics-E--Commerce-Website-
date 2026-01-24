import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! Welcome to Forest Essentials. How can I help you today?", isUser: false }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;
    
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setMessage("");
    
    // Simulated response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you for your message! Our team will get back to you shortly. In the meantime, feel free to explore our luxurious Ayurvedic products.", 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-luxury-lg transition-all duration-300 hover:scale-110",
          isOpen && "rotate-90"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] bg-background border border-border shadow-luxury-lg transition-all duration-300 origin-bottom-right",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        )}
      >
        {/* Header */}
        <div className="bg-primary p-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-lg">Forest Essentials</h4>
              <p className="text-xs opacity-80">Ayurvedic Beauty Advisor</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[300px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[85%] p-3 text-sm",
                msg.isUser
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button 
              onClick={() => {
                setMessages(prev => [...prev, { text: "Track my order", isUser: true }]);
                setTimeout(() => {
                  setMessages(prev => [...prev, { 
                    text: "To track your order, please visit your Account page or use our Track Order feature. Would you like me to direct you there?", 
                    isUser: false 
                  }]);
                }, 1000);
              }}
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              Track Order
            </button>
            <button 
              onClick={() => {
                setMessages(prev => [...prev, { text: "Find a store", isUser: true }]);
                setTimeout(() => {
                  setMessages(prev => [...prev, { 
                    text: "We have stores across India! Visit our Store Locator page to find the nearest Forest Essentials boutique near you.", 
                    isUser: false 
                  }]);
                }, 1000);
              }}
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              Store Locator
            </button>
            <button 
              onClick={() => {
                setMessages(prev => [...prev, { text: "Product recommendations", isUser: true }]);
                setTimeout(() => {
                  setMessages(prev => [...prev, { 
                    text: "I'd love to help you find the perfect products! What's your skin concern - anti-aging, hydration, brightening, or acne?", 
                    isUser: false 
                  }]);
                }, 1000);
              }}
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap"
            >
              Get Recommendations
            </button>
          </div>
        </div>

        {/* Input */}
        <div className="p-4 border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2.5 border border-border text-sm focus:outline-none focus:border-primary bg-background"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="px-4 py-2.5 bg-primary text-primary-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotWidget;
