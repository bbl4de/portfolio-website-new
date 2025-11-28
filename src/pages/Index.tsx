import Hero from "@/components/Hero";
import ContestResultsCarousel from "@/components/ContestResultsCarousel";
import ProfileLinks from "@/components/ProfileLinks";
import AuditProcess from "@/components/AuditProcess";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import LightspeedSection from "@/components/LightspeedSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ContestResultsCarousel />
      <ProfileLinks />
      <LightspeedSection>
        <ContactCTA />
        <AuditProcess />
      </LightspeedSection>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
