import { useState } from "react";
import { X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

// Custom Lotus Flower Icon Component
const LotusFlowerIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Center petal */}
    <ellipse
      cx="32"
      cy="28"
      rx="8"
      ry="18"
      fill="currentColor"
      opacity="0.9"
    />
    {/* Left petals */}
    <ellipse
      cx="20"
      cy="32"
      rx="7"
      ry="14"
      fill="currentColor"
      opacity="0.7"
      transform="rotate(-30 20 32)"
    />
    <ellipse
      cx="12"
      cy="38"
      rx="6"
      ry="12"
      fill="currentColor"
      opacity="0.5"
      transform="rotate(-50 12 38)"
    />
    {/* Right petals */}
    <ellipse
      cx="44"
      cy="32"
      rx="7"
      ry="14"
      fill="currentColor"
      opacity="0.7"
      transform="rotate(30 44 32)"
    />
    <ellipse
      cx="52"
      cy="38"
      rx="6"
      ry="12"
      fill="currentColor"
      opacity="0.5"
      transform="rotate(50 52 38)"
    />
    {/* Inner glow/center */}
    <circle cx="32" cy="36" r="4" fill="currentColor" opacity="0.95" />
  </svg>
);

// Mini Lotus for header
const MiniLotus = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <ellipse cx="12" cy="10" rx="3" ry="7" fill="currentColor" opacity="0.9" />
    <ellipse cx="7" cy="12" rx="2.5" ry="5" fill="currentColor" opacity="0.7" transform="rotate(-25 7 12)" />
    <ellipse cx="17" cy="12" rx="2.5" ry="5" fill="currentColor" opacity="0.7" transform="rotate(25 17 12)" />
    <circle cx="12" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

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
      {/* Flower-Shaped Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 flex items-center justify-center transition-all duration-500 group",
          isOpen && "rotate-180"
        )}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {/* Animated petals background */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer glow */}
          <div className="absolute w-20 h-20 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-colors" />
          
          {/* Rotating petals */}
          <div className={cn(
            "absolute transition-transform duration-500",
            isOpen ? "scale-0 rotate-180" : "scale-100 rotate-0 group-hover:rotate-12"
          )}>
            <LotusFlowerIcon className="w-16 h-16 text-primary drop-shadow-lg" />
          </div>
          
          {/* Close icon container */}
          <div className={cn(
            "absolute w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-luxury-lg transition-all duration-500",
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          )}>
            <X className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-14 h-14 bg-primary/30 rounded-full animate-ping" style={{ animationDuration: '2s' }} />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-28 right-6 z-50 w-[340px] sm:w-[380px] bg-background border border-border shadow-luxury-lg transition-all duration-300 origin-bottom-right overflow-hidden",
          isOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"
        )}
      >
        {/* Header with lotus design */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground relative overflow-hidden">
          {/* Decorative background petals */}
          <div className="absolute -right-4 -top-4 opacity-20">
            <LotusFlowerIcon className="w-24 h-24" />
          </div>
          
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-11 h-11 bg-primary-foreground/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <MiniLotus className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-serif text-lg">Forest Essentials</h4>
              <p className="text-xs opacity-80">Ayurvedic Beauty Advisor</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-[280px] overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "max-w-[85%] p-3 text-sm",
                msg.isUser
                  ? "ml-auto bg-primary text-primary-foreground rounded-tl-lg rounded-bl-lg rounded-tr-sm"
                  : "bg-secondary text-secondary-foreground rounded-tr-lg rounded-br-lg rounded-tl-sm"
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
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap rounded-full"
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
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap rounded-full"
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
              className="flex-shrink-0 px-3 py-1.5 text-xs border border-border hover:border-primary hover:text-primary transition-colors whitespace-nowrap rounded-full"
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
              className="flex-1 px-4 py-2.5 border border-border text-sm focus:outline-none focus:border-primary bg-background rounded-full"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="w-10 h-10 bg-primary text-primary-foreground hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center"
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
