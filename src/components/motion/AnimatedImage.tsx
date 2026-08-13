import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type AnimatedImageProps = {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  parallax?: boolean;
  kenBurns?: boolean;
  animateOnMount?: boolean;
};

export default function AnimatedImage({
  src,
  alt,
  className = "w-full h-full object-cover",
  containerClassName = "",
  parallax = true,
  kenBurns = false,
  animateOnMount = false,
}: AnimatedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ["-6%", "6%"] : ["0%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.04, 1.1]);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${containerClassName}`}
      initial={animateOnMount ? false : { opacity: 0, y: 24 }}
      animate={animateOnMount ? { opacity: 1 } : undefined}
      whileInView={animateOnMount ? undefined : { opacity: 1, y: 0 }}
      viewport={animateOnMount ? undefined : { once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="w-full h-full will-change-transform"
        style={parallax ? { y, scale } : undefined}
        animate={kenBurns ? { scale: [1, 1.05, 1] } : undefined}
        transition={
          kenBurns
            ? { duration: 18, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
      >
        <img src={src} alt={alt} className={className} decoding="async" />
      </motion.div>
    </motion.div>
  );
}
