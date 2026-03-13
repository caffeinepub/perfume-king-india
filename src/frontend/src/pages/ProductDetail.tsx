import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { getPerfumeImage, localPerfumes } from "../data/perfumes";

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="font-body text-sm text-muted-foreground">{label}</span>
        <span className="font-body text-sm text-gold">{value}/10</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(value / 10) * 100}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gold rounded-full"
        />
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const perfume = localPerfumes.find((p) => p.id === Number(id));
  const related = localPerfumes.filter((p) => p.id !== Number(id)).slice(0, 4);

  if (!perfume) {
    return (
      <div
        data-ocid="product.page"
        className="min-h-screen pt-24 px-6 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-6xl mb-4">✦</div>
          <h2 className="font-display text-3xl text-foreground mb-3">
            Perfume Not Found
          </h2>
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-background transition-all font-body text-sm tracking-widest uppercase mt-4"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const waLink = `https://wa.me/919999770400?text=Hello%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(perfume.name)}`;

  return (
    <main data-ocid="product.page" className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate("/shop")}
          className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors mb-10 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Shop
        </button>

        {/* Main product layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative overflow-hidden">
              <img
                src={getPerfumeImage(perfume.id)}
                alt={perfume.name}
                className="w-full object-cover"
                style={{ aspectRatio: "3/4" }}
              />
              <div className="absolute inset-0 border border-gold/15" />
            </div>
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-gold/50" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-gold/50" />
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Category */}
            <span className="font-body text-[10px] tracking-[0.25em] uppercase text-background bg-gold px-2 py-1 inline-block mb-4">
              {perfume.category}
            </span>

            {/* Name */}
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-3 leading-tight">
              {perfume.name}
            </h1>

            {/* Price */}
            <div className="font-display text-3xl font-bold text-gold mb-6">
              {perfume.price}
            </div>

            {/* Description */}
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              {perfume.description}
            </p>

            <div className="h-px bg-border mb-8" />

            {/* Fragrance Notes */}
            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold text-gold mb-4">
                Fragrance Notes
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="glass rounded-sm p-4">
                  <div className="font-body text-xs tracking-widest uppercase text-gold mb-1">
                    Top Notes
                  </div>
                  <p className="font-body text-sm text-foreground">
                    {perfume.topNotes}
                  </p>
                </div>
                <div className="glass rounded-sm p-4">
                  <div className="font-body text-xs tracking-widest uppercase text-gold mb-1">
                    Heart Notes
                  </div>
                  <p className="font-body text-sm text-foreground">
                    {perfume.heartNotes}
                  </p>
                </div>
                <div className="glass rounded-sm p-4">
                  <div className="font-body text-xs tracking-widest uppercase text-gold mb-1">
                    Base Notes
                  </div>
                  <p className="font-body text-sm text-foreground">
                    {perfume.baseNotes}
                  </p>
                </div>
              </div>
            </div>

            {/* Performance */}
            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold text-gold mb-4">
                Performance
              </h3>
              <ProgressBar value={perfume.longevity} label="Longevity" />
              <ProgressBar value={perfume.projection} label="Projection" />
            </div>

            {/* WhatsApp CTA */}
            <a
              data-ocid="product.button"
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 bg-gold text-background text-center font-body text-sm tracking-widest uppercase hover:opacity-90 transition-all gold-glow animate-gold-pulse"
            >
              Order on WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Related Perfumes */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
              You Might Also Like
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground mt-3">
              Related Perfumes
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p, i) => (
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
      </div>
    </main>
  );
}
