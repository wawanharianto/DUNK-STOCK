import { motion } from 'motion/react';
import { soundManager } from '../lib/sounds';

export default function BallInfo({ 
  onBackToHero, 
  onNextToSpec,
  currentProduct
}: { 
  onBackToHero: () => void;
  onNextToSpec: () => void;
  currentProduct: any;
}) {
  return (
    <section className="red-frame h-screen w-full flex items-center bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full grid grid-cols-1 md:grid-cols-5 items-center gap-8 pt-48 pb-40 md:py-20 overflow-y-auto scrollbar-hide">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 col-span-1 md:col-span-3 flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-3 md:mb-6">
            <div className="w-2 h-2 rounded-full bg-red-accent" />
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-red-accent">Performance Metrics</span>
          </div>
          
          <h2 className="text-3xl sm:text-7xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.85] mb-6 md:mb-12">
            {currentProduct.name}<br />{currentProduct.suffix}
          </h2>

          <div className="space-y-6 md:space-y-12">
            <div className="flex gap-4 md:gap-8 items-start pl-12 md:pl-16">
              <div className="w-px h-12 md:h-24 bg-white/10 shrink-0" />
              <div>
                <h3 className="text-xl md:text-5xl font-display font-bold mb-1 md:mb-2">{currentProduct.specs.material.split(' ')[0]}</h3>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1 md:mb-3">{currentProduct.specs.material}</p>
                <p className="text-white/50 text-[9px] md:text-xs max-w-[250px] md:max-w-xs leading-relaxed">
                  Exclusive coating material providing superior grip management in all weather conditions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-8 items-start pl-12 md:pl-16">
              <div className="w-px h-12 md:h-24 bg-white/10 shrink-0" />
              <div>
                <h3 className="text-xl md:text-5xl font-display font-bold mb-1 md:mb-2">{currentProduct.specs.depth}</h3>
                <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-bold text-white/40 mb-1 md:mb-3">Pebble Depth</p>
                <p className="text-white/50 text-[9px] md:text-xs max-w-[250px] md:max-w-xs leading-relaxed">
                  Optimized surface texture for precision handling and rotational feedback.
                </p>
              </div>
            </div>
          </div>

          <motion.button 
            onClick={() => {
              soundManager.playClick();
              onNextToSpec();
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-8 md:mt-16 flex items-center gap-4 group cursor-pointer w-fit pl-12 md:pl-16"
          >
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-red-accent transition-colors">Technical Analysis</span>
            <div className="w-6 md:w-12 h-px bg-white/20 group-hover:w-20 group-hover:bg-red-accent transition-all" />
          </motion.button>
        </motion.div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
      
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-16 flex items-center gap-8 z-20">
        <button 
          onClick={() => {
            soundManager.playClick();
            onBackToHero();
          }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-red-accent transition-colors cursor-pointer"
        >
          Back
        </button>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">Ru</span>
      </div>
    </section>
  );
}
