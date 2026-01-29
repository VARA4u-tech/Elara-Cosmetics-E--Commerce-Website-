import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The Anti-Dandruff Serum has completely transformed my scalp health. After just two weeks, I noticed a visible reduction in flakes and itchiness. Truly worth every rupee!",
    product: "Anti-Dandruff Serum",
    initials: "PS",
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    text: "I've been using the Advance Hair Growth Serum for three months now, and my hair fall has reduced dramatically. My hair feels thicker and healthier than ever. This is now a permanent part of my hair care routine.",
    product: "Advance Hair Growth Serum",
    initials: "AR",
  },
  {
    id: 3,
    name: "Meera Kapoor",
    location: "Delhi",
    rating: 5,
    text: "The GlowCell NMN Serum is pure magic in a bottle! My skin has a luminous quality that I always dreamed of. Elara Cosmetics has earned a customer for life.",
    product: "GlowCell™ NMN Serum",
    initials: "MK",
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <p className="text-xs sm:text-sm uppercase tracking-wide-luxury text-primary mb-2 sm:mb-3">
            Customer Love
          </p>
          <h2 className="font-serif text-lg sm:text-lg md:text-xl lg:text-xl text-foreground">
            What Our Customers Say
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-2 sm:px-4">
                  <div className="bg-background p-6 sm:p-8 md:p-12 text-center relative">
                    {/* Quote Mark */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-serif text-primary/20 absolute top-2 sm:top-4 left-4 sm:left-8">
                      "
                    </div>

                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mb-4 sm:mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="font-serif text-base sm:text-lg md:text-xl text-foreground leading-relaxed mb-6 sm:mb-8 relative z-10 px-2">
                      {testimonial.text}
                    </blockquote>

                    {/* Product Tag */}
                    <p className="text-xs uppercase tracking-luxury text-primary mb-4 sm:mb-6">
                      Purchased: {testimonial.product}
                    </p>

                    {/* Author with Initials Avatar */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
                        <span className="font-serif text-base sm:text-lg text-primary">{testimonial.initials}</span>
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-sm sm:text-base text-foreground">{testimonial.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 icon-btn"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 icon-btn"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-primary w-6 sm:w-8"
                    : "bg-primary/30 hover:bg-primary/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
