import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export function FloatingDockDesktop({ items, className }) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(window.location.pathname);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-end justify-center gap-2 rounded-full bg-[#1e1e1e] p-2 shadow-lg",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = active === item.href;

        return (
          <a
            href={item.href}
            key={index}
            className="group relative flex size-10 items-center justify-center"
            onClick={() => setActive(item.href)}
          >
            <AnimatePresence>
              {isActive && (
                <motion.span
                  layoutId="active"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-full bg-white/10"
                />
              )}
            </AnimatePresence>

            <span
              className={cn(
                "relative z-10 text-white transition-all group-hover:scale-110 group-hover:text-white",
                isActive ? "scale-125 text-white" : "text-white/50"
              )}
            >
              {item.icon}
            </span>

            <span className="absolute -top-6 scale-0 rounded bg-white px-2 py-1 text-xs text-black opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
              {item.title}
            </span>
          </a>
        );
      })}
    </motion.div>
  );
}
