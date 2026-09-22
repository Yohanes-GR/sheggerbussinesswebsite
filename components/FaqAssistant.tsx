"use client";

import { useMemo, useRef, useState } from "react";
import { faqFallback, faqItems, matchFaq, type FaqItem } from "@/lib/faq";
import { whatsappHref } from "@/lib/social";
import type { Company } from "@/lib/types";

type ChatLine = { from: "bot" | "you"; text: string };

type DragState = {
  pointerX: number;
  pointerY: number;
  startX: number;
  startY: number;
  origLeft: number;
  origTop: number;
  width: number;
  height: number;
};

export function FaqAssistant({ company }: { company: Company }) {
  const items = useMemo(() => faqItems(company), [company]);
  const wa = whatsappHref(company);
  const [open, setOpen] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<ChatLine[]>([
    {
      from: "bot",
      text: `👋 Hello! Welcome to ${company.name}. How can I assist you today?`,
    },
  ]);
  const scroller = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const drag = useRef<DragState | null>(null);

  function push(query: string, item?: FaqItem | null) {
    const text = query.trim();
    if (!text) return;
    const reply = item?.answer ?? matchFaq(text, items)?.answer ?? faqFallback(company);
    setLines((prev) => [...prev, { from: "you", text }, { from: "bot", text: reply }]);
    setDraft("");
    requestAnimationFrame(() => {
      scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
    });
  }

  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button,a")) return;
    const box = wrap.current?.getBoundingClientRect();
    if (!box) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = {
      pointerX: e.clientX,
      pointerY: e.clientY,
      startX: offset.x,
      startY: offset.y,
      origLeft: box.left,
      origTop: box.top,
      width: box.width,
      height: box.height,
    };
  }

  function moveDrag(e: React.PointerEvent<HTMLDivElement>) {
    const d = drag.current;
    if (!d) return;
    const left = d.origLeft + (e.clientX - d.pointerX);
    const top = d.origTop + (e.clientY - d.pointerY);
    const pad = 8;
    const maxLeft = Math.max(pad, window.innerWidth - d.width - pad);
    const maxTop = Math.max(pad, window.innerHeight - d.height - pad);
    const cl = Math.min(Math.max(left, pad), maxLeft);
    const ct = Math.min(Math.max(top, pad), maxTop);
    setOffset({
      x: d.startX + (cl - d.origLeft),
      y: d.startY + (ct - d.origTop),
    });
  }

  function endDrag() {
    drag.current = null;
  }

  return (
    <div
      ref={wrap}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-4 z-[60] font-sans sm:right-6"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {open ? (
        <div
          className={`mb-3 flex flex-col overflow-hidden rounded-2xl border border-brand/10 bg-white shadow-2xl ${
            maximized
              ? "h-[min(calc(100dvh-6.5rem),46rem)] w-[min(calc(100vw-1.5rem),32rem)]"
              : "h-[min(calc(100dvh-7.5rem),36rem)] w-[min(calc(100vw-1.5rem),26rem)]"
          }`}
        >
          <div
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            className="flex cursor-grab touch-none items-start gap-2 bg-gradient-to-r from-brand to-brand/80 px-4 py-3 text-white active:cursor-grabbing"
          >
            <div className="min-w-0 flex-1 text-center">
              <p className="text-sm font-semibold leading-5">{company.name} Desk</p>
              <p className="mt-0.5 text-[11px] text-white/90">Online · FAQ Assistant</p>
            </div>
            <button
              type="button"
              onClick={() => setMaximized((v) => !v)}
              aria-label={maximized ? "Restore desk size" : "Maximize desk"}
              className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-white/90 hover:bg-white/15"
            >
              {maximized ? (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M8 8h10v10H8V8Zm2 2v6h6v-6h-6ZM4 4h10v2H6v8H4V4Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M5 5h14v14H5V5Zm2 2v10h10V7H7Z" />
                </svg>
              )}
            </button>
          </div>
          <div ref={scroller} className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {lines.map((line, i) => (
              <div
                key={`${line.from}-${i}`}
                className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  line.from === "bot"
                    ? "rounded-bl-none border border-black/5 bg-sand text-ink"
                    : "ml-auto rounded-br-none bg-brand text-white"
                }`}
              >
                {line.text}
              </div>
            ))}
          </div>
          <div className="shrink-0 border-t border-black/5 px-3 py-2">
            <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {items.map((item) => (
                <button
                  key={item.topic}
                  type="button"
                  onClick={() => push(item.topic, item)}
                  className="shrink-0 rounded-full border border-brand/20 px-3 py-1.5 text-sm text-brand hover:bg-brand/5"
                >
                  {item.topic}
                </button>
              ))}
            </div>
          </div>
          <form
            className="flex shrink-0 gap-2 border-t border-black/5 bg-white p-3"
            onSubmit={(e) => {
              e.preventDefault();
              push(draft);
            }}
          >
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white hover:brightness-110"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            ) : null}
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type your question..."
              className="min-w-0 flex-1 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-ink outline-none placeholder:text-muted focus:border-brand"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white disabled:opacity-30"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                <path d="M21.4 11.2 4.7 3.6a.9.9 0 0 0-1.3 1l2.3 7.2H13a.8.8 0 0 1 0 1.6H5.7l-2.3 7.2a.9.9 0 0 0 1.3 1l16.7-7.6a.9.9 0 0 0 0-1.8Z" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close FAQ assistant" : "Open FAQ assistant"}
        className="relative ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand-dark"
      >
        <span className="absolute right-1 top-1 h-3 w-3 rounded-full bg-accent ring-2 ring-white" />
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
            <path d="M6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12 19 6.4 17.6 5 12 10.6 6.4 5Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M12 3a9 9 0 0 0-9 9 8.9 8.9 0 0 0 1.4 4.8L3 21l4.4-1.2A9 9 0 1 0 12 3Zm-3.2 8.2a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm3.2 0a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Zm3.2 0a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
