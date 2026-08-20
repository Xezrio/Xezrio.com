"use client";

import { useMusicPlayer } from "./music-player-context";
import styles from "./floating-record-player.module.css";

export function FloatingRecordPlayer() {
  const {
    isEngaged,
    isFadingOut,
    isPlaying,
    isUnavailable,
    togglePlayback,
  } = useMusicPlayer();
  const isActivelyPlaying = isPlaying && !isFadingOut;

  const label = isUnavailable
    ? "Music unavailable"
    : isFadingOut
      ? "Keep music playing"
      : isPlaying
        ? "Pause music"
        : isEngaged
          ? "Cancel music start"
          : "Play music";

  return (
    <button
      className={`${styles.floatingPlayer} ${isPlaying ? styles.isPlaying : ""}`}
      type="button"
      onClick={togglePlayback}
      disabled={isUnavailable}
      aria-label={`${label} from floating record player`}
      aria-pressed={isPlaying}
      title={label}
    >
      <span className={styles.record} aria-hidden="true" />
      <span className={styles.controlIcon} aria-hidden="true">
        {isActivelyPlaying ? "❚❚" : "▶"}
      </span>
    </button>
  );
}
