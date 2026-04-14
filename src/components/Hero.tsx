import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import BasketballScene from './Basketball';

export default function Hero({ 
  currentProduct, 
  nextProduct, 
  prevProduct, 
  onNavigateToInfo,
  onAddToCart
}: { 
  currentProduct: any;
  nextProduct: () => void;
  prevProduct: () => void;
  onNavigateToInfo: () => void;
  onAddToCart: () => void;
}) {
  return (
    <section className="red-frame h-screen w-full flex flex-col items-center justify-center bg-black relative overflow-visible">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentProduct.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Background Text Layer */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-visible">
            <motion.div 
              initial={{ opacity: 0, scale: 1.1, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center w-full"
            >
              <h1 className="text-[11vw] md:text-[24vw] font-display font-bold tracking-tighter leading-none text-[#4A4A4A] uppercase select-none">
                {currentProduct.name}
              </h1>
              {/* Space for the ball */}
              <div className="w-[10vw] md:w-[10vw] shrink-0" />
              <h1 className="text-[11vw] md:text-[24vw] font-display font-bold tracking-tighter leading-none text-[#4A4A4A] uppercase select-none">
                {currentProduct.suffix}
              </h1>
            </motion.div>
          </div>

          {/* UI Elements Overlay */}
          <div className="absolute inset-0 z-50 pointer-events-auto">
            <div className="relative h-full w-full px-6 py-10 md:px-16 md:py-20 flex flex-col justify-between pointer-events-none">
              
              {/* Top Left: Promotion Video */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="flex items-center gap-3 md:gap-4 pointer-events-auto group cursor-pointer w-fit mt-24 md:mt-24"
              >
                <div className="w-10 h-10 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <Play fill="currentColor" className="w-4 h-4 md:w-3.5 md:h-3.5 ml-0.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] md:text-[9px] uppercase tracking-[0.1em] font-medium text-white/50 group-hover:text-white transition-colors">
                    Promotion
                  </span>
                  <span className="text-[9px] md:text-[9px] uppercase tracking-[0.1em] font-medium text-white/50 group-hover:text-white transition-colors">
                    video
                  </span>
                </div>
              </motion.div>

              {/* Top Right: Price and Navigation (Mobile) / Vertical Indicator (Desktop) */}
              <div className="absolute right-6 md:right-8 top-28 md:top-1/2 -translate-y-0 md:-translate-y-1/2 flex flex-col items-end md:items-center gap-6 md:gap-4 z-50">
                {/* Mobile only: Price and Nav */}
                <div className="flex flex-col items-end gap-3 md:hidden pointer-events-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-end"
                  >
                    <span className="text-4xl font-display font-bold text-red-accent leading-none">{currentProduct.price}</span>
                    <span className="text-[8px] text-white/40 uppercase tracking-widest font-medium">SIZE: {currentProduct.size}</span>
                  </motion.div>
                  
                  <div className="flex gap-3 md:gap-3 relative z-40 pointer-events-auto">
                    <button 
                      type="button"
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        prevProduct();
                      }}
                      className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                    >
                      <ChevronLeft className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                    <button 
                      type="button"
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        nextProduct();
                      }}
                      className="w-12 h-12 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                    >
                      <ChevronRight className="w-5 h-5 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>

                {/* Desktop Indicator */}
                <div className="hidden md:flex flex-col items-center gap-4">
                  <div className="w-px h-16 md:h-24 bg-white/10" />
                  <motion.span 
                    key={currentProduct.index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] md:text-[10px] uppercase tracking-widest text-red-accent font-medium vertical-text"
                  >
                    {currentProduct.index}
                  </motion.span>
                  <div className="w-px h-16 md:h-24 bg-white/10" />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-12 pb-8 md:pb-0">
                {/* Bottom Left: Product Details (Desktop only) */}
                <div className="hidden md:flex flex-col items-end md:items-start gap-4 md:gap-0 w-full md:w-auto">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-col gap-1 pointer-events-auto"
                  >
                    <span className="text-4xl md:text-6xl font-display font-bold text-red-accent leading-none">{currentProduct.price}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] md:text-[9px] text-white/40 uppercase tracking-widest font-medium">SIZE:</span>
                      <span className="text-[8px] md:text-[9px] text-white font-bold uppercase tracking-widest">{currentProduct.size}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Right Side: Slider Controls (Desktop only) */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="hidden md:flex gap-2 md:gap-3 pointer-events-auto"
                >
                  <button 
                    type="button"
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      prevProduct();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                  >
                    <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <button 
                    type="button"
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      nextProduct();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer pointer-events-auto"
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scroll Indicator - Desktop Only */}
      <motion.button 
        type="button"
        onClick={onNavigateToInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 cursor-pointer group pointer-events-auto"
      >
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 group-hover:text-red-accent transition-colors">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-red-accent to-transparent group-hover:h-12 transition-all duration-500" />
      </motion.button>

      {/* Mobile Scroll Indicator */}
      <motion.button 
        type="button"
        onClick={onNavigateToInfo}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="md:hidden absolute bottom-24 right-6 z-30 flex flex-col items-center gap-1 cursor-pointer group pointer-events-auto"
      >
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 group-hover:text-red-accent transition-colors">Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-red-accent to-transparent group-hover:h-8 transition-all duration-500" />
      </motion.button>

      {/* Background Grid/Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
    </section>
  );
}
