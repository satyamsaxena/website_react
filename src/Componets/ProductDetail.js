import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="product-detail">
      <img src={product.thumbnail} alt={product.title} className="product-image" />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Rating:</strong> {product.rating}</p>
      <p><strong>Stock:</strong> {product.availabilityStatus}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>SKU:</strong> {product.sku}</p>
      <p><strong>Weight:</strong> {product.weight}g</p>
      <p><strong>Dimensions:</strong> {product.dimensions.width}x{product.dimensions.height}x{product.dimensions.depth} cm</p>
      <p><strong>Warranty Information:</strong> {product.warrantyInformation}</p>
      <p><strong>Shipping Information:</strong> {product.shippingInformation}</p>
      <p><strong>Return Policy:</strong> {product.returnPolicy}</p>
      <p><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity}</p>
      <h3>Reviews</h3>
      <ul>
        {product.reviews.map((review, index) => (
          <li key={index}>
            <p><strong>{review.reviewerName}:</strong> {review.comment} (Rating: {review.rating})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetail;