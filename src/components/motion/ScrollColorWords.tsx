import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const GREY = "#94a3b8";
const BLACK = "#0f172a";

function ScrollWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const color = useTransform(progress, range, [GREY, BLACK]);

  return (
    <motion.span style={{ color }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

type ScrollColorWordsProps = {
  text: string;
  className?: string;
};

export default function ScrollColorWords({ text, className = "" }: ScrollColorWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.35"],
  });

  const words = text.trim().split(/\s+/);

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min(1, start + 1 / words.length);
        return (
          <ScrollWord key={`${word}-${index}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </p>
  );
}
