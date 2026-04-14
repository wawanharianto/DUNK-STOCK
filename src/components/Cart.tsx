import { motion } from 'motion/react';
import { X, Trash2, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import { soundManager } from '../lib/sounds';

interface CartProps {
  items: any[];
  onClose: () => void;
  onRemove: (id: string | number) => void;
}

export default function Cart({ items, onClose, onRemove }: CartProps) {
  const total = items.reduce((acc, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return acc + price;
  }, 0);

  const handleCheckout = () => {
    soundManager.playSwish();
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('DUNK STOCK - INVOICE', 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Invoice #: INV-${Math.floor(Math.random() * 1000000)}`, 20, 37);
    
    // Table Header
    doc.line(20, 45, 190, 45);
    doc.text('Item', 20, 52);
    doc.text('Type', 80, 52);
    doc.text('Price', 160, 52);
    doc.line(20, 55, 190, 55);
    
    // Items
    let y = 65;
    items.forEach((item) => {
      doc.text(`${item.name} ${item.suffix}`, 20, y);
      doc.text(item.modelType || 'Classic', 80, y);
      doc.text(item.price, 160, y);
      y += 10;
    });
    
    // Footer
    doc.line(20, y, 190, y);
    doc.setFontSize(14);
    doc.text('TOTAL', 120, y + 10);
    doc.text(`$${total.toFixed(2)}`, 160, y + 10);
    
    doc.setFontSize(10);
    doc.text('Thank you for your purchase!', 20, y + 30);
    
    doc.save('dunkstock-invoice.pdf');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      
      {/* Cart Panel */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-sm overflow-hidden flex flex-col max-h-[85vh]"
      >
        <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tighter">Your Bag</h2>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30">({items.length} Items)</span>
          </div>
          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }} 
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={20} className="md:w-6 md:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          {items.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center text-white/20 gap-4">
              <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em]">Your bag is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex justify-between items-center group gap-4">
                <div className="flex gap-4 md:gap-6 items-center">
                  <div 
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/10 flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}22` }}
                  >
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full" style={{ backgroundColor: item.color }} />
                  </div>
                  <div>
                    <h3 className="text-sm md:text-lg font-display font-bold uppercase tracking-tight line-clamp-1">
                      {item.name} {item.suffix}
                    </h3>
                    <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-white/30">
                      {item.modelType} Edition
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                  <span className="text-sm md:text-lg font-display font-bold">{item.price}</span>
                  <button 
                    onClick={() => {
                      soundManager.playBounce();
                      onRemove(item.id);
                    }}
                    className="text-white/20 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} className="md:w-[18px] md:h-[18px]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 md:p-8 bg-black/40 border-t border-white/5 space-y-6">
          <div className="flex justify-between items-end gap-4">
            <div className="flex flex-col">
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/30">Subtotal</span>
              <span className="text-2xl md:text-4xl font-display font-bold">${total.toFixed(2)}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="bg-red-accent px-6 md:px-10 py-3 md:py-4 flex items-center gap-2 md:gap-3 group disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all"
            >
              <FileText size={16} className="md:w-[18px] md:h-[18px] text-white" />
              <span className="text-[9px] md:text-[11px] uppercase tracking-[0.2em] font-black text-white">Checkout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
