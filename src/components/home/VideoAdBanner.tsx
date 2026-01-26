import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoAdBanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-wide-luxury text-primary mb-2">
            Experience Luxury
          </p>
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl">
            The Art of Ayurvedic Beauty
          </h2>
        </div>
        
        <div className="relative group overflow-hidden rounded-sm max-w-5xl mx-auto">
          {/* Video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full aspect-video object-cover"
          >
            <source src="/videos/elara-luxury-ad.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent pointer-events-none" />
          
          {/* Controls */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "bg-background/90 backdrop-blur-sm text-foreground",
                  "hover:bg-background transition-colors",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
                aria-label={isPlaying ? "Pause video" : "Play video"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  "bg-background/90 backdrop-blur-sm text-foreground",
                  "hover:bg-background transition-colors",
                  "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                )}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
            
            {/* Brand Tag */}
            <div className="bg-background/90 backdrop-blur-sm px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs uppercase tracking-luxury text-foreground">
                Elara Cosmetics
              </span>
            </div>
          </div>
          
          {/* CTA Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href="/category/face"
              className="btn-luxury bg-background/95 backdrop-blur-sm text-foreground hover:bg-background"
            >
              Shop the Collection
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoAdBanner;
