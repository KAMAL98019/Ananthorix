"use client";

import { SendHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMotion } from "../../motion/MotionProvider";
import { cx } from "../../ui/cx";
import DecoText from "../../ui/DecoText";

// Live-style chat panel for the SCRIPTED, ILLUSTRATIVE agent transcripts (never customer data).
// While on screen it plays the script: the agent "types", then each message slides in, and the conversation
// loops after a pause. Every message is always in the DOM (only faded), so the panel never changes height and
// crawlers, no-JS visitors and reduced-motion visitors see the whole script.
const TYPING_MS = 1300;
const HUMAN_GAP_MS = 750;
const AFTER_MS = 450;
const LOOP_PAUSE_MS = 3800;

export default function LiveChat({
  title,
  transcript,
  agentSpeaker = "Agent",
  className,
}: {
  title: string;
  transcript: { speaker: string; text: string }[];
  agentSpeaker?: string;
  className?: string;
}) {
  const [shown, setShown] = useState(transcript.length);
  const [typing, setTyping] = useState(false);
  const [visible, setVisible] = useState(false);
  const { reducedMotion } = useMotion();
  const ref = useRef<HTMLDivElement>(null);

  // Only play while the panel is on screen (hidden tab panels never intersect).
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { threshold: 0.35 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pending = new Set<number>();
    const at = (ms: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        pending.delete(id);
        fn();
      }, ms);
      pending.add(id);
    };

    if (!visible || reducedMotion) {
      // Show the full script whenever it is not playing.
      at(0, () => {
        setShown(transcript.length);
        setTyping(false);
      });
      return () => pending.forEach((id) => window.clearTimeout(id));
    }

    const run = () => {
      let t = 0;
      at(t, () => {
        setShown(0);
        setTyping(false);
      });
      t += 600;
      transcript.forEach((line, index) => {
        if (line.speaker === agentSpeaker) {
          at(t, () => setTyping(true));
          t += TYPING_MS;
        } else {
          t += HUMAN_GAP_MS;
        }
        at(t, () => {
          setTyping(false);
          setShown(index + 1);
        });
        t += AFTER_MS;
      });
      at(t + LOOP_PAUSE_MS, run);
    };
    run();
    return () => pending.forEach((id) => window.clearTimeout(id));
  }, [visible, reducedMotion, transcript, agentSpeaker]);

  const initials = title
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <div ref={ref} className={cx("overflow-hidden rounded-panel border border-line bg-surface-1 shadow-raised", className)}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-4 py-4 sm:gap-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple to-deep-blue font-mono text-[12px] font-semibold text-starlight">
            {initials}
            <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full border-2 border-canvas bg-[#22C55E]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-fg-primary sm:text-base">
              {/* The tab or page heading already names the agent; this header copy is decorative. */}
              <DecoText text={title} />
            </p>
            <p aria-hidden="true" className="text-[12px] text-fg-secondary">
              {typing ? <span className="text-purple">typing…</span> : "Online"}
            </p>
          </div>
        </div>
        <p className="shrink-0 rounded-tag bg-gold/20 px-2 py-1 font-mono text-[10px] font-semibold text-fg-primary sm:text-[11px]">
          <span className="sm:hidden">ILLUSTRATIVE</span>
          <span className="hidden sm:inline">ILLUSTRATIVE SCRIPT</span>
        </p>
      </div>

      {/* Messages */}
      <ul className="flex flex-col gap-3 px-4 py-5 md:px-5">
        {transcript.map((line, index) => {
          const fromAgent = line.speaker === agentSpeaker;
          const isShown = index < shown;
          const isTyping = typing && index === shown && fromAgent;
          return (
            <li key={index} className={cx("relative flex", fromAgent ? "justify-start" : "justify-end")}>
              <div
                className={cx(
                  "max-w-[85%] px-4 py-3 text-small transition-all duration-500 ease-out",
                  fromAgent ? "rounded-[18px] rounded-bl-md bg-canvas text-fg-primary shadow-raised" : "rounded-[18px] rounded-br-md bg-deep-blue text-canvas",
                  isShown ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                )}
              >
                <p className="font-mono text-[11px] opacity-70">{line.speaker}</p>
                <p className="mt-1">{line.text}</p>
              </div>
              {isTyping && (
                <div aria-hidden="true" className="absolute left-0 top-0 flex items-center gap-1.5 rounded-[18px] rounded-bl-md bg-canvas px-4 py-3.5 shadow-raised">
                  <span className="chat-dot size-2 rounded-full bg-purple/70" />
                  <span className="chat-dot size-2 rounded-full bg-purple/70 [animation-delay:150ms]" />
                  <span className="chat-dot size-2 rounded-full bg-purple/70 [animation-delay:300ms]" />
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Composer (decorative) */}
      <div aria-hidden="true" className="flex items-center gap-3 border-t border-line bg-canvas px-4 py-3">
        <span className="flex-1 rounded-chip bg-surface-1 px-4 py-2.5 text-small text-fg-secondary">Type a message…</span>
        <span className="inline-flex size-10 items-center justify-center rounded-full bg-deep-blue text-starlight">
          <SendHorizontal className="size-4" />
        </span>
      </div>
    </div>
  );
}
