import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: delay },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

type AnimatedTextProps = {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  animateOnMount?: boolean;
};

export default function AnimatedText({
  lines,
  className = "",
  lineClassName = "",
  delay = 0,
  animateOnMount = false,
}: AnimatedTextProps) {
  const motionProps = animateOnMount
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.35 } };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      custom={delay}
      {...motionProps}
    >
      {lines.map((line) => (
        <motion.span key={line} variants={itemVariants} className={`block ${lineClassName}`.trim()}>
          {line}
        </motion.span>
      ))}
    </motion.div>
  );
}

type AnimatedWordsProps = {
  text: string;
  className?: string;
  delay?: number;
  animateOnMount?: boolean;
};

export function AnimatedWords({
  text,
  className = "",
  delay = 0,
  animateOnMount = false,
}: AnimatedWordsProps) {
  const words = text.split(" ");
  const motionProps = animateOnMount
    ? { initial: "hidden" as const, animate: "visible" as const }
    : { initial: "hidden" as const, whileInView: "visible" as const, viewport: { once: true, amount: 0.35 } };

  return (
    <motion.p
      className={className}
      variants={containerVariants}
      custom={delay}
      {...motionProps}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={itemVariants}
          className="inline-block mr-[0.28em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function FadeIn({ children, className = "", delay = 0, y = 24 }: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
