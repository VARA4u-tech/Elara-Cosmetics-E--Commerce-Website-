import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { getBestsellers } from "@/data/products";

const Bestsellers = () => {
  const bestsellers = getBestsellers();

  return (
    <section className="py-16 md:py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-wide-luxury text-primary mb-2">
              Customer Favorites
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Bestsellers
            </h2>
          </div>
          <Link
            to="/category/face?sort=bestselling"
            className="mt-4 md:mt-0 text-sm uppercase tracking-luxury text-foreground hover:text-primary transition-colors underline-animation"
          >
            View All Bestsellers
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestsellers;
