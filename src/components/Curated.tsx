import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface CuratedProps {
  onCategorySelect: (category: string) => void;
}

export default function Curated({ onCategorySelect }: CuratedProps) {
  const collections = [
    {
      title: "Tailored Trousers",
      category: "Cargo Pants",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800",
      gridClass: "md:col-span-1 md:row-span-2",
      aspectRatio: "aspect-[3/4] md:aspect-[3/5]",
    },
    {
      title: "Oversized Blazers",
      category: "Accessories",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
      gridClass: "md:col-span-2 md:row-span-1",
      aspectRatio: "aspect-[16/9] md:aspect-[8/3]",
    },
    {
      title: "Minimalist Hoodies",
      category: "Hoodies",
      image: "/c8b2006163cd08e3c1fdab7e2d2bde8171ce790e.avif",
      gridClass: "md:col-span-1 md:row-span-1",
      aspectRatio: "aspect-[1/1]",
    },
    {
      title: "Clean Sneakers",
      category: "Sneakers",
      image: "/clean_sneakers.png",
      gridClass: "md:col-span-1 md:row-span-1",
      aspectRatio: "aspect-[1/1]",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Header */}
        <div className="flex justify-between items-baseline mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif text-black font-semibold uppercase tracking-wide">
              Curated Collections
            </h2>
            <p className="text-gray-400 text-xs tracking-wider uppercase mt-2">
              Architectural pieces hand-picked for this season
            </p>
          </div>
          <button
            onClick={() => onCategorySelect("All")}
            className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-black hover:opacity-75 transition cursor-pointer"
          >
            View All Categories
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, index) => (
            <motion.div
              hover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              key={index}
              onClick={() => onCategorySelect(col.category)}
              className={`${col.gridClass} group relative overflow-hidden bg-neutral-100 cursor-pointer block`}
            >
              <div className={`${col.aspectRatio} w-full h-full relative overflow-hidden`}>
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.93] group-hover:brightness-[0.88]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay details */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-6 sm:p-8">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-gray-300 font-medium mb-1">
                    {col.category}
                  </p>
                  <h3 className="text-lg sm:text-xl font-medium tracking-wide text-white font-serif uppercase flex items-center justify-between">
                    {col.title}
                    <span className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
