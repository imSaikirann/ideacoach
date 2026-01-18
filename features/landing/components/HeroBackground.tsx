
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-[#0F0E0E]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #541212 1px, transparent 1px),
            linear-gradient(to bottom, #541212 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-[#541212]/10 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-[#2A1F1F]/30 blur-3xl"></div>
    </div>
  );
}
