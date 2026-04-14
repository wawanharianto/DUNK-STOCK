import { motion } from 'motion/react';
import { soundManager } from '../lib/sounds';

export default function BallSpec({ 
  onBackToInfo,
  currentProduct
}: { 
  onBackToInfo: () => void;
  currentProduct: any;
}) {
  return (
    <section className="red-frame h-screen w-full flex items-center justify-center bg-black relative overflow-hidden">
      {/* Radar/HUD Background Elements */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-[40vh] md:w-[60vh] h-[40vh] md:h-[60vh] -translate-y-1/4 md:translate-y-0"
        >
          {/* Concentric Circles */}
          <div className="absolute inset-0 border border-white/5 rounded-full" />
          <div className="absolute inset-[15%] border border-white/10 rounded-full border-dashed" />
          <div className="absolute inset-[30%] border border-white/5 rounded-full" />
          
          {/* Crosshair Lines */}
          <div className="absolute top-1/2 left-[-10%] right-[-10%] h-px bg-white/5 -translate-y-1/2" />
          <div className="absolute left-1/2 top-[-10%] bottom-[-10%] w-px bg-white/5 -translate-x-1/2" />
          
          {/* Rotating HUD Elements */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-5%] border-t border-r border-red-accent/20 rounded-full"
          />
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-10%] border-b border-l border-white/10 rounded-full"
          />

          {/* Small Tick Marks */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="absolute top-1/2 left-1/2 w-3 md:w-4 h-px bg-white/20 origin-left"
              style={{ transform: `rotate(${i * 30}deg) translateX(22vh)` }}
            />
          ))}
        </motion.div>
      </div>

      {/* Technical Data Points */}
      <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-between pt-48 pb-40 md:py-24 pointer-events-none overflow-y-auto scrollbar-hide">
        
        {/* Top Left: Pebble Height */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 md:gap-4 items-start"
        >
          <div className="w-px h-10 md:h-12 bg-white" />
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl md:text-4xl font-display font-bold">{currentProduct.specs.height}</span>
            </div>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Pebble Height</span>
            <div className="mt-3 md:mt-4 flex items-center gap-2">
              <div className="w-6 md:w-8 h-px bg-white/20" />
              <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/30">Micro-Texture</span>
            </div>
          </div>
        </motion.div>

        {/* Middle Left: Elevation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="absolute left-6 md:left-16 top-[30%] md:top-1/2 -translate-y-1/2"
        >
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Elevation: {currentProduct.specs.elevation}</span>
        </motion.div>

        {/* Bottom Right: Coating Spec */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="self-end flex gap-3 md:gap-4 items-end text-right"
        >
          <div className="flex flex-col items-end">
            <div className="mb-3 md:mb-4 flex items-center gap-2">
              <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-white/30">Channel Depth</span>
              <div className="w-6 md:w-8 h-px bg-white/20" />
            </div>
            <span className="text-3xl md:text-4xl font-display font-bold">{currentProduct.specs.grip}</span>
            <span className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-white/40 font-bold">Coating Spec</span>
          </div>
          <div className="w-px h-10 md:h-12 bg-white" />
        </motion.div>

        {/* Middle Right: Azimuth */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="absolute right-6 md:right-16 top-[60%] md:top-1/2 -translate-y-1/2"
        >
          <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/30 font-bold">Azimuth: {currentProduct.specs.azimuth}</span>
        </motion.div>

      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-6 md:bottom-12 left-6 md:left-16 flex items-center gap-8 z-30">
        <button 
          onClick={() => {
            soundManager.playClick();
            onBackToInfo();
          }}
          className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-red-accent transition-colors cursor-pointer"
        >
          Back to Info
        </button>
        <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30">Ru</span>
      </div>
    </section>
  );
}
