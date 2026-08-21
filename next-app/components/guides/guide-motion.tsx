"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GuideMotion() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-guide-hero] > *", {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
      });

      gsap.utils.toArray<HTMLElement>("[data-guide-reveal]").forEach((element) => {
        gsap.from(element, {
          opacity: 0,
          y: 34,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-guide-image]").forEach((element) => {
        gsap.fromTo(
          element.querySelector("img"),
          { scale: 1.045 },
          { scale: 1, ease: "none", scrollTrigger: { trigger: element, start: "top bottom", end: "bottom top", scrub: 0.6 } },
        );
      });

      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: "[data-guide-article]", start: "top top", end: "bottom bottom", scrub: 0.2 },
      });
    });

    return () => context.revert();
  }, []);

  return <div className="guide-progress" aria-hidden="true"><div ref={progressRef} /></div>;
}
