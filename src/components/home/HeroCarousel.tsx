import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import productShowcase from "@/assets/hero/product-showcase.png";
import collectionShowcase from "@/assets/hero/collection-showcase.png";

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
    title: "Discover Our Collection",
    subtitle: "Premium Skincare & Haircare",
    description: "Experience the power of science-backed formulations with our luxurious range of serums, shampoos, and treatments",
    image: productShowcase,
    cta: "Shop Now",
    link: "/category/face",
    objectPosition: "center",
    titleFont: fontStyles.playfair,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: "0.2em" },
  },
  {
    id: 2,
    title: "Luxurious Ayurveda",
    subtitle: "Ancient Wisdom · Modern Elegance",
    description: "Discover the timeless beauty secrets of Indian royalty crafted into our signature collection",
    image: collectionShowcase,
    cta: "Explore Collection",
    link: "/category/face",
    objectPosition: "center",
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
    <section className="relative w-full h-[85vh] md:h-[65vh] overflow-hidden">
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
              transform: "translateZ(0)",
            }}
          >
            {/* Background - Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                key={`img-${slide.id}-${isActive}`}
                src={slide.image}
                alt={slide.title}
                className={cn(
                  "w-full h-full object-cover",
                  isActive && animate && "ken-burns"
                )}
                style={{ objectPosition: slide.objectPosition || 'center' }}
                loading={isActive ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={isActive ? "high" : "auto"}
              />
              {/* Gradient overlay - lighter on mobile for better image visibility */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent md:from-foreground/60 md:via-foreground/30" />
            </div>

            {/* Content - positioned at bottom on mobile, left-center on desktop */}
            <div className="relative z-10 w-full h-full flex items-end md:items-center pb-16 md:pb-0">
              <div className="w-full px-4 md:container md:mx-auto">
                <div className="max-w-xl text-primary-foreground">
                  <p
                    className="text-xs md:text-sm uppercase mb-2 md:mb-4 text-gold-light"
                    style={{
                      ...slide.subtitleFont,
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 600ms ease-out 100ms, transform 600ms ease-out 100ms",
                      willChange: "opacity, transform",
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <h2
                    className="text-3xl md:text-6xl lg:text-7xl mb-3 md:mb-6 leading-tight"
                    style={{
                      ...slide.titleFont,
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 600ms ease-out 200ms, transform 600ms ease-out 200ms",
                      willChange: "opacity, transform",
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-sm md:text-lg text-primary-foreground/80 mb-5 md:mb-8 max-w-sm md:max-w-md line-clamp-2 md:line-clamp-none"
                    style={{
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 600ms ease-out 300ms, transform 600ms ease-out 300ms",
                      willChange: "opacity, transform",
                    }}
                  >
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-primary text-primary-foreground px-8 md:px-10 py-3 md:py-4 uppercase tracking-luxury text-xs md:text-sm font-medium hover:bg-gold-light"
                    style={{
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(16px)",
                      transition: "opacity 600ms ease-out 400ms, transform 600ms ease-out 400ms",
                      willChange: "opacity, transform",
                    }}
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className={cn(
              "w-12 h-1 transition-all duration-300",
              index === currentSlide
                ? "bg-primary"
                : "bg-primary-foreground/30 hover:bg-primary-foreground/50"
            )}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
