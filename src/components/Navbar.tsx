import { ShoppingBag, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function Navbar({ 
  onCustomize, 
  cartCount = 0, 
  onOpenCart 
}: { 
  onCustomize: () => void;
  cartCount?: number;
  onOpenCart: () => void;
}) {
  return (
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
        {['Products', 'Customize', 'Contacts'].map((item, i) => (
          <button 
            key={item} 
            onClick={item === 'Customize' ? onCustomize : undefined}
            className={`text-[11px] uppercase tracking-[0.1em] font-medium transition-colors cursor-pointer ${i === 0 ? 'text-red-accent' : 'text-white/70 hover:text-white'}`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <button className="text-white/70 hover:text-white transition-colors">
          <User size={18} className="md:w-5 md:h-5" />
        </button>
        <button 
          onClick={onOpenCart}
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
      </div>
    </motion.nav>
  );
}
