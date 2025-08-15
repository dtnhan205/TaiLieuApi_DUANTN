import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export function FloatingDockMobile({ items, className }) {
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
        "fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-[#1e1e1e] p-3 shadow-lg",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = active === item.href;

        return (
          <a
            href={item.href}
            key={index}
            onClick={() => setActive(item.href)}
            className="group relative flex size-10 items-center justify-center"
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
          </a>
        );
      })}
    </motion.div>
  );
}
