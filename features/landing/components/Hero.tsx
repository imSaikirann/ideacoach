import HeroLayout from "./HeroLayout";
import HeroContent from "./HeroContent";
import HeroPreview from "./HeroPreview";

export default function Hero() {
  return (
    <HeroLayout
      left={<HeroContent />}
      right={<HeroPreview />}
    />
  );
}
