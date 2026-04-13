/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BallInfo from './components/BallInfo';
import BallSpec from './components/BallSpec';
import Customize from './components/Customize';
import Cart from './components/Cart';
import BasketballScene from './components/Basketball';
import { motion, AnimatePresence } from 'motion/react';

const products = [
  {
    id: 1,
    name: "SPA",
    suffix: "ING",
    price: "$129.00",
    color: "#FF2D00",
    size: '29.5" • OFFICIAL',
    index: "01 / 06",
    modelType: 'classic',
    specs: {
      material: "Composite Leather",
      grip: "High-Tack",
      depth: "0.5mm",
      height: "1.2mm",
      elevation: "12.8°",
      azimuth: "45.2°"
    }
  },
  {
    id: 2,
    name: "MID",
    suffix: "NIGHT",
    price: "$145.00",
    color: "#1A1A1A",
    size: '29.5" • STEALTH',
    index: "02 / 06",
    modelType: 'tech',
    specs: {
      material: "Matte Synthetic",
      grip: "Ultra-Dry",
      depth: "0.3mm",
      height: "0.8mm",
      elevation: "10.5°",
      azimuth: "38.1°"
    }
  },
  {
    id: 3,
    name: "ELEC",
    suffix: "TRIC",
    price: "$138.00",
    color: "#0066FF",
    size: '29.5" • PRO',
    index: "03 / 06",
    modelType: 'cross',
    specs: {
      material: "Neon Microfiber",
      grip: "Sticky-Grip",
      depth: "0.7mm",
      height: "1.5mm",
      elevation: "15.2°",
      azimuth: "52.4°"
    }
  },
  {
    id: 4,
    name: "GOLD",
    suffix: "EN",
    price: "$199.00",
    color: "#FFD700",
    size: '29.5" • CHAMP',
    index: "04 / 06",
    modelType: 'classic',
    specs: {
      material: "Premium Hide",
      grip: "Classic-Tack",
      depth: "0.6mm",
      height: "1.3mm",
      elevation: "13.1°",
      azimuth: "46.8°"
    }
  },
  {
    id: 5,
    name: "FOR",
    suffix: "EST",
    price: "$115.00",
    color: "#1B4D3E",
    size: '29.5" • OUTDOOR',
    index: "05 / 06",
    modelType: 'street',
    specs: {
      material: "Durable Rubber",
      grip: "Rugged-Pebble",
      depth: "1.0mm",
      height: "2.0mm",
      elevation: "18.5°",
      azimuth: "60.2°"
    }
  },
  {
    id: 6,
    name: "PURE",
    suffix: "WHITE",
    price: "$155.00",
    color: "#FFFFFF",
    size: '29.5" • MINIMAL',
    index: "06 / 06",
    modelType: 'tech',
    specs: {
      material: "Polished Polymer",
      grip: "Smooth-Control",
      depth: "0.2mm",
      height: "0.5mm",
      elevation: "8.2°",
      azimuth: "32.7°"
    }
  }
];

export default function App() {
  const [view, setView] = useState<'hero' | 'info' | 'spec' | 'customize'>('hero');
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProduct = products[currentIndex];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Customization State
  const [baseColor, setBaseColor] = useState('#E60000');
  const [lineColor, setLineColor] = useState('#050505');
  const [texture, setTexture] = useState<'classic' | 'street' | 'tech' | 'cross'>('classic');

  // Cart State
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: any, isCustom: boolean = false) => {
    const uniqueId = `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const item = isCustom ? {
      ...product,
      id: uniqueId,
      name: "CUSTOM",
      suffix: "LAB",
      price: "$249.00", // Custom balls are premium
      color: baseColor,
      modelType: texture,
      isCustom: true
    } : {
      ...product,
      id: uniqueId,
      originalId: product.id // Keep original ID for reference if needed
    };
    
    setCart(prev => [...prev, item]);
  };

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const nextProduct = () => {
    const nextIdx = (currentIndex + 1) % products.length;
    setCurrentIndex(nextIdx);
    // Reset customization when switching products in hero
    setBaseColor(products[nextIdx].color);
    setTexture(products[nextIdx].modelType as any);
  };

  const prevProduct = () => {
    const prevIdx = (currentIndex - 1 + products.length) % products.length;
    setCurrentIndex(prevIdx);
    setBaseColor(products[prevIdx].color);
    setTexture(products[prevIdx].modelType as any);
  };

  useEffect(() => {
    if (view === 'customize' || isCartOpen) return; // Disable scroll navigation

    let touchStartY = 0;
    let touchEndY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 50) {
        if (view === 'hero') setView('info');
        else if (view === 'info') setView('spec');
      } else if (e.deltaY < -50) {
        if (view === 'spec') setView('info');
        else if (view === 'info') setView('hero');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      // Don't navigate if touch target is a button or input
      const target = e.target as Element;
      if (target && (
        target.tagName === 'BUTTON' || 
        target.closest('button') ||
        target.tagName === 'INPUT'
      )) {
        return;
      }

      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      
      // Swipe up (diff > 0)
      if (diff > 50) {
        if (view === 'hero') setView('info');
        else if (view === 'info') setView('spec');
      }
      // Swipe down (diff < 0)
      else if (diff < -50) {
        if (view === 'spec') setView('info');
        else if (view === 'info') setView('hero');
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart, false);
    window.addEventListener('touchend', handleTouchEnd, false);
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [view, isCartOpen]);

  return (
    <div className="relative h-screen bg-black overflow-hidden scrollbar-hide">
      <style>{`
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
      {/* Moving Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 moving-grid opacity-30" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] glow-mesh opacity-20" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] glow-mesh opacity-20" />
      </div>

      {view === 'hero' && (
        <Navbar 
          onCustomize={() => setView('customize')} 
          cartCount={cart.length}
          onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      
      <AnimatePresence mode="wait">
        <motion.main 
          key={view}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative h-full w-full pointer-events-auto ${view === 'customize' ? 'z-50' : 'z-30'}`}
        >
          {view === 'hero' ? (
            <Hero 
              currentProduct={currentProduct}
              nextProduct={nextProduct}
              prevProduct={prevProduct}
              onNavigateToInfo={() => setView('info')} 
              onAddToCart={() => addToCart(currentProduct)}
            />
          ) : view === 'info' ? (
            <BallInfo 
              onBackToHero={() => setView('hero')} 
              onNextToSpec={() => setView('spec')}
              currentProduct={currentProduct}
            />
          ) : view === 'spec' ? (
            <BallSpec 
              onBackToInfo={() => setView('info')} 
              currentProduct={currentProduct}
            />
          ) : (
            <Customize 
              onBack={() => setView('hero')}
              baseColor={baseColor}
              setBaseColor={setBaseColor}
              lineColor={lineColor}
              setLineColor={setLineColor}
              texture={texture}
              setTexture={setTexture}
              onAddToCart={() => addToCart(currentProduct, true)}
            />
          )}
        </motion.main>
      </AnimatePresence>

      {/* Persistent 3D Scene Layer */}
      <motion.div 
        animate={{ 
          opacity: isCartOpen ? 0.2 : 1
        }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: view === 'customize' ? 'none' : 'none' }}
        className={`fixed inset-0 ${view === 'customize' ? 'z-45' : 'z-30'}`}
      >
        <BasketballScene 
          view={view}
          color={view === 'customize' ? baseColor : currentProduct.color} 
          lineColor={view === 'customize' ? lineColor : '#050505'}
          textureType={view === 'customize' ? texture : (currentProduct as any).modelType}
          initialScale={isMobile 
            ? (view === 'hero' ? 0.7 : view === 'info' ? 0.6 : view === 'spec' ? 0.45 : view === 'customize' ? 0.7 : 0.7)
            : (view === 'hero' ? 1.4 : view === 'info' ? 1.6 : view === 'customize' ? 2.0 : 1.8)
          }
          hoverScale={isMobile ? 0.8 : 0.6}
          position={isMobile 
            ? [0, (view === 'hero' ? -0.4 : view === 'info' ? 1.5 : view === 'spec' ? 0 : view === 'customize' ? 0.8 : 0), 0]
            : [(view === 'hero' ? 0 : view === 'info' ? 2.8 : view === 'customize' ? 1.8 : 0), 0, 0]
          }
        />
      </motion.div>

      <AnimatePresence>
        {isCartOpen && (
          <Cart 
            items={cart} 
            onClose={() => setIsCartOpen(false)} 
            onRemove={removeFromCart}
          />
        )}
      </AnimatePresence>

      {/* View Toggle Indicator */}
      {view !== 'customize' && (
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 md:gap-4">
          {(['hero', 'info', 'spec'] as const).map((v) => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className={`w-1 md:w-1.5 h-1 md:h-1.5 rounded-full transition-all duration-500 ${view === v ? 'bg-red-accent h-6 md:h-8' : 'bg-white/20'}`} 
            />
          ))}
        </div>
      )}

      {/* Top-Level Add to Cart Button */}
      {view === 'hero' && (
        <motion.button 
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(currentProduct);
          }}
          className="fixed left-6 md:left-1/2 bottom-32 md:bottom-48 md:-translate-x-1/2 group relative bg-red-accent px-4 md:px-12 py-2 md:py-5 rounded-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(230,0,0,0.4)] cursor-pointer pointer-events-auto z-[9999]"
        >
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black text-white">
            Add to Cart
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-sm" />
        </motion.button>
      )}
    </div>
  );
}
