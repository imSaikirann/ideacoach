"use client";

import Container from "@/components/common/Container";
import HeroBackground from "./HeroBackground";
import HowItWorks from "./HowItWorks";
import Format from "./Format";
import Compare from "./Compare";
// import Pricing from "./Princings";
import Footer from "./Footer";
import Cta from "./Cta";
import { motion } from "framer-motion";
import { fadeInUp, viewportFadeInUp } from "@/lib/animations";

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
            <motion.div
              className="flex justify-center lg:justify-start"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              {left}
            </motion.div>

            <motion.div
              className="relative flex justify-center lg:justify-end"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              {right}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* =========================
          HOW IT WORKS
      ========================= */}
      <motion.section
        variants={viewportFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <HowItWorks />
        </Container>
      </motion.section>

      {/* =========================
          RESPONSE FORMAT
      ========================= */}
      <motion.section
        className="border-t border-border/30"
        variants={viewportFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <Format />
        </Container>
      </motion.section>

      {/* =========================
          COMPARE
      ========================= */}
      <motion.section
        className="border-t border-border/30"
        variants={viewportFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Container size="xl" className="py-14 sm:py-16 md:py-20 lg:py-24">
          <Compare />
        </Container>
      </motion.section>

      <motion.section
        className="border-t border-border/30"
        variants={viewportFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <Container size="xl" className="">
          <Cta />
        </Container>
      </motion.section>
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
