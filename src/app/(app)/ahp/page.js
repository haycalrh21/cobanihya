'use client'
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
const Ahp = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [result, setResult] = useState('');
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/dataproduct');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Hitung bobot berdasarkan harga produk
        let priceWeight = 1;
        const price = parseFloat(productPrice);
        if (price < 50000) {
            priceWeight = 0.2; // 1/5
        } else if (price > 50000 && price <= 100000) {
            priceWeight = 0.6; // 3/5
        } else if (price > 100000) {
            priceWeight = 1; // 5/5
        }

        // Hitung bobot berdasarkan kategori produk
        let categoryWeight = 1;
        switch (productCategory) {
            case 'Makanan':
                categoryWeight = 0.1; // 0.5/5
                break;
            case 'Minuman':
                categoryWeight = 0.06; // 0.3/5
                break;
            case 'Pakaian':
                categoryWeight = 0.2; // 1/5
                break;
            case 'Peralatan':
                categoryWeight = 1; // 5/5
                break;
            default:
                categoryWeight = 0.08; // 0.4/5 (Default jika kategori tidak ditemukan)
        }

        // Hitung total bobot
        const totalWeight = (priceWeight + categoryWeight) / 2;
        setResult(totalWeight.toString());
    };

    const handleProductChange = e => {
        const selectedProductName = e.target.value;
        const selectedProduct = products.find(product => product.nama === selectedProductName);
        if (selectedProduct) {
            setProductPrice(selectedProduct.harga);
            setProductCategory(selectedProduct.kategori);
        }
        setProductName(selectedProductName);
    };

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Perhitungan Sistem AHP</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block">Pilih Produk:</label>
                    <select value={productName} onChange={handleProductChange} className="border border-gray-300 rounded-md px-3 py-2 w-full">
                        <option value="">Pilih Produk</option>
                        {products.map((product, index) => (
                            <option key={index} value={product.nama}>{product.nama}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block">Kategori Produk:</label>
                    <input
                        type="text"
                        value={productCategory}
                        readOnly
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <div>
                    <label className="block">Harga Produk:</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Hitung
                </button>
            </form>
            {result && (
                <div className="mt-4">
                    <span className="font-semibold">Hasil Perhitungan AHP: </span>
                    <span>{result}</span>
                </div>
            )}
        </div>
    );
};

export default Ahp;
