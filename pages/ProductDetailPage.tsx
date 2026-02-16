import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStoredProducts } from '../constants';
import { CheckCircle, ArrowLeft, Rocket, Lock, ShieldCheck, Heart } from 'lucide-react';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const products = getStoredProducts();
    const product = products.find(p => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!product) {
        return <div className="p-20 text-center">Produk tidak ditemukan</div>;
    }

    const handleBuy = () => {
        // Redirect to purchase link or fallback to Lynk.id (External)
        const link = product.purchaseLink || 'https://lynk.id/';
        window.open(link, '_blank');
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Breadcrumb / Back */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold mb-8 transition-colors"
            >
                <ArrowLeft size={20} /> Kembali
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Column: Images */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="bg-white rounded-[2rem] p-3 border-2 border-dashed border-primary/20 shadow-xl relative overflow-hidden group">
                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-orange-50">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {product.isBestSeller && (
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm border border-primary/20 flex items-center gap-1 font-body">
                                    ✨ Best Seller
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description Tabs */}
                    <div className="bg-white rounded-3xl p-6 lg:p-10 border border-slate-100 shadow-card">
                        <h3 className="text-2xl font-display font-bold text-text-main mb-6">Deskripsi Produk 🎈</h3>
                        <p className="text-slate-600 leading-relaxed mb-8 text-lg font-body">
                            {product.description}
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-6">
                            <div className="flex gap-4 items-start p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-500 shadow-sm shrink-0">
                                    <Rocket size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main font-display">Instant Download</h4>
                                    <p className="text-sm text-slate-500 font-body">Langsung akses file setelah pembayaran berhasil.</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start p-4 rounded-2xl bg-pink-50 border border-pink-100">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-pink-500 shadow-sm shrink-0">
                                    <Heart size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-text-main font-display">100% Editable</h4>
                                    <p className="text-sm text-slate-500 font-body">File format {product.fileFormat} bebas diedit sesuai kebutuhan.</p>
                                </div>
                            </div>
                        </div>

                        <h4 className="text-lg font-bold font-display text-text-main mb-4 mt-8">Apa yang Bunda dapatkan?</h4>
                        <ul className="space-y-3 font-body text-slate-600">
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-cute-green" /> Modul Ajar / File Utama
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-cute-green" /> Bonus Aset Pendukung
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle size={20} className="text-cute-green" /> Akses Update Gratis Selamanya
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: Checkout Card */}
                <div className="lg:col-span-5">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-[2.5rem] p-8 border-2 border-primary/10 shadow-2xl relative overflow-hidden">
                            {/* Background Blobs */}
                            <div className="absolute -right-6 -top-6 bg-primary/20 w-32 h-32 rounded-full opacity-50 blur-2xl"></div>
                            <div className="absolute -left-6 -bottom-6 bg-secondary/20 w-32 h-32 rounded-full opacity-50 blur-2xl"></div>

                            <div className="relative z-10">
                                <div className="mb-4">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-100 font-body">
                                        {product.level}
                                    </span>
                                </div>

                                <h1 className="text-2xl font-display font-bold text-text-main mb-4 leading-tight">
                                    {product.title}
                                </h1>

                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-4xl font-display font-black text-primary-dark">Rp {product.price.toLocaleString()}</span>
                                    {product.originalPrice && (
                                        <>
                                            <span className="text-sm text-slate-400 line-through decoration-2 font-body">Rp {product.originalPrice.toLocaleString()}</span>
                                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-lg transform rotate-2">Hemat 30%</span>
                                        </>
                                    )}
                                </div>

                                <button
                                    onClick={handleBuy}
                                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-display font-bold text-lg py-4 px-6 rounded-2xl shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-1 active:scale-95 group border-b-4 border-primary-dark"
                                >
                                    <span>Beli Sekarang via Lynk.id</span>
                                    <Rocket size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>

                                <p className="text-center text-xs font-semibold text-slate-400 mt-4 flex items-center justify-center gap-1 font-body">
                                    <Lock size={12} /> Transaksi aman & unduh instan.
                                </p>

                                <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-100">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-secondary/20 rounded-xl">
                                            <ShieldCheck className="text-blue-500" size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-display font-bold text-text-main">Jaminan Kepuasan</h4>
                                            <p className="text-xs text-slate-500 mt-1 leading-relaxed font-body">Disusun oleh praktisi pendidikan berpengalaman. Kualitas terjamin!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
