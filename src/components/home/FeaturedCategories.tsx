import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const categories = [
  {
    id: "hair",
    name: "Hair Care",
    description: "Nourishing treatments for lustrous, healthy hair",
    image: "https://i.ibb.co/4xvnC43/c8393c86-e1a5-40c5-9756-f28112c7f9ea.png",
    link: "/category/hair",
  },
  {
    id: "face",
    name: "Face Care",
    description: "Radiant skincare rooted in Ayurvedic wisdom",
    image: "https://i.ibb.co/1YvzkCgY/c4e44fd7-807a-4e72-b847-b4057613301c.png",
    link: "/category/face",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs tracking-[0.3em] text-primary/70 uppercase mb-3 block font-medium">
            Explore Our Collections
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-foreground">
            Featured Categories
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Link
                to={category.link}
                className="group block relative overflow-hidden rounded-lg aspect-[3/2] sm:aspect-[4/3] md:aspect-[16/10]"
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8">
                  <h3 className="font-serif text-xl sm:text-2xl md:text-3xl text-white mb-2 group-hover:text-primary-foreground transition-colors leading-tight">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm md:text-base mb-3 sm:mb-4 max-w-xs leading-relaxed">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white text-xs sm:text-sm font-medium group-hover:gap-3 transition-all">
                    Shop Collection
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
