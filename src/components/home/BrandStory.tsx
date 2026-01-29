import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-cream-dark">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs sm:text-sm uppercase tracking-wide-luxury text-primary mb-3 sm:mb-4">
            Our Heritage
          </p>
          <h2 className="font-serif text-lg sm:text-lg md:text-xl lg:text-xl text-foreground mb-3 sm:mb-3.5 leading-tight">
            The Ancient Art of{" "}
            <span className="text-primary">Luxurious Ayurveda</span>
          </h2>
          <div className="space-y-3 sm:space-y-4 text-muted-foreground mb-6 sm:mb-8 text-sm sm:text-base">
            <p>
              For centuries, Indian royalty have guarded the secrets of their legendary beauty rituals. 
              Our formulations draw from these time-honored traditions, combining rare herbs, precious 
              botanicals, and ancient Ayurvedic wisdom.
            </p>
            <p>
              Each product is meticulously crafted in small batches, using traditional cold-pressed 
              methods and hand-ground ingredients to preserve the potency of nature's finest offerings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/about" className="btn-luxury text-center">
              Our Story
            </Link>
            <Link to="/ingredients" className="btn-outline-luxury text-center">
              Our Ingredients
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
