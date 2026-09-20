"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import Logo from "./Logo";
import PhoneIcon from "./PhoneIcon";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <Link href="#top" className="logo">
          <Logo variant="full" height={42} />
        </Link>

        <nav className={`main-nav ${open ? "open" : ""}`} id="mainNav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-cta">
          <a
            href={`tel:${siteConfig.phoneE164}`}
            className="btn btn-ghost"
            aria-label="Call NYRA Constructions"
            title="Call us"
          >
            <PhoneIcon size={16} />
            Call us
          </a>
          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
