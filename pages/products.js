import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ProductList from '@/components/ProductList';
import { Layout } from '@/components/Layout';
import styles from '@/styles/Products.module.css'
import PaginaProducts from '@/components/PaginaProducts';

const Products = ({ products }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.q || '');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(6);

  // Handle search query
  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q);
    }
  }, [router.query.q]);
  console.log(searchTerm)
  // Filter products by search term
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Handle pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // console.log(currentPage)
  return (
    <Layout>
      <div className={styles.product_container}>
        <div className='container'>
          <div className={styles.product}>
            <h1>Products</h1>
            {/* <form
              onSubmit={(e) => {
                e.preventDefault();
                router.push(`/products?q=${searchTerm}`);
              }}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
              />
              <button type="submit">Search</button>
            </form> */}
            <ProductList products={currentProducts} />
           
            <PaginaProducts
             productsPerPage={productsPerPage}
             totalProducts={filteredProducts.length}
              currentPage={currentPage}
              paginate={paginate}
             />
           
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;

export async function getStaticProps() {
  const res = await axios.get(`${process.env.API_URL}/api/products`);
  const products = await res.data;

  return {
    props: {
      products,
    },
  };
}