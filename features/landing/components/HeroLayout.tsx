import React from "react"
import Container from "@/components/common/Container";
import HeroBackground from "./HeroBackground";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

export default function HeroLayout({
  left,
  right,
}: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <HeroBackground />

      <Container size="xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 min-h-screen py-20 sm:py-24 md:py-28 lg:py-32 items-start lg:items-center">
          {/* Left (Hero content) */}
          <div className="flex justify-center lg:justify-start animate-fade-in-up">
            {left}
          </div>

          {/* Right (Card / Preview) */}
          <div className="relative flex justify-center lg:justify-end mt-4 lg:mt-0 animate-fade-in-up animation-delay-200">
            {right}
          </div>
        </div>

        {/* How it works section */}
        <div className="py-20 sm:py-24 md:py-28 lg:py-32 border-t border-border/30">
          <HowItWorks />
        </div>

          <div >
          <Footer/>
        </div>

      </Container>
    </section>
  );
}
