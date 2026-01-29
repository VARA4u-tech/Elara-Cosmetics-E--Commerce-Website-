import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Placeholder data - replace images with actual assets
const concerns = [
  { 
    id: "acne", 
    title: "ACNE-PRONE SKIN", 
    image: "https://images.unsplash.com/photo-1510023455589-3dbbaaf1b505?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale forest/texture 
    link: "/category/face?concern=acne" 
  },
  { 
    id: "dark-circles", 
    title: "DARK CIRCLES", 
    image: "https://images.unsplash.com/photo-1549488497-60aa4de94323?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale eye/model
    link: "/category/face?concern=dark-circles" 
  },
  { 
    id: "dull-skin", 
    title: "DULL, DRY SKIN", 
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale skin texture
    link: "/category/face?concern=dull-skin" 
  },
  { 
    id: "sun-protection", 
    title: "SUN PROTECTION", 
    image: "https://images.unsplash.com/photo-1532413992378-f169ac26fff0?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale light/shadow
    link: "/category/body?concern=sun" 
  },
  { 
    id: "anti-ageing", 
    title: "ANTI-AGEING", 
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale texture
    link: "/category/face?concern=anti-ageing" 
  },
  { 
    id: "hair-thinning", 
    title: "HAIR THINNING/LOSS", 
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=400&auto=format&fit=crop&sat=-100", // Grayscale hair
    link: "/category/hair?concern=thinning" 
  },
];

const ShopByConcern = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide mb-8 text-foreground">
          Shop By Concern
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {concerns.map((item) => (
            <Link 
              key={item.id} 
              to={item.link}
              className="group flex flex-col items-center"
            >
              <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-3 bg-secondary/20">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale contrast-125"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-white/80 rounded-full flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-medium uppercase tracking-luxury text-center group-hover:text-primary transition-colors">
                {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByConcern;
