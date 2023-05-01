import { Layout } from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Checkout.module.css'
import { getCart } from '@/utils/storageNext';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    payment: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  }

  useEffect(() => {
    const cartI = getCart();
    setCartItems(cartI);
    const total = cartI.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
    setTotalPrice(total);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className='container'>
          <div className={styles.cart_out}>
            <div className={styles.form_container}>
              <h2>Checkout</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.form_group}>
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="address">Address</label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
                </div>
                <div className={styles.form_group}>
                  <label htmlFor="payment">Payment Method</label>
                  <select id="payment" name="payment" value={formData.payment} onChange={handleInputChange} required>
                    <option value="">Select Payment Method</option>
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>
                <button type="submit">Place Order</button>
              </form>
            </div>
            <div className={styles.order_summary}>
              <h2>Order Summary</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">Total</td>
                      <td>${totalPrice.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;