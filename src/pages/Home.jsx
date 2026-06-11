import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { FaArrowDown, FaGithub, FaLinkedinIn } from "react-icons/fa";
import profile from "../assets/profile.png";
const wordReveal = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: "easeOut" },
  },
};

// Data for floating tech badges - Configured for stable, professional cloud distribution
const techTags = [
  // LEFT SIDE: Staggered horizontal offsets to prevent vertical stacking
  { name: "JavaScript", side: "left", initialOffset: "-65%", targetOffset: "-75%", top: "5%", delay: 0.05, floatDuration: 6 },
  { name: "TypeScript", side: "left", initialOffset: "-85%", targetOffset: "-100%", top: "15%", delay: 0.1, floatDuration: 7.5 },
  { name: "React", side: "left", initialOffset: "-65%", targetOffset: "-75%", top: "25%", delay: 0.15, floatDuration: 5.5 },
  { name: "Next.js", side: "left", initialOffset: "-90%", targetOffset: "-105%", top: "35%", delay: 0.2, floatDuration: 8 },
  { name: "Node.js", side: "left", initialOffset: "-60%", targetOffset: "-70%", top: "45%", delay: 0.25, floatDuration: 6.8 },
  { name: "Express.js", side: "left", initialOffset: "-80%", targetOffset: "-95%", top: "55%", delay: 0.3, floatDuration: 7.2 },
  { name: "MongoDB", side: "left", initialOffset: "-65%", targetOffset: "-75%", top: "65%", delay: 0.35, floatDuration: 6.3 },
  { name: "SQL", side: "left", initialOffset: "-85%", targetOffset: "-100%", top: "75%", delay: 0.4, floatDuration: 8.4 },
  { name: "C#", side: "left", initialOffset: "-65%", targetOffset: "-75%", top: "85%", delay: 0.45, floatDuration: 5.9 },
  { name: ".NET", side: "left", initialOffset: "-80%", targetOffset: "-95%", top: "95%", delay: 0.5, floatDuration: 7 },

  // RIGHT SIDE: Symmetric distribution with unique staggering
  { name: "Java", side: "right", initialOffset: "-65%", targetOffset: "-75%", top: "5%", delay: 0.05, floatDuration: 6.1 },
  { name: "Python", side: "right", initialOffset: "-85%", targetOffset: "-100%", top: "15%", delay: 0.1, floatDuration: 7.3 },
  { name: "Git", side: "right", initialOffset: "-65%", targetOffset: "-75%", top: "25%", delay: 0.15, floatDuration: 5.8 },
  { name: "Docker", side: "right", initialOffset: "-90%", targetOffset: "-105%", top: "35%", delay: 0.2, floatDuration: 8.2 },
  { name: "REST API", side: "right", initialOffset: "-60%", targetOffset: "-70%", top: "45%", delay: 0.25, floatDuration: 6.7 },
  { name: "IoT", side: "right", initialOffset: "-80%", targetOffset: "-95%", top: "55%", delay: 0.3, floatDuration: 7.1 },
  { name: "Embedded Systems", side: "right", initialOffset: "-65%", targetOffset: "-75%", top: "65%", delay: 0.35, floatDuration: 6.4 },
  { name: "MERN Stack", side: "right", initialOffset: "-85%", targetOffset: "-100%", top: "75%", delay: 0.4, floatDuration: 8.5 },
  { name: "AWS", side: "right", initialOffset: "-65%", targetOffset: "-75%", top: "85%", delay: 0.45, floatDuration: 5.7 },
  { name: "AI", side: "right", initialOffset: "-80%", targetOffset: "-95%", top: "95%", delay: 0.5, floatDuration: 7.6 },
];

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    setRotate({
      x: ((y - centerY) / centerY) * -10,
      y: ((x - centerX) / centerX) * 10,
    });
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <section id="home" className="hero-section">
      <motion.div
        className="section-inner hero-grid"
        initial="hidden"
        animate="visible"
        variants={wordReveal}
      >
        <motion.div className="hero-visual" variants={wordItem}>
          <motion.div 
            ref={cardRef}
            className="profile-stage luxury-card-stage"
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ 
              rotateX: rotate.x, 
              rotateY: rotate.y,
              scale: rotate.x !== 0 || rotate.y !== 0 ? 1.02 : 1 
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{ 
              position: "relative",
              transformStyle: "preserve-3d",
              cursor: "pointer"
            }}
          >
            {/* Ambient Background Glow */}
            <div className="card-ambient-glow" />
            
            <div className="luxury-card-border">
              <img src={profile} alt="Sathira Kulajitha Porogama" className="profile-image" />
              {/* Mouse-following reflection overlay */}
              <div 
                className="card-reflection" 
                style={{ background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(255,255,255,0.15) 0%, transparent 60%)` }}
              />
            </div>

            {/* Floating Tech Badges */}
            <AnimatePresence>
              {isHovered && techTags.map((tag) => (
                <motion.div
                  key={tag.name}
                  initial={{ [tag.side]: tag.initialOffset, opacity: 0, scale: 0.8 }}
animate={{
  [tag.side]: tag.targetOffset,
  opacity: 1,
  scale: 1
}}
                  exit={{ [tag.side]: tag.initialOffset, opacity: 0, scale: 0.8, transition: { duration: 0.4 } }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(56, 189, 248, 0.6)" }}
transition={{
  [tag.side]: {
    type: "spring",
    stiffness: 40,
    damping: 30,
    delay: tag.delay
  },
  opacity: {
    duration: 0.3,
    delay: tag.delay
  },
  scale: {
    duration: 0.3,
    delay: tag.delay
  }
}}
                  style={{
                    position: "absolute",
                    top: tag.top,
                    padding: "8px 18px",
                    background: "rgba(10, 15, 30, 0.75)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    borderRadius: "100px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    whiteSpace: "nowrap",
                    pointerEvents: "auto",
                    zIndex: -1,
                    boxShadow: "0 0 15px rgba(56, 189, 248, 0.2)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {tag.name}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>

          <motion.div className="hero-content">
            <motion.h1 className="hero-title" variants={wordReveal}>
              <motion.span variants={wordItem}>Sathira Kulajitha Porogama</motion.span>
            </motion.h1>

            <motion.div>
              <motion.div className="hero-role" variants={wordItem}>
                Full Stack Developer
              </motion.div>

<motion.p className="hero-subtitle" variants={wordItem}>
  <span className="dot" />
  <span>IT Undergraduate</span>
  <span className="dot" />
  <span>AI Enthusiast</span>
  <span className="dot" />
  <span>IoT Researcher</span>
</motion.p>

              <motion.div className="hero-actions" variants={wordItem}>
                <a className="primary-button" href="#projects">View Projects</a>
                <a className="ghost-button" href="#contact">Contact Me</a>
              </motion.div>

              <motion.div className="hero-socials" variants={wordItem}>
                <a href="https://github.com/sathira23" target="_blank" rel="noreferrer"><FaGithub /></a>
                <a href="https://www.linkedin.com/in/sathira-porogama-279319314/" target="_blank" rel="noreferrer"><FaLinkedinIn /></a>
              </motion.div>
            </motion.div>
          </motion.div>

        <motion.a className="scroll-cue" href="#about" variants={wordItem}>
          <FaArrowDown />
        </motion.a>
      </motion.div>
    </section>
  );
}
