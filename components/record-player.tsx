"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./record-player.module.css";

const track = {
  title: "BETTER, TOGETHER, FOREVER — TEAM ASTRO",
  src: "/Team Astro - Better, Together, Forever.flac",
  type: "audio/flac",
  volume: 0.25,
  fadeInMs: 1000,
  fadeOutMs: 800,
};

const targetVolume = Math.min(Math.max(track.volume, 0), 1);

export function RecordPlayer() {
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
    targetVolume: number,
    duration: number,
    onComplete?: () => void,
  ) {
    if (fadeFrameRef.current) cancelAnimationFrame(fadeFrameRef.current);

    const startVolume = audio.volume;
    const startTime = performance.now();

    function updateVolume(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      audio.volume = startVolume + (targetVolume - startVolume) * progress;

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
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      startTimerRef.current = null;
      setIsEngaged(false);
      setIsPlaying(false);
      return;
    }

    if (isFadingOut) {
      setIsFadingOut(false);
      fadeVolume(audio, targetVolume, track.fadeInMs);
      return;
    }

    if (!audio.paused) {
      setIsFadingOut(true);
      fadeVolume(audio, 0, track.fadeOutMs, () => {
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
        fadeVolume(audio, targetVolume, track.fadeInMs);
      } catch {
        setIsEngaged(false);
        setIsPlaying(false);
      }
    }, 720);
  }

  const status = isUnavailable
    ? "TRACK UNAVAILABLE"
    : isEngaged && !isPlaying
      ? "LOWERING NEEDLE"
      : isFadingOut
        ? "FADING OUT"
        : "START THE TRACK";

  return (
    <div className={styles.player}>
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
        <source src={track.src} type={track.type} />
      </audio>

      <button
        className={`${styles.playerButton} ${isEngaged ? styles.isEngaged : ""} ${isPlaying ? styles.isPlaying : ""}`}
        type="button"
        onClick={togglePlayback}
        disabled={isUnavailable}
        aria-label={
          isFadingOut
            ? "Keep playing music"
            : isPlaying
              ? "Pause music"
              : isEngaged
                ? "Cancel music start"
                : "Play music"
        }
        aria-pressed={isPlaying}
      >
        <span className={styles.deck} aria-hidden="true">
          <span className={styles.disc}>
            <i />
          </span>
          <span className={styles.tonearm}>
            <i />
          </span>
        </span>

        <span className={styles.copy}>
          <span className={styles.eyebrow}>
            {isPlaying ? "NOW PLAYING" : "UP FOR SOME MUSIC?"}
          </span>
          <strong>
            {isPlaying && !isFadingOut ? (
              <span className={styles.trackMarquee}>
                <span>{track.title}</span>
                <span aria-hidden="true">{track.title}</span>
              </span>
            ) : (
              status
            )}
          </strong>
        </span>

        <span className={styles.levels} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>
    </div>
  );
}
