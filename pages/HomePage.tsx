import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, PlayCircle, ShieldCheck, FileCheck } from 'lucide-react';
import { PRODUCTS, DETAIL_IMAGE } from '../constants';
import ProductCard from '../components/ProductCard';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = PRODUCTS.slice(0, 3); // Show first 3

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-accent text-teal-700 font-bold shadow-sm font-body animate-bounce">
                <ShieldCheck size={18} className="text-accent-dark" />
                <span className="text-sm tracking-wide">Terupdate untuk Kurikulum Merdeka</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-display font-black text-text-main leading-tight drop-shadow-sm">
                Belajar Matematika <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark relative inline-block">
                   Jadi Lebih Seru!
                </span>
              </h1>
              
              <p className="text-xl text-text-main/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body font-medium">
                Temukan ribuan lembar kerja (worksheets) estetik, RPP kreatif, dan alat bantu belajar yang bikin anak-anak jatuh cinta pada angka.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white rounded-2xl font-display font-bold text-lg shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  Jelajahi Produk
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white/80 backdrop-blur-md border border-white hover:bg-white text-text-main rounded-2xl font-display font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-card hover:shadow-lg">
                  <PlayCircle size={24} className="text-secondary" />
                  Lihat Demo
                </button>
              </div>

              <div className="pt-8 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-slate-500 font-bold font-body">
                <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl shadow-sm">
                  <FileCheck size={18} className="text-cute-green" />
                  <span>Unduhan Instan</span>
                </div>
                <div className="flex items-center gap-2 bg-white/50 px-4 py-2 rounded-xl shadow-sm">
                  <FileCheck size={18} className="text-cute-green" />
                  <span>File 100% Dapat Diedit</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative w-full flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full blur-3xl opacity-60"></div>
               <div className="relative z-10 w-full max-w-md bg-white p-4 rounded-[2.5rem] shadow-2xl rotate-2 hover:rotate-0 transition-all duration-500">
                  <img 
                    src={DETAIL_IMAGE}
                    alt="Worksheet Preview" 
                    className="w-full h-auto rounded-[2rem] shadow-inner"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-3xl shadow-xl flex items-center gap-4 animate-pulse">
                     <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-2xl">⚡</span>
                     </div>
                     <div>
                        <p className="font-bold text-text-main font-display">Excel Penilaian</p>
                        <p className="text-xs text-slate-400 font-body font-bold">Hemat waktu Bunda!</p>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-1.5 bg-accent/30 text-yellow-700 rounded-full text-sm font-bold mb-3 border border-accent/50 font-body">✨ Paling Diminati</span>
                <h2 className="text-4xl font-display font-black text-text-main mb-4">Produk Paling Favorit</h2>
                <p className="text-slate-500 font-body max-w-2xl mx-auto">Produk andalan yang sudah dipercaya ribuan guru cerdas.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-12 text-center">
                <button 
                  onClick={() => navigate('/catalog')}
                  className="px-8 py-3 border-2 border-primary/30 text-primary-dark font-bold rounded-2xl hover:bg-primary hover:text-white transition-all font-display"
                >
                    Lihat Semua Produk
                </button>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
