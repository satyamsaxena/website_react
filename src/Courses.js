import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CoursesList.css'; 

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(response => {
        setCourses(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="courses-list">
      <h2>Products List</h2>
      <div className="grid-container">
        {courses.map(product => (
          <div key={product.id} className="card">
            <Link to={`/product/${product.id}`}>
              <img src={product.thumbnail} alt={product.title} className="card-image" />
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Rating:</strong> {product.rating}</p>
              <p><strong>Stock:</strong> {product.availabilityStatus}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesList;