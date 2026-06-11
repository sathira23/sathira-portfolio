import { motion } from "framer-motion";
import { FaCode, FaCss3Alt, FaDatabase, FaMicrochip, FaServer } from "react-icons/fa";
import {
  SiDotnet,
  SiExpress,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    icon: <FaCode />,
    skills: [
      { name: "React", level: 90, icon: <SiReact /> },
      { name: "JavaScript", level: 88, icon: <SiJavascript /> },
      { name: "HTML", level: 92, icon: <SiHtml5 /> },
      { name: "CSS", level: 90, icon: <FaCss3Alt /> },
    ],
  },
  {
    title: "Backend",
    icon: <FaServer />,
    skills: [
      { name: "Node.js", level: 86, icon: <SiNodedotjs /> },
      { name: "Express.js", level: 84, icon: <SiExpress /> },
      { name: "Spring Boot", level: 78, icon: <SiSpringboot /> },
      { name: "ASP.NET", level: 80, icon: <SiDotnet /> },
    ],
  },
  {
    title: "Database",
    icon: <FaDatabase />,
    skills: [
      { name: "MongoDB", level: 86, icon: <SiMongodb /> },
      { name: "MySQL", level: 82, icon: <SiMysql /> },
      { name: "SQL Server", level: 80, icon: <FaDatabase /> },
    ],
  },
  {
    title: "Other",
    icon: <FaMicrochip />,
    skills: [
      { name: "IoT", level: 84, icon: <FaMicrochip /> },
      { name: "RFID", level: 82, icon: <FaMicrochip /> },
      { name: "Git", level: 86, icon: <SiGit /> },
      { name: "REST APIs", level: 88, icon: <FaServer /> },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="section-inner">
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-kicker">Skills</p>
          <h2>Core tools for full stack, data, and connected systems.</h2>
          <p>
            A balanced stack across interfaces, APIs, databases, and IoT
            workflows.
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillGroups.map((group, groupIndex) => (
            <motion.article
              className="skill-card"
              key={group.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="skill-card-header">
                <span>{group.icon}</span>
                <h3>{group.title}</h3>
              </div>

              <div className="skill-list">
                {group.skills.map((skill) => (
                  <div className="skill-row" key={skill.name}>
                    <div className="skill-meta">
                      <span>{skill.icon}</span>
                      <p>{skill.name}</p>
                    </div>
                    <div className="skill-progress" aria-label={`${skill.name} skill level`}>
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
