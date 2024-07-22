import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function BillingDetails() {
  const [billingInfo, setBillingInfo] = useState({ address: '', phone: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.warning('You need to login first.');
        navigate('/login');
        return;
      }

      await axios.post('http://localhost:5000/api/checkout', { ...billingInfo }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Order confirmed!');
      navigate('/order-confirmation');
    } catch (error) {
      toast.error('Error submitting order.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <ToastContainer />
      <h1>Billing Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={billingInfo.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="tel" name="phone" value={billingInfo.phone} onChange={handleChange} required />
        </div>
        <button type="submit">Confirm Order</button>
      </form>
    </div>
  );
}

export default BillingDetails;
