import React from 'react'
import styles from '@/styles/ProductList.module.css'
import ProductItem from './ProductItem'

const ProductList = ({ products }) => {
  return (
    <div className={styles.products}>
      {products.map((product) => (
        <ProductItem key={product._id} product={product}/>
      ))}
    </div>
  )
}

export default ProductList