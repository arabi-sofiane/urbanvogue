import React, { useState } from "react";
import { X, Trash2, Minus, Plus, CreditCard, ArrowRight, Check } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutStep, setCheckoutStep] = useState<"cart" | "submitting" | "success">("cart");
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  if (!isOpen) return null;

  const totalCost = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 200;
  const isFreeShipping = totalCost >= freeShippingThreshold;
  const progressToFreeShipping = Math.min((totalCost / freeShippingThreshold) * 100, 100);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("submitting");
    setTimeout(() => {
      setCheckoutStep("success");
    }, 1500);
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === "success") {
      onClearCart();
      setCheckoutStep("cart");
      setShippingInfo({ name: "", address: "", city: "", zip: "" });
    }
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseAndReset}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
        />

        {/* Drawer container sheet */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 225 }}
          className="relative bg-white w-full max-w-md h-full shadow-2xl flex flex-col z-10"
          id="cart-drawer-sheet"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
            <h2 className="text-base uppercase tracking-[0.2em] font-bold text-gray-900 flex items-center gap-2">
              Shopping Bag <span className="font-mono text-xs text-gray-400">({cartItems.length})</span>
            </h2>
            <button
              onClick={handleCloseAndReset}
              className="p-2 -mr-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition cursor-pointer"
              id="close-cart-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto flex flex-col">
            {checkoutStep === "cart" && (
              <>
                {cartItems.length === 0 ? (
                  // Empty State
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                      <CreditCard className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-sm uppercase tracking-widest font-semibold text-gray-900">Your bag is empty</h3>
                      <p className="text-xs text-gray-400 font-light mt-1.5 leading-relaxed max-w-xs mx-auto">
                        Discover seasonal minimalist street looks and fill your bag with premium pieces.
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="border border-black text-black px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-black hover:text-white transition duration-300 cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  // Items list
                  <div className="flex-1 divide-y divide-gray-100 px-6 py-2">
                    {/* Free shipping banner */}
                    <div className="py-4 space-y-2 select-none">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="font-medium text-gray-700">
                          {isFreeShipping
                            ? "Congratulations! You qualify for Free Shipping"
                            : `Add $${freeShippingThreshold - totalCost} more for Complimentary Free Shipping`}
                        </span>
                        <span className="font-mono text-gray-400">{progressToFreeShipping.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5">
                        <div
                          style={{ width: `${progressToFreeShipping}%` }}
                          className="bg-black h-full transition-all duration-500"
                        />
                      </div>
                    </div>

                    {cartItems.map((item) => (
                      <div key={item.id} className="py-5 flex items-start space-x-4">
                        {/* Image */}
                        <div className="w-20 h-25 bg-neutral-50 overflow-hidden relative shrink-0 border border-gray-50">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-full h-full object-cover object-center"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 flex flex-col justify-between self-stretch">
                          <div>
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-tight line-clamp-1 pr-2">
                                {item.product.name}
                              </h4>
                              <span className="text-xs font-semibold text-gray-900 font-mono shrink-0">
                                ${item.product.price * item.quantity}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 tracking-wider font-light mt-1 uppercase">
                              Size: {item.selectedSize} | Color: {item.selectedColor}
                            </p>
                          </div>

                          {/* Controls */}
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center border border-gray-200 h-8 px-2 bg-white">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="p-1 text-gray-400 hover:text-black cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="mx-2.5 font-mono text-xs font-semibold text-black select-none">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="p-1 text-gray-400 hover:text-black disabled:opacity-30 cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-gray-400 hover:text-[#BD3E3E] transition p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === "submitting" && (
              // Loading Transition state
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 border-4 border-black/10 border-t-black animate-spin rounded-full" />
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-semibold text-black">Processing order</h3>
                  <p className="text-xs text-gray-400 font-light mt-1 text-center">
                    Verifying premium inventory and securing authorization...
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === "success" && (
              // Order Completed Successfully State
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-serif uppercase tracking-widest font-semibold text-black">Order Confirmed</h3>
                  <p className="text-xs font-mono text-gray-450 uppercase tracking-widest select-none">
                    ID: UV-39824C-2026
                  </p>
                  <p className="text-xs text-gray-500 font-light leading-relaxed max-w-xs mx-auto pt-2">
                    Thank you for shopping with <strong>Urban Vogue</strong>. Your luxury package details and tracking details have been dispatched to your email address.
                  </p>
                </div>

                <div className="border border-gray-100 w-full p-4 text-left space-y-2.5 bg-neutral-50 rounded-none text-xs">
                  <p className="text-gray-400 uppercase tracking-wider text-[9px] font-bold">Delivery Address</p>
                  <p className="font-semibold text-gray-900">{shippingInfo.name || "Soso Jiji"}</p>
                  <p className="text-gray-600">{shippingInfo.address || "120 Fashion Ave, Suite 400"}</p>
                  <p className="text-gray-600">
                    {shippingInfo.city || "New York"}, {shippingInfo.zip || "10001"}
                  </p>
                </div>

                <button
                  onClick={handleCloseAndReset}
                  className="w-full bg-black text-white py-4 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-900 transition duration-300 cursor-pointer"
                >
                  Return to Store
                </button>
              </div>
            )}
          </div>

          {/* Bottom order subtotal & checkout form */}
          {cartItems.length > 0 && checkoutStep === "cart" && (
            <div className="border-t border-gray-150 p-6 bg-white shrink-0 space-y-5">
              <div className="space-y-3.5">
                <div className="flex justify-between items-baseline text-xs select-none">
                  <span className="text-gray-400 uppercase tracking-wider font-semibold">Shipping</span>
                  <span className="text-gray-900 font-medium">
                    {isFreeShipping ? "COMPLIMENTARY" : "$15.00"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline border-b border-gray-100 pb-4">
                  <span className="text-gray-400 uppercase tracking-wider font-semibold text-xs">Total</span>
                  <span className="text-xl font-bold text-gray-900 font-mono">
                    ${isFreeShipping ? totalCost : totalCost + 15}
                  </span>
                </div>
              </div>

              {/* Minimal Address Checkout details Form to make order functional and premium */}
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block pb-0.5">Shipping Details</label>
                  <input
                    type="text"
                    required
                    placeholder="Recipient Full Name"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-black rounded-none transition"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Street Address"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-black rounded-none transition"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="City/State"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-black rounded-none transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Zip Code"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="border border-gray-200 px-3.5 py-2.5 text-xs outline-none focus:border-black rounded-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 bg-black text-white hover:bg-neutral-900 transition flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase cursor-pointer"
                  id="checkout-submit-btn"
                >
                  Complete Order <ArrowRight className="h-4.5 w-4.5" />
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
