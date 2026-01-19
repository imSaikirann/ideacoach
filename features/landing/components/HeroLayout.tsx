import Container from "@/components/common/Container";
import HeroBackground from "./HeroBackground";
import HowItWorks from "./HowItWorks";
import Format from "./Format";
import Compare from "./Compare";
import Pricing from "./Princings";
import Footer from "./Footer";

export default function HeroLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <main className="relative overflow-hidden">
      <HeroBackground />

      {/* HERO */}
      <section className="min-h-screen">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 min-h-screen py-20 sm:py-24 md:py-28 lg:py-32 items-start lg:items-center">
            <div className="flex justify-center lg:justify-start animate-fade-in-up">
              {left}
            </div>

            <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0 animate-fade-in-up animation-delay-200">
              {right}
            </div>
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-20 sm:py-24 md:py-28 lg:py-32">
          <HowItWorks />
        </Container>
      </section>

      {/* RESPONSE FORMAT */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-20 sm:py-24 md:py-28 lg:py-32">
          <Format />
        </Container>
      </section>

      {/* COMPARE */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-20 sm:py-24 md:py-28 lg:py-32">
          <Compare />
        </Container>
      </section>

      {/* PRICING */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-20 sm:py-24 md:py-28 lg:py-32">
          <Pricing />
        </Container>
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
