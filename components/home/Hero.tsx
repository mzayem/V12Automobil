"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { REVEAL_EASE } from "@/components/motion/Reveal";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const line: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: REVEAL_EASE },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-155 items-center overflow-hidden lg:min-h-170">
      {/* Background image — drop your hero shot in /public/images/hero.jpg */}

      <Image
        src="/images/heroNew.webp"
        alt="A line-up of supercars on a cobbled London mews street at dusk"
        fill
        priority
        className="object-cover object-bottom"
      />
      {/* Left-to-right scrim so the headline stays readable */}
      <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={container}
          className="font-display text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          <motion.span variants={line} className="block text-amber-50">
            Driven by
          </motion.span>
          <motion.span variants={line} className="block text-rosso">
            Passion.
          </motion.span>
          <motion.span variants={line} className="mt-6 block text-bianco">
            Defined by
          </motion.span>
          <motion.span variants={line} className="block text-verde">
            Trust.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: REVEAL_EASE }}
          className="mt-8 flex items-center gap-4 font-serif text-lg italic text-bianco/90"
        >
          <span className="hidden h-px w-14 bg-rosso sm:block" aria-hidden />
          Carefully selected, personally assessed, passionately sold.
        </motion.p>
      </div>
    </section>
  );
}
