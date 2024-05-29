import React from 'react';
import { Button } from 'react-bootstrap';
import styles from "./pagination.module.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.container}>
      <Button 
        variant='primary' 
        onClick={() => onPageChange('prev')}
        disabled={currentPage === 1}
      >
        GERİ
      </Button>
      <Button 
        variant='primary' 
        onClick={() => onPageChange('next')}
        disabled={currentPage === totalPages}
      >
        İLERİ
      </Button>
    </div>
  );
}

export default Pagination;
