import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onShopNow: () => void;
}

export default function Hero({ onShopNow }: HeroProps) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full bg-neutral-900 overflow-hidden flex items-center justify-center">
      {/* Background Image with elegant overlay overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/KIC_322-6136-00738-900_model1.avif"
          alt="Urban Vogue Collection"
          className="h-full w-full object-cover object-center opacity-85 transform scale-102 filter brightness-[0.75]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.3em] font-medium text-gray-300 mb-4"
        >
          Winter / Spring Collection
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif tracking-tight font-semibold uppercase leading-none text-white mb-6"
        >
          Wear The Future <br className="hidden sm:inline" /> Of Fashion
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-lg mb-10 max-w-2xl text-gray-200 font-light leading-relaxed tracking-wide"
        >
          Discover our latest collection of modern streetwear. Architecturally inspired
          silhouettes engineered for the urban citizen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto"
        >
          <button
            onClick={onShopNow}
            className="bg-white text-black px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-neutral-100 transition duration-300 cursor-pointer flex items-center justify-center gap-2 rounded-none"
            id="hero-shop-btn"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onShopNow}
            className="border-2 border-white/60 text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition duration-300 cursor-pointer flex items-center justify-center rounded-none"
            id="hero-explore-btn"
          >
            Explore Collection
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce">
        <span className="text-[10px] uppercase tracking-widest text-white/50 mb-1">Scroll</span>
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>
    </section>
  );
}
