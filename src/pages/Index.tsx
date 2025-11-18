import Hero from "@/components/Hero";
import ContestResults from "@/components/ContestResults";
import ProfileLinks from "@/components/ProfileLinks";
import AuditProcess from "@/components/AuditProcess";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ContestResults />
      <ProfileLinks />
      <AuditProcess />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
