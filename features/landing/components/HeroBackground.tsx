
export default function HeroBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-white">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-neutral-100/50 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-neutral-50/50 blur-3xl"></div>
    </div>
  );
}
