import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ProductCard from "@/components/product/ProductCard";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const newArrivals = getNewArrivals();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      // Scroll by one full view (4 items on desktop)
      const newScroll = scrollLeft + clientWidth;
      
      // Check if we reached the end (with small buffer)
      if (newScroll >= scrollWidth - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollTo({ left: newScroll, behavior: "smooth" });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-4 sm:mb-5 md:mb-6">
          <div>
            <p className="text-xs sm:text-sm uppercase tracking-wide-luxury text-primary mb-2">
              Just Arrived
            </p>
            <h2 className="font-serif text-lg sm:text-lg md:text-xl lg:text-2xl text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/category/face?sort=newest"
            className="mt-2 sm:mt-3 md:mt-0 text-[10px] sm:text-xs uppercase tracking-luxury text-foreground hover:text-primary transition-colors underline-animation"
          >
            View All New Arrivals
          </Link>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-none -mx-2 px-2 sm:mx-0 sm:px-0"
        >
          {newArrivals.map((product) => (
            <div key={product.id} className="w-1/2 sm:w-1/3 md:w-1/4 flex-shrink-0 p-2 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
