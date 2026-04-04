import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import AllWorksSection from "@/components/AllWorksSection";
import NewsroomSection from "@/components/NewsroomSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <main>
      <Marquee isOpen={false} />
      <Hero />
      <StorySection />
      <AllWorksSection />
      <NewsroomSection />
      <AboutPreviewSection />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}
