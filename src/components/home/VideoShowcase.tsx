import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAudioManager } from "@/context/AudioContext";

const AUDIO_ID = "video-showcase";

const videoAd = { id: 1, src: "/videos/hero-cosmetics.mp4", title: "Luxury Collection" };

const VideoShowcase = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const { registerAudio, unregisterAudio, requestAudioPlay } = useAudioManager();

  // Register video with audio manager
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      registerAudio(AUDIO_ID, video);
      video.muted = true;
    }
    return () => {
      unregisterAudio(AUDIO_ID);
    };
  }, [registerAudio, unregisterAudio]);

  // Loop video on end
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(() => {});
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

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
      if (isMuted) {
        requestAudioPlay(AUDIO_ID);
        setIsMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsMuted(true);
      }
    }
  };

  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-4 sm:mb-5 md:mb-6">
          <p 
            className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary/70 mb-2 sm:mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Experience the Collection
          </p>
          <h2 
            className="text-lg sm:text-lg md:text-xl lg:text-xl mb-2 sm:mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
          >
            Luxury Redefined
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xs sm:text-sm md:text-base">
            Discover the artistry behind our signature formulations. Each product is crafted with precision, 
            blending ancient wisdom with modern science.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Decorative Frame */}
          <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 border border-primary/20 pointer-events-none" />
          <div className="absolute -inset-1 sm:-inset-1.5 md:-inset-2 border border-primary/10 pointer-events-none" />
          
          {/* Video Wrapper */}
          <div className="relative aspect-video bg-foreground/5 overflow-hidden group">
            <video
              ref={videoRef}
              src={videoAd.src}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 flex items-end justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {/* Left Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary-foreground transition-colors"
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
                  className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary-foreground/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-primary-foreground transition-colors"
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
                className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 uppercase tracking-luxury text-xs font-medium hover:bg-gold-light transition-colors"
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
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-primary-foreground/90 flex items-center justify-center text-foreground hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Bottom Caption */}
          <div className="mt-4 sm:mt-6 md:mt-8 text-center">
            <p 
              className="text-base sm:text-lg md:text-lg text-foreground/80 italic mb-3 sm:mb-4"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 mt-6 sm:mt-8 md:mt-8 max-w-3xl mx-auto">
          {[
            { label: "Clinically Tested", value: "100%" },
            { label: "Natural Ingredients", value: "95%" },
            { label: "Happy Customers", value: "50K+" },
            { label: "Award Winning", value: "15+" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p 
                className="text-xl sm:text-2xl md:text-3xl text-primary mb-1"
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
