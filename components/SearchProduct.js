import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/SearchProduct.module.css'

const SearchBar = ({ products }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Handle search query
  useEffect(() => {
    if (router.query.q) {
      setSearchTerm(router.query.q);
    } else {
      setSearchTerm('');
    }
  }, [router.query.q]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/products?q=${searchTerm}`);
    } else {
      router.push('/products');
    }
  };

  return (
    <div className={styles.search_container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/products');
    const products = await res.json();
  
    return {
      props: {
        products,
      },
    };
  }