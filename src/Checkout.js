import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Checkout() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: email.value,
        password: password.value,
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        toast.success('Login successful!');
        setTimeout(() => navigate('/billing-details'), 500);
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      console.error('Login error:', error); // Log error details
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <ToastContainer />
      <h1>Checkout</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Checkout;
