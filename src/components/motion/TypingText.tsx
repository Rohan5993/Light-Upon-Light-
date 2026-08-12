import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  className?: string;
  speed?: number;
  active?: boolean;
  prefix?: string;
  suffix?: string;
};

export default function TypingText({
  text,
  className = "",
  speed = 24,
  active = true,
  prefix = "\u201C",
  suffix = "\u201D",
}: TypingTextProps) {
  const fullText = `${prefix}${text}${suffix}`;
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!active) {
      setDisplayed(fullText);
      setTyping(false);
      return;
    }

    setDisplayed("");
    setTyping(true);
    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setDisplayed(fullText.slice(0, index));
      if (index >= fullText.length) {
        setTyping(false);
        window.clearInterval(interval);
      }
    }, speed);

    return () => window.clearInterval(interval);
  }, [active, fullText, speed]);

  return (
    <p className={className} aria-live="polite">
      {displayed}
      {typing && (
        <span className="inline-block w-[2px] h-[1.05em] ml-0.5 bg-violet-500 align-middle animate-pulse" />
      )}
    </p>
  );
}
