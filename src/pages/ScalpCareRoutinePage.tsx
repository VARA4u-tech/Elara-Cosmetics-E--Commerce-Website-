import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, Star, Sparkles, Droplets, Shield, Clock, ArrowRight, ShoppingBag } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { getProductById, formatPrice } from "@/data/products";
import { cn } from "@/lib/utils";

const ScalpCareRoutinePage = () => {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState<string | null>(null);

  const serum = getProductById("elara-anti-dandruff-serum");
  const shampoo = getProductById("elara-anti-dandruff-shampoo");

  const bundlePrice = (serum?.price || 0) + (shampoo?.price || 0);
  const bundleOriginalPrice = (serum?.originalPrice || serum?.price || 0) + (shampoo?.originalPrice || shampoo?.price || 0);
  const bundleSavings = bundleOriginalPrice - bundlePrice;

  const handleAddToCart = (productId: string) => {
    const product = productId === "serum" ? serum : shampoo;
    if (product) {
      addItem(product);
      setAddedToCart(productId);
      setTimeout(() => setAddedToCart(null), 2000);
    }
  };

  const handleAddBundleToCart = () => {
    if (serum) addItem(serum);
    if (shampoo) addItem(shampoo);
    setAddedToCart("bundle");
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const routineSteps = [
    {
      step: 1,
      title: "Cleanse",
      product: "Anti-Dandruff Shampoo",
      description: "Start by wetting your hair thoroughly. Apply the Anti-Dandruff Shampoo and massage gently into your scalp for 2-3 minutes. The piroctone olamine and botanical extracts work to remove flakes and balance scalp microbiome.",
      icon: Droplets,
    },
    {
      step: 2,
      title: "Treat",
      product: "Anti-Dandruff Serum",
      description: "After washing and towel-drying your hair, apply the Anti-Dandruff Serum directly to your scalp. Massage gently to ensure absorption. For best results, leave overnight and style as usual in the morning.",
      icon: Sparkles,
    },
    {
      step: 3,
      title: "Protect",
      product: "Daily Maintenance",
      description: "Use this routine 2-3 times per week for optimal results. The powerful combination of biotin, niacin, and tea tree oil will restore your scalp's natural health and prevent dandruff from returning.",
      icon: Shield,
    },
  ];

  const benefits = [
    "Eliminates dandruff and flakes",
    "Soothes itchy, irritated scalp",
    "Restores scalp's natural microbiome",
    "Strengthens hair from root to tip",
    "Leaves hair soft and manageable",
    "100% effective against dandruff",
  ];

  const keyIngredients = [
    {
      name: "Piroctone Olamine",
      benefit: "Powerful anti-dandruff agent that eliminates flakes without harsh chemicals",
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=200&h=200&fit=crop",
    },
    {
      name: "Tea Tree Oil",
      benefit: "Natural antibacterial and antifungal properties to maintain scalp health",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=200&h=200&fit=crop",
    },
    {
      name: "Biotin & Niacin",
      benefit: "Essential vitamins that nourish hair follicles and promote healthy growth",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop",
    },
    {
      name: "Botanical Extract Blend",
      benefit: "Spinach, kale, rosemary, and neem work together to soothe and protect",
      image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=200&h=200&fit=crop",
    },
  ];

  const testimonials = [
    {
      name: "Riya Mehta",
      location: "Mumbai",
      rating: 5,
      text: "I've struggled with dandruff for years. After just 2 weeks of using this combo, my scalp is completely clear. Life-changing!",
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    },
    {
      name: "Arjun Patel",
      location: "Delhi",
      rating: 5,
      text: "Finally found something that actually works. No more embarrassing white flakes on my shoulders. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      name: "Sneha Reddy",
      location: "Bangalore",
      rating: 5,
      text: "The serum feels so soothing on my itchy scalp. Love that it's overnight - wake up with a fresh, healthy scalp!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  return (
    <Layout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm uppercase tracking-luxury font-medium rounded-full mb-6">
                  Complete Scalp Care Solution
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
                  Your Journey to a <span className="text-primary">Dandruff-Free</span> Scalp
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                  Experience the power of our clinically-proven Anti-Dandruff duo. Combining ancient Ayurvedic wisdom with modern science for lasting results.
                </p>
                
                <div className="flex flex-wrap gap-4 mb-8">
                  <Button onClick={handleAddBundleToCart} size="lg" className="gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    {addedToCart === "bundle" ? "Added!" : `Get the Bundle - ${formatPrice(bundlePrice)}`}
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <a href="#routine">See the Routine</a>
                  </Button>
                </div>

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-primary" />
                    <span>Save {formatPrice(bundleSavings)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Results in 2 weeks</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative grid grid-cols-2 gap-6">
                  {serum && (
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border/50">
                      <img
                        src={serum.image}
                        alt={serum.name}
                        className="w-full aspect-square object-cover rounded-xl mb-4"
                      />
                      <h3 className="font-serif text-lg mb-1">{serum.name}</h3>
                      <p className="text-primary font-medium">{formatPrice(serum.price)}</p>
                    </div>
                  )}
                  {shampoo && (
                    <div className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-border/50 mt-12">
                      <img
                        src={shampoo.image}
                        alt={shampoo.name}
                        className="w-full aspect-square object-cover rounded-xl mb-4"
                      />
                      <h3 className="font-serif text-lg mb-1">{shampoo.name}</h3>
                      <p className="text-primary font-medium">{formatPrice(shampoo.price)}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Benefits Strip */}
        <section className="py-8 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
              {benefits.slice(0, 4).map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Routine */}
        <section id="routine" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">Step-by-Step Guide</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Your Scalp Care Routine
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Follow this simple 3-step routine to achieve a healthy, dandruff-free scalp
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {routineSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  {index < routineSteps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-1/2" />
                  )}
                  
                  <div className="bg-secondary/30 p-8 rounded-2xl text-center h-full">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <step.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-xs uppercase tracking-luxury text-primary mb-2 block">Step {step.step}</span>
                    <h3 className="font-serif text-2xl mb-2">{step.title}</h3>
                    <p className="text-sm text-primary font-medium mb-4">{step.product}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Ingredients */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">Powerful Ingredients</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                The Science Behind the Solution
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {keyIngredients.map((ingredient, index) => (
                <motion.div
                  key={ingredient.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-6 rounded-xl text-center"
                >
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                  />
                  <h3 className="font-serif text-lg mb-2">{ingredient.name}</h3>
                  <p className="text-sm text-muted-foreground">{ingredient.benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Product Cards */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">Shop the Routine</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Complete Your Collection
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { product: shampoo, key: "shampoo", label: "Step 1: Cleanse" },
                { product: serum, key: "serum", label: "Step 2: Treat" },
              ].map(({ product, key, label }) => product && (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-secondary/30 rounded-2xl overflow-hidden"
                >
                  <div className="grid sm:grid-cols-2">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 sm:h-full object-cover"
                      />
                    </Link>
                    <div className="p-6 flex flex-col justify-center">
                      <span className="text-xs uppercase tracking-luxury text-primary mb-2">{label}</span>
                      <h3 className="font-serif text-xl mb-2">{product.name}</h3>
                      
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"
                            )}
                          />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">({product.reviews})</span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="flex items-center gap-3 mb-4">
                        <span className="font-serif text-xl">{formatPrice(product.price)}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>

                      <Button onClick={() => handleAddToCart(key)} className="w-full">
                        {addedToCart === key ? "Added!" : "Add to Bag"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bundle CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-8 max-w-2xl mx-auto text-center"
            >
              <h3 className="font-serif text-2xl mb-3">Get Both & Save</h3>
              <p className="text-muted-foreground mb-4">
                Purchase the complete scalp care routine and save {formatPrice(bundleSavings)}
              </p>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-2xl font-serif text-primary">{formatPrice(bundlePrice)}</span>
                <span className="text-lg text-muted-foreground line-through">{formatPrice(bundleOriginalPrice)}</span>
              </div>
              <Button onClick={handleAddBundleToCart} size="lg" className="gap-2">
                <ShoppingBag className="w-5 h-5" />
                {addedToCart === "bundle" ? "Added to Bag!" : "Add Bundle to Bag"}
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-wide-luxury text-primary mb-3">Customer Stories</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
                Real Results, Real People
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-6 rounded-xl"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Ready for a Healthier Scalp?</h2>
            <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
              Join thousands of happy customers who have transformed their scalp health with our Anti-Dandruff routine.
            </p>
            <Button
              onClick={handleAddBundleToCart}
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              Start Your Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </section>
      </PageTransition>
    </Layout>
  );
};

export default ScalpCareRoutinePage;
