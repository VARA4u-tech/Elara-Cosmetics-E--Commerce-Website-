import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { Link } from "react-router-dom";

const SustainabilityPage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Sustainability" }]} />

          <div className="mt-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                  Our Commitment
                </p>
                <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
                  Nurturing the{" "}
                  <span className="italic text-primary">Sacred Earth</span>
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  At Elara Cosmetics, we believe that true beauty must be
                  sustainable. Our commitment to Earth is as strong as our
                  commitment to your skin.
                </p>
              </div>

              <div className="relative h-[400px] mb-20 overflow-hidden rounded-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&h=600&fit=crop"
                  alt="Nature and sustainability"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white font-serif text-2xl md:text-3xl text-center px-6 italic">
                    "Taking only what we need, giving back more than we take."
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-24">
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl text-foreground border-b border-primary/20 pb-4">
                    Conscious Sourcing
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We partner directly with small-scale farmers across the
                    Indian subcontinent who practice regenerative agriculture.
                    By supporting traditional farming methods, we ensure the
                    biodiversity of our soil remains healthy for generations to
                    come.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Zero-pesticide cultivation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Fair-trade pricing above market standards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Protection of rare botanical species</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h2 className="font-serif text-3xl text-foreground border-b border-primary/20 pb-4">
                    Thoughtful Packaging
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our luxury aesthetic doesn't come at the Earth's expense. We
                    are on a journey to eliminate virgin plastics from our
                    entire supply chain by 2025, favoring glass, aluminum, and
                    FSC-certified paper.
                  </p>
                  <ul className="space-y-3 text-sm text-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Infinite recyclability with glass and metal</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Soy-based inks for all printing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>Biodegradable shipping materials</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-secondary/20 p-10 rounded-3xl text-center mb-24">
                <h2 className="font-serif text-3xl mb-6">Our 2024 Impact</h2>
                <div className="grid sm:grid-cols-3 gap-8">
                  <div>
                    <p className="text-4xl font-serif text-primary mb-2">
                      15,000+
                    </p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Trees Planted
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-serif text-primary mb-2">
                      2 Tons
                    </p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Plastic Saved
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-serif text-primary mb-2">120</p>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground">
                      Artisan Families Supported
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-serif text-2xl mb-6">
                  Join Our Circular Journey
                </h3>
                <p className="text-muted-foreground mb-8 text-sm max-w-lg mx-auto leading-relaxed">
                  Bring your empty Elara glass jars back to any of our boutiques
                  and receive a 10% discount on your next purchase as a token of
                  our gratitude to the Earth.
                </p>
                <Link
                  to="/stores"
                  className="text-primary font-medium hover:underline"
                >
                  Find a participating boutique →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SustainabilityPage;
