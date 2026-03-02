import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SelectedSystems } from "@/components/sections/SelectedSystems";
import { DevLog } from "@/components/sections/DevLog";
import { EngineeringNotes } from "@/components/sections/EngineeringNotes";
import { AboutContact } from "@/components/sections/AboutContact";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-brand-highlight/30 selection:text-brand-text overflow-x-hidden">
      <Navbar />
      <Hero />
      <SelectedSystems />
      <DevLog />
      <EngineeringNotes />
      <AboutContact />
    </main>
  );
}
