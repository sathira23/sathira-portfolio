import { memo } from "react";
import { motion } from "framer-motion";

const snippets = [
  "const speed = distance / time;",
  "rfid.scan(vehicleTag);",
  "await api.post('/bookings');",
  "socket.emit('message');",
  "SELECT * FROM projects;",
];

function FloatingCode({ compact = false }) {
  return (
    <div className={`floating-code ${compact ? "is-compact" : ""}`}>
      {snippets.map((snippet, index) => (
        <motion.span
          key={snippet}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: index * 0.08 },
            y: {
              duration: 3 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          {snippet}
        </motion.span>
      ))}
    </div>
  );
}

export default memo(FloatingCode);
