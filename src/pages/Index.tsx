import Hero from "@/components/Hero";
import ContestResults from "@/components/ContestResults";
import ProfileLinks from "@/components/ProfileLinks";
import Credentials from "@/components/Credentials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ContestResults />
      <ProfileLinks />
      <Credentials />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;
