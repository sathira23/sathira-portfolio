import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaRegEnvelope,
} from "react-icons/fa";

// Initialize EmailJS with Public Key
emailjs.init("qIJn1ngKyK9ylBBN3");

const socials = [
  {
    label: "GitHub",
    handle: "github.com/sathira23",
    href: "https://github.com/sathira23",
    icon: <FaGithub />,
  },
  {
    label: "LinkedIn",
    handle: "sathira-porogama",
    href: "https://www.linkedin.com/in/sathira-porogama-279319314",
    icon: <FaLinkedinIn />,
  },
  {
    label: "Instagram",
    handle: "@sathirra",
    href: "https://www.instagram.com/sathirra",
    icon: <FaInstagram />,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous messages
    setSuccessMessage("");
    setErrorMessage("");

    // Validate form data
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await emailjs.send(
        "service_497kspg",
        "template_vlej5gb",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      setSuccessMessage("Message sent successfully!");
      
      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setErrorMessage("Failed to send message. Please try again.");
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section contact-section" style={{ paddingTop: "50px", marginTop: "0" }}>
      <div className="section-inner contact-layout">
        <motion.div
          className="contact-copy"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-kicker">Contact</p>
          <h2>Let us build something useful, reliable, and polished.</h2>
          <p>
            I am open to internships, software engineering opportunities, and
            collaborations around full stack products, IoT, and AI.
          </p>

          <div className="social-card-grid">
            {socials.map((social, index) => (
              <motion.a
                className="social-card"
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                <span>{social.icon}</span>
                <div>
                  <strong>{social.label}</strong>
                  <p>{social.handle}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65 }}
        >
          <div className="form-heading">
            <span>
              <FaRegEnvelope />
            </span>
            <div>
              <h3>Send a message</h3>
              <p>Share a role, project, or collaboration idea.</p>
            </div>
          </div>

          <label>
            Name
            <input 
              type="text" 
              name="name" 
              placeholder="Your name" 
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </label>

          <label>
            Email
            <input 
              type="email" 
              name="email" 
              placeholder="your@email.com" 
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </label>

          <label>
            Message
            <textarea 
              name="message" 
              rows="5" 
              placeholder="Tell me about your project" 
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
            />
          </label>

          {successMessage && (
            <div className="message success-message" style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#d4edda",
              color: "#155724",
              fontSize: "14px",
              marginBottom: "16px",
              border: "1px solid #c3e6cb"
            }}>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="message error-message" style={{
              padding: "12px 16px",
              borderRadius: "8px",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              fontSize: "14px",
              marginBottom: "16px",
              border: "1px solid #f5c6cb"
            }}>
              {errorMessage}
            </div>
          )}

          <button 
            className="primary-button form-button" 
            type="submit"
            disabled={loading}
            style={{
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            <FaPaperPlane />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
