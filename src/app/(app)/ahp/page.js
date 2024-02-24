'use client'
import React, { useState, useEffect } from 'react'
import axios from '@/lib/axios'

const Ahp = () => {
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [result, setResult] = useState('')
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get('api/dataproduct')
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        // Lakukan perhitungan AHP berdasarkan nama dan harga
        // Simpan hasil perhitungan ke dalam state result
        const calculatedResult = calculateAhp(productName, productPrice)
        setResult(calculatedResult)
    }

    const calculateAhp = (name, price) => {
        // Implementasi perhitungan AHP disini
        // Gunakan data produk dari state products untuk perhitungan AHP

        // Contoh sederhana:
        const weightName = 0.6 // Bobot untuk nama produk
        const weightPrice = 0.4 // Bobot untuk harga produk
        const scoreName = name.length // Skor nama produk (contoh sederhana: panjang nama)
        const scorePrice = parseInt(price) // Skor harga produk (contoh sederhana: harga dalam angka)

        // Hitung nilai total berdasarkan bobot dan skor
        const totalScore = weightName * scoreName + weightPrice * scorePrice

        // Ubah totalScore menjadi 3 angka
        const roundedTotalScore = Math.round(totalScore * 1000) / 1000

        // Klasifikasikan nilai AHP berdasarkan rentang harga
        let classification = ''
        if (scorePrice < 50000) {
            classification = 'Murah'
        } else if (scorePrice <= 100000) {
            classification = 'Sedang'
        } else {
            classification = 'Mahal'
        }

        return `${roundedTotalScore} - ${classification}`
    }

    const handleProductChange = e => {
        const selectedProductName = e.target.value
        const selectedProduct = products.find(
            product => product.nama === selectedProductName,
        )
        if (selectedProduct) {
            setProductPrice(selectedProduct.harga)
        }
        setProductName(selectedProductName)
    }

    return (
        <div>
            <h1>Perhitungan Sistem AHP</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Pilih Produk:</label>
                    <select value={productName} onChange={handleProductChange}>
                        <option value="">Pilih Produk</option>
                        {products.map((product, index) => (
                            <option key={index} value={product.nama}>
                                {product.nama}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Harga Produk:</label>
                    <input
                        type="text"
                        value={productPrice}
                        onChange={e => setProductPrice(e.target.value)}
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
                    Hitung
                </button>
            </form>
            {result && (
                <div>
                    Hasil Perhitungan AHP:{' '}
                    {(parseFloat(result) / 100000).toFixed(2)}
                </div>
            )}
        </div>
    )
}

export default Ahp
