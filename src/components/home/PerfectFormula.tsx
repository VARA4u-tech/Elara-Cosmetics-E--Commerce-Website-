import { Link } from "react-router-dom";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useAudioManager } from "@/context/AudioContext";

const AUDIO_ID = "perfect-formula-video";
const VIDEO_SRC = "/videos/hero-cosmetics.mp4"; // Reusing existing video asset

const PerfectFormula = () => {
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
    <section className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="order-2 md:order-1 text-center md:text-left flex flex-col justify-center h-full">
            <h2 className="font-serif text-lg md:text-xl lg:text-2xl text-foreground uppercase tracking-wide mb-3 md:mb-4">
              The Perfect Formula. <br className="hidden lg:block" />
              Uniquely Yours.
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-lg mx-auto md:mx-0 mb-5 md:mb-6">
              Discover Customised Skincare, an immersive Ayurvedic experience tailored to your unique skin concerns. Each creation is blended by hand and prepared in harmony with nature, stirred with mindfulness, precision and purpose.
            </p>
            <div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-2.5 text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors duration-300 rounded-sm"
              >
                Shop Now
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Video/Media */}
          <div className="order-1 md:order-2 relative aspect-[4/3] md:aspect-video bg-secondary/20 overflow-hidden group rounded-2xl shadow-xl">
             <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              loop
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

            {/* Play/Pause Controls Overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
                 {/* Center Play Icon (Only visible when Paused) */}
                 {!isPlaying && (
                   <button 
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center p-4 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-white/40"
                    aria-label="Play video"
                   >
                      <Play className="w-full h-full text-white fill-white ml-1" />
                   </button>
                 )}
            </div>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              {/* Play/Pause Toggle (Bottom Left) */}
              <button
                 onClick={togglePlay}
                 className="p-2.5 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors flex items-center justify-center group"
                 aria-label={isPlaying ? "Pause" : "Play"}
               >
                 {isPlaying ? (
                   <div className="flex gap-1 h-3.5 w-3.5 items-center justify-center">
                      <div className="w-1 bg-white rounded-full h-full" />
                      <div className="w-1 bg-white rounded-full h-full" />
                   </div>
                 ) : (
                   <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                 )}
              </button>

               {/* Mute Toggle (Bottom Right) */}
              <button
                 onClick={toggleMute}
                 className="p-2.5 bg-black/40 backdrop-blur-md text-white rounded-full hover:bg-black/60 transition-colors flex items-center justify-center"
               >
                 {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
 
             {/* Logo Watermark Top Right */}
             <div className="absolute top-4 right-4 text-white/80 text-[10px] uppercase tracking-widest font-serif">
          Elara Cosmetics
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PerfectFormula;
