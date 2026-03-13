import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const el2 = document.getElementById(id);
        if (el2) el2.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  return (
    <header
      data-ocid="navbar.panel"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-3 shadow-gold" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-gold text-2xl">✦</span>
          <div>
            <div className="font-display text-lg font-bold text-foreground tracking-widest leading-none">
              PERFUME KING
            </div>
            <div className="font-body text-xs text-gold tracking-[0.3em] leading-none mt-0.5">
              INDIA
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            data-ocid="navbar.link.1"
            to="/"
            className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase"
          >
            Home
          </Link>
          <Link
            data-ocid="navbar.link.2"
            to="/shop"
            className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase"
          >
            Shop
          </Link>
          <button
            type="button"
            data-ocid="navbar.link.3"
            onClick={() => scrollToSection("about")}
            className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase"
          >
            About
          </button>
          <button
            type="button"
            data-ocid="navbar.link.4"
            onClick={() => scrollToSection("contact")}
            className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase"
          >
            Contact
          </button>
          <a
            data-ocid="navbar.link.5"
            href="https://wa.me/919999770400"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm tracking-widest px-4 py-2 border border-gold text-gold hover:bg-gold hover:text-background transition-all uppercase"
          >
            WhatsApp
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          data-ocid="navbar.toggle"
          className="md:hidden text-gold p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-gold/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase py-2"
              >
                Home
              </Link>
              <Link
                to="/shop"
                onClick={() => setMobileOpen(false)}
                className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase py-2"
              >
                Shop
              </Link>
              <button
                type="button"
                onClick={() => scrollToSection("about")}
                className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase py-2 text-left"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => scrollToSection("contact")}
                className="font-body text-sm tracking-widest text-muted-foreground hover:text-gold transition-colors uppercase py-2 text-left"
              >
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
