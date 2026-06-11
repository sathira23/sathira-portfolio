import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/sathira23", icon: <FaGithub /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sathira-porogama-279319314",
    icon: <FaLinkedinIn />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sathirra",
    icon: <FaInstagram />,
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>&copy; 2026 Sathira Kulajitha Porogama. All rights reserved.</p>
      <div className="footer-socials" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}
