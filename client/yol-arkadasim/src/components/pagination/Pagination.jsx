import React from 'react'
import { Button } from 'react-bootstrap'
import styles from "./pagination.module.css"

const Pagination = () => {
  return (
    <div className={styles.container}>
        <Button variant='primary'>GERİ</Button>
        <Button variant='primary'>İLERİ</Button>
    </div>
  )
}

export default Pagination