import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

const GREY = "#94a3b8";
const BLACK = "#0f172a";
const PURPLE = "#7107E7";

function ScrollWord({
  children,
  progress,
  range,
  toColor,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  toColor: string;
}) {
  const color = useTransform(progress, range, [GREY, toColor]);

  return (
    <motion.span style={{ color }} className="inline-block mr-[0.28em]">
      {children}
    </motion.span>
  );
}

function getHighlightIndexes(words: string[], highlights: string[]) {
  const indexes = new Set<number>();
  const normalized = words.map((word) => word.replace(/[.,!?;:"']+$/g, "").toLowerCase());

  for (const phrase of highlights) {
    const parts = phrase.trim().toLowerCase().split(/\s+/);
    for (let i = 0; i <= normalized.length - parts.length; i++) {
      if (parts.every((part, offset) => normalized[i + offset] === part)) {
        for (let offset = 0; offset < parts.length; offset++) {
          indexes.add(i + offset);
        }
      }
    }
  }

  return indexes;
}

type ScrollColorWordsProps = {
  text: string;
  className?: string;
  highlights?: string[];
  color?: string;
};

export default function ScrollColorWords({
  text,
  className = "",
  highlights = [],
  color = BLACK,
}: ScrollColorWordsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.35"],
  });

  const paragraphs = text.trim().split(/\n\s*\n/);
  const allWords = paragraphs.flatMap((paragraph) => paragraph.trim().split(/\s+/));
  const totalWords = allWords.length;
  const highlighted = getHighlightIndexes(allWords, highlights);
  let wordIndex = 0;

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const words = paragraph.trim().split(/\s+/);
        return (
          <p
            key={paragraphIndex}
            className={paragraphIndex < paragraphs.length - 1 ? "mb-[1.1em]" : undefined}
          >
            {words.map((word) => {
              const index = wordIndex++;
              const start = index / totalWords;
              const end = Math.min(1, start + 1 / totalWords);
              if (highlighted.has(index)) {
                return (
                  <span
                    key={`${word}-${index}`}
                    className="inline-block mr-[0.28em] font-semibold"
                    style={{ color: PURPLE }}
                  >
                    {word}
                  </span>
                );
              }
              return (
                <span key={`${word}-${index}`}>
                  <ScrollWord progress={scrollYProgress} range={[start, end]} toColor={color}>
                    {word}
                  </ScrollWord>
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
