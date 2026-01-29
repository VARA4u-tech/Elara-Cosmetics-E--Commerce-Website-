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
      className="bg-accent text-accent-foreground py-1 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Announcement Content */}
          <div className="relative flex-1 max-w-full md:max-w-md h-[10px] md:h-[12px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center gap-2"
              >
                <CurrentIcon className="w-2 h-2 md:w-2.5 md:h-2.5 flex-shrink-0" />
                <span className="text-[9px] md:text-[10px] uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis leading-none">
                  {announcements[currentIndex].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
