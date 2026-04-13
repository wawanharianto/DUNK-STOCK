import { motion } from 'motion/react';
import { Shield, Zap, Target, Award } from 'lucide-react';

const features = [
  {
    title: "Advanced Grip",
    description: "Deep channels and composite leather for maximum control in every crossover.",
    icon: <Zap className="text-orange-accent" size={24} />,
    size: "col-span-2 row-span-1",
    image: "https://picsum.photos/seed/basketball-grip/800/400"
  },
  {
    title: "Pro Feel",
    description: "Official NBA size and weight for the ultimate professional experience.",
    icon: <Target className="text-orange-accent" size={24} />,
    size: "col-span-1 row-span-2",
    image: "https://picsum.photos/seed/basketball-pro/400/800"
  },
  {
    title: "Durability",
    description: "Built to withstand the toughest outdoor courts and high-intensity indoor play.",
    icon: <Shield className="text-orange-accent" size={24} />,
    size: "col-span-1 row-span-1",
    image: "https://picsum.photos/seed/basketball-court/400/400"
  },
  {
    title: "Elite Performance",
    description: "Engineered for consistent bounce and superior air retention.",
    icon: <Award className="text-orange-accent" size={24} />,
    size: "col-span-2 row-span-1",
    image: "https://picsum.photos/seed/basketball-elite/800/400"
  }
];

export default function Features() {
  return (
    <section className="py-24 px-8 md:px-16 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tighter mb-4">
            Engineered for <span className="text-orange-accent">Greatness</span>
          </h2>
          <p className="max-w-xl text-white/50 text-lg">
            Every detail of the Spalding Elite is designed to elevate your game. From the deep channels to the moisture-wicking surface.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`${feature.size} group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-orange-accent/50 transition-colors`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-2 group-hover:text-orange-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm max-w-xs leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Hover Glow */}
              <div className="absolute -inset-px bg-gradient-to-br from-orange-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
