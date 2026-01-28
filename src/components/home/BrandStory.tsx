import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 bg-cream-dark">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-wide-luxury text-primary mb-4">
            Our Heritage
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 leading-tight">
            The Ancient Art of{" "}
            <span className="text-primary">Luxurious Ayurveda</span>
          </h2>
          <div className="space-y-4 text-muted-foreground mb-8">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
