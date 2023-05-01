import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/ProductList.module.css'

const ProductItem = ({ product }) => {
  const { _id, name, categoryName, price, imageURL } = product;

  return (
    <div className={styles.product_item}>
      <div className={styles.img_item}>
        <Image
        src={imageURL}
        fill
        alt={name}
        />
      </div>
      <div className={styles.data_text}>
        <h3>{name}</h3>
        <p>{categoryName}</p>
        <p>S/.{price}</p>
      </div>
      <Link href={`/products/${_id}`}  className={styles.btn_ver}>
        Ver más
      </Link>
    </div>
  );
};

export default ProductItem;