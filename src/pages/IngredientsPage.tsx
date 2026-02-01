import Layout from "@/components/layout/Layout";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { motion } from "framer-motion";

const keyIngredients = [
  {
    name: "Red Aloe Vera",
    scientific: "Aloe Sanguinalis",
    benefits: "Deep hydration, soothing, 2x more potent than green aloe",
    description:
      "Sourced from the arid regions of Rajasthan, our Red Aloe Vera is a rare variant known for its higher concentration of nutrients and superior healing properties.",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=600&h=400&fit=crop",
  },
  {
    name: "Saffron",
    scientific: "Crocus Sativus",
    benefits: "Brightening, anti-aging, improved texture",
    description:
      "Kashmiri Mongra Saffron, the finest in the world, is hand-picked at dawn to preserve its precious oils and potent antioxidant properties for radiant skin.",
    image:
      "https://images.unsplash.com/photo-1615485290382-441e4d0c9cb5?w=600&h=400&fit=crop",
  },
  {
    name: "Sandalwood",
    scientific: "Santalum Album",
    benefits: "Cooling, acne-control, skin smoothing",
    description:
      "Pure Mysore Sandalwood oil is prized for its therapeutic aroma and ability to balance skin oils while providing a gentle cooling effect.",
    image:
      "https://images.unsplash.com/photo-1629112521579-37e40e238057?w=600&h=400&fit=crop",
  },
  {
    name: "Amla",
    scientific: "Phyllanthus Emblica",
    benefits: "Hair growth, strengthening, scalp health",
    description:
      "Rich in Vitamin C, our organic Amla strengthens hair follicles from the root and prevents premature graying, used in Ayurvedic haircare for millennia.",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
  },
];

const IngredientsPage = () => {
  return (
    <Layout>
      <div className="bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={[{ label: "Ingredients" }]} />

          <div className="mt-12">
            <div className="max-w-3xl mx-auto text-center mb-20">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">
                Our Botanicals
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
                Ethically Sourced,{" "}
                <span className="text-primary italic">Purely Potent</span>
              </h1>
              <p className="text-muted-foreground text-lg italic">
                "We believe the soul of skincare lies in the purity of its
                ingredients."
              </p>
            </div>

            <div className="space-y-24">
              {keyIngredients.map((ingredient, index) => (
                <section key={ingredient.name} className="container mx-auto">
                  <div
                    className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-12 items-center`}
                  >
                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="flex-1"
                    >
                      <div className="relative group">
                        <img
                          src={ingredient.image}
                          alt={ingredient.name}
                          className="w-full h-[400px] object-cover rounded-sm shadow-xl"
                        />
                        <div className="absolute -inset-4 border border-primary/20 -z-10 group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: index % 2 === 1 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="flex-1 space-y-6"
                    >
                      <div className="space-y-2">
                        <p className="text-primary font-serif italic text-lg">
                          {ingredient.scientific}
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground m-0">
                          {ingredient.name}
                        </h2>
                      </div>
                      <div className="bg-secondary/30 p-4 border-l-2 border-primary">
                        <p className="text-sm font-medium uppercase tracking-wider text-primary mb-1">
                          Key Benefits
                        </p>
                        <p className="text-foreground">{ingredient.benefits}</p>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {ingredient.description}
                      </p>
                    </motion.div>
                  </div>
                </section>
              ))}
            </div>

            <section className="mt-32 py-20 bg-secondary/20 rounded-3xl mx-auto container px-8 text-center">
              <h2 className="font-serif text-3xl md:text-4xl mb-8">
                Our Standards
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl border-b border-primary/20 pb-2 inline-block">
                    100% Vegan
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No animal products or by-products in any Elara formulation.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl border-b border-primary/20 pb-2 inline-block">
                    Cold-Pressed
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    We use traditional extraction to preserve enzymatic life.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl border-b border-primary/20 pb-2 inline-block">
                    Sustainably Harvested
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Botanicals are picked in harmony with natural cycles.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-serif text-xl border-b border-primary/20 pb-2 inline-block">
                    No Synthetics
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Free from parabens, phthalates, and synthetic colors.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IngredientsPage;
