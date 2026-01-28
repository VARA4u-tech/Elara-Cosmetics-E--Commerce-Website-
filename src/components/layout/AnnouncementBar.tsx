import { useState, useEffect } from "react";
import { Gift, Truck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

const announcements = [
  { icon: Truck, text: "Free Shipping on Orders Above ₹999" },
  { icon: Gift, text: "Complimentary Gift Wrapping Available" },
  { icon: RefreshCw, text: "Easy 30-Day Returns" },
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div 
      className="bg-accent text-accent-foreground py-2 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button - Hidden on mobile */}
          <button
            onClick={goToPrevious}
            className="hidden sm:flex items-center justify-center p-1 hover:bg-accent-foreground/10 rounded-full transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Announcement Content */}
          <div className="relative flex-1 max-w-md h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                <CurrentIcon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="text-xs uppercase tracking-wider whitespace-nowrap">
                  {announcements[currentIndex].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button - Hidden on mobile */}
          <button
            onClick={goToNext}
            className="hidden sm:flex items-center justify-center p-1 hover:bg-accent-foreground/10 rounded-full transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex items-center justify-center gap-1.5 mt-1.5">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-accent-foreground w-3" 
                  : "bg-accent-foreground/40 hover:bg-accent-foreground/60"
              )}
              aria-label={`Go to announcement ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
