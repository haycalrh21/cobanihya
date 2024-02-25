
'use client'

import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

const DetailPage = () => {
    const [product, setProduct] = useState(null);

    useEffect(() => {

        const pathname = window.location.pathname;
        const id = pathname.substring(pathname.lastIndexOf('/') + 1);


        const fetchProduct = async () => {
            try {
                const response = await axios.get(`api/product/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();


        return () => {
            setProduct(null);
        };
    }, []);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Nama:{product.nama}</h1>
            <p>Stok: {product.stok}</p>
            <p>Merk: {product.merk}</p>
            <p>Harga: {product.harga}</p>
            <p>Kategori: {product.kategori}</p>

        </div>
    );
};

export default DetailPage;
