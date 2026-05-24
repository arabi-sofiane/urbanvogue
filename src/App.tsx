import React, { useState, useEffect } from "react";
import { ChevronDown, SlidersHorizontal, Search, ArrowRight, X } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Curated from "./components/Curated";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import CartDrawer from "./components/CartDrawer";
import Contact from "./components/Contact";
import { PRODUCTS, CATEGORIES } from "./data";
import { Product, CartItem } from "./types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Navigation & Cart State
  const [activeTab, setActiveTab] = useState<string>("home");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Shop Options State
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("featured");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // Expandable Advanced Filters State
  const [filterColor, setFilterColor] = useState<string>("");
  const [filterSize, setFilterSize] = useState<string>("");
  const [filterPriceRange, setFilterPriceRange] = useState<number>(250);

  // Pagination count
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(6);

  // Favorites state
  const [favorites, setFavorites] = useState<string[]>([]);

  // Local Storage loaders
  useEffect(() => {
    const savedCart = localStorage.getItem("urban_vogue_cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error reading cart from localStorage", e);
      }
    }

    const savedFavs = localStorage.getItem("urban_vogue_favs");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error("Error reading favorites from localStorage", e);
      }
    }
  }, []);

  // Sync to database LocalStorage
  const saveCart = (newCart: CartItem[]) => {
    setCartItems(newCart);
    localStorage.setItem("urban_vogue_cart", JSON.stringify(newCart));
  };

  const handleToggleFavorite = (productId: string) => {
    let newFavs = [...favorites];
    if (newFavs.includes(productId)) {
      newFavs = newFavs.filter((id) => id !== productId);
    } else {
      newFavs.push(productId);
    }
    setFavorites(newFavs);
    localStorage.setItem("urban_vogue_favs", JSON.stringify(newFavs));
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number, size: string, color: string) => {
    const cartItemId = `${product.id}-${size}-${color}`;
    const existingIdx = cartItems.findIndex((item) => item.id === cartItemId);

    let updatedCart = [...cartItems];
    if (existingIdx > -1) {
      updatedCart[existingIdx].quantity += quantity;
    } else {
      updatedCart.push({
        id: cartItemId,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color,
      });
    }
    saveCart(updatedCart);
    setIsCartOpen(true); // Open drawer instantly to show successful checkout items!
  };

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId);
      return;
    }
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleRemoveCartItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Filtering products list logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // 1. Matches Category
    if (selectedCategory !== "All" && product.category !== selectedCategory) {
      return false;
    }

    // 2. Matches Search term query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(q);
      const matchesTags = product.tags.some((tag) => tag.toLowerCase().includes(q));
      const matchesDesc = product.description.toLowerCase().includes(q);
      const matchesCategory = product.category.toLowerCase().includes(q);
      if (!matchesName && !matchesTags && !matchesDesc && !matchesCategory) {
        return false;
      }
    }

    // 3. Matches Advanced Color Filter
    if (filterColor && !product.colors.some((col) => col.toLowerCase().includes(filterColor.toLowerCase()))) {
      return false;
    }

    // 4. Matches Advanced Size Filter
    if (filterSize && !product.sizes.includes(filterSize)) {
      return false;
    }

    // 5. Matches Max Price Constraint
    if (product.price > filterPriceRange) {
      return false;
    }

    return true;
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-low-high") {
      return a.price - b.price;
    }
    if (sortOption === "price-high-low") {
      return b.price - a.price;
    }
    if (sortOption === "rating") {
      return b.rating - a.rating;
    }
    // Default or "featured"
    return b.featured ? 1 : -1;
  });

  // Unique lists for color and size filter pill builders
  const allColorsInCurrentSet = Array.from(
    new Set(PRODUCTS.flatMap((p) => p.colors))
  );
  const allSizesInCurrentSet = ["S", "M", "L", "XL", "XXL"];

  // Handle direct category click selectors
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setVisibleProductsCount(6); // reset pagination
    setActiveTab("shop");
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-neutral-900 selection:text-white">
      {/* Top Header Panel Section */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Sections Body */}
      <main className="flex-1">
        {activeTab === "home" && (
          <div className="space-y-0">
            {/* 1. Hero Showcase Section */}
            <Hero onShopNow={() => handleCategorySelect("All")} />

            {/* 2. Curated grid banner */}
            <Curated onCategorySelect={handleCategorySelect} />

            {/* 3. Featured Products Highlight (direct access to products) */}
            <section className="py-16 bg-neutral-50/50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-lg mx-auto mb-12">
                  <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-black uppercase tracking-wider">
                    Seasonal Hot Sellers
                  </h2>
                  <p className="text-gray-400 text-xs tracking-wider uppercase mt-2">
                    Our most sought-after minimal aesthetics
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {PRODUCTS.filter((p) => p.featured)
                    .slice(0, 4)
                    .map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onSelect={setSelectedProduct}
                        isFavorited={favorites.includes(prod.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                </div>

                <div className="text-center mt-10">
                  <button
                    onClick={() => handleCategorySelect("All")}
                    className="border border-black text-black hover:bg-black hover:text-white px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition duration-300 cursor-pointer"
                  >
                    View All Products
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === "shop" && (
          <section className="py-12 sm:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Header Titles */}
              <div className="mb-10 text-left">
                <h1 className="text-4xl font-serif text-black uppercase tracking-wider font-semibold">
                  New Arrivals
                </h1>
                <p className="text-gray-500 text-sm font-light mt-2 max-w-xl">
                  Discover our latest collection of premium streetwear. Designed for the urban landscape, engineered for comfort.
                </p>
              </div>

              {/* Utility Bar (Filters, categories, sorting) */}
              <div className="border-t border-b border-gray-100 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 select-none mb-8">
                {/* Category selectors */}
                <div className="flex flex-wrap items-center gap-2">
                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => handleCategorySelect(cat)}
                        className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition cursor-pointer ${
                          isSelected
                            ? "bg-black text-white hover:bg-neutral-900 border border-black"
                            : "bg-gray-50 text-gray-500 hover:text-black hover:bg-gray-100 border border-transparent"
                        }`}
                        id={`category-pill-${cat.replace(/\s+/g, "-")}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Right options: Filters Toggle & Sorters */}
                <div className="flex items-center space-x-4 self-end md:self-auto shrink-0">
                  {/* Sorting choices dropdown */}
                  <div className="relative flex items-center bg-gray-50 border border-gray-100 px-3 py-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mr-2">Sort</span>
                    <select
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      className="text-xs font-semibold uppercase bg-transparent outline-none text-gray-800 pr-5 cursor-pointer appearance-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low-high">Price: Low - High</option>
                      <option value="price-high-low">Price: High - Low</option>
                      <option value="rating">Best Rating</option>
                    </select>
                    <ChevronDown className="h-3 w-3 text-gray-400 absolute right-3 pointer-events-none" />
                  </div>

                  {/* Toggle Advanced Filters Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-widest uppercase transition border cursor-pointer h-10 ${
                      showFilters || filterColor || filterSize || filterPriceRange < 250
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-200 hover:border-black"
                    }`}
                    id="filter-toggle-btn"
                  >
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    Filters
                  </button>
                </div>
              </div>

              {/* Collapsible Filter Panel Details */}
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-b border-gray-100 pb-8 mb-8"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-2 text-sm bg-[#FCFCFC] p-6 border border-gray-50">
                      
                      {/* Sub-Filter colors */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">Filter By Color</h4>
                          {filterColor && (
                            <button
                              onClick={() => setFilterColor("")}
                              className="text-[10px] text-gray-400 hover:text-black underline cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {allColorsInCurrentSet.map((col) => {
                            const isSelected = filterColor === col;
                            return (
                              <button
                                key={col}
                                onClick={() => setFilterColor(isSelected ? "" : col)}
                                className={`px-3 py-1.5 text-xs font-medium border cursor-pointer ${
                                  isSelected
                                    ? "bg-black text-white border-black font-semibold"
                                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                                }`}
                              >
                                {col}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sub-Filter sizes */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">Filter By Size</h4>
                          {filterSize && (
                            <button
                              onClick={() => setFilterSize("")}
                              className="text-[10px] text-gray-400 hover:text-black underline cursor-pointer"
                            >
                              Reset
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-1">
                          {allSizesInCurrentSet.map((size) => {
                            const isSelected = filterSize === size;
                            return (
                              <button
                                key={size}
                                onClick={() => setFilterSize(isSelected ? "" : size)}
                                className={`w-9 h-9 border text-xs font-semibold flex items-center justify-center cursor-pointer ${
                                  isSelected
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-600 border-gray-100 hover:border-gray-300"
                                }`}
                              >
                                {size}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Sub-Filter price range */}
                      <div className="space-y-3">
                        <div className="flex justify-between items-baseline">
                          <h4 className="text-xs uppercase tracking-widest font-bold text-gray-900">Max Price</h4>
                          <span className="font-mono text-xs font-bold text-gray-950">${filterPriceRange}</span>
                        </div>
                        <div className="pt-2">
                          <input
                            type="range"
                            min="30"
                            max="250"
                            step="10"
                            value={filterPriceRange}
                            onChange={(e) => setFilterPriceRange(Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                          />
                          <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-mono">
                            <span>$30</span>
                            <span>$140</span>
                            <span>$250</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clear all active advanced filters link state */}
                    {(filterColor || filterSize || filterPriceRange < 250) && (
                      <div className="flex justify-end pt-3">
                        <button
                          onClick={() => {
                            setFilterColor("");
                            setFilterSize("");
                            setFilterPriceRange(250);
                          }}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#BD3E3E] hover:underline cursor-pointer flex items-center gap-1.5"
                        >
                          <X className="h-3 w-3" /> Clear All Filters
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Dynamic Product Grid */}
              {sortedProducts.length === 0 ? (
                // Empty search results state
                <div className="py-24 text-center border border-dashed border-gray-100 bg-[#FAFAFA]">
                  <p className="text-gray-400 text-sm font-light select-none">
                    No products match the selected criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSearchQuery("");
                      setFilterColor("");
                      setFilterSize("");
                      setFilterPriceRange(250);
                    }}
                    className="mt-4 border border-black text-black px-6 py-2.5 text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                    {sortedProducts.slice(0, visibleProductsCount).map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onSelect={setSelectedProduct}
                        isFavorited={favorites.includes(product.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    ))}
                  </div>

                  {/* Load More pagination button */}
                  {sortedProducts.length > visibleProductsCount && (
                    <div className="text-center mt-16 border-t border-gray-50 pt-12">
                      <button
                        onClick={() => setVisibleProductsCount((prev) => prev + 3)}
                        className="border border-black text-black hover:bg-black hover:text-white px-10 py-4 text-xs font-bold tracking-widest uppercase transition duration-300 cursor-pointer"
                        id="load-more-btn"
                      >
                        Load More Products
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {activeTab === "contact" && <Contact />}
      </main>

      {/* Footer view */}
      <Footer setActiveTab={setActiveTab} />

      {/* Slide drawer selection sheets */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      {/* Selection detail modal popup sheet */}
      <ProductDetails
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isFavorited={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
