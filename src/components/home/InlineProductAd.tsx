import { Link } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineProductAdProps {
  className?: string;
}

const InlineProductAd = ({ className }: InlineProductAdProps) => {
  return (
    <div className={cn("w-full py-8 md:py-12", className)}>
      <div className="container mx-auto px-4">
        <Link
          to="/product/kumkumadi-tailam"
          className="group relative block overflow-hidden bg-gradient-to-r from-secondary via-background to-secondary border border-border hover:border-primary/30 transition-all duration-500"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Side */}
            <div className="relative aspect-square md:aspect-auto overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop"
                alt="Kumkumadi Tailam"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs uppercase tracking-luxury">
                Bestseller
              </div>
            </div>
            
            {/* Content Side */}
            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(248 reviews)</span>
              </div>
              
              <p className="text-xs uppercase tracking-wide-luxury text-primary mb-2">
                The Royal Beauty Secret
              </p>
              
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl mb-4">
                Kumkumadi Tailam
              </h3>
              
              <p className="text-muted-foreground mb-6 max-w-md">
                Experience the legendary saffron-infused formulation used by Indian royalty for centuries. 
                This precious elixir transforms your skin with the power of 26 potent Ayurvedic herbs.
              </p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="font-serif text-2xl text-primary">₹2,950</span>
                <span className="text-sm text-muted-foreground line-through">₹3,500</span>
                <span className="bg-primary/10 text-primary text-xs uppercase tracking-luxury px-2 py-1">
                  Save 15%
                </span>
              </div>
              
              <span className="btn-luxury inline-flex items-center gap-2 self-start">
                Shop Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default InlineProductAd;
