import Container from "@/components/common/Container";
import HeroBackground from "./HeroBackground";
import HowItWorks from "./HowItWorks";
import Format from "./Format";
import Compare from "./Compare";
// import Pricing from "./Princings";
import Footer from "./Footer";
import Cta from "./Cta";

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

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="relative">
        <Container size="xl">
          <div
            className="
              grid grid-cols-1 lg:grid-cols-2
              gap-10 lg:gap-14 xl:gap-20
              min-h-[85vh]
              py-16 sm:py-20 md:py-24
              items-center
            "
          >
            <div className="flex justify-center lg:justify-start animate-fade-in-up">
              {left}
            </div>

            <div className="relative flex justify-center lg:justify-end animate-fade-in-up animation-delay-200">
              {right}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <section>
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <HowItWorks />
        </Container>
      </section>

      {/* =========================
          RESPONSE FORMAT
      ========================= */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <Format />
        </Container>
      </section>

      {/* =========================
          COMPARE
      ========================= */}
      <section className="border-t border-border/30">
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <Compare />
        </Container>
      </section>

       <section className="border-t border-border/30">
        <Container size="xl" className="">
          <Cta />
        </Container>
      </section>
      {/* =========================
          PRICING (OPTIONAL)
      ========================= */}
      {/*
      <section className="border-t border-border/30">
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <Pricing />
        </Container>
      </section>
      */}

      {/* =========================
          FOOTER
      ========================= */}
      <Footer />
    </main>
  );
}
