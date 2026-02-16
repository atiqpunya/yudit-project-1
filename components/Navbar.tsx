import React, { useState } from 'react';
import { Baby, ShoppingBag, Search, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/catalog');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-2xl shadow-cute group-hover:rotate-12 transition-transform duration-300">
              <Baby size={24} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-primary-dark group-hover:text-primary transition-colors">
              PlayingWithUmma
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <form onSubmit={handleSearch} className="w-full relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="text-primary/60" size={20} />
              </div>
              <input
                className="block w-full pl-11 pr-4 py-3 border-2 border-primary/20 rounded-2xl leading-5 bg-white text-text-main placeholder-primary/40 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary sm:text-sm transition duration-150 ease-in-out shadow-inner font-body"
                placeholder="Cari Lembar Kerja, Modul, atau Game..."
                type="text"
              />
            </form>
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/catalog" className={`font-display font-bold text-sm px-4 py-2 rounded-xl transition-colors ${location.pathname === '/catalog' ? 'bg-primary/10 text-primary-dark' : 'text-text-main hover:text-primary'}`}>
              Katalog
            </Link>
            <button className="p-2.5 rounded-2xl hover:bg-primary/10 text-primary-dark transition-colors relative group">
              <ShoppingBag className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-accent border-2 border-white rounded-full animate-bounce"></span>
            </button>
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-full hover:bg-secondary/10 transition-colors border-2 border-transparent hover:border-secondary/30">
              <img
                alt="User Profile"
                className="h-9 w-9 rounded-full object-cover border-2 border-secondary"
                src="https://picsum.photos/id/64/100/100"
              />
              <span className="text-sm font-bold text-text-main font-body">Kak Budi</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
             <button onClick={() => setIsOpen(!isOpen)} className="text-text-main p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-primary/10 p-4">
           <Link to="/" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-primary/5 font-bold text-text-main">Beranda</Link>
           <Link to="/catalog" onClick={() => setIsOpen(false)} className="block py-3 px-4 rounded-xl hover:bg-primary/5 font-bold text-text-main">Katalog Produk</Link>
           <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
              <img src="https://picsum.photos/id/64/100/100" className="w-10 h-10 rounded-full border-2 border-secondary" alt="Profile" />
              <span className="font-bold text-text-main">Kak Budi</span>
           </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
