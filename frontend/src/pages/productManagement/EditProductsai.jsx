
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import { useState } from "react";
import { productInputs } from "../../data/dataFormProductMngt";


import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';


import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import "../../css/mngtForm.css";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useNavigate, useParams } from 'react-router-dom';
//import { productInputs } from "../../data/dataFormProductMngt";
//{ title }
const EditProduct = () => {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [product, setProduct] = useState({
        name: '',
        url_image_product: '',
        price: '',
        description: '',
        category_id: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchData();
    }, [productId]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://foodapp.k8s.com/api/product/${productId}`);
            const response2 = await axios.get('http://foodapp.k8s.com/api/category/');
            setCategories(response2.data);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product data:', error);
            setError('Error fetching product data. Please try again later.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleSubmitAddProduct = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://foodapp.k8s.com/api/product/${productId}`, product);
            if (response.status === 200) {
                setMessage('Product updated successfully.');
                setTimeout(() => {
                    navigate('/productManagement');
                }, 1500);
            } else {
                setError('Failed to update product.');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            setError('Error updating product. Please try again later.');
        }
    };
    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />

                <div className="bottom">
                    <div className="column2">
                        <div className="column">
                            <div className="title top">
                                <h1>Thêm Món ăn</h1>
                            </div>
                            <form onSubmit={handleSubmitAddProduct}>
                                <div className="formInput">
                                    <label>Tên món ăn:</label>
                                    <input type="text" name="name" value={product.name} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Đường dẫn hình ảnh món ăn:</label>
                                    <input type="text" name="url_image_product" value={product.url_image_product} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Giá:</label>
                                    <input type="text" name="price" value={product.price} onChange={handleChange} />
                                </div>
                                <div className="formInput">
                                    <label>Danh mục:</label>
                                    <select name="category_id" value={product.category_id} onChange={handleChange}>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="formInput">
                                    <label>Mô tả:</label>
                                    <textarea name="description" value={product.description} onChange={handleChange} />
                                </div>
                                <button type="submit">Tạo Món Ăn</button>
                            </form>
                            {message && <div className="success-message">{message}</div>}
                            {error && <div className="error-message">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
