import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';

interface CustomizeProps {
  onBack: () => void;
  baseColor: string;
  setBaseColor: (color: string) => void;
  lineColor: string;
  setLineColor: (color: string) => void;
  texture: 'classic' | 'street' | 'tech' | 'cross';
  setTexture: (texture: 'classic' | 'street' | 'tech' | 'cross') => void;
  onAddToCart: () => void;
}

const BASE_COLORS = [
  '#E60000', // Red
  '#006633', // Green
  '#0066FF', // Blue
  '#660000', // Maroon
  '#FF0066', // Pink
  '#1A1A1A', // Black
  '#FFFFFF', // White
];

const LINE_COLORS = [
  '#050505', // Black
  '#FFFFFF', // White
  '#FFD700', // Gold
  '#99FF99', // Light Green
  '#00CCFF', // Light Blue
];

const TEXTURES = [
  { id: 'classic', label: 'CLASSIC' },
  { id: 'street', label: 'STREET' },
  { id: 'tech', label: 'TECH' },
  { id: 'cross', label: 'CROSS' },
] as const;

export default function Customize({ 
  onBack, 
  baseColor, 
  setBaseColor, 
  lineColor, 
  setLineColor, 
  texture, 
  setTexture,
  onAddToCart
}: CustomizeProps) {
  return (
    <div className="absolute inset-0 z-50 flex pointer-events-auto">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -400 }}
        animate={{ x: 0 }}
        exit={{ x: -400 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-[400px] h-full bg-black/95 md:bg-black/90 backdrop-blur-xl border-r border-white/5 p-6 md:p-12 flex flex-col justify-between overflow-y-auto pointer-events-auto"
      >
        <div className="space-y-8 md:space-y-12 pointer-events-auto relative z-50">
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
              onBack();
            }}
            className="flex items-center gap-3 text-[13px] md:text-[10px] uppercase tracking-[0.2em] text-white hover:text-red-accent transition-colors group cursor-pointer pointer-events-auto font-bold w-full py-2 px-2"
          >
            <ArrowLeft size={20} className="md:w-3.5 md:h-3.5 group-hover:-translate-x-1 transition-transform flex-shrink-0" />
            <span>Back to Shop</span>
          </button>

          <div className="space-y-3 md:space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-none">
              Design Your<br />Legacy
            </h2>
            <p className="text-white/40 text-[10px] md:text-xs">Create a ball that matches your game.</p>
          </div>

          {/* Base Color Selection */}
          <div className="space-y-3 md:space-y-4 pointer-events-auto">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Base Color</span>
            <div className="flex flex-wrap gap-2 md:gap-3 pointer-events-auto">
              {BASE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setBaseColor(c);
                  }}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all cursor-pointer pointer-events-auto ${baseColor === c ? 'border-red-accent scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Line Color Selection */}
          <div className="space-y-3 md:space-y-4 pointer-events-auto">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Line Color</span>
            <div className="flex flex-wrap gap-2 md:gap-3 pointer-events-auto">
              {LINE_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setLineColor(c);
                  }}
                  className={`w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all cursor-pointer pointer-events-auto ${lineColor === c ? 'border-red-accent scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Texture Selection */}
          <div className="space-y-3 md:space-y-4 pointer-events-auto">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">Grip Texture</span>
            <div className="grid grid-cols-2 gap-2 md:gap-3 pointer-events-auto">
              {TEXTURES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTexture(t.id);
                  }}
                  className={`py-2 md:py-3 px-4 md:px-4 text-[10px] md:text-[10px] font-bold tracking-widest transition-all border cursor-pointer pointer-events-auto ${texture === t.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Texture Lab */}
          <div className="p-4 md:p-6 border border-white/5 bg-white/[0.02] rounded-sm space-y-3 md:space-y-4 pointer-events-auto">
            <div className="flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold text-red-accent">AI Texture Lab</span>
              <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5 text-red-accent" />
            </div>
            <textarea 
              placeholder='Describe a vibe (e.g. "Cyberpunk neon tiger")'
              className="w-full bg-black/50 border border-white/10 rounded p-2 md:p-3 text-[10px] md:text-[11px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-red-accent/50 h-16 md:h-20 resize-none pointer-events-auto"
            />
          </div>
        </div>

        <button 
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-red-accent py-4 md:py-5 mt-8 relative flex items-center justify-center gap-4 group hover:brightness-110 transition-all shrink-0 cursor-pointer pointer-events-auto"
        >
          <span className="absolute left-6 text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/40 hidden md:block">Ru</span>
          <span className="text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-black text-white">Add to Collection</span>
        </button>
      </motion.div>

      {/* Background Watermark */}
      <div className="flex-1 relative pointer-events-none overflow-hidden">
        <h1 className="absolute top-12 right-12 text-[12vw] font-display font-bold text-white/[0.03] leading-none uppercase select-none text-right">
          Custom<br />
          <span className="text-[2vw] tracking-[0.5em] opacity-50">Lab Edition</span>
        </h1>
      </div>
    </div>
  );
}
