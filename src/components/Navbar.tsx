import { useState } from "react";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "shop", label: "Shop" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Icon */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-none"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Left: Nav Links */}
          <nav className="hidden lg:flex space-x-8 items-center flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative py-2 text-sm uppercase tracking-widest font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? "text-gray-950 font-semibold"
                    : "text-gray-500 hover:text-gray-950"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-950 transition-all" />
                )}
              </button>
            ))}
          </nav>

          {/* Center Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left flex justify-center">
            <button
              onClick={() => handleNavClick("home")}
              className="text-2xl sm:text-3xl font-serif tracking-normal text-black font-semibold uppercase hover:opacity-80 transition cursor-pointer"
              id="brand-logo"
            >
              Urban Vogue
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center justify-end space-x-4 sm:space-x-6 flex-1">
            
            {/* Search Input Toggle (Desktop-First) */}
            <div className="relative flex items-center">
              {showSearch ? (
                <div className="absolute right-0 flex items-center bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 w-48 sm:w-64 transition-all duration-300">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (activeTab !== "shop") setActiveTab("shop");
                    }}
                    placeholder="Search product..."
                    className="w-full bg-transparent text-xs border-none outline-none text-gray-800 pr-5"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setShowSearch(false);
                      setSearchQuery("");
                    }}
                    className="absolute right-2.5 p-0.5 text-gray-400 hover:text-gray-800"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 text-gray-700 hover:text-gray-950 transition cursor-pointer"
                  id="search-btn"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Shopping Bag Count Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-gray-700 hover:text-gray-950 transition cursor-pointer"
              id="cart-btn"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Profile Placeholder */}
            <button className="p-2 text-gray-700 hover:text-gray-950 transition cursor-pointer" id="profile-btn">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop & Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-center flex flex-col items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full py-4 text-sm uppercase tracking-widest font-medium border-b border-gray-50 flex justify-center py-3 cursor-pointer ${
                  activeTab === item.id
                    ? "text-gray-950 font-bold bg-gray-50"
                    : "text-gray-500 hover:text-gray-950"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
