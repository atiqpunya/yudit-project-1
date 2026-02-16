import React, { useState, useEffect } from 'react';
import { Product, Level, FileType } from '../types';
import { getStoredProducts, saveStoredProducts, getStoredSettings, saveStoredSettings, AppSettings } from '../constants';
import { Save, Plus, Trash2, Download, LogIn, ExternalLink } from 'lucide-react';

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [password, setPassword] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [settings, setSettings] = useState<AppSettings>({ whatsappNumber: '' });
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    useEffect(() => {
        setProducts(getStoredProducts());
        setSettings(getStoredSettings());

        // Check if previously logged in (simple session)
        const session = sessionStorage.getItem('admin_session');
        if (session === 'true') setIsLoggedIn(true);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Default password for simplicity, can be changed later
        if (password === 'admin123') {
            setIsLoggedIn(true);
            sessionStorage.setItem('admin_session', 'true');
        } else {
            alert('Password salah!');
        }
    };

    const handleSaveSettings = () => {
        saveStoredSettings(settings);
        alert('Pengaturan disimpan!');
    };

    const handleUpdateProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        let updatedProducts;
        if (products.find(p => p.id === editingProduct.id)) {
            updatedProducts = products.map(p => p.id === editingProduct.id ? editingProduct : p);
        } else {
            updatedProducts = [...products, editingProduct];
        }

        setProducts(updatedProducts);
        saveStoredProducts(updatedProducts);
        setEditingProduct(null);
        alert('Produk berhasil diperbarui!');
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm('Hapus produk ini?')) {
            const updated = products.filter(p => p.id !== id);
            setProducts(updated);
            saveStoredProducts(updated);
        }
    };

    const handleExportJSON = () => {
        const data = {
            products,
            settings
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'backup_data.json';
        a.click();
    };

    const addNewProduct = () => {
        setEditingProduct({
            id: Date.now().toString(),
            title: '',
            description: '',
            price: 0,
            level: 'SD / MI',
            fileType: 'Lembar Kerja (LKPD)',
            image: '',
            fileFormat: 'PDF',
            tags: []
        });
    };

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                            <LogIn className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
                        <p className="text-slate-500 mt-2">Masuk untuk mengelola produk dan link</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                placeholder="Masukkan password..."
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                        >
                            Masuk
                        </button>
                        <p className="text-center text-xs text-slate-400 mt-4 italic">Password default: admin123</p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20 pt-24 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Dashboard Admin</h1>
                        <p className="text-slate-500">Kelola katalog produk Yudit Project</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={handleExportJSON}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                        >
                            <Download className="w-4 h-4" /> Export Data
                        </button>
                        <button
                            onClick={addNewProduct}
                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
                        >
                            <Plus className="w-4 h-4" /> Produk Baru
                        </button>
                    </div>
                </div>

                {/* Settings Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Save className="w-5 h-5 text-indigo-600" /> Pengaturan Umum
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Nomor WhatsApp (dengan kode negara, misal: 62812...)</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={settings.whatsappNumber}
                                    onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                                    className="flex-grow px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    placeholder="628..."
                                />
                                <button
                                    onClick={handleSaveSettings}
                                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-indigo-700 transition-colors"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Products List */}
                <div className="grid grid-cols-1 gap-4">
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Daftar Produk ({products.length})</h2>
                    {products.map(product => (
                        <div key={product.id} className="bg-white rounded-xl border border-slate-100 p-4 flex flex-col md:flex-row items-center gap-4 hover:shadow-md transition-shadow">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-20 h-20 object-cover rounded-lg bg-slate-100"
                                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
                            />
                            <div className="flex-grow text-center md:text-left">
                                <h3 className="font-bold text-slate-900">{product.title}</h3>
                                <p className="text-sm text-slate-500 line-clamp-1">{product.description}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{product.level}</span>
                                    <span className="text-xs font-bold text-indigo-600">Rp {product.price.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setEditingProduct(product)}
                                    className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Hapus"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">
                            {products.find(p => p.id === editingProduct.id) ? 'Edit Produk' : 'Tambah Produk Baru'}
                        </h2>
                        <form onSubmit={handleUpdateProduct} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Judul Produk</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProduct.title}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={editingProduct.description}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
                                    <input
                                        required
                                        type="number"
                                        value={editingProduct.price}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseInt(e.target.value) || 0 })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Harga Coret (Opsional)</label>
                                    <input
                                        type="number"
                                        value={editingProduct.originalPrice || ''}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseInt(e.target.value) || undefined })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Jenjang</label>
                                    <select
                                        value={editingProduct.level}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, level: e.target.value as Level })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                    >
                                        <option value="PAUD / TK">PAUD / TK</option>
                                        <option value="SD / MI">SD / MI</option>
                                        <option value="SMP / MTS">SMP / MTS</option>
                                        <option value="SMA / SMK">SMA / SMK</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipe File</label>
                                    <select
                                        value={editingProduct.fileType}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, fileType: e.target.value as FileType })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                    >
                                        <option value="Modul Ajar / RPP">Modul Ajar / RPP</option>
                                        <option value="Lembar Kerja (LKPD)">Lembar Kerja (LKPD)</option>
                                        <option value="Asesmen (Excel)">Asesmen (Excel)</option>
                                        <option value="Slide Presentasi">Slide Presentasi</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-slate-700 mb-1">URL Gambar (Google Drive/Lainnya)</label>
                                    <input
                                        required
                                        type="text"
                                        value={editingProduct.image}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                                        placeholder="https://..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Format File</label>
                                    <select
                                        value={editingProduct.fileFormat}
                                        onChange={(e) => setEditingProduct({ ...editingProduct, fileFormat: e.target.value as any })}
                                        className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
                                    >
                                        <option value="PDF">PDF</option>
                                        <option value="XLS">Excel (XLS)</option>
                                        <option value="PPT">PowerPoint (PPT)</option>
                                        <option value="DOC">Word (DOC)</option>
                                    </select>
                                </div>
                                <div className="flex items-end gap-6 h-full pb-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={editingProduct.isPromo}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, isPromo: e.target.checked })}
                                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Tanda Promo</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={editingProduct.isBestSeller}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                                            className="w-5 h-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">Best Seller</span>
                                    </label>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingProduct(null)}
                                    className="px-6 py-2 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                                >
                                    Simpan Produk
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
