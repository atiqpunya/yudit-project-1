import React from 'react';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { Flame, Star, FileText, FileSpreadsheet, Presentation, File } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'XLS': return <FileSpreadsheet size={16} className="text-green-500" />;
      case 'PDF': return <FileText size={16} className="text-red-500" />;
      case 'PPT': return <Presentation size={16} className="text-orange-500" />;
      default: return <File size={16} className="text-blue-500" />;
    }
  };

  const getLevelColor = (level: string) => {
    if (level.includes('SD')) return 'bg-teal-100 text-teal-700 border-teal-200';
    if (level.includes('SMP')) return 'bg-blue-100 text-blue-600 border-blue-200';
    if (level.includes('SMA')) return 'bg-purple-100 text-purple-700 border-purple-200';
    return 'bg-orange-100 text-orange-700 border-orange-200';
  };

  return (
    <div 
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-3xl shadow-card hover:shadow-xl hover:-translate-y-1 hover:shadow-primary/10 border border-slate-100 overflow-hidden transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-secondary/10 p-2">
        <div className="w-full h-full rounded-2xl overflow-hidden relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Badges Top Left */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 items-start">
          <span className={`${getLevelColor(product.level)} text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm uppercase tracking-wide font-body`}>
            {product.level}
          </span>
          {product.isPromo && (
            <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full border border-red-200 shadow-sm uppercase tracking-wide flex items-center gap-1 font-body">
              <Flame size={12} /> Promo
            </span>
          )}
           {product.isBestSeller && (
            <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-yellow-200 shadow-sm uppercase tracking-wide flex items-center gap-1 font-body">
              <Star size={12} /> Terlaris
            </span>
          )}
        </div>

        {/* File Format Badge Bottom Right */}
        <div className="absolute bottom-4 right-4">
          <span className="bg-white/95 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-xl shadow-md text-slate-700 flex items-center gap-1.5 border border-slate-100 font-body">
            {getFileIcon(product.fileFormat)} {product.fileFormat}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-text-main leading-tight mb-2 group-hover:text-primary-dark transition-colors font-display">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed font-body">
          {product.description}
        </p>

        <div className="mt-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5 font-body">
            {product.tags.map((tag, idx) => (
              <span key={idx} className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold ${idx % 2 === 0 ? 'bg-cute-purple/20 text-purple-700' : 'bg-secondary/20 text-blue-700'}`}>
                {tag}
              </span>
            ))}
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-dashed border-slate-100">
            <div className="flex flex-col">
              {product.originalPrice && (
                 <span className="text-xs text-slate-400 line-through font-medium font-body">Rp {product.originalPrice.toLocaleString()}</span>
              )}
              <span className="text-xl font-black text-primary-dark font-display">Rp {product.price.toLocaleString()}</span>
            </div>
            <button className="bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30 px-5 py-2.5 rounded-xl text-sm font-bold transition-all transform hover:scale-105 active:scale-95 font-body">
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
