'use client'
import React, { useState, useEffect } from 'react'
import Header from '@/app/(app)/Header'
import axios from '@/lib/axios'

const Dashboard = () => {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        // Panggil API untuk mendapatkan data pembelian saat komponen dimuat
        const fetchData = async () => {
            try {
                const response = await axios.get('api/dataproduct')
                setPurchases(response.data)
            } catch (error) {
                console.error('Error fetching purchases:', error)
            }
        }

        fetchData()
    }, [])

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
                                        ID
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
                                        tanggal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {purchases.map((purchase, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {purchase.id}
                                        </td>
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
                                            {purchase.created_at}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
