import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STORAGE_PREFIX = "blog-audio-progress:";
const WORDS_PER_MINUTE = 165;

export type NarrationStatus = "idle" | "playing" | "paused" | "ended";

export interface NarrationProgress {
  wordIndex: number;
  progressPercent: number;
}

export interface BlogNarrationControls {
  status: NarrationStatus;
  activeWordIndex: number;
  progressPercent: number;
  rate: number;
  volume: number;
  estimatedDurationSec: number;
  setRate: (rate: number) => void;
  setVolume: (volume: number) => void;
  play: (fromWordIndex?: number) => void;
  pause: () => void;
  togglePlay: () => void;
  seekToPercent: (pct: number) => void;
  seekToWord: (wordIndex: number) => void;
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  const english = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  const ranked = english.sort((a, b) => {
    const score = (v: SpeechSynthesisVoice) => {
      let s = 0;
      if (/google|natural|neural|premium|samantha|aria|jenny|microsoft/i.test(v.name)) s += 4;
      if (v.localService === false) s += 2;
      if (v.default) s += 1;
      return s;
    };
    return score(b) - score(a);
  });
  return ranked[0] ?? voices[0] ?? null;
}

function tokenizeParagraphs(paragraphs: string[]) {
  return paragraphs.flatMap((paragraph, paragraphIndex) =>
    paragraph
      .split(/\s+/)
      .filter(Boolean)
      .map((word, wordIndexInParagraph) => ({ word, paragraphIndex, wordIndexInParagraph })),
  );
}

function charIndexToLocalWordIndex(text: string, charIndex: number) {
  const slice = text.slice(0, Math.max(0, charIndex));
  if (!slice.trim()) return 0;
  return slice.trim().split(/\s+/).filter(Boolean).length;
}

function loadProgress(postId: string): NarrationProgress | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${postId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as NarrationProgress;
    if (typeof parsed.wordIndex === "number" && typeof parsed.progressPercent === "number") {
      return parsed;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function saveProgress(postId: string, data: NarrationProgress) {
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${postId}`, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function supportsNativePause(): boolean {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  return typeof window.speechSynthesis.pause === "function";
}

export function useBlogNarration(paragraphs: string[], postId: string): BlogNarrationControls {
  const words = useMemo(() => tokenizeParagraphs(paragraphs), [paragraphs]);
  const totalWords = words.length;

  const [status, setStatus] = useState<NarrationStatus>("idle");
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [progressPercent, setProgressPercent] = useState(0);
  const [rate, setRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);

  const resumeWordIndexRef = useRef(0);
  const speakingWordIndexRef = useRef(-1);
  const chunkStartWordRef = useRef(0);
  const chunkWordCountRef = useRef(0);
  const cancelledRef = useRef(false);
  const usedNativePauseRef = useRef(false);
  const statusRef = useRef<NarrationStatus>("idle");
  const rateRef = useRef(rate);
  const volumeRef = useRef(volume);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const tickIntervalRef = useRef<number | null>(null);
  const tickerLocalWordRef = useRef(0);

  const estimatedDurationSec = useMemo(
    () => (totalWords / WORDS_PER_MINUTE) * 60,
    [totalWords],
  );

  const clearTicker = useCallback(() => {
    if (tickIntervalRef.current !== null) {
      window.clearInterval(tickIntervalRef.current);
      tickIntervalRef.current = null;
    }
  }, []);

  const msPerWord = useCallback(() => (60000 / WORDS_PER_MINUTE) / rateRef.current, []);

  const persistPosition = useCallback(
    (nextWordIndex: number) => {
      const clamped = Math.max(0, Math.min(nextWordIndex, totalWords));
      resumeWordIndexRef.current = clamped;
      const pct = totalWords > 0 ? Math.min(100, (clamped / totalWords) * 100) : 0;
      setProgressPercent(pct);
      saveProgress(postId, { wordIndex: clamped, progressPercent: pct });
    },
    [postId, totalWords],
  );

  const highlightWord = useCallback(
    (wordIndex: number) => {
      if (wordIndex < 0 || wordIndex >= totalWords) return;
      speakingWordIndexRef.current = wordIndex;
      setActiveWordIndex(wordIndex);
      persistPosition(wordIndex + 1);
    },
    [persistPosition, totalWords],
  );

  const startTicker = useCallback(
    (fromWordIndex: number, wordCount: number, localOffset = 0) => {
      clearTicker();
      chunkStartWordRef.current = fromWordIndex;
      chunkWordCountRef.current = wordCount;
      tickerLocalWordRef.current = localOffset;

      const tick = () => {
        const global = fromWordIndex + tickerLocalWordRef.current;
        if (global >= totalWords || tickerLocalWordRef.current >= wordCount) {
          clearTicker();
          return;
        }
        highlightWord(global);
        tickerLocalWordRef.current += 1;
      };

      tick();
      tickIntervalRef.current = window.setInterval(tick, msPerWord());
    },
    [clearTicker, highlightWord, msPerWord, totalWords],
  );

  const speakFromWord = useCallback(
    (startWordIndex: number) => {
      if (typeof window === "undefined" || !window.speechSynthesis) return;

      if (totalWords === 0) return;

      if (startWordIndex >= totalWords) {
        persistPosition(totalWords);
        setActiveWordIndex(totalWords - 1);
        setStatus("ended");
        statusRef.current = "ended";
        return;
      }

      cancelledRef.current = false;
      usedNativePauseRef.current = false;
      clearTicker();
      window.speechSynthesis.cancel();

      const remaining = words.slice(startWordIndex).map((w) => w.word);
      const text = remaining.join(" ");
      const wordCount = remaining.length;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rateRef.current;
      utterance.volume = volumeRef.current;
      utterance.pitch = 1;
      if (voiceRef.current) utterance.voice = voiceRef.current;

      utterance.onstart = () => {
        if (cancelledRef.current) return;
        setStatus("playing");
        statusRef.current = "playing";
        startTicker(startWordIndex, wordCount, 0);
      };

      utterance.onboundary = (event) => {
        if (cancelledRef.current || event.charIndex < 0) return;
        const localWord = charIndexToLocalWordIndex(text, event.charIndex);
        const globalWord = Math.min(startWordIndex + localWord, totalWords - 1);
        tickerLocalWordRef.current = localWord + 1;
        highlightWord(globalWord);
      };

      utterance.onend = () => {
        if (cancelledRef.current) return;
        clearTicker();
        persistPosition(totalWords);
        setActiveWordIndex(totalWords - 1);
        setStatus("ended");
        statusRef.current = "ended";
      };

      utterance.onerror = () => {
        if (cancelledRef.current) return;
        clearTicker();
        setStatus("paused");
        statusRef.current = "paused";
      };

      window.speechSynthesis.speak(utterance);
    },
    [clearTicker, persistPosition, startTicker, totalWords, words],
  );

  const play = useCallback(
    (fromWordIndex?: number) => {
      if (!totalWords) return;
      const synth = window.speechSynthesis;

      if (
        statusRef.current === "paused" &&
        usedNativePauseRef.current &&
        synth.paused &&
        typeof synth.resume === "function"
      ) {
        cancelledRef.current = false;
        const resumeFrom = speakingWordIndexRef.current >= 0 ? speakingWordIndexRef.current : chunkStartWordRef.current;
        startTicker(
          chunkStartWordRef.current,
          chunkWordCountRef.current,
          Math.max(0, resumeFrom - chunkStartWordRef.current),
        );
        synth.resume();
        setStatus("playing");
        statusRef.current = "playing";
        return;
      }

      cancelledRef.current = false;
      const start = fromWordIndex ?? resumeWordIndexRef.current;
      speakFromWord(Math.max(0, Math.min(start, totalWords - 1)));
    },
    [speakFromWord, startTicker, totalWords],
  );

  const pause = useCallback(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const synth = window.speechSynthesis;
    const speaking = speakingWordIndexRef.current;
    const nextWord = speaking >= 0 ? Math.min(speaking + 1, totalWords) : resumeWordIndexRef.current;

    if (synth.speaking && !synth.paused && supportsNativePause()) {
      usedNativePauseRef.current = true;
      synth.pause();
      clearTicker();
      resumeWordIndexRef.current = nextWord;
      persistPosition(nextWord);
      if (speaking >= 0) setActiveWordIndex(speaking);
      setStatus("paused");
      statusRef.current = "paused";
      return;
    }

    cancelledRef.current = true;
    usedNativePauseRef.current = false;
    clearTicker();
    synth.cancel();

    resumeWordIndexRef.current = nextWord;
    persistPosition(nextWord);
    if (speaking >= 0) setActiveWordIndex(speaking);

    setStatus("paused");
    statusRef.current = "paused";
  }, [clearTicker, persistPosition, totalWords]);

  const togglePlay = useCallback(() => {
    if (statusRef.current === "playing") {
      pause();
    } else if (statusRef.current === "ended") {
      resumeWordIndexRef.current = 0;
      speakingWordIndexRef.current = -1;
      setActiveWordIndex(-1);
      setProgressPercent(0);
      play(0);
    } else {
      play();
    }
  }, [pause, play]);

  const seekToWord = useCallback(
    (wordIndex: number) => {
      if (totalWords === 0) return;
      cancelledRef.current = true;
      usedNativePauseRef.current = false;
      clearTicker();
      window.speechSynthesis?.cancel();

      const clamped = Math.max(0, Math.min(wordIndex, totalWords - 1));
      resumeWordIndexRef.current = clamped;
      persistPosition(clamped);
      highlightWord(clamped);

      if (statusRef.current === "playing") {
        cancelledRef.current = false;
        speakFromWord(clamped);
      }
    },
    [clearTicker, highlightWord, persistPosition, speakFromWord, totalWords],
  );

  const seekToPercent = useCallback(
    (pct: number) => {
      if (totalWords === 0) return;
      const clamped = Math.max(0, Math.min(100, pct));
      const wordIndex = Math.min(totalWords - 1, Math.floor((clamped / 100) * totalWords));
      seekToWord(wordIndex);
      if (statusRef.current !== "playing") {
        cancelledRef.current = false;
        speakFromWord(wordIndex);
      }
    },
    [seekToWord, speakFromWord, totalWords],
  );

  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  useEffect(() => {
    rateRef.current = rate;
  }, [rate]);

  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    voiceRef.current = voice;
  }, [voice]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const hydrateVoice = () => {
      const picked = pickVoice();
      voiceRef.current = picked;
      setVoice(picked);
    };
    hydrateVoice();
    window.speechSynthesis.onvoiceschanged = hydrateVoice;

    const saved = loadProgress(postId);
    if (saved) {
      resumeWordIndexRef.current = saved.wordIndex;
      setProgressPercent(saved.progressPercent);
      if (saved.wordIndex > 0) {
        setActiveWordIndex(Math.min(saved.wordIndex - 1, totalWords - 1));
      }
    } else {
      resumeWordIndexRef.current = 0;
      speakingWordIndexRef.current = -1;
      setActiveWordIndex(-1);
      setProgressPercent(0);
    }

    return () => {
      cancelledRef.current = true;
      clearTicker();
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [clearTicker, postId, totalWords]);

  const prevRateRef = useRef(rate);
  const prevVolumeRef = useRef(volume);

  useEffect(() => {
    const rateChanged = prevRateRef.current !== rate;
    const volumeChanged = prevVolumeRef.current !== volume;
    prevRateRef.current = rate;
    prevVolumeRef.current = volume;
    if (!rateChanged && !volumeChanged) return;
    if (statusRef.current !== "playing") return;

    const resumeFrom =
      speakingWordIndexRef.current >= 0 ? speakingWordIndexRef.current : resumeWordIndexRef.current;
    usedNativePauseRef.current = false;
    speakFromWord(Math.max(0, Math.min(resumeFrom, totalWords - 1)));
  }, [rate, volume, speakFromWord, totalWords]);

  return {
    status,
    activeWordIndex,
    progressPercent,
    rate,
    volume,
    estimatedDurationSec,
    setRate,
    setVolume,
    play,
    pause,
    togglePlay,
    seekToPercent,
    seekToWord,
  };
}
