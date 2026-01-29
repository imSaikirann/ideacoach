"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/animations";

export default function Cta() {
  return (
    <motion.section
      className="mx-auto max-w-4xl px-6 py-24 text-center"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Headline */}
      <motion.h2
        className="mb-4 text-3xl font-semibold tracking-tight sm:text-4xl"
        variants={staggerItem}
      >
        Know exactly what to build next
      </motion.h2>

      {/* Sub copy */}
      <motion.p
        className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        variants={staggerItem}
      >
        Get a clear, build-ready project idea tailored to your skills 
        with features, learning goals, and next steps already mapped out.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        variants={staggerItem}
      >
        <Button
          asChild
          size="lg"
          className="gap-2 rounded-full px-8"
        >
          <Link href="/dashboard/idea-form">
            Generate my project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

       
      </motion.div>

    </motion.section>
  );
}
