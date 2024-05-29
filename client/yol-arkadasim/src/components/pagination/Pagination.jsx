import React from 'react';
import { Button } from 'react-bootstrap';
import styles from "./pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const goToNextPage = () => {
    onPageChange('next');
  };

  const goToPreviousPage = () => {
    onPageChange('prev');
  };

  return (
    <div className={styles.container}>
      <Button 
        variant='primary' 
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        GERİ
      </Button>
      <Button 
        variant='primary' 
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        İLERİ
      </Button>
    </div>
  );
}

export default Pagination;
