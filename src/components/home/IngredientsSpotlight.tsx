import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Import ingredient images
import saffronImg from "@/assets/ingredients/saffron.png";
import sandalwoodImg from "@/assets/ingredients/sandalwood.png";
import turmericImg from "@/assets/ingredients/turmeric.png";
import jasmineImg from "@/assets/ingredients/jasmine.png";
import roseImg from "@/assets/ingredients/rose.png";
import aloeVeraImg from "@/assets/ingredients/aloe-vera.png";
import neemImg from "@/assets/ingredients/neem.png";
import coconutImg from "@/assets/ingredients/coconut.png";
import amlaImg from "@/assets/ingredients/amla.png";
import honeyImg from "@/assets/ingredients/honey.png";

const ingredients = [
  {
    id: "saffron",
    name: "Saffron",
    benefit: "Brightening & Radiance",
    image: saffronImg,
  },
  {
    id: "sandalwood",
    name: "Sandalwood",
    benefit: "Soothing & Cooling",
    image: sandalwoodImg,
  },
  {
    id: "turmeric",
    name: "Turmeric",
    benefit: "Anti-inflammatory",
    image: turmericImg,
  },
  {
    id: "jasmine",
    name: "Jasmine",
    benefit: "Aromatherapy & Calm",
    image: jasmineImg,
  },
  {
    id: "rose",
    name: "Rose",
    benefit: "Hydration & Glow",
    image: roseImg,
  },
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    benefit: "Healing & Moisture",
    image: aloeVeraImg,
  },
  {
    id: "neem",
    name: "Neem",
    benefit: "Purifying & Cleansing",
    image: neemImg,
  },
  {
    id: "coconut",
    name: "Coconut",
    benefit: "Deep Nourishment",
    image: coconutImg,
  },
  {
    id: "amla",
    name: "Amla",
    benefit: "Hair Strengthening",
    image: amlaImg,
  },
  {
    id: "honey",
    name: "Honey",
    benefit: "Natural Moisturizer",
    image: honeyImg,
  },
];

const IngredientsSpotlight = () => {
  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-xs tracking-[0.3em] text-primary/70 uppercase mb-3 block">
            Nature's Treasures
          </span>
          <h2 className="text-lg sm:text-lg md:text-xl lg:text-xl font-serif text-foreground mb-4">
            Sacred Ingredients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Each formulation is crafted with time-honored Ayurvedic ingredients, 
            sourced from the purest origins to deliver transformative results.
          </p>
        </motion.div>

        {/* Ingredients Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {ingredients.map((ingredient, index) => (
            <motion.div
              key={ingredient.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={`/category/all?ingredient=${ingredient.id}`}
                className="group block"
              >
                <div className="relative aspect-square rounded-full overflow-hidden bg-secondary/50 mb-3 mx-auto w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-300 group-hover:shadow-lg">
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="font-serif text-sm md:text-base text-foreground group-hover:text-primary transition-colors duration-300">
                    {ingredient.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {ingredient.benefit}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/about#ingredients"
            className="inline-flex items-center gap-2 text-sm tracking-wide text-primary hover:text-primary/80 transition-colors group"
          >
            Discover Our Ingredient Philosophy
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default IngredientsSpotlight;
