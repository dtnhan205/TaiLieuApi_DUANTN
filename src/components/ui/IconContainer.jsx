import { motion } from "framer-motion";

export function IconContainer({ mouseX, title, icon, href }) {
  return (
    <motion.a
      href={href}
      className="group relative flex size-10 items-center justify-center"
    >
      <span className="absolute -top-6 scale-0 rounded bg-white px-2 py-1 text-xs text-black opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
        {title}
      </span>

      <motion.span
        className="relative z-10 text-white transition-all group-hover:scale-110 group-hover:text-white"
      >
        {icon}
      </motion.span>
    </motion.a>
  );
}
