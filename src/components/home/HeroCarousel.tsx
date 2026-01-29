import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import elaraBrandBanner from "@/assets/hero/elara-brand-banner.jpg";
import productCollection2 from "@/assets/hero/product-collection-2.png";
import productCollection3 from "@/assets/hero/product-collection-3.png";

import heroBannerMain from "@/assets/hero/hero-banner-main-v2.jpg";

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
    id: 4,
    title: "The Complete Collection",
    subtitle: "Pure Luxury",
    description: "Experience our full range of premium Ayurvedic formulations for hair and skin",
    image: heroBannerMain,
    cta: "Shop All Products",
    link: "/category/all",
    objectPosition: "center",
    objectFit: "contain",
    backgroundColor: "#FDF4F0", // Soft cream background to match image
    titleFont: fontStyles.playfair,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: "0.2em" },
    overlayPosition: "center" as const,
  },
  {
    id: 1,
    title: "Discover Our Collection",
    subtitle: "Premium Skincare & Haircare",
    description: "Experience the power of science-backed formulations with our luxurious range of serums, shampoos, and treatments",
    image: elaraBrandBanner,
    cta: "Shop Now",
    link: "/category/face",
    objectPosition: "center",
    objectFit: "cover",
    titleFont: fontStyles.playfair,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 400, letterSpacing: "0.2em" },
    overlayPosition: "left" as const,
  },
  {
    id: 2,
    title: "Luxurious Ayurveda",
    subtitle: "Ancient Wisdom · Modern Elegance",
    description: "Discover the timeless beauty secrets of Indian royalty crafted into our signature collection",
    image: productCollection2,
    cta: "Explore Collection",
    link: "/category/face",
    objectPosition: "center",
    titleFont: fontStyles.cinzel,
    subtitleFont: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontStyle: "italic", letterSpacing: "0.15em" },
    overlayPosition: "left" as const,
  },
  {
    id: 3,
    title: "Natural Beauty Essentials",
    subtitle: "Transform Your Routine",
    description: "Premium formulations crafted with the finest natural ingredients for radiant, healthy skin and hair",
    image: productCollection3,
    cta: "View Products",
    link: "/category/hair",
    objectPosition: "center",
    titleFont: fontStyles.marcellus,
    subtitleFont: { fontFamily: "'Montserrat', sans-serif", fontWeight: 300, letterSpacing: "0.15em" },
    overlayPosition: "left" as const,
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
    <section className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-background overflow-hidden">
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

            {/* Content - Responsive: Bottom-left on mobile, Centered on desktop */}
            <div className="relative z-10 w-full h-full flex items-end md:items-center justify-start md:justify-center pb-12 sm:pb-20 md:pb-0">
              <div className="w-full px-4 sm:px-6 md:container md:mx-auto flex flex-col items-start md:items-center text-left md:text-center">
                <div className="max-w-md md:max-w-lg lg:max-w-xl text-white">
                  <p
                    className="text-[10px] sm:text-xs md:text-sm lg:text-base uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-1 sm:mb-1.5 md:mb-2 text-white/90"
                    style={{
                      ...slide.subtitleFont,
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 800ms ease-out 200ms, transform 800ms ease-out 200ms",
                      willChange: "opacity, transform",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    {slide.subtitle}
                  </p>
                  <h2
                    className="text-xl sm:text-2xl md:text-2xl lg:text-3xl mb-2 sm:mb-2.5 md:mb-3 leading-tight font-medium"
                    style={{
                      ...slide.titleFont,
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 800ms ease-out 400ms, transform 800ms ease-out 400ms",
                      willChange: "opacity, transform",
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
                    }}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className="text-[10px] sm:text-xs md:text-[10px] lg:text-xs text-white/90 mb-3 sm:mb-3.5 md:mb-4 max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-md md:mx-auto line-clamp-2 sm:line-clamp-3 md:line-clamp-none font-light"
                    style={{
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 800ms ease-out 600ms, transform 800ms ease-out 600ms",
                      willChange: "opacity, transform",
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)"
                    }}
                  >
                    {slide.description}
                  </p>
                  <Link
                    to={slide.link}
                    className="inline-block bg-white text-black px-3 sm:px-5 md:px-6 lg:px-7 py-1.5 sm:py-1.5 md:py-2 uppercase tracking-[0.12em] sm:tracking-[0.15em] text-[10px] sm:text-[10px] md:text-[11px] font-medium hover:bg-primary hover:text-white transition-all duration-300 min-w-[90px] sm:min-w-[100px] md:min-w-[120px] text-center"
                    style={{
                      opacity: isActive && animate ? 1 : 0,
                      transform: isActive && animate ? "translateY(0)" : "translateY(20px)",
                      transition: "opacity 800ms ease-out 800ms, transform 800ms ease-out 800ms, background-color 300ms ease, color 300ms ease",
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
    </section>
  );
};

export default HeroCarousel;
