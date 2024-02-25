'use client'
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

const Buy = () => {
    const [formData, setFormData] = useState({
        nama: '',
        stok: '',
        merk: '',
        harga: '',
        kategori: '',
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('api/kategori');
            const flattenedCategories = response.data.flat();
            setCategories(flattenedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('api/storeproduct', formData);
            console.log(response.data);
            setFormData({
                nama: '',
                stok: '',
                merk: '',
                harga: '',
                kategori: '',
            });
        } catch (error) {
            console.error('Error buying product:', error);
        }
    };

    return (
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 bg-white border-b border-gray-200">
                    <h2 className="mb-4 text-lg font-semibold">Buy Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block">Nama:</label>
                            <input
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Stok:</label>
                            <input
                                type="number"
                                name="stok"
                                value={formData.stok}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Merk:</label>
                            <input
                                type="text"
                                name="merk"
                                value={formData.merk}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Harga:</label>
                            <input
                                type="number"
                                name="harga"
                                value={formData.harga}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            />
                        </div>
                        <div>
                            <label className="block">Kategori:</label>
                            <select
                                name="kategori"
                                value={formData.kategori}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                required
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map((category, index) => (
                                    <option key={index} value={category.name}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Buy
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Buy;
