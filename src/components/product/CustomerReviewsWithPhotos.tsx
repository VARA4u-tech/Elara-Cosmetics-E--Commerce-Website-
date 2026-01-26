import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ReviewPhoto {
  before: string;
  after: string;
}

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  productUsed: string;
  duration: string;
  text: string;
  avatar: string;
  photos: ReviewPhoto;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Meera Kapoor",
    location: "Delhi",
    rating: 5,
    productUsed: "Golden Glow Under Eye Serum",
    duration: "4 weeks",
    text: "I was skeptical at first, but the results speak for themselves. My dark circles have significantly reduced, and my under-eye area looks so much brighter and more awake. The serum absorbs quickly and doesn't feel heavy at all.",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    photos: {
      before: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
    },
  },
  {
    id: 2,
    name: "Ananya Reddy",
    location: "Bangalore",
    rating: 5,
    productUsed: "Tejasvi Kumkumadi Face Serum",
    duration: "6 weeks",
    text: "The Kumkumadi serum has completely transformed my skin texture. My dark spots have faded, and I've received so many compliments about my natural glow. This is now a permanent part of my skincare routine.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    photos: {
      before: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
    },
  },
  {
    id: 3,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    productUsed: "Soundarya Radiance Cream",
    duration: "8 weeks",
    text: "After using the Soundarya Radiance Cream, my fine lines have visibly reduced. My skin feels firmer, more hydrated, and has this beautiful luminous quality. Worth every rupee!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    photos: {
      before: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    },
  },
  {
    id: 4,
    name: "Divya Nair",
    location: "Chennai",
    rating: 5,
    productUsed: "Nayantara Eye Contour Cream",
    duration: "5 weeks",
    text: "The puffiness around my eyes has reduced dramatically. I look more rested and refreshed even on days when I haven't slept well. The cream is very gentle and perfect for my sensitive skin.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    photos: {
      before: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=400&h=400&fit=crop",
      after: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400&h=400&fit=crop",
    },
  },
];

interface CustomerReviewsWithPhotosProps {
  className?: string;
}

const CustomerReviewsWithPhotos = ({ className }: CustomerReviewsWithPhotosProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<"before" | "after">("before");

  const currentReview = reviews[currentIndex];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const openLightbox = (type: "before" | "after") => {
    setLightboxImage(type);
    setShowLightbox(true);
  };

  return (
    <section className={cn("py-20 bg-secondary/30", className)}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
            Real Transformations
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Before & After Results
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See the incredible transformations our customers have experienced with our premium face care products
          </p>
        </div>

        {/* Main Review Card */}
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-background rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="grid lg:grid-cols-2">
                {/* Before/After Photos */}
                <div className="p-6 lg:p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <div className="absolute top-3 left-3 z-10 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                        Before
                      </div>
                      <img
                        src={currentReview.photos.before}
                        alt={`${currentReview.name} before using ${currentReview.productUsed}`}
                        className="w-full aspect-[3/4] object-cover rounded-xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                        onClick={() => openLightbox("before")}
                      />
                    </div>
                    <div className="relative group">
                      <div className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                        After
                      </div>
                      <img
                        src={currentReview.photos.after}
                        alt={`${currentReview.name} after using ${currentReview.productUsed}`}
                        className="w-full aspect-[3/4] object-cover rounded-xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.02]"
                        onClick={() => openLightbox("after")}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Results after {currentReview.duration} of consistent use
                  </p>
                </div>

                {/* Review Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-center bg-secondary/20">
                  <Quote className="w-10 h-10 text-primary/30 mb-4" />
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(currentReview.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Product Badge */}
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs uppercase tracking-wider rounded-full mb-4 w-fit">
                    {currentReview.productUsed}
                  </span>

                  {/* Review Text */}
                  <blockquote className="font-serif text-lg md:text-xl text-foreground leading-relaxed mb-8">
                    "{currentReview.text}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={currentReview.avatar}
                      alt={currentReview.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/30"
                    />
                    <div>
                      <p className="font-medium text-foreground">{currentReview.name}</p>
                      <p className="text-sm text-muted-foreground">{currentReview.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevReview}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentIndex
                      ? "bg-primary w-6"
                      : "bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={nextReview}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16">
          {[
            { value: "95%", label: "Customer Satisfaction" },
            { value: "4.8", label: "Average Rating" },
            { value: "10K+", label: "Happy Customers" },
            { value: "89%", label: "Visible Results" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-serif text-3xl md:text-4xl text-primary mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowLightbox(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLightbox(false)}
                className="absolute -top-12 right-0 text-foreground hover:text-primary transition-colors"
                aria-label="Close lightbox"
              >
                <X className="w-8 h-8" />
              </button>
              <div className="bg-background rounded-xl overflow-hidden shadow-2xl">
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wider">
                    {lightboxImage === "before" ? "Before" : "After"}
                  </div>
                  <img
                    src={lightboxImage === "before" ? currentReview.photos.before : currentReview.photos.after}
                    alt={`${currentReview.name} ${lightboxImage}`}
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
                <div className="p-4 flex justify-center gap-4">
                  <Button
                    variant={lightboxImage === "before" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLightboxImage("before")}
                  >
                    Before
                  </Button>
                  <Button
                    variant={lightboxImage === "after" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLightboxImage("after")}
                  >
                    After
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CustomerReviewsWithPhotos;
