import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const newArrivals = getNewArrivals();

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-sm uppercase tracking-wide-luxury text-primary mb-2">
              Just Arrived
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/category/face?sort=newest"
            className="mt-4 md:mt-0 text-sm uppercase tracking-luxury text-foreground hover:text-primary transition-colors underline-animation"
          >
            View All New Arrivals
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
