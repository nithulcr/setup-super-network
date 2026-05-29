import { Hero } from "@/components/hero";
import { MainSection } from "@/components/main-section";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <MainSection />

    </main>
  );
}
