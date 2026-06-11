import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaChevronLeft,
  FaChevronRight,
  FaExternalLinkAlt,
  FaGithub,
  FaGlobe,
  FaImages,
} from "react-icons/fa";

const assetModules = import.meta.glob("../assets/*.{png,jpg,jpeg,webp}", {
  eager: true,
  import: "default",
});

const getProjectImages = (imageNames) =>
  imageNames
    .map((name) => ({
      name,
      src: assetModules[`../assets/${name}`],
    }))
    .filter((image) => Boolean(image.src));

const featuredProjects = [
  {
    title: "RFID-Based Vehicle Speed Monitoring System",
    description:
      "Developed an IoT-based vehicle speed monitoring system using ESP32 and dual RFID readers to track vehicle movement between two checkpoints. The system calculates vehicle speed in real-time, stores collected data, and provides an efficient solution for traffic monitoring and speed analysis. View the complete research project website, methodology, implementation details, and documentation.",
    technologies: ["ESP32", "RFID", "IoT", "Embedded Systems", "C++"],
    images: ["iot1.png", "iot2.png", "iot3.png", "iot4.png"],
    github: "https://github.com/vrbbro18/Research-Project",
    website: "https://sathira23.github.io/rp-website/index.html",
  },
  {
    title: "Tourism Management System",
    description:
      "Developed a tourism management web application using the MERN stack for Wilpaththu Tree House. The platform allows users to explore destinations, view accommodation details, manage bookings, and improve customer engagement.",
    technologies: ["MongoDB", "Express.js", "React", "Node.js"],
    images: ["t1.png", "t2.png", "t3.png"],
    github: "https://github.com/sathira23/C-vibes/blob/main/ceylon.txt",
  },
  {
    title: "Job Posting & Networking Web Platform",
    description:
      "Developed a full-stack platform where institutes can post jobs and users can apply, connect, and communicate through real-time chat.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Socket.IO"],
    images: [
      "job1.png",
      "job2.png",
      "job3.png",
      "job4.png",
      "job5.png",
      "job6.png",
      "job7.png",
    ],
    github: "https://github.com/sathira23/jobs-genie",
  },
  {
    title: "Online Bookstore Management System",
    description:
      "Designed and developed a secure e-commerce platform for online book sales with authentication, shopping cart, checkout processing, and administration features.",
    technologies: ["Spring Boot", "Java", "MySQL"],
    images: ["b1.png", "b2.png", "b3.png"],
    github: "https://github.com/sathira23/Bookstore/tree/master",
  },
  {
    title: "Inventory & Sales Management System",
    description:
      "Developed a Point of Sale system using .NET and SQL LocalDB with inventory tracking, reporting, and data visualization.",
    technologies: ["C#", ".NET", "SQL LocalDB"],
    images: ["pos1.png", "pos2.png"],
    github: "https://github.com/sathira23/Paf",
  },
  {
    title: "Wedding Package Management System",
    description:
      "Designed and developed a desktop-based management system using Java and SQL to streamline wedding package bookings and customer management. The system enables efficient handling of customer information, package selection, reservation tracking, and database management.",
    technologies: ["Java", "SQL", "JDBC", "Database Management"],
    images: ["w1.png", "w2.png", "w3.png", "w4.png", "w5.png"],
    github: "https://github.com/sathira23/wedding",
  },
  {
    title: "Pizza Delivery Application",
    description:
      "Developed an interactive pizza ordering application that allows users to browse available pizzas, search for specific menu items, customize orders, and create personalized pizzas. The application focuses on providing a seamless and engaging user experience for online food ordering.",
    technologies: ["Java", "SQL", "UI Development"],
    images: ["p1.jpg", "p2.jpg", "p3.jpg"],
    demo: "https://drive.google.com/file/d/1a_JF7a02jWqehTak02x7R2zQlmJhGvt3/view",
    orientation: "portrait",
  },
  {
    title: "Yara Cosmetics E-Commerce Website",
    description:
      "Developed a modern cosmetics sales website aimed at improving the online shopping experience for beauty product customers. The platform focuses on intuitive navigation, product discovery, and a streamlined checkout process to enhance usability and customer satisfaction.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    images: ["ya1.png", "ya2.png", "ya3.png", "ya4.png"],
    figma: "https://www.figma.com/proto/qTpY4K4kN2ekiQD1OoFwMZ/HCI-final",
  },
  {
    title: "Snake Game",
    description:
      "Created a classic Snake Game featuring score tracking, food collection mechanics, increasing difficulty, and collision detection. The project demonstrates game development fundamentals, event handling, and object-oriented programming concepts.",
    technologies: ["Java", "Object-Oriented Programming"],
    images: ["snake1.jpg", "snake2.jpg", "snake3.jpg"],
    demo: "https://drive.google.com/file/d/1IJzB4Sf5wFhLrO6UiexNpAlsgVCX-HfR/view",
    orientation: "portrait",
  },
  {
    title: "Task Management Application",
    description:
      "Designed and developed a productivity-focused task management application that enables users to organize tasks, save important dates, and securely manage personal information.",
    technologies: ["Java", "Database Management", "Desktop Application Development"],
    images: ["task1.jpg", "task2.jpg", "task3.jpg"],
    demo: "https://drive.google.com/file/d/1Z2WQozVWfAJIvBQt3CA2cxQVclsH1X2y/view",
    orientation: "portrait",
  },
  {
    title: "Note Application",
    description:
      "Built a lightweight note-taking application that allows users to create, organize, and manage notes using custom headings and categories.",
    technologies: ["Java", "UI Development"],
    images: ["note1.jpg", "note2.jpg", "note3.jpg"],
    demo: "https://drive.google.com/file/d/1uKIOvClb7TNbSXhNVON6Xg_zctPCqrae/view",
    orientation: "portrait",
  },
  {
    title: "Online Hospital Management System",
    description:
      "Developed a web-based hospital management system to manage patient records, doctor information, appointments, and administrative operations.",
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "PHP",
      "MySQL",
      "XAMPP",
    ],
    images: ["h1.png", "h2.png", "h3.png"],
    github: "https://github.com/sathira23/main",
  },
];

const handleTilt = (event) => {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const rotateX = ((y - rect.height / 2) / rect.height) * -8;
  const rotateY = ((x - rect.width / 2) / rect.width) * 8;

  card.style.setProperty("--rotate-x", `${rotateX}deg`);
  card.style.setProperty("--rotate-y", `${rotateY}deg`);
};

const resetTilt = (event) => {
  event.currentTarget.style.setProperty("--rotate-x", "0deg");
  event.currentTarget.style.setProperty("--rotate-y", "0deg");
};

function ProjectFallback({ index }) {
  return (
    <div className="project-gallery project-gallery-fallback" aria-hidden="true">
      <motion.span
        className="pulse-ring"
        animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: index * 0.12 }}
      />
      <motion.span
        className="pulse-core"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ProjectGallery({ project, index }) {
  const images = useMemo(() => getProjectImages(project.images), [project.images]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const imageCount = images.length;
  const isPortrait = project.orientation === "portrait";

  useEffect(() => {
    if (isPaused || imageCount <= 1) {
      return undefined;
    }

    let intervalId;
    const firstDelay = 350 + (index % 8) * 360;
    const timeoutId = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % imageCount);
      intervalId = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % imageCount);
      }, 3000);
    }, firstDelay);

    return () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
    };
  }, [imageCount, index, isPaused]);

  const showNextImage = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current + 1) % imageCount);
  };

  const showPreviousImage = (event) => {
    event.stopPropagation();
    setActiveIndex((current) => (current - 1 + imageCount) % imageCount);
  };

  if (!imageCount) {
    return <ProjectFallback index={index} />;
  }

  const activeImage = images[activeIndex];

  return (
    <div
      className={`project-gallery ${isPortrait ? "is-portrait" : "is-landscape"}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={activeImage.name}
          src={activeImage.src}
          alt={`${project.title} screenshot ${activeIndex + 1}`}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        />
      </AnimatePresence>

      <div className="gallery-meta">
        <FaImages />
        <span>
          {activeIndex + 1}/{imageCount}
        </span>
      </div>

      {imageCount > 1 && (
        <div className="gallery-controls">
          <button
            type="button"
            aria-label={`Previous image for ${project.title}`}
            onClick={showPreviousImage}
          >
            <FaChevronLeft />
          </button>
          <button
            type="button"
            aria-label={`Next image for ${project.title}`}
            onClick={showNextImage}
          >
            <FaChevronRight />
          </button>
        </div>
      )}

      {imageCount > 1 && (
        <div className={`gallery-progress ${isPaused ? "is-paused" : ""}`}>
          <motion.span
            key={`${project.title}-${activeIndex}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isPaused ? 0 : 1 }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
      )}
    </div>
  );
}

function ProjectCard({ project, index, featured = false }) {
  const isPortrait = project.orientation === "portrait";
  const isFirstProject = index === 0;

  return (
    <motion.article
      className={`project-card ${isPortrait ? "has-portrait-gallery" : ""}`}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.08 }}
    >
      <div
        className="project-card-surface tilt-card"
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
      >
        <ProjectGallery project={project} index={index} />

        <div className="project-content">
          <div className="project-header">
            <p className="project-index">
              Project {String(index + 1).padStart(2, "0")}
            </p>
            {isFirstProject && project.website && (
              <a 
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="project-website-badge"
                title="View project website"
              >
                <FaGlobe />
                Website
              </a>
            )}
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>

          <div className="tech-badges">
            {project.technologies.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>

          <div className="project-actions">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer"
                className="project-link-btn"
              >
                <FaGithub />
                GitHub
              </a>
            )}
            {(project.demo || project.figma) && (
              <a 
                href={project.demo || project.figma} 
                target="_blank" 
                rel="noreferrer"
                className="project-link-btn"
              >
                <FaExternalLinkAlt />
                {project.figma ? "View Design" : "Live Demo"}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section projects-section" style={{ minHeight: "0", height: "auto", paddingTop: "50px", paddingBottom: "0", marginBottom: "0", display: "block" }}>
      <div className="section-inner" style={{ paddingBottom: "0", marginBottom: "0", minHeight: "0", height: "auto", paddingTop: "0" }}>
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-kicker">Projects</p>
          <h2>Selected systems built across IoT, MERN, Java, and .NET.</h2>
          <p>
            Practical builds spanning embedded monitoring, booking workflows,
            real-time communication, e-commerce, and business operations.
          </p>
        </motion.div>

        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              featured
            />
          ))}
        </div>
      </div>
    </section>
  );
}
