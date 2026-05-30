import { Hero } from "@/components/hero";
import { MainSection2 } from "@/components/main-section2";
import { MainSection } from "@/components/main-section";
import { MainSection3 } from "@/components/main-section3";
import { MainSection4 } from "@/components/main-section4";
import { MainSectionWrapper } from "@/components/MainSectionWrapper";






export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <MainSectionWrapper>
        <MainSection />
        <MainSection2 />
      </MainSectionWrapper>
      <MainSection3 />
      {/* <MainSection4 /> */}





    </main>
  );
}
