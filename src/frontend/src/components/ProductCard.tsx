import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: number | bigint;
  name: string;
  price: string;
  shortDescription: string;
  category: string;
  image: string;
  index?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  shortDescription,
  category,
  image,
  index = 0,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -8, y: x * 8 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const waLink = `https://wa.me/919999770400?text=Hello%2C%20I%20would%20like%20to%20order%20${encodeURIComponent(name)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        className={`glass rounded-sm overflow-hidden cursor-pointer transition-all duration-300 ${
          isHovered ? "gold-glow border-gold/40" : ""
        }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${
            isHovered ? "scale(1.02)" : "scale(1)"
          }`,
          transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
      >
        {/* Image */}
        <div className="relative overflow-hidden h-64 md:h-72">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-background bg-gold px-2 py-1">
              {category}
            </span>
          </div>

          {/* View detail link */}
          <Link
            to={`/product/${id}`}
            className="absolute inset-0 z-10"
            aria-label={`View ${name} details`}
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <Link
            to={`/product/${id}`}
            className="block hover:text-gold transition-colors"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-1 leading-tight">
              {name}
            </h3>
          </Link>
          <p className="font-body text-sm text-muted-foreground mb-3 leading-relaxed line-clamp-2">
            {shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <span className="font-display text-xl font-bold text-gold">
              {price}
            </span>
          </div>

          {/* WhatsApp Button */}
          <a
            data-ocid="product.button"
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-4 py-2.5 text-center font-body text-sm tracking-widest uppercase text-background bg-gold hover:bg-primary/90 transition-all duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            Order on WhatsApp
          </a>
        </div>
      </div>
    </motion.div>
  );
}
