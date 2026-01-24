import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    id: 1,
    title: "The Royal Beauty Ritual",
    subtitle: "Discover Ancient Ayurvedic Secrets",
    description: "Experience the timeless wisdom of Indian royalty with our luxurious skincare collection",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&h=800&fit=crop",
    cta: "Shop Now",
    link: "/category/face",
  },
  {
    id: 2,
    title: "Soundarya Collection",
    subtitle: "24K Gold Infused Luxury",
    description: "Our signature anti-aging range crafted with precious gold and rare herbs",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1920&h=800&fit=crop",
    cta: "Explore",
    link: "/category/face",
  },
  {
    id: 3,
    title: "Hair Care Rituals",
    subtitle: "Ancient Wisdom, Modern Results",
    description: "Transform your hair with time-tested Ayurvedic formulations",
    image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=1920&h=800&fit=crop",
    cta: "Shop Hair Care",
    link: "/category/hair",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/60 via-foreground/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-xl text-primary-foreground">
              <p
                className={cn(
                  "text-sm uppercase tracking-wide-luxury mb-4 text-gold-light transition-all duration-700 delay-100",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {slide.subtitle}
              </p>
              <h2
                className={cn(
                  "font-serif text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight transition-all duration-700 delay-200",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {slide.title}
              </h2>
              <p
                className={cn(
                  "text-base md:text-lg text-primary-foreground/80 mb-8 max-w-md transition-all duration-700 delay-300",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className={cn(
                  "inline-block bg-primary text-primary-foreground px-10 py-4 uppercase tracking-luxury text-sm font-medium hover:bg-gold-light transition-all duration-700 delay-400",
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </div>
      ))}

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
            onClick={() => setCurrentSlide(index)}
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
