import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDE_INTERVAL_MS = 6000;
const FADE_MS = 800;

// Font styles for premium cosmetics aesthetic
const fontStyles = {
  playfair: { fontFamily: "'Playfair Display', serif", fontWeight: 500 },
  cinzel: {
    fontFamily: "'Cinzel', serif",
    fontWeight: 500,
    letterSpacing: "0.08em",
  },
  marcellus: { fontFamily: "'Marcellus', serif", fontWeight: 400 },
  cormorant: { fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 },
};

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  mobileImage: string;
  desktopImage: string;
  link: string;
  objectPosition: string;
  objectFit: string;
  backgroundColor?: string;
  titleFont: {
    fontFamily: string;
    fontWeight: number;
  };
  subtitleFont: {
    fontFamily: string;
    fontWeight: number;
    letterSpacing?: string;
    fontStyle?: string;
  };
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Discover Beauty",
    subtitle: "Elara Collection",
    description: "Premium cosmetics for radiant skin",
    mobileImage:
      "https://i.ibb.co/1YvzkCgY/c4e44fd7-807a-4e72-b847-b4057613301c.png",
    desktopImage:
      "https://i.ibb.co/1YvzkCgY/c4e44fd7-807a-4e72-b847-b4057613301c.png",
    link: "/category/face",
    objectPosition: "center",
    objectFit: "cover",
    titleFont: fontStyles.playfair,
    subtitleFont: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 450,
      letterSpacing: "0.2em",
    },
  },
  {
    id: 2,
    title: "Elara Essentials",
    subtitle: "Beauty Redefined",
    description: "Discover our premium collection",
    mobileImage:
      "https://i.ibb.co/pBY6Gb4F/c8393c86-e1a5-40c5-9756-f28112c7f9ea.png",
    desktopImage:
      "https://i.ibb.co/pBY6Gb4F/c8393c86-e1a5-40c5-9756-f28112c7f9ea.png",
    link: "/category/all",
    objectPosition: "center",
    objectFit: "cover",
    titleFont: fontStyles.playfair,
    subtitleFont: {
      fontFamily: "'Montserrat', sans-serif",
      fontWeight: 450,
      letterSpacing: "0.2em",
    },
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
  const goToRef = useRef<
    ((nextIndex: number, resetTimer?: boolean) => void) | null
  >(null);

  const clearTimers = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
    if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    intervalRef.current = null;
    exitTimeoutRef.current = null;
    rafRef.current = null;
  }, []);

  const kickAutoAdvance = useCallback(() => {
    if (intervalRef.current) window.clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      const next = (currentRef.current + 1) % slides.length;
      if (goToRef.current) goToRef.current(next, false);
    }, SLIDE_INTERVAL_MS);
  }, []);

  const goTo = useCallback(
    (nextIndex: number, resetTimer = true) => {
      if (nextIndex === currentRef.current) return;

      const prev = currentRef.current;
      currentRef.current = nextIndex;

      setExitingSlide(prev);
      setCurrentSlide(nextIndex);

      if (exitTimeoutRef.current) window.clearTimeout(exitTimeoutRef.current);
      exitTimeoutRef.current = window.setTimeout(
        () => setExitingSlide(null),
        FADE_MS,
      );

      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      setAnimate(false);
      rafRef.current = window.requestAnimationFrame(() => setAnimate(true));

      if (resetTimer) kickAutoAdvance();
    },
    [kickAutoAdvance],
  );

  useEffect(() => {
    goToRef.current = goTo;
  }, [goTo]);

  useEffect(() => {
    currentRef.current = currentSlide;
  }, [currentSlide]);

  useEffect(() => {
    kickAutoAdvance();
    return () => clearTimers();
  }, [kickAutoAdvance, clearTimers]);

  return (
    <section className="relative w-full h-[60vh] md:h-auto md:aspect-[32/12] bg-background overflow-hidden">
      {(exitingSlide !== null && exitingSlide !== currentSlide
        ? [exitingSlide, currentSlide]
        : [currentSlide]
      ).map((slideIndex: number) => {
        const slide = slides[slideIndex];
        const isActive = slideIndex === currentSlide;

        // ✅ SAFE fetchpriority handling (React + TS compatible)
        const fetchPriorityProps = isActive
          ? ({
              fetchpriority: "high",
            } as React.ImgHTMLAttributes<HTMLImageElement> & {
              fetchpriority?: string;
            })
          : undefined;

        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0",
              isActive ? "z-20" : "z-10 pointer-events-none",
            )}
            style={{
              opacity: isActive ? (animate ? 1 : 0) : animate ? 0 : 1,
              transition: `opacity ${FADE_MS}ms ease-in-out`,
              willChange: "opacity",
              backgroundColor: slide.backgroundColor || "transparent",
            }}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center">
              <picture className="absolute inset-0 w-full h-full block">
                <source
                  media="(min-width: 768px)"
                  srcSet={slide.desktopImage}
                />
                <img
                  {...fetchPriorityProps}
                  src={slide.mobileImage}
                  alt={slide.title}
                  className="w-full h-full object-center"
                  style={{
                    objectPosition: slide.objectPosition || "center",
                    objectFit: "cover",
                  }}
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default HeroCarousel;
