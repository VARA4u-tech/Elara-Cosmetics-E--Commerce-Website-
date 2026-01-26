import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideAdBannerProps {
  variant?: "vertical" | "horizontal";
  className?: string;
}

const SideAdBanner = ({ variant = "vertical", className }: SideAdBannerProps) => {
  if (variant === "horizontal") {
    return (
      <div className={cn("w-full", className)}>
        <Link
          to="/scalp-care-routine"
          className="group relative block overflow-hidden bg-gradient-to-r from-primary/10 via-secondary to-primary/10 border border-border hover:border-primary/50 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM4QjdENkIiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="relative flex items-center justify-between p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury text-primary mb-1">
                  Complete Routine
                </p>
                <h4 className="font-serif text-lg md:text-xl">
                  Scalp Care Collection
                </h4>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm uppercase tracking-luxury text-primary group-hover:gap-3 transition-all">
              <span className="hidden md:inline">Discover</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Link
        to="/category/hair"
        className="group relative block overflow-hidden aspect-[3/4] bg-gradient-to-b from-secondary via-background to-secondary border border-border hover:border-primary/50 transition-all duration-500"
      >
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-4 w-16 h-16 border border-primary/30 rounded-full" />
          <div className="absolute bottom-4 right-4 w-20 h-20 border border-primary/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-primary/10 rounded-full" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          
          <p className="text-xs uppercase tracking-wide-luxury text-primary mb-2">
            New Arrival
          </p>
          
          <h4 className="font-serif text-xl md:text-2xl mb-2">
            Hair Care
          </h4>
          
          <p className="text-sm text-muted-foreground mb-4">
            Ayurvedic solutions for lustrous hair
          </p>
          
          <span className="inline-flex items-center gap-2 text-sm uppercase tracking-luxury text-primary group-hover:gap-3 transition-all">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </span>
        </div>
        
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </Link>
    </div>
  );
};

export default SideAdBanner;
