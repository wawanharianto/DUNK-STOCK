import { motion } from 'motion/react';
import { Mail, Phone, MapPin, MessageSquare, ArrowLeft, Globe, Briefcase } from 'lucide-react';
import { soundManager } from '../lib/sounds';

export default function Contact({ onBack }: { onBack: () => void }) {
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Business Hotline",
      value: "+62 812-3456-7890",
      description: "Available Mon-Fri, 9AM - 6PM"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Collaboration Email",
      value: "partnership@dunkstock.com",
      description: "For business & brand inquiries"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Custom Orders",
      value: "@dunkstock_custom",
      description: "Direct message for bulk orders"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Flagship Store",
      value: "Jakarta, Indonesia",
      description: "SCBD Lot 8, South Jakarta"
    }
  ];

  return (
    <section className="red-frame h-screen w-full flex items-center bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-10 md:px-16 w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 pt-20 pb-10 md:pt-24 md:pb-20 overflow-y-auto scrollbar-hide">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-start md:justify-center"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-red-accent animate-pulse" />
            <span className="text-[8px] md:text-[11px] uppercase tracking-[0.3em] font-black text-red-accent">Connect With Us</span>
          </div>
          
          <h2 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-[0.85] mb-3">
            Let's Build<br />The Future
          </h2>
          
          <p className="text-white/50 text-[10px] md:text-xs max-w-md leading-relaxed mb-6">
            Interested in custom bulk orders, brand collaborations, or wholesale opportunities? 
            Our team is ready to help you create something legendary.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40">
                <Globe size={12} className="text-red-accent/50" />
                <span className="text-[7px] md:text-[9px] uppercase tracking-widest font-bold">Global Shipping</span>
              </div>
              <p className="text-[8px] md:text-[10px] text-white/50 leading-relaxed">Available to over 50 countries worldwide with premium tracking.</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white/40">
                <Briefcase size={12} className="text-red-accent/50" />
                <span className="text-[7px] md:text-[9px] uppercase tracking-widest font-bold">B2B Solutions</span>
              </div>
              <p className="text-[8px] md:text-[10px] text-white/50 leading-relaxed">Special pricing and logistics for teams, academies, and retailers.</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid grid-cols-1 gap-1.5 md:justify-center md:-mt-10"
        >
          {contactInfo.map((info, index) => (
            <div 
              key={index}
              className="group p-2 md:p-4 bg-white/[0.02] border border-white/5 rounded-sm hover:border-red-accent/30 transition-all duration-500 max-w-md"
            >
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-red-accent group-hover:bg-red-accent group-hover:text-white transition-all duration-500 shrink-0">
                  {info.icon instanceof Object ? <info.icon.type {...info.icon.props} size={10} /> : info.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[6px] md:text-[7px] uppercase tracking-[0.2em] text-white/30 font-bold block mb-0.5">{info.label}</span>
                  <h4 className="text-[10px] md:text-sm font-display font-bold text-white mb-0.5 truncate">{info.value}</h4>
                  <p className="text-[7px] md:text-[8px] text-white/40 truncate">{info.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
      </div>
      
      <div className="absolute bottom-6 md:bottom-8 left-10 md:left-16 flex items-center gap-8 z-20">
        <button 
          onClick={() => {
            soundManager.playClick();
            onBack();
          }}
          className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-red-accent transition-colors cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Ru</span>
      </div>
    </section>
  );
}
