import { Mail } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer
      data-ocid="footer.panel"
      className="border-t border-gold/30 bg-background"
    >
      {/* Gold top accent line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-gold text-2xl">✦</span>
              <div>
                <div className="font-display text-base font-bold text-foreground tracking-widest">
                  PERFUME KING
                </div>
                <div className="font-body text-xs text-gold tracking-[0.3em]">
                  INDIA
                </div>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              India's most trusted destination for 100% authentic designer
              perfumes and luxury fragrances.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "Shop", to: "/shop" },
                { label: "About", to: "/#about" },
                { label: "Contact", to: "/#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                "Designer Fragrances",
                "Niche Fragrances",
                "Testers",
                "Decants",
                "Best Sellers",
              ].map((c) => (
                <li key={c}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(c)}`}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold tracking-widest uppercase mb-4">
              Connect
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/919999770400"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <SiWhatsapp size={16} className="text-gold" />
                +91 99999 99999
              </a>
              <a
                href="https://instagram.com/perfumekingindia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <SiInstagram size={16} className="text-gold" />
                @perfumekingindia
              </a>
              <a
                href="mailto:perfumekingindia@gmail.com"
                className="flex items-center gap-3 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail size={16} className="text-gold" />
                perfumekingindia@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-sm text-muted-foreground">
            © {year} Perfume King India. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="font-body text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
          <p className="font-body text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
