import { Link } from "react-router-dom";
import { Leaf, Heart, Award, Users } from "lucide-react";
import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const values = [
  {
    icon: Leaf,
    title: "Pure Ayurveda",
    description:
      "Every formulation is rooted in ancient Ayurvedic wisdom, using only the purest natural ingredients.",
  },
  {
    icon: Heart,
    title: "Handcrafted Care",
    description:
      "Our products are made in small batches using traditional methods to preserve their potency.",
  },
  {
    icon: Award,
    title: "Luxurious Quality",
    description:
      "We source rare botanicals and precious ingredients from across India for uncompromising quality.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We work directly with local farmers and artisans, supporting traditional livelihoods.",
  },
];

const milestones = [
  {
    year: "2000",
    title: "The Beginning",
    description:
      "Founded with a vision to revive ancient Ayurvedic beauty rituals",
  },
  {
    year: "2005",
    title: "First Boutique",
    description: "Opened our first luxury boutique in the heart of Delhi",
  },
  {
    year: "2010",
    title: "National Recognition",
    description: "Became India's leading luxury Ayurvedic brand",
  },
  {
    year: "2015",
    title: "International Expansion",
    description: "Expanded to premium retail partners worldwide",
  },
  {
    year: "2020",
    title: "Sustainability Pledge",
    description: "Committed to 100% sustainable packaging by 2025",
  },
];

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=800&fit=crop"
          alt="Elara Cosmetics Heritage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={[{ label: "About Us" }]} />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-4 max-w-2xl">
              The Ancient Art of{" "}
              <span className="text-gold-light">Luxurious Ayurveda</span>
            </h1>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-4">
                Our Heritage
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                A Legacy of Beauty & Tradition
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For centuries, Indian royalty have guarded the secrets of
                  their legendary beauty rituals. Elara Cosmetics was born from
                  a deep reverence for this ancient wisdom and a desire to share
                  these treasures with the world.
                </p>
                <p>
                  Our founder's journey began in the foothills of the Himalayas,
                  learning from traditional Vaidyas who had preserved Ayurvedic
                  knowledge for generations. Each recipe, each ritual, carried
                  the wisdom of millennia.
                </p>
                <p>
                  Today, we combine these time-honored traditions with the
                  finest botanical ingredients, creating luxurious formulations
                  that honor the past while embracing the future.
                </p>
              </div>
              <div className="mt-6 p-6 bg-secondary/20 rounded-lg border border-primary/10">
                <h3 className="font-serif text-xl mb-2 text-primary">
                  Our Mission
                </h3>
                <p className="text-sm">
                  To bring the transformative power of authentic Ayurveda to the
                  modern world, creating a global community committed to
                  conscious, holistic beauty.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=800&fit=crop"
                alt="Traditional Ayurvedic ingredients"
                className="w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-primary -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
              Our Values
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              What We Stand For
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="text-center fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-primary rounded-full flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-serif text-xl mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
              Our Journey
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground">
              Milestones
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className="flex gap-6 md:gap-12 mb-12 last:mb-0 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-20 md:w-24">
                  <span className="font-serif text-2xl md:text-3xl text-primary">
                    {milestone.year}
                  </span>
                </div>
                <div className="relative pl-6 md:pl-8 border-l-2 border-primary/30 pb-8">
                  <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                  <h3 className="font-serif text-xl mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent text-accent-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            Experience the Elara Cosmetics Difference
          </h2>
          <p className="text-accent-foreground/80 max-w-xl mx-auto mb-8">
            Discover our collections and begin your journey into the world of
            luxurious Ayurveda.
          </p>
          <Link
            to="/category/face"
            className="btn-luxury bg-background text-foreground hover:bg-secondary"
          >
            Shop Collections
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
