"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const musicTrack = {
  title: "BETTER, TOGETHER, FOREVER — TEAM ASTRO",
  src: "/Team Astro - Better, Together, Forever.flac",
  type: "audio/flac",
  volume: 0.25,
  fadeInMs: 1000,
  fadeOutMs: 300,
};

const targetVolume = Math.min(Math.max(musicTrack.volume, 0), 1);

type MusicPlayerContextValue = {
  isEngaged: boolean;
  isFadingOut: boolean;
  isPlaying: boolean;
  isUnavailable: boolean;
  togglePlayback: () => void;
};

const MusicPlayerContext = createContext<MusicPlayerContextValue | null>(null);

export function MusicPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const [isEngaged, setIsEngaged] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    return () => {
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);
    };
  }, []);

  function fadeVolume(
    audio: HTMLAudioElement,
    nextVolume: number,
    duration: number,
    onComplete?: () => void,
  ) {
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);

    const startVolume = audio.volume;
    const startTime = performance.now();

    function updateVolume(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = startVolume + (nextVolume - startVolume) * progress;

      if (progress < 1) {
        fadeFrameRef.current = requestAnimationFrame(updateVolume);
        return;
      }

      fadeFrameRef.current = null;
      onComplete?.();
    }

    fadeFrameRef.current = requestAnimationFrame(updateVolume);
  }

  function togglePlayback() {
    const audio = audioRef.current;

    if (!audio || isUnavailable) return;

    if (startTimerRef.current) {
      clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
      setIsEngaged(false);
      setIsPlaying(false);
      return;
    }

    if (isFadingOut) {
      setIsFadingOut(false);
      fadeVolume(audio, targetVolume, musicTrack.fadeInMs);
      return;
    }

    if (!audio.paused) {
      setIsFadingOut(true);
      fadeVolume(audio, 0, musicTrack.fadeOutMs, () => {
        audio.pause();
        audio.volume = targetVolume;
        setIsFadingOut(false);
      });
      return;
    }

    setIsEngaged(true);
    startTimerRef.current = setTimeout(async () => {
      startTimerRef.current = null;

      try {
        audio.volume = 0;
        await audio.play();
        fadeVolume(audio, targetVolume, musicTrack.fadeInMs);
      } catch {
        setIsEngaged(false);
        setIsPlaying(false);
      }
    }, 360);
  }

  return (
    <MusicPlayerContext.Provider
      value={{
        isEngaged,
        isFadingOut,
        isPlaying,
        isUnavailable,
        togglePlayback,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        onError={() => setIsUnavailable(true)}
        onPause={() => {
          setIsEngaged(false);
          setIsPlaying(false);
        }}
        onPlay={() => setIsPlaying(true)}
      >
        <source src={musicTrack.src} type={musicTrack.type} />
      </audio>
    </MusicPlayerContext.Provider>
  );
}

export function useMusicPlayer() {
  const context = useContext(MusicPlayerContext);

  if (!context) {
    throw new Error("useMusicPlayer must be used inside MusicPlayerProvider");
  }

  return context;
}
