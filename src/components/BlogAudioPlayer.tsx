import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Headphones, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import type { BlogNarrationControls } from "../hooks/useBlogNarration";

const SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2] as const;
const PLAYER_BG = "#E2D6FF";

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
}

interface BlogAudioPlayerProps {
  title: string;
  paragraphCount: number;
  narration: BlogNarrationControls;
}

export default function BlogAudioPlayer({ title, paragraphCount, narration }: BlogAudioPlayerProps) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [showFloating, setShowFloating] = useState(false);
  const [muted, setMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);

  const {
    status,
    progressPercent,
    rate,
    volume,
    estimatedDurationSec,
    setRate,
    setVolume,
    play,
    togglePlay,
    seekToPercent,
  } = narration;

  const elapsedSec = (progressPercent / 100) * estimatedDurationSec;
  const isPlaying = status === "playing";

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloating(!entry.isIntersecting),
      { threshold: 0.05, rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const shell =
    "border border-purple-200/80 text-gray-900 shadow-lg shadow-purple-200/30";

  const PlayerBody = ({ compact = false }: { compact?: boolean }) => (
    <div className={compact ? "p-3" : "p-5 md:p-6"} style={{ backgroundColor: PLAYER_BG }}>
      <div className={`flex items-start gap-3 ${compact ? "mb-3" : "mb-5"}`}>
        <div
          className={`shrink-0 rounded-2xl flex items-center justify-center bg-white/70 text-purple-700 ${
            compact ? "w-10 h-10" : "w-12 h-12"
          }`}
        >
          <Headphones size={compact ? 18 : 22} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-700">
            Listen to this blog
          </p>
          <p className={`font-bold leading-snug truncate text-gray-900 ${compact ? "text-sm" : "text-base md:text-lg"}`}>
            {title}
          </p>
          {!compact && (
            <p className="text-xs mt-1 text-gray-600">
              Natural voice narration · {paragraphCount} sections
            </p>
          )}
        </div>
      </div>

      <div className={`flex items-center gap-2 ${compact ? "mb-2" : "mb-4"}`}>
        <span className="text-[11px] font-mono tabular-nums text-gray-600">{formatTime(elapsedSec)}</span>
        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={progressPercent}
          onChange={(e) => seekToPercent(Number(e.target.value))}
          className="blog-audio-progress flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #7c3aed ${progressPercent}%, rgba(255,255,255,0.6) ${progressPercent}%)`,
          }}
          aria-label="Playback progress"
        />
        <span className="text-[11px] font-mono tabular-nums text-gray-600">
          {formatTime(estimatedDurationSec)}
        </span>
      </div>

      <div className={`flex flex-wrap items-center gap-3 ${compact ? "justify-between" : "justify-center md:gap-4"}`}>
        <button
          type="button"
          onClick={togglePlay}
          className="p-3 rounded-2xl text-white shadow-lg bg-purple-600 hover:bg-purple-700 transition-colors"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause size={compact ? 18 : 22} fill="currentColor" />
          ) : (
            <Play size={compact ? 18 : 22} fill="currentColor" />
          )}
        </button>

        {!compact && (
          <div className="flex items-center gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Speed</label>
            <select
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="text-sm font-semibold rounded-xl border border-purple-200 bg-white/80 px-2 py-1.5 text-gray-900"
              aria-label="Playback speed"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          </div>
        )}

        <div className={`flex items-center gap-2 ${compact ? "" : "md:ml-auto"}`}>
          <button
            type="button"
            onClick={() => {
              if (muted) {
                setVolume(prevVolume || 1);
                setMuted(false);
              } else {
                setPrevVolume(volume);
                setVolume(0);
                setMuted(true);
              }
            }}
            className="p-2 rounded-xl text-gray-700 hover:bg-white/50 transition-colors"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => {
              const v = Number(e.target.value);
              setVolume(v);
              setMuted(v === 0);
            }}
            className="w-20 md:w-24 h-1.5 rounded-full appearance-none cursor-pointer bg-white/60"
            aria-label="Volume"
          />
          {compact && (
            <select
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="text-xs font-semibold rounded-lg border border-purple-200 bg-white/80 px-1.5 py-1 text-gray-900"
              aria-label="Playback speed"
            >
              {SPEEDS.map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>
          )}
        </div>

        {!compact && status === "ended" && (
          <button
            type="button"
            onClick={() => {
              seekToPercent(0);
              play(0);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl text-gray-700 hover:bg-white/50 transition-colors"
          >
            <RotateCcw size={14} />
            Listen again
          </button>
        )}
      </div>
    </div>
  );

  if (paragraphCount === 0) return null;

  return (
    <>
      <section
        ref={mainRef}
        className={`rounded-3xl overflow-hidden ${shell}`}
        style={{ backgroundColor: PLAYER_BG }}
        aria-label="Listen to this blog"
      >
        <PlayerBody />
      </section>

      <AnimatePresence>
        {showFloating && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className={`fixed bottom-0 inset-x-0 z-50 border-t ${shell}`}
            style={{ backgroundColor: PLAYER_BG }}
            role="region"
            aria-label="Audio player controls"
          >
            <PlayerBody compact />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
