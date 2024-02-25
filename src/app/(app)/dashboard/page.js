'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'
import EditModal from '@/app/(app)/edit/page'
import Link from 'next/link';

const Dashboard = () => {

    const [purchases, setPurchases] = useState([])
    const [showEditModal, setShowEditModal] = useState(false); // State untuk mengontrol visibilitas modal
    const [selectedPurchase, setSelectedPurchase] = useState(null); // State untuk menyimpan data pembelian yang akan diubah


    const fetchData = async () => {
        try {
            const response = await axios.get('api/dataproduct');
            setPurchases(response.data);
        } catch (error) {
            console.error('Error fetching purchases:', error);
        }
    };
    const handleDetail = (productId) => {
        // Mengarahkan pengguna ke halaman detail dengan URL yang sesuai
        window.location.href = `/detail/${productId}`;
    };



    const handleDelete = async (id) => {
        try {
            await axios.delete(`api/hapus/${id}`);
            // Setelah penghapusan berhasil, panggil kembali fetchData untuk memperbarui data
            fetchData();
        } catch (error) {
            console.error('Error deleting purchase:', error);
        }
    };





    useEffect(() => {
        if (!showEditModal) {
            fetchData();
        }
    }, [showEditModal]);
    const handleEdit = (purchase) => {
        setSelectedPurchase(purchase); // Set data pembelian yang akan diubah
        setShowEditModal(true); // Tampilkan modal edit
    };

    useEffect(() => {
        fetchData();
    }, []);



    const calculateTimeAgo = (timestamp) => {
        const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
        const purchaseTime = Math.floor(new Date(timestamp).getTime() / 1000); // Waktu pembelian dalam detik

        const difference = currentTime - purchaseTime; // Selisih waktu dalam detik

        // Konversi selisih waktu menjadi "x menit yang lalu"
        const minutes = Math.floor(difference / 60);
        return `${minutes} menit yang lalu`;
    };

    return (
        <>
            <Header title="Dashboard" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2>Data Pembelian</h2>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        No
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Stok
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Merk
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Harga
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kategori
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        tanggal
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Aksi
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {purchases.map((purchase, index) => (
                                    <tr key={index}>
                                        <tr key={index}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {index + 1}
                                            </td>
                                            {/* Sisanya dari kolom lain */}
                                        </tr>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.nama}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.stok}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.merk}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.harga}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.kategori}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {calculateTimeAgo(purchase.updated_at)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-500 mr-2" onClick={() => handleEdit(purchase)}>Edit</button>

                                            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500 mr-2" onClick={() => handleDelete(purchase.id)}>Hapus</button>
                                            {/* <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-yellow-500" onClick={() => handleDetail(purchase.id)}>detail</button> */}
                                            <Link href={`/detail/${purchase.id}`}>
                                                <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-blue-500">Detail</button>
                                            </Link>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
            {showEditModal && (
                <EditModal purchase={selectedPurchase} onClose={() => setShowEditModal(false)} />
            )
            }
        </>
    )
}

export default Dashboard
