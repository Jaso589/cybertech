import { Layout } from '@/components/Layout';
import Product from '@/models/Product';
import React, { useEffect, useState } from 'react'
import styles from '@/styles/ProductPage.module.css'
import Image from 'next/image';
import { addToCart, getCart } from '@/utils/storageNext';

const ProductPage = ({ product: initialProduct }) => {
  const [product, setProduct] = useState(initialProduct);
  const [quantity, setQuantity] = useState(1);

  const handleChange = event => setQuantity(event.target.value);

  const addCart = () => addToCart({ ...product, quantity: parseInt(quantity) });

  useEffect(() => {
    const carrito = getCart();
    console.log(carrito);
  }, []);

  const renderProduct = () => (
    <Layout>
      <div className={styles.product_container}>
        <div className='container'>
          <div className={styles.product_div}>
            <div className={styles.img}>
              <Image src={product.imageURL} alt={product.name} fill />
            </div>
            <div className={styles.data_text}>
              <h2>{product.name}</h2>
              <p className={styles.stock}>stock: {product.stock}</p>
              <p className={styles.desc}>{product.description}</p>
              <p className={styles.price}>S/.{product.price}</p>
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={handleChange}
              />
              {product.stock > 0 && (
                <button onClick={addCart}>Añadir al carrito</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );

  return renderProduct();
};

export default ProductPage;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}