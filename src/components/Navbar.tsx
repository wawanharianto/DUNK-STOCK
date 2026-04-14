import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { soundManager } from '../lib/sounds';

export default function Navbar({ 
  onCustomize, 
  onContact,
  cartCount = 0, 
  onOpenCart 
}: { 
  onCustomize: () => void;
  onContact: () => void;
  cartCount?: number;
  onOpenCart: () => void;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Products', action: () => {} },
    { name: 'Customize', action: onCustomize },
    { name: 'Contacts', action: onContact },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full z-50 px-6 py-8 md:px-16 md:py-10 flex justify-between items-center"
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 md:w-9 md:h-9 rounded-full border border-white/20 flex items-center justify-center">
            <div className="w-4 md:w-5 h-[1px] bg-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[9px] md:text-[11px] font-display tracking-tight">DUNK</span>
            <span className="text-[9px] md:text-[11px] font-display tracking-tight">STOCK</span>
          </div>
        </div>
        
        <div className="hidden md:flex gap-12">
          {navItems.map((item, i) => (
            <button 
              key={item.name} 
              onClick={() => {
                soundManager.playClick();
                item.action();
              }}
              className={`text-[11px] uppercase tracking-[0.1em] font-medium transition-colors cursor-pointer ${i === 0 ? 'text-red-accent' : 'text-white/70 hover:text-white'}`}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <button 
            onClick={() => soundManager.playClick()}
            className="hidden md:block text-white/70 hover:text-white transition-colors"
          >
            <User size={18} className="md:w-5 md:h-5" />
          </button>
          <button 
            onClick={() => {
              soundManager.playClick();
              onOpenCart();
            }}
            className="relative text-white/70 hover:text-white transition-colors cursor-pointer group"
          >
            <ShoppingBag size={18} className="md:w-5 md:h-5" />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-accent text-[7px] md:text-[8px] font-bold flex items-center justify-center rounded-full text-white"
              >
                {cartCount}
              </motion.span>
            )}
          </button>
          <button 
            onClick={() => {
              soundManager.playClick();
              setIsMenuOpen(true);
            }}
            className="md:hidden text-white/70 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-4 h-[1px] bg-white" />
                </div>
                <span className="text-xs font-display tracking-tight">DUNK STOCK</span>
              </div>
              <button 
                onClick={() => {
                  soundManager.playClick();
                  setIsMenuOpen(false);
                }}
                className="text-white/40 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {navItems.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => {
                    soundManager.playClick();
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="text-4xl font-display font-bold uppercase tracking-tighter text-left"
                >
                  <span className={`mr-4 text-xs font-sans tracking-widest ${i === 0 ? 'text-red-accent' : 'text-white/20'}`}>0{i + 1}</span>
                  {item.name}
                </button>
              ))}
            </div>

            <div className="mt-auto flex justify-between items-center pt-8 border-t border-white/10">
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/40">Account</button>
              <button className="text-[10px] uppercase tracking-[0.2em] text-white/40">Support</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
