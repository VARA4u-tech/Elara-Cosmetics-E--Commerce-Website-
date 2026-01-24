import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryIcons from "@/components/home/CategoryIcons";
import Bestsellers from "@/components/home/Bestsellers";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import PromoBanner from "@/components/home/PromoBanner";
import IngredientsSpotlight from "@/components/home/IngredientsSpotlight";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BrandStory from "@/components/home/BrandStory";
import InstagramFeed from "@/components/home/InstagramFeed";
import NewsletterSection from "@/components/home/NewsletterSection";
import BenefitsBar from "@/components/home/BenefitsBar";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <HeroCarousel />
        <CategoryIcons />
        <Bestsellers />
        <FeaturedCategories />
        <PromoBanner />
        <NewArrivals />
        <IngredientsSpotlight />
        <TestimonialsSection />
        <BrandStory />
        <InstagramFeed />
        <NewsletterSection />
        <BenefitsBar />
      </PageTransition>
    </Layout>
  );
};

export default Index;
