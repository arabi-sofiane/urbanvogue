import { useState, useEffect } from "react";
import { X, Star, Heart, Check, Minus, Plus, ShoppingBag, Truck, Undo } from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProductDetailsProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, size: string, color: string) => void;
  isFavorited: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function ProductDetails({
  product,
  onClose,
  onAddToCart,
  isFavorited,
  onToggleFavorite,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Reset defaults when product changes
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      setActiveImageIdx(0);
    }
  }, [product]);

  if (!product) return null;

  const handleDecreaseQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-zoom-out"
        />

        {/* Modal Sheet panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="relative bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col z-10"
          id={`product-detail-sheet-${product.id}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 sticky top-0 bg-white z-10">
            <span className="text-xs uppercase tracking-[0.2em] font-medium text-gray-400">
              Product Details
            </span>
            <button
              onClick={onClose}
              className="p-2 -mr-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Scrollable body content */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-3">
              <div className="aspect-[4/5] bg-neutral-50 overflow-hidden relative">
                <img
                  src={product.images[activeImageIdx]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                
                {/* Promo tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {product.badge && (
                    <span className="bg-black text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                      {product.badge}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-[#BD3E3E] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                      {product.discount}
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails if multiple images (supports fallback list structure) */}
              {product.images.length > 1 && (
                <div className="flex space-x-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-16 h-20 bg-neutral-100 overflow-hidden border cursor-pointer ${
                        activeImageIdx === idx ? "border-black border-2" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} subimage`}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title, rating, prices */}
            <div className="space-y-4">
              <p className="text-xs text-uppercase tracking-widest text-gray-400 font-semibold uppercase">
                {product.category}
              </p>
              <h1 className="text-2xl sm:text-3xl font-serif text-black font-semibold uppercase tracking-wide leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center space-x-3">
                <div className="flex text-amber-500 items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "fill-current" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {product.rating} Stars ({product.reviewsCount} verified reviews)
                </span>
              </div>

              <div className="flex items-baseline space-x-3.5 pt-1.5 border-b border-gray-100 pb-5">
                <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through font-medium">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2.5">
              <h4 className="text-xs uppercase tracking-widest font-bold text-black text-gray-900">Description</h4>
              <p className="text-sm text-gray-500 leading-relaxed font-light">{product.description}</p>
            </div>

            {/* Colors */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs uppercase tracking-widest font-bold text-black text-gray-900">Color</h4>
                <span className="text-xs font-medium text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex space-x-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor === color;
                  // Map custom standard hex color code names
                  const bgClass =
                    color.toLowerCase().includes("black") || color.toLowerCase().includes("obsidian")
                      ? "bg-stone-950"
                      : color.toLowerCase().includes("gray") || color.toLowerCase().includes("grey") || color.toLowerCase().includes("slate")
                      ? "bg-gray-400"
                      : color.toLowerCase().includes("sand") || color.toLowerCase().includes("beige") || color.toLowerCase().includes("cream")
                      ? "bg-amber-100"
                      : color.toLowerCase().includes("green") || color.toLowerCase().includes("olive") || color.toLowerCase().includes("sage")
                      ? "bg-emerald-800"
                      : "bg-white";

                  return (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer transition transform hover:scale-105 ${bgClass} ${
                        isSelected ? "ring-2 ring-black ring-offset-2" : ""
                      }`}
                      title={color}
                    >
                      {isSelected && (
                        <Check className={`h-3.5 w-3.5 ${color.toLowerCase().includes("cream") || color.toLowerCase().includes("sand") || color.toLowerCase().includes("white") ? "text-black" : "text-white"}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <h4 className="text-xs uppercase tracking-widest font-bold text-black text-gray-900">Size</h4>
                {selectedSize ? (
                  <span className="text-xs font-semibold text-black uppercase">{selectedSize}</span>
                ) : (
                  <span className="text-xs text-gray-400">Select size</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-12 h-11 border border-gray-200 text-xs font-semibold uppercase flex items-center justify-center transition cursor-pointer px-4 ${
                        isSelected
                          ? "bg-black text-white border-black font-bold"
                          : "bg-white text-gray-800 hover:border-black"
                      }`}
                      id={`size-btn-${size}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector and Heart */}
            <div className="flex items-center space-x-4 border-t border-gray-100 pt-6">
              <div className="flex flex-col space-y-1.5 flex-1 max-w-[140px]">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Qty</span>
                <div className="flex items-center justify-between border border-gray-200 h-11 px-3 bg-white">
                  <button
                    onClick={handleDecreaseQty}
                    disabled={quantity <= 1}
                    className="p-1 disabled:opacity-30 text-gray-500 hover:text-black cursor-pointer"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-mono text-sm font-semibold select-none text-black">{quantity}</span>
                  <button
                    onClick={handleIncreaseQty}
                    disabled={quantity >= product.stock}
                    className="p-1 disabled:opacity-30 text-gray-500 hover:text-black cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col space-y-1.5 flex-1">
                <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Available Stock</span>
                <div className="flex items-center h-11">
                  {product.stock > 0 ? (
                    <span className="text-xs font-semibold text-emerald-600 font-mono">
                      {product.stock} items in stock
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-red-500 font-mono">Out of stock</span>
                  )}
                </div>
              </div>
            </div>

            {/* Brand benefits links */}
            <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-100 py-5">
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <Truck className="h-4.5 w-4.5 text-gray-900 shrink-0" />
                <span>Complimentary priority shipping</span>
              </div>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <Undo className="h-4.5 w-4.5 text-gray-900 shrink-0" />
                <span>14-day hassle free returns</span>
              </div>
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div className="border-t border-gray-100 p-6 bg-white flex space-x-4 sticky bottom-0 z-10 shadow-lg">
            {/* Wishlist toggle */}
            <button
              onClick={() => onToggleFavorite(product.id)}
              className={`p-3.5 border border-gray-200 flex items-center justify-center transition cursor-pointer hover:bg-neutral-50 ${
                isFavorited ? "text-[#BD3E3E]" : "text-gray-400 hover:text-black"
              }`}
              title="Add to Wishlist"
              id="details-favorite-btn"
            >
              <Heart className="h-5 w-5" fill={isFavorited ? "currentColor" : "none"} />
            </button>

            {/* Add to Cart checkout button */}
            <button
              onClick={handleAdd}
              disabled={product.stock <= 0}
              className="flex-1 bg-black text-white hover:bg-neutral-900 transition h-12 flex items-center justify-center gap-2.5 text-sm font-semibold tracking-widest uppercase cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
              id="add-to-cart-action"
            >
              <ShoppingBag className="h-4 w-4" /> Add to Shopping Bag
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
