"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

interface UseEvergreenCountdownReturn {
  display: string;
  reset: () => void;
}

export function useEvergreenCountdown(
  key: string = "offerEndAt",
  durationMs: number = 4 * 60 * 60 * 1000
): UseEvergreenCountdownReturn {
  const now = () => Date.now();

  // Initialize end time (persisted in localStorage, with SSR safety)
  const [endAt, setEndAt] = useState<number>(() => {
    if (typeof window === "undefined") return now() + durationMs;
    
    const saved = Number(localStorage.getItem(key));
    const t = isNaN(saved) || saved <= now() ? now() + durationMs : saved;
    localStorage.setItem(key, String(t));
    return t;
  });

  // Tick to trigger re-render every second
  const [nowMs, setNowMs] = useState<number>(now());

  useEffect(() => {
    const id = setInterval(() => {
      const remain = endAt - now();
      if (remain <= 0) {
        const next = now() + durationMs; // Reset to duration
        if (typeof window !== "undefined") {
          localStorage.setItem(key, String(next));
        }
        setEndAt(next);
      }
      setNowMs(now()); // Forces repaint each second
    }, 1000);
    
    return () => clearInterval(id);
  }, [endAt, durationMs, key]);

  const reset = useCallback(() => {
    const next = now() + durationMs;
    if (typeof window !== "undefined") {
      localStorage.setItem(key, String(next));
    }
    setEndAt(next);
    setNowMs(now());
  }, [durationMs, key]);

  const display = useMemo(() => {
    const left = Math.max(0, endAt - nowMs);
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }, [endAt, nowMs]);

  return { display, reset };
}