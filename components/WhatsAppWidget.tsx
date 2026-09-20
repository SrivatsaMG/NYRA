"use client";

import { useEffect, useRef, useState } from "react";
import { defaultWhatsAppMessage, waLink } from "@/lib/site-config";
import WhatsAppIcon from "./WhatsAppIcon";

const AUTO_OPEN_DELAY_MS = 4000;
const SESSION_KEY = "waAutoOpened";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const widgetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem(SESSION_KEY, "1");
    }, AUTO_OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={`wa-widget ${open ? "open" : ""}`} ref={widgetRef}>
      <div
        className="wa-popup"
        role="dialog"
        aria-label="Chat with NYRA Constructions on WhatsApp"
      >
        <div className="wa-popup-head">
          <div className="wa-avatar">N</div>
          <div>
            <strong>NYRA Constructions</strong>
            <span>Typically replies within a few hours</span>
          </div>
          <button
            className="wa-close"
            aria-label="Close chat popup"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className="wa-bubble">
          Hello! 👋 Planning a construction project — a new build, renovation, or
          civil work? Tell us a bit about it and we&apos;ll get back to you.
        </div>
        <a
          href={waLink(defaultWhatsAppMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="wa-start-btn"
        >
          <WhatsAppIcon size={18} />
          Start chat on WhatsApp
        </a>
      </div>
      <button
        className="whatsapp-fab"
        aria-label="Open WhatsApp chat"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <WhatsAppIcon />
      </button>
    </div>
  );
}
