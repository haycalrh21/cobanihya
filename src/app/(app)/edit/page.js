'use client'
import React, { useState } from 'react';
import axios from '@/lib/axios'


const EditModal = ({ purchase, onClose }) => {
    const [editedPurchase, setEditedPurchase] = useState({ ...purchase });



    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPurchase(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleEditPurchase = async (e) => {
        e.preventDefault(); // Mencegah perilaku default formulir
        try {
            await axios.patch(`api/edit/${editedPurchase.id}`, editedPurchase);
            console.log("Pembelian berhasil diubah:", editedPurchase);
            onClose(); // Tutup modal setelah pembelian diubah
        } catch (error) {
            console.error('Error editing purchase:', error);
        }
    };



    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Edit Pembelian
                                </h3>
                                <form onSubmit={handleEditPurchase}>
                                    <div className="mt-2">
                                        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
                                        <input type="text" name="nama" id="nama" value={editedPurchase.nama || ''} onChange={handleChange} className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="stok" className="block text-sm font-medium text-gray-700">Stok</label>
                                        <input type="number" name="stok" id="stok" value={editedPurchase.stok || ''} onChange={handleChange} className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="stok" className="block text-sm font-medium text-gray-700">Merk</label>
                                        <input type="text" name="merk" id="stok" value={editedPurchase.merk || ''} onChange={handleChange} className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>                                    <div className="mt-2">
                                        <label htmlFor="stok" className="block text-sm font-medium text-gray-700">Harga</label>
                                        <input type="number" name="harga" id="stok" value={editedPurchase.harga || ''} onChange={handleChange} className="mt-1 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                    </div>
                                    <div className="mt-4 flex justify-end">
                                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Simpan</button>
                                        <button type="button" onClick={onClose} className="bg-gray-400 text-white ml-4 px-4 py-2 rounded-md hover:bg-gray-500">Batal</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditModal;
