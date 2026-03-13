import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import PerfumeBottle3D from "../components/PerfumeBottle3D";
import ProductCard from "../components/ProductCard";
import { getPerfumeImage, localPerfumes } from "../data/perfumes";

// Particle canvas hook
function useParticleCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      speedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      drift: Math.random() * Math.PI * 2,
    }));

    let animId: number;
    let frame = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      for (const p of particles) {
        p.y -= p.speedY;
        p.x += Math.sin(frame * 0.01 + p.drift) * 0.2;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 168, 67, ${p.opacity * 0.8})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

const reviews = [
  {
    name: "Rahul S.",
    location: "Mumbai",
    initials: "RS",
    text: "Absolutely genuine products! Ordered Dior Sauvage and it arrived perfectly sealed with full authenticity. The fragrance is exactly as expected. Will definitely order again.",
  },
  {
    name: "Priya M.",
    location: "Delhi",
    initials: "PM",
    text: "Best perfume store in India. The prices are unmatched and delivery was super fast. Got Tom Ford Oud Wood for my anniversary — my partner loved it!",
  },
  {
    name: "Arjun K.",
    location: "Bangalore",
    initials: "AK",
    text: "100% authentic. I was skeptical buying online but the product quality and packaging blew my mind. The WhatsApp ordering is so convenient. Highly recommended!",
  },
  {
    name: "Sneha R.",
    location: "Hyderabad",
    initials: "SR",
    text: "Perfume King India is simply the best. Got Chanel No. 5 at an incredible price. The fragrance is heavenly and the packaging was luxurious. A trusted seller indeed!",
  },
  {
    name: "Vikram D.",
    location: "Pune",
    initials: "VD",
    text: "Fast delivery, authentic products, best prices — what more can you ask for? I've ordered 5 times now and every single experience has been fantastic.",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "100% Authentic",
    desc: "Every fragrance is 100% genuine, directly sourced from authorized distributors worldwide.",
  },
  {
    icon: "⭐",
    title: "Trusted Seller",
    desc: "Thousands of happy customers trust us for their luxury fragrance needs across India.",
  },
  {
    icon: "💰",
    title: "Best Prices",
    desc: "Premium fragrances at unbeatable prices. We guarantee the best market rates.",
  },
  {
    icon: "🚀",
    title: "Fast Delivery",
    desc: "Swift and secure delivery across India. Your luxury fragrance arrives safely and quickly.",
  },
  {
    icon: "😊",
    title: "100% Satisfaction",
    desc: "Customer happiness is our priority. We're always here to help with any queries.",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useParticleCanvas(canvasRef);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const featured = localPerfumes.slice(0, 6);
  const bestSellers = localPerfumes.filter((p) => p.isBestSeller).slice(0, 4);
  const instagramImages = localPerfumes.slice(0, 6).map((p) => p.image);

  const prevReview = () =>
    setReviewIndex((i) => (i - 1 + reviews.length) % reviews.length);
  const nextReview = () => setReviewIndex((i) => (i + 1) % reviews.length);

  return (
    <main>
      {/* =========== HERO =========== */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-perfume.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Gradient orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-orb"
          style={{
            background:
              "radial-gradient(circle, oklch(72% 0.15 80 / 0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(72% 0.15 80 / 0.04) 0%, transparent 70%)",
            animation: "orb-float 20s ease-in-out infinite reverse",
          }}
        />

        {/* Particle canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 1 }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-12 bg-gold" />
              <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
                Luxury Fragrances
              </span>
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-none mb-6"
            >
              Discover
              <br />
              <span className="shimmer-gold">Luxury</span>
              <br />
              Fragrances
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="font-body text-lg text-muted-foreground mb-10 max-w-md"
            >
              Authentic designer perfumes at the best prices. Direct sourced,
              guaranteed genuine.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => navigate("/shop")}
                className="px-8 py-4 bg-gold text-background font-body text-sm tracking-widest uppercase hover:opacity-90 transition-all gold-glow-hover"
              >
                Shop Collection
              </button>
              <a
                data-ocid="hero.secondary_button"
                href="https://wa.me/919999770400?text=Hello%2C%20I%20would%20like%20to%20explore%20your%20collection"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-gold text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all text-center"
              >
                Order on WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Right: 3D Bottle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex justify-center items-center"
          >
            <div className="w-[280px] h-[350px] md:w-[400px] md:h-[500px]">
              <PerfumeBottle3D />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-body text-xs tracking-[0.3em] text-gold uppercase">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </section>

      {/* =========== FEATURED COLLECTION =========== */}
      <section
        data-ocid="featured.section"
        id="featured"
        className="relative py-24 px-6 overflow-hidden"
      >
        {/* Smoke blobs */}
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none animate-smoke"
          style={{
            background:
              "radial-gradient(circle, oklch(72% 0.15 80 / 0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(72% 0.15 80 / 0.04) 0%, transparent 70%)",
            animation: "smoke-drift 15s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, oklch(72% 0.15 80 / 0.03) 0%, transparent 70%)",
            animation: "smoke-drift 10s ease-in-out infinite",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Curated for You
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Featured Collection
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((p, i) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                shortDescription={p.shortDescription}
                category={p.category}
                image={p.image}
                index={i}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mt-12"
          >
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="px-10 py-3 border border-gold text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all"
            >
              View All Perfumes
            </button>
          </motion.div>
        </div>
      </section>

      {/* =========== WHY CHOOSE US =========== */}
      <section className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Our Promise
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Why Choose Us
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="glass rounded-sm p-6 text-center hover:gold-glow transition-all duration-300 group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {b.icon}
                </div>
                <h3 className="font-display text-base font-semibold text-gold mb-2">
                  {b.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {b.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========== BEST SELLERS =========== */}
      <section
        data-ocid="bestsellers.section"
        id="bestsellers"
        className="py-24 px-6 relative"
      >
        {/* Gold gradient band */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, oklch(72% 0.15 80 / 0.03) 0%, transparent 50%, oklch(72% 0.15 80 / 0.05) 100%)",
          }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Most Popular
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Best Sellers
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((p, i) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.price}
                shortDescription={p.shortDescription}
                category={p.category}
                image={p.image}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========== ABOUT BRAND =========== */}
      <section
        data-ocid="about.section"
        id="about"
        className="py-24 px-6 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src="/assets/generated/perfume-2.dim_600x800.jpg"
                alt="Perfume King India Collection"
                className="w-full max-w-md mx-auto object-cover"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
            {/* Decorative corner */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-gold/50" />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              About Perfume King India
            </h2>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px w-12 bg-gold" />
              <span className="text-gold text-sm">✦</span>
              <div className="h-px w-12 bg-gold" />
            </div>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              We are India's most trusted destination for 100% authentic
              designer perfumes, niche fragrances, testers, and luxury decants.
              Our mission is to bring you the world's finest fragrances at the
              most competitive prices.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              From iconic designer houses like Chanel, Dior, and Tom Ford to
              rare niche perfumeries like Creed, Byredo, and Maison Margiela —
              every bottle in our collection is sourced directly and guaranteed
              authentic.
            </p>
            <div className="flex gap-8">
              <div>
                <div className="font-display text-3xl font-bold text-gold">
                  5000+
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  Happy Customers
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">
                  500+
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  Fragrances
                </div>
              </div>
              <div>
                <div className="font-display text-3xl font-bold text-gold">
                  100%
                </div>
                <div className="font-body text-sm text-muted-foreground">
                  Authentic
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========== INSTAGRAM SECTION =========== */}
      <section
        data-ocid="instagram.section"
        id="instagram"
        className="py-24 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Follow Us
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              @perfumekingindia
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
            {instagramImages.map((img, i) => (
              <motion.a
                key={img}
                href="https://instagram.com/perfumekingindia"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Instagram post ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-3xl">▶</span>
                </div>
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="text-center">
            <a
              data-ocid="instagram.button"
              href="https://instagram.com/perfumekingindia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-3 border border-gold text-gold font-body text-sm tracking-widest uppercase hover:bg-gold hover:text-background transition-all"
            >
              <SiInstagram size={16} />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* =========== CUSTOMER REVIEWS =========== */}
      <section
        data-ocid="reviews.section"
        id="reviews"
        className="py-24 px-6 bg-secondary/30"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Testimonials
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {[0, 1, 2].map((offset) => {
                  const r = reviews[(reviewIndex + offset) % reviews.length];
                  return (
                    <div key={offset} className="glass rounded-sm p-6">
                      <div className="flex text-gold text-lg mb-4">
                        {"★★★★★"}
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 italic">
                        "{r.text}"
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                          <span className="font-display text-sm font-bold text-background">
                            {r.initials}
                          </span>
                        </div>
                        <div>
                          <div className="font-display text-sm font-semibold text-foreground">
                            {r.name}
                          </div>
                          <div className="font-body text-xs text-muted-foreground">
                            {r.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                type="button"
                onClick={prevReview}
                className="w-10 h-10 border border-gold/50 text-gold hover:bg-gold hover:text-background transition-all flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {reviews.map((review, i) => (
                  <button
                    type="button"
                    key={review.name}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === reviewIndex ? "bg-gold w-6" : "bg-gold/30"
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={nextReview}
                className="w-10 h-10 border border-gold/50 text-gold hover:bg-gold hover:text-background transition-all flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========== CONTACT =========== */}
      <section data-ocid="contact.section" id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              Get In Touch
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-3 mb-4">
              Contact Us
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold text-lg">✦</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass rounded-sm p-8"
            >
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Reach Us Directly
              </h3>
              <div className="space-y-6">
                <a
                  data-ocid="contact.whatsapp_button"
                  href="https://wa.me/919999770400"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all group"
                >
                  <SiWhatsapp size={24} className="text-gold" />
                  <div>
                    <div className="font-body text-sm font-medium text-foreground">
                      WhatsApp
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      +91 9999770400
                    </div>
                  </div>
                  <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
                <a
                  href="https://instagram.com/perfumekingindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all group"
                >
                  <SiInstagram size={24} className="text-gold" />
                  <div>
                    <div className="font-body text-sm font-medium text-foreground">
                      Instagram
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      @perfumekingindia
                    </div>
                  </div>
                  <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
                <a
                  href="mailto:perfumekingindia@gmail.com"
                  className="flex items-center gap-4 p-4 border border-gold/20 hover:border-gold/50 hover:bg-gold/5 transition-all group"
                >
                  <Mail size={24} className="text-gold" />
                  <div>
                    <div className="font-body text-sm font-medium text-foreground">
                      Email
                    </div>
                    <div className="font-body text-sm text-muted-foreground">
                      perfumekingindia@gmail.com
                    </div>
                  </div>
                  <span className="ml-auto text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </a>
              </div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Thank you! We will get back to you soon.");
                  setContactForm({ name: "", email: "", message: "" });
                }}
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    data-ocid="contact.name_input"
                    type="text"
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="Enter your full name"
                    className="w-full bg-secondary/50 border border-border focus:border-gold/50 focus:outline-none px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    data-ocid="contact.email_input"
                    type="email"
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="Enter your email"
                    className="w-full bg-secondary/50 border border-border focus:border-gold/50 focus:outline-none px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2 block"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    data-ocid="contact.textarea"
                    value={contactForm.message}
                    onChange={(e) =>
                      setContactForm({
                        ...contactForm,
                        message: e.target.value,
                      })
                    }
                    placeholder="Tell us what you're looking for..."
                    rows={5}
                    className="w-full bg-secondary/50 border border-border focus:border-gold/50 focus:outline-none px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none"
                    required
                  />
                </div>
                <button
                  data-ocid="contact.submit_button"
                  type="submit"
                  className="w-full py-4 bg-gold text-background font-body text-sm tracking-widest uppercase hover:opacity-90 transition-all gold-glow-hover"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
