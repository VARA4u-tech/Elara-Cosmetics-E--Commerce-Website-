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
    <div className="bg-[#F8C8DC] text-black py-2 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-medium text-center">
            WE DELIVER ACROSS INDIA & INTERNATIONALLY.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
