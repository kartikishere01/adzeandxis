import Hero from "@/components/Hero";
import StorySection from "@/components/StorySection";
import HoverProjectsSection from "@/components/HoverProjectsSection";
import AllWorksSection from "@/components/AllWorksSection";
import NewsroomSection from "@/components/NewsroomSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import AwardsSection from "@/components/AwardsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <StorySection />
      {/* <HoverProjectsSection /> */}
      <AllWorksSection />
      <NewsroomSection />
      <AboutPreviewSection />
      <AwardsSection />
      <ContactSection />
    </main>
  );
}
