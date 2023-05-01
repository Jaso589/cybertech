import { Layout } from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Cart.module.css'
import Link from 'next/link';
import { getCart, removeCartItem } from '@/utils/storageNext';
import Image from 'next/image';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const deleteProduct = (productId) =>{
    removeCartItem(productId)
    setCartItems(cartItems.filter(item => item._id !== productId))
  }

  const updateProductQuantity = (productId, newQuantity) =>{
    updateCartItem(productId, newQuantity)
    setCartItems(cartItems.map(item => {
      if (item._id === productId) {
        item.quantity = newQuantity;
      }
      return item;
    }));
  }

  useEffect(() => {
    const cartI = getCart();
    setCartItems(cartI);
  }, []);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  return (
    <Layout>
      <div className={styles.cart_container}>
        <div className='container'>
          <div className={styles.table_container}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th className={styles.category}>Category Name</th>
                  <th>Image</th>
                  <th>Cantidad</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td className={styles.category}>{item.categoryName}</td>
                    <td className={styles.table_img}>
                      <Image
                        src={item.imageURL} 
                        alt={item._id}
                        fill
                      />
                    </td>
                    <td>
                      {item.quantity}
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.btn_table} onClick={() => deleteProduct(item._id)}>Eliminar</button>
                     
                        <button className={styles.btn_table}><Link href={`/products/${item._id}`}>Ver</Link></button>
                      </div>
                    </td>
                  </tr>
                  
                ))}
                <tr>
                  <td colSpan="4">Total a pagar: {totalPrice.toFixed(2)}</td>
                  <td>{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}</td>
                  <td>
                    <Link href="/checkout">
                    <button className={styles.checkoutButton}>Continuar con la compra</button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}


export default Cart