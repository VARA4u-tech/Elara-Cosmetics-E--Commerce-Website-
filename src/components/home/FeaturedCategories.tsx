import { Link } from "react-router-dom";

const featuredCategories = [
  {
    id: "soundarya",
    title: "Soundarya Collection",
    subtitle: "24K Gold Radiance",
    description: "Experience the royal anti-aging ritual",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop",
    link: "/category/face",
  },
  {
    id: "kumkumadi",
    title: "Kumkumadi Range",
    subtitle: "Brightening Rituals",
    description: "Ancient secrets for luminous skin",
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&h=600&fit=crop",
    link: "/category/face",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {featuredCategories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group relative overflow-hidden aspect-[4/3]"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-primary-foreground">
                <p className="text-xs uppercase tracking-wide-luxury text-gold-light mb-2">
                  {category.subtitle}
                </p>
                <h3 className="font-serif text-2xl md:text-3xl mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-primary-foreground/80 mb-4">
                  {category.description}
                </p>
                <span className="inline-block text-sm uppercase tracking-luxury underline-animation">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
