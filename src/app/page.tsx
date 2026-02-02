import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Now } from "@/components/sections/now";
import { Projects } from "@/components/sections/projects";
import { Life } from "@/components/sections/life";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Hero />
        <About />
        <Now />
        <Projects />
        <Life />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
