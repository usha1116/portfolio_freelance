import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Layers3D from "@/components/Layers3D";
import Services from "@/components/Services";
import WhyMe from "@/components/WhyMe";
import Experience from "@/components/Experience";
import Process from "@/components/Process";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Layers3D />
        <Work />
        <Services />
        <WhyMe />
        <Experience />
        <Process />
        <Contact />
      </main>
    </>
  );
}
