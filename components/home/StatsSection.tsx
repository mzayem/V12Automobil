"use client";

import { useEffect, useRef, useState } from "react";
import { STATS } from "@/lib/data";

const COUNT_UP_DURATION_MS = 1800;

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

/** Splits "1,000+" into { prefix: "", target: 1000, suffix: "+", useCommas: true }. */
function parseStatValue(value: string) {
  const match = value.match(/^(\D*)([\d,]+)(\D*)$/);
  if (!match) return null;
  const [, prefix, digits, suffix] = match;
  return {
    prefix,
    suffix,
    target: Number(digits.replace(/,/g, "")),
    useCommas: digits.includes(","),
  };
}

function StatValue({ value, animate }: { value: string; animate: boolean }) {
  const parsed = parseStatValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animate || !parsed) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / COUNT_UP_DURATION_MS, 1);
      setCount(Math.round(easeOutExpo(progress) * parsed.target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate]);

  if (!parsed) return <>{value}</>;

  const displayed = animate ? count : 0;
  return (
    <>
      {parsed.prefix}
      {parsed.useCommas ? displayed.toLocaleString() : displayed}
      {parsed.suffix}
    </>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:grid-cols-3 sm:gap-8"
    >
      {STATS.map((stat, index) => (
        <div
          key={stat.label}
          className="text-center transition-all duration-700 ease-out"
          style={{
            transitionDelay: `${index * 120}ms`,
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(1rem)",
          }}
        >
          <span className={`mb-8 block h-2.5 w-full ${stat.bar}`} aria-hidden />
          <p className="font-display font-bold text-5xl text-bianco md:text-7xl leading-14">
            <StatValue value={stat.value} animate={inView} />
          </p>
          <p className="mt-3 font-serif text-sm uppercase tracking-[0.15em] text-bianco/80">
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}
