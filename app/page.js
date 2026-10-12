import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import HeroTable from "@/components/HeroTable";
import FoodTicker from "@/components/FoodTicker";
import IntroSection from "@/components/IntroSection";
import NhaTrangFeature from "@/components/NhaTrangFeature";
import SoupImmersion from "@/components/SoupImmersion";
import MenuSection from "@/components/Menu/MenuSection";
import BanhXeoFeature from "@/components/BanhXeoFeature";
import SpecialsSection from "@/components/SpecialsSection";
import PhotoRiver from "@/components/PhotoRiver";
import TableDetails from "@/components/TableDetails";
import BrownInterlude from "@/components/BrownInterlude";
import RiceNoodleIndex from "@/components/RiceNoodleIndex";
import DrinksDessert from "@/components/DrinksDessert";
import FeedbackBand from "@/components/FeedbackBand";
import InteriorSection from "@/components/InteriorSection";
import HoursSection from "@/components/HoursSection";
import LocationPostcard from "@/components/LocationPostcard";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroTable />
        <FoodTicker />
        <IntroSection />
        <NhaTrangFeature />
        <SoupImmersion />
        <MenuSection />
        <BanhXeoFeature />
        <SpecialsSection />
        <PhotoRiver />
        <TableDetails />
        <BrownInterlude />
        <RiceNoodleIndex />
        <DrinksDessert />
        <FeedbackBand />
        <InteriorSection />
        <HoursSection />
        <LocationPostcard />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
