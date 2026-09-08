type ScrollColorWordsProps = {
  text: string;
  className?: string;
  highlights?: string[];
  /** Kept for API compatibility; scroll-linked color was removed for performance */
  color?: string;
};

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

/**
 * Lightweight body copy with optional highlight spans.
 * (Formerly scroll-linked per-word color — that caused heavy main-thread work.)
 */
export default function ScrollColorWords({
  text,
  className = "",
  highlights = [],
  color = "#0f172a",
}: ScrollColorWordsProps) {
  const paragraphs = text.trim().split(/\n\s*\n/);
  const allWords = paragraphs.flatMap((paragraph) => paragraph.trim().split(/\s+/));
  const highlighted = getHighlightIndexes(allWords, highlights);
  let wordIndex = 0;

  return (
    <div className={className} style={{ color }}>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const words = paragraph.trim().split(/\s+/);
        return (
          <p
            key={paragraphIndex}
            className={paragraphIndex < paragraphs.length - 1 ? "mb-[1.1em]" : undefined}
          >
            {words.map((word) => {
              const index = wordIndex++;
              const isHighlight = highlighted.has(index);
              return (
                <span
                  key={`${paragraphIndex}-${index}`}
                  className="inline-block mr-[0.28em]"
                  style={isHighlight ? { color: "#7107E7", fontWeight: 600 } : undefined}
                >
                  {word}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
