import Hero from "@/components/Hero";
import ContestResults from "@/components/ContestResults";
import ProfileLinks from "@/components/ProfileLinks";
import AuditProcess from "@/components/AuditProcess";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ContestResults />
      <ProfileLinks />
      <AuditProcess />
      <ContactCTA />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
