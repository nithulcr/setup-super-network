import { Hero } from "@/components/hero";
import { MainSection } from "@/components/main-section";
import { MainSection2 } from "@/components/main-section2";
import { MainSectioncopy } from "@/components/main-sectioncopy";




export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <MainSection />
      <MainSection2 />
      <MainSectioncopy />



    </main>
  );
}
