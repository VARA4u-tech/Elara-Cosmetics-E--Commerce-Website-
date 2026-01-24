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
    <section className="py-12 md:py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div key={benefit.id} className="text-center">
              <span className="text-3xl md:text-4xl mb-3 block">{benefit.icon}</span>
              <h3 className="font-serif text-lg text-accent-foreground mb-1">
                {benefit.title}
              </h3>
              <p className="text-xs text-accent-foreground/70 uppercase tracking-luxury">
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
