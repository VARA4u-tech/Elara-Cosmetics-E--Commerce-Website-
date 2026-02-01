const benefits = [
  {
    id: 1,
    title: "100% Natural",
    description: "Pure Ayurvedic ingredients",
    icon: "🌿",
  },
  {
    id: 2,
    title: "Cruelty Free",
    description: "Never tested on animals",
    icon: "🐰",
  },
  {
    id: 3,
    title: "Sustainably Sourced",
    description: "Ethical ingredient sourcing",
    icon: "🌍",
  },
  {
    id: 4,
    title: "Handcrafted",
    description: "Traditional methods preserved",
    icon: "✨",
  },
];

const BenefitsBar = () => {
  return (
    <section className="py-2 sm:py-3 md:py-4 lg:py-4 bg-accent">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center">
              <span className="text-2xl md:text-3xl mb-2 block">
                {benefit.icon}
              </span>
              <h3 className="font-serif text-base md:text-lg text-accent-foreground mb-1 leading-tight">
                {benefit.title}
              </h3>
              <p className="text-xs md:text-sm text-accent-foreground/70 uppercase tracking-wide leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsBar;
