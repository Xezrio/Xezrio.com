"use client";

import { useState } from "react";
import styles from "./about.module.css";

export function AboutPaper() {
  const [isFormal, setIsFormal] = useState(false);

  const buttonLabel = isFormal
    ? "Toggle Handwriting"
    : "Toggle Formal";

  return (
    <section
      className={`${styles.aboutCard} ${
        isFormal ? styles.formalFont : ""
      }`}
    >
      <button
        className={styles.foldButton}
        type="button"
        onClick={() => setIsFormal((current) => !current)}
        aria-label={buttonLabel}
        aria-pressed={isFormal}
        title={buttonLabel}
      />

      <h2>About me</h2>

      <p>
        Heyy, I&apos;m Xezrio. Welcome to my little den on the Internet.
        <br />
        I like music, traveling, stories, and wandering into whatever
        happens to catch my interest.
        <br />
        <br />
        I&apos;m the kind of person who likes keeping things around —
        songs I love, stories that stay with me, small memories, random
        thoughts, and things I&apos;ve made along the way.
        <br />
        <br />
        So that&apos;s mostly what this place is for.
        <br />
        A little corner of the internet for the things I like.
      </p>
    </section>
  );
}