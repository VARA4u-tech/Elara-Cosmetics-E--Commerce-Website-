import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import antiHairfallShampoo from "@/assets/products/anti-hairfall-shampoo.jpg";
import hairGrowthSerum from "@/assets/products/hair-growth-serum.jpg";
import avocadoConditioner from "@/assets/products/avocado-argan-conditioner.png";

const FloatingPromoCard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Show the promo card after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50",
        "w-[280px] sm:w-[320px] md:w-[360px]",
        "bg-background rounded-2xl shadow-2xl",
        "border border-border/50",
        "overflow-hidden",
        "transition-all duration-300 ease-out",
        isClosing ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0 animate-fade-in"
      )}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-border/50 flex items-center justify-center hover:bg-secondary transition-colors shadow-sm"
        aria-label="Close promotion"
      >
        <X className="w-4 h-4 text-foreground" />
      </button>

      {/* Brand Logo */}
      <div className="pt-6 pb-2 px-6 text-center border-b border-border/30">
        <h3 className="font-serif text-lg tracking-wide text-foreground">
          ELARA COSMETICS
        </h3>
      </div>

      {/* Promo Content */}
      <div className="px-6 py-4 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-2 leading-tight">
          SPECIAL OFFER
        </h2>
        <p className="text-primary font-medium text-sm md:text-base mb-1">
          Complimentary Hair Care Kit
        </p>
        <p className="text-foreground text-sm">
          worth <span className="font-semibold">₹2,000</span> on{" "}
          <span className="font-semibold">₹2,999+</span>
        </p>
      </div>

      {/* Product Images */}
      <div className="px-6 py-4 bg-gradient-to-b from-secondary/30 to-secondary/50">
        <div className="flex items-end justify-center gap-2">
          <div className="w-20 md:w-24 transform hover:scale-105 transition-transform">
            <img
              src={antiHairfallShampoo}
              alt="Anti-Hairfall Shampoo"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
          <div className="w-24 md:w-28 transform hover:scale-105 transition-transform -mb-2">
            <img
              src={hairGrowthSerum}
              alt="Hair Growth Serum"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
          <div className="w-20 md:w-24 transform hover:scale-105 transition-transform">
            <img
              src={avocadoConditioner}
              alt="Avocado Conditioner"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="px-6 py-4 bg-background">
        <Link
          to="/category/hair"
          onClick={handleClose}
          className="block w-full py-3 text-center text-sm uppercase tracking-luxury font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          Shop Now
        </Link>
      </div>

      {/* Terms */}
      <p className="text-[10px] text-muted-foreground text-center pb-4 px-4">
        *T&C Apply. Limited time offer.
      </p>
    </div>
  );
};

export default FloatingPromoCard;
