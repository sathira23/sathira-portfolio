import { useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import FloatingCode from "./FloatingCode";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

export default function BubbleLens({ src, alt }) {
  const stageRef = useRef(null);
  const lensRef = useRef(null);
  const settersRef = useRef(null);

  useEffect(() => {
    const lens = lensRef.current;

    if (!lens) {
      return undefined;
    }

    gsap.set(lens, { x: 178, y: 122, opacity: 0.9 });

    settersRef.current = {
      xTo: gsap.quickTo(lens, "x", { duration: 0.35, ease: "power3.out" }),
      yTo: gsap.quickTo(lens, "y", { duration: 0.35, ease: "power3.out" }),
      opacityTo: gsap.quickTo(lens, "opacity", {
        duration: 0.25,
        ease: "power2.out",
      }),
    };

    return () => {
      settersRef.current = null;
    };
  }, []);

  const moveLens = useCallback((event) => {
    const stage = stageRef.current;
    const lens = lensRef.current;
    const setters = settersRef.current;

    if (!stage || !lens || !setters) {
      return;
    }

    const rect = stage.getBoundingClientRect();
    const lensSize = lens.offsetWidth;
    const x = clamp(event.clientX - rect.left, 0, rect.width);
    const y = clamp(event.clientY - rect.top, 0, rect.height);

    setters.xTo(x - lensSize / 2);
    setters.yTo(y - lensSize / 2);
    setters.opacityTo(1);

    stage.style.setProperty("--lens-bg-x", `${-x * 1.16 + lensSize / 2}px`);
    stage.style.setProperty("--lens-bg-y", `${-y * 1.16 + lensSize / 2}px`);
  }, []);

  const fadeLens = useCallback(() => {
    settersRef.current?.opacityTo(0.72);
  }, []);

  return (
    <motion.div
      ref={stageRef}
      className="profile-stage"
      style={{ "--lens-image": `url(${src})` }}
      initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
      onPointerMove={moveLens}
      onPointerLeave={fadeLens}
    >
      <div className="profile-frame">
        <img src={src} alt={alt} className="profile-image" />
      </div>

      <div ref={lensRef} className="profile-lens" aria-hidden="true">
        <FloatingCode compact />
      </div>
    </motion.div>
  );
}
