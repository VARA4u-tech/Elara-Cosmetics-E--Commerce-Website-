import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// Import all product images
import hairImg from "@/assets/category_updates/hair.png";
import faceImg from "@/assets/category_updates/face.png";
import wellnessImg from "@/assets/category_updates/wellness.jpg";
import bodyImg from "@/assets/category_updates/body.png";
import menImg from "@/assets/category_updates/men.png";
import hairGrowthImg from "@/assets/category_updates/hair-growth.png";
import glowcellImg from "@/assets/category_updates/glowcell.png";
import niacinImg from "@/assets/category_updates/niacin.png";
import goldenGlowImg from "@/assets/category_updates/golden-glow.png";
import aloeImg from "@/assets/products/red-aloevera-splash.jpg";

// Category data with all product images mapped to Product Types
const categoryData = [
  {
    id: "conditioner",
    name: "CONDITIONER",
    image: bodyImg,
    route: "/category/hair?sub=conditioners",
  },
  {
    id: "face-serum",
    name: "FACE SERUM",
    image: faceImg,
    route: "/category/face?sub=serums",
  },
  {
    id: "shampoo",
    name: "SHAMPOO",
    image: hairImg,
    route: "/category/hair?sub=shampoos",
  },
  {
    id: "growth-serum",
    name: "GROWTH SERUM",
    image: hairGrowthImg,
    route: "/category/hair?sub=scalp%20care",
  },
  {
    id: "mens-care",
    name: "MEN'S CARE",
    image: menImg,
    route: "/category/makeup",
  },
  {
    id: "scalp-serum",
    name: "SCALP SERUM",
    image: wellnessImg,
    route: "/category/hair?sub=scalp%20care",
  },
  {
    id: "renewal-serum",
    name: "RENEWAL SERUM",
    image: glowcellImg,
    route: "/category/face?sub=serums",
  },
  {
    id: "glow-serum",
    name: "GLOW SERUM",
    image: niacinImg,
    route: "/category/face?sub=serums",
  },
  {
    id: "eye-serum",
    name: "EYE SERUM",
    image: goldenGlowImg,
    route: "/category/face?sub=eye%20care",
  },
  {
    id: "aloe-splash",
    name: "ALOE SPLASH",
    image: aloeImg,
    route: "/category/body?sub=body%20washes",
  },
];

const CategoryIcons = () => {
  return (
    <section className="py-6 sm:py-8 md:py-10 bg-background overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="container mx-auto px-4 overflow-hidden">
        <div className="flex animate-marquee">
          {[...categoryData, ...categoryData].map((category, index) => (
            <div
              key={`${category.id}-${index}`}
              className="px-1.5 md:px-2 flex-shrink-0"
            >
              <Link
                to={category.route}
                className="group relative block w-[120px] sm:w-[150px] md:w-[170px] aspect-[3/4] rounded-lg overflow-hidden shadow-sm"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />

                {/* Text Content */}
                <div className="absolute inset-0 flex items-center justify-center z-10 px-2">
                  <span className="text-white font-bold text-xs sm:text-sm uppercase tracking-wider text-center drop-shadow-lg leading-tight">
                    {category.name}
                  </span>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <ArrowRight className="w-2.5 h-2.5" />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
