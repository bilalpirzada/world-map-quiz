"use client";

import { useRef, useCallback, useState, useEffect } from "react";

const SOUND_FILES = {
  correct: "/sounds/correct.wav",
  wrong: "/sounds/wrong.wav",
  streak: "/sounds/streak.wav",
};

type SoundName = keyof typeof SOUND_FILES;

export const useSound = () => {
  const audioRefs = useRef<Record<SoundName, HTMLAudioElement | null>>({
    correct: null,
    wrong: null,
    streak: null,
  });
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Preload audio elements on mount
    (Object.keys(SOUND_FILES) as SoundName[]).forEach((name) => {
      const audio = new Audio(SOUND_FILES[name]);
      audio.preload = "auto";
      audio.volume = 0.5;
      audioRefs.current[name] = audio;
    });

    // Load mute preference from localStorage
    const savedMute = localStorage.getItem("geoquest-muted");
    if (savedMute === "true") setMuted(true);
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (muted) return;
      const audio = audioRefs.current[name];
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {
          // Ignore autoplay errors (e.g. before user interaction)
        });
      }
    },
    [muted]
  );

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem("geoquest-muted", String(next));
      return next;
    });
  }, []);

  return { play, muted, toggleMute };
};