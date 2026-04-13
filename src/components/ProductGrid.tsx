import { motion } from 'motion/react';
import BasketballScene from './Basketball';
import { ShoppingCart, Heart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Classic Elite",
    price: "$34.99",
    color: "#FF2D00",
    description: "The official standard for professional play."
  },
  {
    id: 2,
    name: "Midnight Stealth",
    price: "$39.99",
    color: "#1A1A1A",
    description: "Matte black finish for ultimate street style."
  },
  {
    id: 3,
    name: "Electric Blue",
    price: "$36.99",
    color: "#0066FF",
    description: "High-visibility color for fast-paced action."
  },
  {
    id: 4,
    name: "Gold Standard",
    price: "$49.99",
    color: "#FFD700",
    description: "Limited edition championship series."
  },
  {
    id: 5,
    name: "Forest Green",
    price: "$32.99",
    color: "#1B4D3E",
    description: "Durable composite for outdoor durability."
  },
  {
    id: 6,
    name: "Pure White",
    price: "$42.99",
    color: "#FFFFFF",
    description: "Minimalist design with premium grip."
  }
];

export default function ProductGrid() {
  return (
    <section className="py-24 px-8 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
            The <span className="text-orange-accent">Collection</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Explore our curated selection of professional-grade basketballs, each engineered for specific styles of play.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative flex flex-col"
            >
              {/* 3D Model Container */}
              <div className="h-[400px] w-full bg-white/[0.02] rounded-3xl border border-white/5 overflow-hidden relative group-hover:border-orange-accent/30 transition-colors">
                <BasketballScene 
                  color={product.color} 
                  initialScale={2.5} 
                  hoverScale={1.8} 
                />
                
                {/* Quick Actions */}
                <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-white transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-orange-accent hover:text-white transition-colors">
                    <ShoppingCart size={18} />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-8 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-display font-bold uppercase tracking-tight group-hover:text-orange-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-white/40 text-sm mt-1 max-w-[200px]">
                    {product.description}
                  </p>
                </div>
                <span className="text-2xl font-display font-bold text-orange-accent">
                  {product.price}
                </span>
              </div>
              
              <button className="mt-6 w-full py-4 border border-white/10 rounded-xl text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-black transition-all duration-300">
                View Details
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
