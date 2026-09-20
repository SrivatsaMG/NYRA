import { siteConfig } from "@/lib/site-config";
import Logo from "./Logo";
import PhoneIcon from "./PhoneIcon";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-inner">
        <div className="footer-brand">
          <Logo variant="mark" height={32} />
          <div>
            <strong>{siteConfig.name}</strong>
            <span>Mysuru, Karnataka</span>
          </div>
        </div>
        <div className="footer-contact">
          <a
            href={`tel:${siteConfig.phoneE164}`}
            aria-label="Call NYRA Constructions"
            title="Call us"
          >
            <PhoneIcon size={16} /> Call us
          </a>
          <span>
            {siteConfig.address.line1}, {siteConfig.address.line2},{" "}
            {siteConfig.address.city} – {siteConfig.address.postalCode}
          </span>
        </div>
        <p className="footer-copy">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
