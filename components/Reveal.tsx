"use client";

import { ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delayMs?: number;
}

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delayMs = 0,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>(delayMs);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${inView ? "in-view" : ""} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
}
