import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Product } from "../types";

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onSelect: (product: Product) => void;
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function ProductCard({
  product,
  onSelect,
  isFavorited = false,
  onToggleFavorite,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(product.id);
    }
  };

  return (
    <div
      onClick={() => onSelect(product)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer flex flex-col h-full bg-white relative border border-transparent hover:border-gray-100 transition duration-300"
      id={`product-card-${product.id}`}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full bg-gray-50 overflow-hidden mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-103 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Badges in Top-Left */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 select-none">
              {product.badge}
            </span>
          )}
          {product.discount && (
            <span className="bg-[#BD3E3E] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 select-none">
              {product.discount}
            </span>
          )}
        </div>

        {/* Heart/Favorite Button Top-Right */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full cursor-pointer transition z-10 ${
            isFavorited
              ? "bg-black text-white"
              : "bg-white/80 backdrop-blur-xs text-gray-500 hover:text-black hover:bg-white"
          }`}
          aria-label="Toggle Favorite"
        >
          <Heart className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
        </button>

        {/* Quick View Prompt */}
        <div className={`absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-xs py-3.5 text-center transition-all duration-300 transform flex items-center justify-center border-t border-gray-100 ${
          hovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}>
          <span className="text-xs font-semibold uppercase tracking-widest text-black">
            View Details
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between px-1.5 pb-2">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mb-1">
            {product.category}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 tracking-tight group-hover:text-black transition">
            {product.name}
          </h3>

          {/* Review Stars & Review Counts */}
          <div className="flex items-center space-x-1.5 mt-1.5">
            <div className="flex text-amber-500 items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] text-gray-400 font-mono font-medium">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Prices */}
        <div className="flex items-baseline space-x-2 mt-3.5">
          <span className="text-sm font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through font-medium">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
