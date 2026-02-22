import { motion, type MotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface AnimationProps {
  initial: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  transition?: MotionProps["transition"];
  children: ReactNode;
}

export default function AnimationComponent({
  initial,
  whileInView,
  transition,
  children,
}: AnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <motion.div
        ref={ref}
        initial={initial}
        whileInView={whileInView}
        transition={transition}
        viewport={{ once: true, amount: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
