import { motion } from "framer-motion";
import profileImg from "../assets/profile1.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.header
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <a href="#home" className="nav-brand">
        <img 
          src={profileImg} 
          alt="Sathira Kulajitha Porogama" 
          className="brand-image"
        />
        <div className="brand-info">
          <span className="brand-name-full">Sathira Kulajitha Porogama</span>
          <span className="brand-name-short">Sathira K. Porogama</span>
        </div>
      </a>

      <nav
        className="nav-menu"
        aria-label="Primary navigation"
      >
        {navLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="nav-spacer" />
    </motion.header>
  );
}
