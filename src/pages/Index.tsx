import Layout from "@/components/layout/Layout";
import HeroCarousel from "@/components/home/HeroCarousel";
import CategoryIcons from "@/components/home/CategoryIcons";
import Bestsellers from "@/components/home/Bestsellers";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import NewArrivals from "@/components/home/NewArrivals";
import BrandStory from "@/components/home/BrandStory";
import BenefitsBar from "@/components/home/BenefitsBar";

const Index = () => {
  return (
    <Layout>
      <HeroCarousel />
      <CategoryIcons />
      <Bestsellers />
      <FeaturedCategories />
      <NewArrivals />
      <BrandStory />
      <BenefitsBar />
    </Layout>
  );
};

export default Index;
