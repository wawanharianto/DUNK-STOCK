import { motion } from 'motion/react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { soundManager } from '../lib/sounds';

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
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 z-50 flex flex-col md:flex-row pointer-events-none">
      {/* Sidebar */}
      <motion.div 
        initial={isMobile ? { y: '100%', opacity: 0 } : { x: -450, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        exit={isMobile ? { y: '100%', opacity: 0 } : { x: -450, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full md:w-[450px] h-[65vh] md:h-full mt-auto md:mt-0 bg-black/95 md:bg-black/85 backdrop-blur-3xl border-t md:border-t-0 md:border-r border-white/10 p-6 md:p-10 flex flex-col pointer-events-auto scrollbar-hide overflow-y-auto"
      >
        <div className="flex-1 space-y-8 md:space-y-10 pb-10">
          <button 
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </button>

          <div className="space-y-3 md:space-y-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.9] text-white">
              Design Your<br />Legacy
            </h2>
            <p className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">Personalize every detail.</p>
          </div>

          {/* Base Color Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Base Color</span>
              <span className="text-[9px] text-red-accent font-mono uppercase">{baseColor}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {BASE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    soundManager.playClick();
                    setBaseColor(c);
                  }}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 transition-all duration-300 relative ${baseColor === c ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/10 hover:border-white/30 hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                >
                  {baseColor === c && (
                    <motion.div 
                      layoutId="base-active"
                      className="absolute inset-[-4px] border border-white/20 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Line Color Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Line Color</span>
              <span className="text-[9px] text-white/60 font-mono uppercase">{lineColor}</span>
            </div>
            <div className="flex flex-wrap gap-3">
              {LINE_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    soundManager.playClick();
                    setLineColor(c);
                  }}
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full border-2 transition-all duration-300 relative ${lineColor === c ? 'border-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'border-white/10 hover:border-white/30 hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                >
                  {lineColor === c && (
                    <motion.div 
                      layoutId="line-active"
                      className="absolute inset-[-4px] border border-white/20 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Texture Selection */}
          <div className="space-y-4">
            <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">Grip Texture</span>
            <div className="grid grid-cols-2 gap-3">
              {TEXTURES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    soundManager.playClick();
                    setTexture(t.id);
                  }}
                  className={`py-3 px-4 text-[10px] font-bold tracking-[0.2em] transition-all duration-300 border ${texture === t.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/50 border-white/10 hover:border-white/30'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* AI Texture Lab */}
          <div className="p-6 border border-white/5 bg-white/[0.02] rounded-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-red-accent">AI Texture Lab</span>
              <Sparkles className="w-4 h-4 text-red-accent" />
            </div>
            <textarea 
              placeholder='Describe a vibe (e.g. "Cyberpunk neon tiger")'
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-[11px] text-white/70 placeholder:text-white/20 focus:outline-none focus:border-red-accent/50 h-24 resize-none transition-all"
            />
          </div>
        </div>

        <div className="pt-6 mt-auto">
          <button 
            onClick={() => {
              soundManager.playClick();
              onAddToCart();
            }}
            className="w-full bg-red-accent py-5 md:py-6 relative flex items-center justify-center gap-4 group hover:brightness-110 transition-all shadow-[0_0_50px_rgba(230,0,0,0.3)] active:scale-[0.98]"
          >
            <span className="absolute left-8 text-[10px] uppercase tracking-[0.4em] text-white/40 hidden md:block font-bold">Ru</span>
            <span className="text-[11px] md:text-[12px] uppercase tracking-[0.3em] font-black text-white">Add to Collection</span>
          </button>
        </div>
      </motion.div>

      {/* Background Watermark */}
      <div className="flex-1 relative pointer-events-none overflow-hidden hidden md:block">
        <h1 className="absolute top-24 right-24 text-[15vw] font-display font-bold text-white/[0.02] leading-none uppercase select-none text-right">
          Custom<br />
          <span className="text-[3vw] tracking-[0.8em] opacity-30">Lab Edition</span>
        </h1>
      </div>
    </div>
  );
}
