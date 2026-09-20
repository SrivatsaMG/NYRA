import { siteConfig } from "@/lib/site-config";
import ThreeScene from "./ThreeScene";
import PhoneIcon from "./PhoneIcon";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="location-tag">
            <span className="dot" />J P Nagar, Mysuru
          </p>
          <h1>
            Construction work,
            <br />
            built to last, done
            <br />
            right here in Mysuru.
          </h1>
          <p className="hero-sub">
            NYRA Constructions plans and builds residential and commercial
            projects from the ground up — from the first site visit through
            structural work, finishing and handover, managed by one team
            throughout.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Get a quote
            </a>
            <a
              href={`tel:${siteConfig.phoneE164}`}
              className="btn btn-outline"
              aria-label="Call NYRA Constructions"
              title="Call us"
            >
              <PhoneIcon size={16} />
              Call us
            </a>
          </div>
          <ul className="hero-stats">
            <li>
              <strong>Residential &amp; commercial</strong>
              <span>Ground-up construction and renovation</span>
            </li>
            <li>
              <strong>One point of contact</strong>
              <span>From site visit through handover</span>
            </li>
          </ul>
        </div>

        <ThreeScene />
      </div>
    </section>
  );
}
