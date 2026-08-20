"use client";

import { musicTrack, useMusicPlayer } from "./music-player-context";
import styles from "./record-player.module.css";

export function RecordPlayer() {
  const {
    isEngaged,
    isFadingOut,
    isPlaying,
    isUnavailable,
    togglePlayback,
  } = useMusicPlayer();

  const status = isUnavailable
    ? "TRACK UNAVAILABLE"
    : isEngaged && !isPlaying
      ? "LOWERING NEEDLE"
      : isFadingOut
        ? "FADING OUT"
        : "START THE TRACK";

  return (
    <div className={styles.player}>
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
                <span>{musicTrack.title}</span>
                <span aria-hidden="true">{musicTrack.title}</span>
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
