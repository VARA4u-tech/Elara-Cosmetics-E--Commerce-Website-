import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoShowcase = () => {
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
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <p 
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary/70 mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Experience the Collection
          </p>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Luxury Redefined
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Discover the artistry behind our signature formulations. Each product is crafted with precision, 
            blending ancient wisdom with modern science.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Frame */}
          <div className="absolute -inset-3 md:-inset-4 border border-primary/20 pointer-events-none" />
          <div className="absolute -inset-1.5 md:-inset-2 border border-primary/10 pointer-events-none" />
          
          {/* Video Wrapper */}
          <div className="relative aspect-video bg-foreground/5 overflow-hidden group">
            <video
              ref={videoRef}
              src="/videos/elara-luxury-ad.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary-foreground transition-colors"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Play className="w-4 h-4 md:w-5 md:h-5 ml-0.5" />
                  )}
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary-foreground transition-colors"
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                </button>
              </div>

              {/* Right CTA */}
              <Link
                to="/category/face"
                className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-luxury text-xs font-medium hover:bg-gold-light transition-colors"
              >
                Shop the Collection
              </Link>
            </div>

            {/* Center Play Button (visible when paused) */}
            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-foreground/20 backdrop-blur-[2px]"
                aria-label="Play video"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-foreground/90 flex items-center justify-center text-foreground hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 md:w-8 md:h-8 ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div className="mt-6 md:mt-8 text-center">
            <p 
              className="text-lg md:text-xl text-foreground/80 italic mb-4"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              "Where science meets ancient beauty wisdom"
            </p>
            <Link
              to="/category/face"
              className="sm:hidden inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 uppercase tracking-luxury text-xs font-medium hover:bg-gold-light transition-colors"
            >
              Shop the Collection
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16 max-w-4xl mx-auto">
          {[
            { label: "Clinically Tested", value: "100%" },
            { label: "Natural Ingredients", value: "95%" },
            { label: "Happy Customers", value: "50K+" },
            { label: "Award Winning", value: "15+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p 
                className="text-2xl md:text-3xl lg:text-4xl text-primary mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
              >
                {stat.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoShowcase;
