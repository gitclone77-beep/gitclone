import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageTransition } from "@/components/layout/PageTransition";
import { DashboardPreview } from "@/components/sections/DashboardPreview";
import { ExploreSection } from "@/components/sections/ExploreSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DashboardPreview />
        <ExploreSection />
        <PricingSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </PageTransition>
  );
}
