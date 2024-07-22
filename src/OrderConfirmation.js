import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderConfirmation() {
  return (
    <div>
      <ToastContainer />
      <h1>Order Confirmation</h1>
      <p>Your order has been placed successfully. Thank you for shopping with us!</p>
    </div>
  );
}

export default OrderConfirmation;
