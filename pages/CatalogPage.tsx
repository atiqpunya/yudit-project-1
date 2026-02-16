import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { Level, FileType } from '../types';

const CatalogPage: React.FC = () => {
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const [selectedFileTypes, setSelectedFileTypes] = useState<FileType[]>([]);
  const [showFilters, setShowFilters] = useState(false); // Mobile toggle

  const toggleLevel = (level: Level) => {
    setSelectedLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const toggleFileType = (type: FileType) => {
    setSelectedFileTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const levelMatch = selectedLevels.length === 0 || selectedLevels.includes(product.level);
      const typeMatch = selectedFileTypes.length === 0 || selectedFileTypes.includes(product.fileType);
      return levelMatch && typeMatch;
    });
  }, [selectedLevels, selectedFileTypes]);

  const levels: Level[] = ["PAUD / TK", "SD / MI", "SMP / MTS", "SMA / SMK"];
  const fileTypes: FileType[] = ["Modul Ajar / RPP", "Lembar Kerja (LKPD)", "Asesmen (Excel)", "Slide Presentasi"];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full relative">
      <div className="mb-10 text-center relative">
        <span className="inline-block px-4 py-1.5 bg-cute-purple/30 text-purple-700 rounded-full text-sm font-bold mb-3 border border-cute-purple/50 font-body">📚 Koleksi Lengkap</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-main mb-4 tracking-tight drop-shadow-sm font-display">Katalog Produk Ceria</h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg font-body">
          Temukan lembar kerja warna-warni, modul interaktif, dan alat belajar menyenangkan.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <button 
          className="lg:hidden w-full bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between font-bold text-text-main"
          onClick={() => setShowFilters(!showFilters)}
        >
            <span className="flex items-center gap-2"><Filter size={20} /> Filter</span>
            <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Sidebar */}
        <aside className={`w-full lg:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-3xl shadow-card border-2 border-primary/10 p-6 sticky top-28">
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-dashed border-slate-100">
              <h3 className="font-bold text-lg text-text-main flex items-center gap-2 font-display">
                <SlidersHorizontal className="text-primary" size={20} /> Filter
              </h3>
              <button 
                onClick={() => { setSelectedLevels([]); setSelectedFileTypes([]); }}
                className="text-xs bg-primary/10 text-primary-dark hover:bg-primary/20 px-3 py-1.5 rounded-full font-bold transition-colors font-body"
              >
                Reset
              </button>
            </div>

            {/* Level Filter */}
            <div className="mb-8 font-body">
              <h4 className="text-sm font-bold text-text-main mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cute-purple"></span> Jenjang
              </h4>
              <div className="space-y-3">
                {levels.map(level => (
                  <label key={level} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md text-primary focus:ring-primary border-2 border-slate-300 bg-white"
                      checked={selectedLevels.includes(level)}
                      onChange={() => toggleLevel(level)}
                    />
                    <span className={`font-medium transition-colors ${selectedLevels.includes(level) ? 'text-primary-dark font-bold' : 'text-slate-600 group-hover:text-primary'}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="font-body">
              <h4 className="text-sm font-bold text-text-main mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Tipe File
              </h4>
              <div className="space-y-3">
                {fileTypes.map(type => (
                  <label key={type} className="flex items-center gap-3 cursor-pointer group p-2 hover:bg-slate-50 rounded-xl transition-colors">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded-md text-primary focus:ring-primary border-2 border-slate-300 bg-white"
                      checked={selectedFileTypes.includes(type)}
                      onChange={() => toggleFileType(type)}
                    />
                    <span className={`font-medium transition-colors ${selectedFileTypes.includes(type) ? 'text-primary-dark font-bold' : 'text-slate-600 group-hover:text-primary'}`}>
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6 font-body">
             <p className="text-slate-500">Menampilkan <span className="font-bold text-text-main">{filteredProducts.length}</span> produk</p>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <p className="text-xl font-bold text-slate-400 font-display">Yah, produk tidak ditemukan :(</p>
                <p className="text-slate-400 font-body">Coba atur ulang filter kamu ya!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CatalogPage;
