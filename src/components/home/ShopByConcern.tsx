import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Images
import acneImg from "@/assets/Shop By Concern/Acne-Prone-Skin.jpg";
import antiAgingImg from "@/assets/Shop By Concern/Anti-Aging.avif";
import dandruffImg from "@/assets/Shop By Concern/Dandruff.avif";
import darkCirclesImg from "@/assets/Shop By Concern/Dark-Circles.avif";
import hairThinningImg from "@/assets/Shop By Concern/Hair-Thinning-Loss.avif";
import stretchMarksImg from "@/assets/Shop By Concern/Stretchmarks.avif";
import sunProtectionImg from "@/assets/Shop By Concern/Sun-Protection.avif";

const concerns = [
  {
    id: "acne",
    title: "ACNE-PRONE SKIN",
    image: acneImg,
    link: "/category/face?concern=acne"
  },
  {
    id: "anti-aging",
    title: "ANTI-AGEING",
    image: antiAgingImg,
    link: "/category/face?concern=anti-ageing"
  },
  {
    id: "dandruff",
    title: "DANDRUFF",
    image: dandruffImg,
    link: "/category/hair?concern=dandruff"
  },
  {
    id: "dark-circles",
    title: "DARK CIRCLES",
    image: darkCirclesImg,
    link: "/category/face?concern=dark-circles"
  },
  {
    id: "hair-thinning",
    title: "HAIR THINNING",
    image: hairThinningImg,
    link: "/category/hair?concern=thinning"
  },
  {
    id: "stretch-marks",
    title: "STRETCH MARKS",
    image: stretchMarksImg,
    link: "/category/body?concern=stretch-marks"
  },
  {
    id: "sun-protection",
    title: "SUN PROTECTION",
    image: sunProtectionImg,
    link: "/category/body?concern=sun"
  },
];

const ShopByConcern = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-medium uppercase tracking-wide mb-8 text-foreground">
          Shop By Concern
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
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
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
