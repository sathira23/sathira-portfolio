import { useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

import "./App.css";

function App() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (time) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
    });

    const updateScroll = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateScroll);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateScroll);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const glow = document.querySelector(".cursor-glow");
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (!glow || coarsePointer) {
      return undefined;
    }

    const xTo = gsap.quickTo(glow, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(glow, "y", { duration: 0.45, ease: "power3.out" });

    const moveGlow = (event) => {
      xTo(event.clientX - 160);
      yTo(event.clientY - 160);
    };

    window.addEventListener("pointermove", moveGlow);

    return () => {
      window.removeEventListener("pointermove", moveGlow);
    };
  }, []);

  return (
    <>
      <div className="cursor-glow" aria-hidden="true" />
      <Navbar />

      <motion.main
        className="site-shell"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </motion.main>

      <Footer />
    </>
  );
}

export default App;
