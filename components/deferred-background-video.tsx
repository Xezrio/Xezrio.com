"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type DeferredBackgroundVideoProps = {
  className: string;
  posterClassName: string;
  videoClassName: string;
  poster: string;
  src: string;
  mobileSrc?: string;
  revealDelayMs?: number;
};

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

export function DeferredBackgroundVideo({
  className,
  posterClassName,
  videoClassName,
  poster,
  src,
  mobileSrc,
  revealDelayMs = 0,
}: DeferredBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string>();
  const [isReady, setIsReady] = useState(false);
  const [canReveal, setCanReveal] = useState(revealDelayMs === 0);

  useEffect(() => {
    const prefersLessMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const savesData = (navigator as NavigatorWithConnection).connection
      ?.saveData;

    if (prefersLessMotion || savesData) return;

    const selectedSrc =
      mobileSrc && window.matchMedia("(max-width: 760px)").matches
        ? mobileSrc
        : src;
    const loadTimer = window.setTimeout(() => setVideoSrc(selectedSrc), 500);
    const revealTimer = window.setTimeout(
      () => setCanReveal(true),
      revealDelayMs,
    );

    return () => {
      window.clearTimeout(loadTimer);
      window.clearTimeout(revealTimer);
    };
  }, [mobileSrc, revealDelayMs, src]);

  useEffect(() => {
    if (!videoSrc || !canReveal) return;

    void videoRef.current?.play().catch(() => setIsReady(false));
  }, [canReveal, videoSrc]);

  const posterStyle = {
    backgroundImage: `url("${poster}")`,
  } satisfies CSSProperties;

  return (
    <div
      className={className}
      data-video-ready={isReady ? "true" : "false"}
      aria-hidden="true"
    >
      <div className={posterClassName} style={posterStyle} />
      <video
        ref={videoRef}
        className={videoClassName}
        src={videoSrc}
        muted
        loop
        playsInline
        preload={videoSrc ? "auto" : "none"}
        onPlaying={() => setIsReady(true)}
        onError={() => setIsReady(false)}
      />
    </div>
  );
}
