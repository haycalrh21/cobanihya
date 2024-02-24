'use client'
import React, { useState } from 'react'
import axios from '@/lib/axios' // Impor axios di sini

const Buy = () => {
    const [formData, setFormData] = useState({
        nama: '',
        stok: '',
        merk: '',
        harga: '',
    })

    const handleChange = e => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const response = await axios.post('api/storeproduct', formData)
            console.log(response.data)
            // Reset form setelah berhasil submit
            setFormData({
                nama: '',
                stok: '',
                merk: '',
                harga: '',
            })
        } catch (error) {
            console.error('Error buying product:', error)
        }
    }

    return (
        <div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2>Buy Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Nama:</label>
                                <input
                                    type="text"
                                    name="nama"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Stok:</label>
                                <input
                                    type="number"
                                    name="stok"
                                    value={formData.stok}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Merk:</label>
                                <input
                                    type="text"
                                    name="merk"
                                    value={formData.merk}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Harga:</label>
                                <input
                                    type="number"
                                    name="harga"
                                    value={formData.harga}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'green',
                                    borderRadius: '8px',
                                    fontSize: '16px',
                                    padding: '10px 20px',
                                }}>
                                Buy
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Buy
