import React from 'react'
import { Button } from 'react-bootstrap'
import styles from "./pagination.module.css"

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.container}>
        <Button variant='primary' disabled={currentPage === 1} onClick={() => onPageChange("prev")}>GERİ</Button>
        <Button variant='primary' disabled={currentPage === totalPages} onClick={() => onPageChange("next")}>İLERİ</Button>
    </div>
  )
}

export default Pagination