import { useState, useRef, useEffect } from "react";
import { X, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAudioManager } from "@/context/AudioContext";

const AUDIO_ID_COLLAPSED = "chatbot-video-collapsed";
const AUDIO_ID_EXPANDED = "chatbot-video-expanded";

const FloatingVideoAd = () => {
  const collapsedVideoRef = useRef<HTMLVideoElement>(null);
  const expandedVideoRef = useRef<HTMLVideoElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  // Removed "Don't Show Again" logic as requested
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const { registerAudio, unregisterAudio, requestAudioPlay, muteAll } =
    useAudioManager();

  // Register videos with audio manager
  useEffect(() => {
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
  }, [registerAudio, unregisterAudio]);

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
          ? "bottom-28 right-6 sm:bottom-32 sm:right-6"
          : "bottom-28 right-6 sm:bottom-32 sm:right-6",
      )}
    >
      {/* Collapsed Circular View */}
      <div
        onClick={handleExpand}
        className={cn(
          "cursor-pointer transition-all duration-500 ease-out overflow-hidden",
          isExpanded
            ? "w-0 h-0 opacity-0 scale-0"
            : "w-16 h-16 sm:w-20 sm:h-20 opacity-100 scale-100 rounded-full shadow-luxury-lg hover:scale-110",
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/90 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground ml-0.5" />
            </div>
          </div>

          {/* Pulse ring animation */}
          <div
            className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-30"
            style={{ animationDuration: "2s" }}
          />
        </div>
      </div>

      {/* Expanded Card View */}
      <div
        className={cn(
          "bg-foreground rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-out origin-bottom-right",
          isExpanded
            ? "w-[320px] sm:w-[360px] md:w-[400px] opacity-100 scale-100"
            : "w-0 opacity-0 scale-0",
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

          {/* Removed "Don't show this again" button */}
        </div>
      </div>
    </div>
  );
};

export default FloatingVideoAd;
