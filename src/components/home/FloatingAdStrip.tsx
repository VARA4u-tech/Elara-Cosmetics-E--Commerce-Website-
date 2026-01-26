import { useState } from "react";
import { Link } from "react-router-dom";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingAdStrip = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 z-40",
      "bg-gradient-to-r from-primary via-primary/90 to-primary",
      "animate-fade-in"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
            <p className="text-sm text-primary-foreground">
              <span className="font-medium">Special Offer:</span>{" "}
              <span className="hidden sm:inline">Get 20% off on your first order with code </span>
              <span className="font-serif font-bold tracking-wide">ELARA20</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Link
              to="/category/face"
              className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-primary-foreground hover:underline underline-offset-4"
            >
              Shop Now
            </Link>
            
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              aria-label="Close promotion"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAdStrip;
