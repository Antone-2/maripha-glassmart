import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import AboutPreview from "@/components/home/AboutPreview";
import StatsSection from "@/components/home/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import MapSection from "@/components/home/MapSection";
import CTASection from "@/components/home/CTASection";
import { SEO } from "@/components/SEO";

const Index = () => {
  return (
    <>
      <SEO
        title="Home"
        description="Maripha Glassmart - Your trusted supplier of quality glass, paints, and sanitary ware in Busia, Kenya. Expert glass cutting, mirrors, paints, sinks, toilets, and showers."
        keywords="glass, mirrors, paints, sanitary ware, Busia, Kenya, glass cutting, windows, doors, showers, sinks, toilets"
      />
      <Layout>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <AboutPreview />
        <StatsSection />
        <TestimonialsSection />
        <MapSection />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
