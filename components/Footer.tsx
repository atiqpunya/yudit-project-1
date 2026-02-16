import React from 'react';
import { Baby, Facebook, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-secondary/20 mt-12 py-12 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-10 w-20 h-20 bg-accent/20 rounded-full blur-xl -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-cute">
              <Baby size={18} />
            </div>
            <span className="font-display font-bold text-lg text-primary-dark">PlayingWithUmma</span>
          </div>
          <p className="text-slate-500 text-sm font-medium font-body text-center md:text-left">
            © 2023 PlayingWithUmma.<br />Belajar itu Menyenangkan!
          </p>
        </div>

        <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white transition-all shadow-sm">
                <Youtube size={18} />
            </button>
        </div>

        <div className="flex flex-wrap justify-center gap-8 font-body">
          <a href="#" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors">Bantuan</a>
          <a href="#" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors">Syarat & Ketentuan</a>
          <a href="#" className="text-slate-600 hover:text-primary font-bold text-sm transition-colors">Kebijakan Privasi</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
