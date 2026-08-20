import { DeferredBackgroundVideo } from "./deferred-background-video";
import styles from "./video-background.module.css";

type VideoBackgroundProps = {
  src: string;
  poster: string;
};

export function VideoBackground({
  src,
  poster,
}: VideoBackgroundProps) {
  return (
    <div className={styles.background}>
      <DeferredBackgroundVideo
        className={styles.media}
        posterClassName={styles.poster}
        videoClassName={styles.video}
        poster={poster}
        src={src}
      />
      <div className={styles.shade} />
    </div>
  );
}
