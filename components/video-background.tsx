import styles from "./video-background.module.css";

type VideoBackgroundProps = {
  src: string;
  poster?: string;
};

export function VideoBackground({
  src,
  poster,
}: VideoBackgroundProps) {
  return (
    <div className={styles.background} aria-hidden="true">
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      <div className={styles.shade} />
    </div>
  );
}