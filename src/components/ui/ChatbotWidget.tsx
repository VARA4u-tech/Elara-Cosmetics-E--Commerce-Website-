import { useState, useRef, useEffect } from "react";
import { X, Send, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioManager } from "@/context/AudioContext";

const AUDIO_ID_COLLAPSED = "chatbot-video-collapsed";
const AUDIO_ID_EXPANDED = "chatbot-video-expanded";

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

const HIDE_VIDEO_AD_KEY = "elara_hide_video_ad";

// Floating Video Ad Component
const FloatingVideoAd = () => {
  const collapsedVideoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isHidden, setIsHidden] = useState(() => {
    return localStorage.getItem(HIDE_VIDEO_AD_KEY) === "true";
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const { registerAudio, unregisterAudio, requestAudioPlay, muteAll } = useAudioManager();

  // Register videos with audio manager
  useEffect(() => {
    if (isHidden) return;

    const collapsedVideo = collapsedVideoRef.current;
    const expandedVideo = expandedVideoRef.current;

    if (collapsedVideo) {
      registerAudio(AUDIO_ID_COLLAPSED, collapsedVideo);
      collapsedVideo.muted = true;
    }
    if (expandedVideo) {
      registerAudio(AUDIO_ID_EXPANDED, expandedVideo);
      expandedVideo.muted = true;
    }

    return () => {
      unregisterAudio(AUDIO_ID_COLLAPSED);
      unregisterAudio(AUDIO_ID_EXPANDED);
    };
  }, [isHidden, registerAudio, unregisterAudio]);

  const handleDontShowAgain = () => {
    localStorage.setItem(HIDE_VIDEO_AD_KEY, "true");
    setIsHidden(true);
    clearAutoCloseTimer();
    muteAll();
  };

  // Don't render if user opted out
  if (isHidden) {
    return null;
  }

  // Auto-close timer: minimize after 30 seconds
  const startAutoCloseTimer = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
    }
    autoCloseTimerRef.current = setTimeout(() => {
      handleCollapse();
    }, 30000); // 30 seconds
  };

  const clearAutoCloseTimer = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };

  const handleExpand = () => {
    setIsExpanded(true);
    startAutoCloseTimer();
    
    // Pause collapsed video
    if (collapsedVideoRef.current) {
      collapsedVideoRef.current.pause();
    }
    
    // Play expanded video (muted by default, user must click to unmute)
    setTimeout(() => {
      if (expandedVideoRef.current) {
        expandedVideoRef.current.muted = true;
        expandedVideoRef.current.currentTime = 0;
        expandedVideoRef.current.play();
        setIsPlaying(true);
        setIsMuted(true);
      }
    }, 100);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
    setIsMuted(true);
    clearAutoCloseTimer();
    muteAll();
    
    // Stop expanded video
    if (expandedVideoRef.current) {
      expandedVideoRef.current.pause();
      expandedVideoRef.current.muted = true;
    }
    
    // Resume collapsed video (always muted)
    setTimeout(() => {
      if (collapsedVideoRef.current) {
        collapsedVideoRef.current.muted = true;
        collapsedVideoRef.current.play();
      }
    }, 100);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isMuted) {
      // Request exclusive audio playback through centralized manager
      requestAudioPlay(AUDIO_ID_EXPANDED);
      setIsMuted(false);
    } else {
      // Mute this video
      if (expandedVideoRef.current) {
        expandedVideoRef.current.muted = true;
      }
      setIsMuted(true);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (expandedVideoRef.current) {
      if (isPlaying) {
        expandedVideoRef.current.pause();
      } else {
        expandedVideoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-500 ease-out",
        isExpanded
          ? "bottom-6 right-6 sm:bottom-8 sm:right-8"
          : "bottom-28 right-6 sm:bottom-32 sm:right-6"
      )}
    >
      {/* Collapsed Circular View */}
      <div
        onClick={handleExpand}
        className={cn(
          "cursor-pointer transition-all duration-500 ease-out overflow-hidden",
          isExpanded
            ? "w-0 h-0 opacity-0 scale-0"
            : "w-16 h-16 sm:w-20 sm:h-20 opacity-100 scale-100 rounded-full shadow-luxury-lg hover:scale-110"
        )}
      >
        <div className="relative w-full h-full">
          <video
            ref={collapsedVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover rounded-full"
          >
            <source src="/videos/elara-luxury-ad.mp4" type="video/mp4" />
          </video>
          
          {/* Play indicator overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 rounded-full">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/90 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground ml-0.5" />
            </div>
          </div>
          
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30" style={{ animationDuration: '2s' }} />
        </div>
      </div>

      {/* Expanded Card View */}
      <div
        className={cn(
          "bg-foreground rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-out origin-bottom-right",
          isExpanded
            ? "w-[300px] sm:w-[340px] md:w-[380px] opacity-100 scale-100"
            : "w-0 opacity-0 scale-0"
        )}
      >
        {/* Video Container */}
        <div className="relative aspect-[3/4] bg-foreground">
          <video
            ref={expandedVideoRef}
            loop
            playsInline
            muted
            className="w-full h-full object-cover"
          >
            <source src="/videos/elara-luxury-ad.mp4" type="video/mp4" />
          </video>
          
          {/* Close button - top right */}
          <button
            onClick={handleCollapse}
            className="absolute top-4 right-4 w-10 h-10 bg-background rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg"
            aria-label="Close video"
          >
            <X className="w-5 h-5 text-foreground" />
          </button>
          
          {/* Bottom Controls */}
          <div className="absolute bottom-6 left-4 right-4 flex items-center justify-between">
            {/* Play/Pause and Mute buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg"
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-foreground" />
                ) : (
                  <Play className="w-5 h-5 text-foreground ml-0.5" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="w-12 h-12 bg-background rounded-full flex items-center justify-center hover:bg-secondary transition-colors shadow-lg"
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-foreground" />
                ) : (
                  <Volume2 className="w-5 h-5 text-foreground" />
                )}
              </button>
            </div>
            
            {/* Brand tag */}
            <div className="bg-primary px-5 py-2 rounded-full shadow-lg">
              <span className="text-sm font-medium text-primary-foreground uppercase tracking-wider">
                Elara
              </span>
            </div>
          </div>
        </div>
        
        {/* CTA Footer */}
        <div className="p-4 bg-primary space-y-3">
          <a
            href="/category/face"
            className="block w-full text-center py-3 bg-primary-foreground/10 text-primary-foreground text-sm font-medium uppercase tracking-wider hover:bg-primary-foreground/20 transition-colors rounded-lg"
          >
            Shop Now
          </a>
          
          {/* Don't show again option */}
          <button
            onClick={handleDontShowAgain}
            className="w-full text-center text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors underline"
          >
            Don't show this again
          </button>
        </div>
      </div>
    </div>
  );
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! Welcome to Elara Cosmetics. How can I help you today?", isUser: false }
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
      {/* Floating Video Ad */}
      <FloatingVideoAd />
      
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
              <h4 className="font-serif text-lg">Elara Cosmetics</h4>
              <p className="text-xs opacity-80">Beauty Advisor</p>
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
                    text: "We have stores across India! Visit our Store Locator page to find the nearest Elara Cosmetics boutique near you.", 
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
