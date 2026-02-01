import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import elaraBrandBanner from "@/assets/hero/elara-brand-banner.png";
import heroBannerMain from "@/assets/hero/hero-banner-main.png";
import heroBannerMainV2 from "@/assets/hero/hero-banner-main-v2.jpg";
const SLIDE_INTERVAL_MS = 6000;
const FADE_MS = 800;

// Font styles for premium cosmetics aesthetic
const fontStyles = {
  playfair: { fontFamily: "'Playfair Display', serif", fontWeight: 500 },
  cinzel: { fontFamily: "'Cinzel', serif", fontWeight: 500, letterSpacing: "0.08em" },
  marcellus: { fontFamily: "'Marcellus', serif", fontWeight: 400 },
  cormorant: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
};

const slides = [
  {
    id: 1,
    title: "The Complete Collection",
    subtitle: "Pure Luxury",
    description: "Experience our full range of premium Ayurvedic formulations",
    image: heroBannerMainV2,
    link: "/category/all",
    objectPosition: "center",
    objectFit: "cover",
    backgroundColor: "#FDF4F0",
    titleFont: fontStyles.playfair,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: "0.2em" },
  },
  {
    id: 2,
    title: "Discover Our Collection",
    subtitle: "Premium Skincare",
    description: "Experience the power of science-backed formulations",
    image: heroBannerMain,
    link: "/category/face",
    objectPosition: "center",
    objectFit: "cover",
    titleFont: fontStyles.playfair,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: "0.2em" },
  },
  {
    id: 3,
    title: "Brand Philosophy",
    subtitle: "Ancient Wisdom",
    description: "Discover the timeless beauty secrets",
    image: elaraBrandBanner,
    link: "/about",
    objectPosition: "center",
    objectFit: "cover",
    titleFont: fontStyles.cinzel,
    subtitleFont: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.15em" },
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [exitingSlide, setExitingSlide] = useState<number | null>(null);
  const [animate, setAnimate] = useState(true);

  const currentRef = useRef(0);
  const intervalRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    intervalRef.current = null;
    exitTimeoutRef.current = null;
    rafRef.current = null;
  };

  const kickAutoAdvance = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      const next = (currentRef.current + 1) % slides.length;
      goTo(next, false);
    }, SLIDE_INTERVAL_MS);
  };

  const goTo = (nextIndex: number, resetTimer = true) => {
    if (nextIndex === currentRef.current) return;

    const prev = currentRef.current;
    currentRef.current = nextIndex;

    // Render only the active + exiting slides and do a compositor-friendly crossfade.
    setExitingSlide(prev);
    setCurrentSlide(nextIndex);

    if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
    exitTimeoutRef.current = window.setTimeout(() => setExitingSlide(null), FADE_MS);

    // Force a style boundary so transitions reliably kick in (prevents Safari/mobile flicker).
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    setAnimate(false);
    rafRef.current = window.requestAnimationFrame(() => setAnimate(true));

    if (resetTimer) kickAutoAdvance();
  };

  useEffect(() => {
    currentRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    kickAutoAdvance();
    return () => clearTimers();
  }, []);

  const nextSlide = () => {
    const next = (currentRef.current + 1) % slides.length;
    goTo(next);
  };

  const prevSlide = () => {
    const prev = (currentRef.current - 1 + slides.length) % slides.length;
    goTo(prev);
  };

  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[65vh] bg-background overflow-hidden">
      {/* Slides */}
      {(
        exitingSlide !== null && exitingSlide !== currentSlide
          ? [exitingSlide, currentSlide]
          : [currentSlide]
      ).map((slideIndex) => {
        const slide = slides[slideIndex];
        const isActive = slideIndex === currentSlide;
        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0",
              isActive ? "z-20" : "z-10 pointer-events-none"
            )}
            style={{
              opacity: isActive ? (animate ? 1 : 0) : animate ? 0 : 1,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
              willChange: "opacity",
              backgroundColor: slide.backgroundColor || "transparent",
            }}
          >
            {/* Background - Image with Ken Burns effect */}
            <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
              <img
                key={`img-${slide.id}-${isActive}`}
                src={slide.image}
                alt={slide.title}
                className={cn(
                  "w-full h-full object-center",
                  isActive && animate && slide.objectFit !== 'contain' && "ken-burns"
                )}
                style={{
                  objectPosition: slide.objectPosition || 'center',
                  objectFit: (slide.objectFit as any) || 'cover'
                }}
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={isActive ? "high" : "auto"}
              />
              {/* Subtle overall overlay for text legibility */}
              <div className="absolute inset-0 bg-black/10" />
              {/* Bottom gradient for visual weight */}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Content - Removed as per request */}
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "w-10 md:w-12 h-1 transition-all duration-300",
              index === currentSlide
                ? "bg-primary"
                : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
            )}
          />
        ))}
      </div>
    </section >
  );
};

export default HeroCarousel;
