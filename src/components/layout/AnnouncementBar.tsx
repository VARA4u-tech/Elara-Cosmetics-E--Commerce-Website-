import { useState, useEffect } from "react";
import {
  Gift,
  Truck,
  Sparkles,
  Users,
  RefreshCw,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const announcements = [
  { icon: Truck, text: "WE DELIVER ACROSS INDIA & INTERNATIONALLY" },
  { icon: Sparkles, text: "PREMIUM SKINCARE & HAIRCARE SOLUTIONS" },
  { icon: ShieldCheck, text: "CLEAN, SAFE & DERMATOLOGICALLY TESTED FORMULAS" },
  { icon: RefreshCw, text: "DESIGNED FOR ALL SKIN TYPES" },
  { icon: Users, text: "TRUSTED BY HUNDREDS OF HAPPY CUSTOMERS" },
  { icon: Gift, text: "GLOW NATURALLY WITH ELARA COSMETICS" },
];

const AnnouncementBar = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + announcements.length) % announcements.length,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
  };

  const CurrentIcon = announcements[currentIndex].icon;

  return (
    <div
      className="bg-[#F2AFC4] text-black py-1 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="relative w-full flex justify-center px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-1.5 max-w-[80%] overflow-hidden justify-center"
            >
              <CurrentIcon size={13} className="opacity-80 shrink-0" />
              <p className="text-[10px] md:text-[12px] uppercase tracking-[0.18em] font-medium whitespace-nowrap text-ellipsis overflow-hidden">
                {announcements[currentIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
