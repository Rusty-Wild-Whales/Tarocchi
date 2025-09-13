import React, { useEffect, useRef, useState } from "react";

export function TypewriterText({
  text,
  speed = 35,
  showCursor = true,
}: {
  text: string;
  speed?: number;
  showCursor?: boolean;
}) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // reset when text changes
    setDisplayed("");
    setDone(false);
    if (!text || speed <= 0) {
      setDisplayed(text || "");
      setDone(true);
      return;
    }

    let i = 0;

    const step = () => {
      setDisplayed(text.slice(0, i + 1)); // always slice from 0
      i += 1;
      if (i >= text.length) {
        setDone(true);
        if (timerRef.current) window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    // show first char immediately
    step();

    // then continue at interval
    timerRef.current = window.setInterval(step, speed);

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          className={`inline-block w-[0.5ch] ${
            done ? "opacity-0" : "animate-blink"
          }`}
        >
          |
        </span>
      )}
    </span>
  );
}
