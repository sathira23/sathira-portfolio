import { motion } from "framer-motion";
import { FaChartLine, FaGraduationCap, FaLaptopCode, FaMicrochip } from "react-icons/fa";

const timeline = [
  {
    title: "BSc (Hons) Information Technology",
    place: "Sri Lanka Institute of Information Technology (SLIIT)",
    period: "2022 - Present",
  },
  {
    title: "Diploma in Information Technology",
    place: "SIBA Campus",
    period: "Completed",
  },
  {
    title: "GCE Advanced Level",
    place: "Physical Science Stream, St. Sylvester's College Kandy",
    period: "Completed",
  },
];

const stats = [
  { value: "15+", label: "Portfolio projects", icon: <FaLaptopCode /> },
  { value: "5", label: "Featured systems", icon: <FaChartLine /> },
  { value: "3+", label: "Years in IT", icon: <FaGraduationCap /> },
  { value: "IoT", label: "Research focus", icon: <FaMicrochip /> },
];

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="section-inner">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-kicker">About</p>
          <h2>Engineering reliable products with a research mindset.</h2>
          <p>
            I am an Information Technology undergraduate focused on full stack
            development, IoT systems, and practical AI-powered experiences.
          </p>
        </motion.div>

        <div className="about-layout">
          <motion.div
            className="timeline"
            initial={{ opacity: 0, x: -34 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7 }}
          >
            {timeline.map((item, index) => (
              <motion.article
                className="timeline-item"
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
              >
                <span className="timeline-dot" />
                <p>{item.period}</p>
                <h3>{item.title}</h3>
                <span>{item.place}</span>
              </motion.article>
            ))}
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.article
                className="stat-card"
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <span>{stat.icon}</span>
                <strong>{stat.value}</strong>
                <p>{stat.label}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
