"use client";

import { useEffect, useState } from "react";
import type { HomeContent, MotionEffect } from "@/lib/types";

type Props = {
  motion: HomeContent["motion"];
  children: React.ReactNode;
};

function slideMotionClass(effect: MotionEffect, index: number) {
  if (effect === "still" || effect === "fade") return "";
  if (effect === "zoom-in") return "hero-zoom-in";
  if (effect === "zoom-out") return "hero-zoom-out";
  if (effect === "pan") return index % 2 === 0 ? "hero-pan" : "hero-pan-alt";
  return index % 2 === 0 ? "hero-kenburns" : "hero-kenburns-alt";
}

export function HeroMotion({ motion, children }: Props) {
  const images = motion.images.filter((img) => img.src);
  const [index, setIndex] = useState(0);
  const effect = motion.effect || "kenburns";
  const showVideo =
    Boolean(motion.videoUrl) && (motion.mode === "video" || motion.mode === "both");
  const showSlides =
    images.length > 0 && (motion.mode === "slideshow" || motion.mode === "both" || !showVideo);

  useEffect(() => {
    if (!showSlides || images.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, Math.max(3000, motion.intervalMs || 7000));
    return () => window.clearInterval(timer);
  }, [showSlides, images.length, motion.intervalMs]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brand-deep text-white">
      {showVideo && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={motion.videoUrl}
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {showSlides &&
        images.map((image, i) => (
          <div
            key={`${image.src}-${i}`}
            className={`absolute inset-0 bg-cover bg-center ${
              i === index ? "opacity-100" : "opacity-0"
            } ${i === index ? slideMotionClass(effect, i) : ""}`}
            style={{
              backgroundImage: `url(${image.src})`,
              transition: "opacity 1.2s ease",
              animationDuration: `${Math.max(8, Math.round((motion.intervalMs || 7000) / 1000) + 4)}s`,
            }}
            aria-hidden={i !== index}
          />
        ))}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/82 to-brand/30" />
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-accent/20 diagonal-cut lg:block" />
      <div className="grain absolute inset-0 opacity-25 mix-blend-overlay" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-28 pt-28 lg:justify-center lg:px-8 lg:pb-24">
        {children}
      </div>
      {showSlides && images.length > 1 && (
        <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2 sm:bottom-8">
          {images.map((image, i) => (
            <button
              key={`${image.src}-dot-${i}`}
              type="button"
              aria-label={`Show image ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-accent" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
