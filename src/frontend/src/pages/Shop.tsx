import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getPerfumeImage, localPerfumes } from "../data/perfumes";
import type { LocalPerfume } from "../data/perfumes";

const FILTERS = ["All", "Designer", "Niche", "Tester", "Decant", "Best Seller"];

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedPerfumes, setDisplayedPerfumes] =
    useState<LocalPerfume[]>(localPerfumes);

  const applyFilters = useCallback((filter: string, query: string) => {
    let filtered = localPerfumes;
    if (filter === "Best Seller") {
      filtered = filtered.filter((p) => p.isBestSeller);
    } else if (filter !== "All") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === filter.toLowerCase(),
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    setDisplayedPerfumes(filtered);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters(activeFilter, searchQuery);
    }, 400);
    return () => clearTimeout(timer);
  }, [activeFilter, searchQuery, applyFilters]);

  return (
    <main data-ocid="shop.page" className="min-h-screen pt-20">
      {/* Header banner */}
      <section
        className="relative py-24 px-6 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-perfume.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 text-center">
          <span className="font-body text-xs tracking-[0.4em] text-gold uppercase">
            Explore
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mt-3">
            Our Collection
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-gold">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold" />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search */}
        <div className="mb-8">
          <input
            data-ocid="shop.search_input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search perfumes by name, brand, or notes..."
            className="w-full max-w-xl bg-secondary/50 border border-border focus:border-gold/50 focus:outline-none px-5 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground transition-colors"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-3 mb-10">
          {FILTERS.map((f) => (
            <button
              type="button"
              key={f}
              data-ocid="shop.filter.tab"
              onClick={() => setActiveFilter(f)}
              className={`font-body text-xs tracking-widest uppercase px-5 py-2 border transition-all ${
                activeFilter === f
                  ? "bg-gold text-background border-gold"
                  : "border-border text-muted-foreground hover:border-gold/50 hover:text-gold"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results */}
        {displayedPerfumes.length === 0 ? (
          <div data-ocid="shop.empty_state" className="text-center py-24">
            <div className="text-6xl mb-4">✦</div>
            <h3 className="font-display text-2xl text-foreground mb-2">
              No perfumes found
            </h3>
            <p className="font-body text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayedPerfumes.map((p, i) => (
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
          </motion.div>
        )}
      </div>
    </main>
  );
}
