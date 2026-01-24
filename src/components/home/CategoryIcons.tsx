import { Link } from "react-router-dom";
import { categories } from "@/data/products";

const CategoryIcons = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore our curated collections of Ayurvedic beauty essentials
          </p>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group text-center"
            >
              <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-4 rounded-full overflow-hidden border-2 border-border group-hover:border-primary transition-colors duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-sm md:text-base text-foreground group-hover:text-primary transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryIcons;
