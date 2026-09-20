import { defaultWhatsAppMessage, siteConfig, waLink } from "@/lib/site-config";
import Reveal from "./Reveal";
import QuoteForm from "./QuoteForm";
import PhoneIcon from "./PhoneIcon";

export default function Contact() {
  const mapQuery = encodeURIComponent(
    "5th Cross 17th Main J P Nagar Mysuru 570008"
  );

  return (
    <section className="contact" id="contact">
      <div className="wrap contact-inner">
        <div className="contact-info">
          <Reveal className="section-head light">
            <h2>Get a quote</h2>
            <p>Tell us about the project and we&apos;ll get back to you, or call directly.</p>
          </Reveal>
          <ul className="contact-list">
            <li>
              <span className="contact-label">Phone</span>
              <a
                href={`tel:${siteConfig.phoneE164}`}
                aria-label="Call NYRA Constructions"
                title="Call us"
                className="phone-cta"
              >
                <PhoneIcon size={18} /> Call us
              </a>
            </li>
            <li>
              <span className="contact-label">WhatsApp</span>
              <a
                href={waLink(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <span className="contact-label">Address</span>
              <address>
                {siteConfig.address.line1}
                <br />
                {siteConfig.address.line2}
                <br />
                {siteConfig.address.city}, {siteConfig.address.state} –{" "}
                {siteConfig.address.postalCode}
              </address>
            </li>
            <li>
              <span className="contact-label">Hours</span>
              <span>{siteConfig.hours}</span>
            </li>
          </ul>
        </div>

        <QuoteForm />
      </div>

      <div className="map-wrap">
        <iframe
          title="NYRA Constructions location"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
          width="100%"
          height={320}
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
