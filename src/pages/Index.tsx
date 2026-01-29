import Layout from "@/components/layout/Layout";
import PageTransition from "@/components/ui/PageTransition";
import HeroCarousel from "@/components/home/HeroCarousel";
import VideoShowcase from "@/components/home/VideoShowcase";
import CategoryIcons from "@/components/home/CategoryIcons";
import PerfectFormula from "@/components/home/PerfectFormula";
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
import SideAdBanner from "@/components/home/SideAdBanner";
import InlineProductAd from "@/components/home/InlineProductAd";

import ShopByConcern from "@/components/home/ShopByConcern";

const Index = () => {
  return (
    <Layout>
      <PageTransition>
        <HeroCarousel />

        <CategoryIcons />
        <ShopByConcern />
        <PerfectFormula />
        <Bestsellers />
        <SideAdBanner variant="horizontal" className="container mx-auto px-4 py-8" />
        <FeaturedCategories />
        <PromoBanner />
        <NewArrivals />
        <InlineProductAd />

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
