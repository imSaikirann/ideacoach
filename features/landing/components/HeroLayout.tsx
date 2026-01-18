import Container from "@/components/common/Container";
import HeroBackground from "./HeroBackground";
import HowItWorks from "./HowItWorks";

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
  <div
    className="
      grid
      grid-cols-1
      lg:grid-cols-2
      gap-12
      lg:gap-16
      xl:gap-20
      min-h-screen
      py-16
      sm:py-20
      md:py-24
      lg:py-32
      items-start
      lg:items-center
    "
  >
    {/* Left (Hero content) */}
    <div className="flex justify-center lg:justify-start">
      {left}
    </div>

    {/* Right (Card / Preview) */}
    <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
      {right}
    </div>
  </div>

  <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-16 sm:pb-20 md:pb-24">
    <HowItWorks />
  </div>
</Container>

    </section>
  );
}
