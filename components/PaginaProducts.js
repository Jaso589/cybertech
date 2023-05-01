import React from 'react'
import styles from '@/styles/Pagination.module.css';


const PaginaProducts = ({ currentPage, totalProducts, productsPerPage, paginate }) => {
    const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) {
      return;
    }

    paginate(newPage);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? styles.active : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }

    return pageNumbers;
  };
  return (
    <div className={styles.container}>
      <ul className={styles.pagination}>
        {currentPage > 1 && (
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)}>Anterior</button>
          </li>
        )}

        {renderPageNumbers()}

        {currentPage < totalPages && (
          <li>
            <button onClick={() => handlePageChange(currentPage + 1)}>Siguiente</button>
          </li>
        )}
      </ul>
    </div>
  );
};


export default PaginaProducts