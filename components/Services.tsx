import type { ReactNode } from "react";
import { services } from "@/lib/site-config";
import Reveal from "./Reveal";

const icons: ReactNode[] = [
  // Residential construction
  <svg key="residential" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M8 34V16l12-8 12 8v18" />
    <path d="M8 34h24" />
    <path d="M16 34V22h8v12" />
  </svg>,
  // Commercial construction
  <svg key="commercial" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <rect x="7" y="10" width="12" height="24" />
    <rect x="21" y="4" width="12" height="30" />
    <path d="M11 16h4M11 22h4M11 28h4M25 10h4M25 16h4M25 22h4" />
  </svg>,
  // Renovation & interiors
  <svg key="renovation" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M6 20l14-12 14 12" />
    <path d="M10 18v14h20V18" />
    <path d="M20 20v6" />
    <path d="M16 32v-6h8v6" />
  </svg>,
  // Structural & RCC work
  <svg key="structural" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M8 34V12h6v22M22 34V6h6v28M14 34h20" />
  </svg>,
  // Site development & civil works
  <svg key="site" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth={1.6}>
    <path d="M6 30l6-14 6 8 5-10 5 6 6-6" />
    <path d="M6 34h28" />
  </svg>,
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <Reveal className="section-head">
          <h2>What we build</h2>
          <p>Construction work handled end to end, by one team.</p>
        </Reveal>
        <div className="service-grid">
          {services.map((service, i) => (
            <Reveal key={service.title} className="service-item" delayMs={(i % 3) * 90}>
              <div className="service-icon" aria-hidden="true">
                {icons[i]}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
