"use client"
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import styles from  "./datePicker.module.css"
const DatePicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <div className={styles.timeContainer}>
            <ReactDatePicker
            className={styles.container}
            showIcon
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            icon="fa fa-calendar"
            />
      </div>
    )
}

export default DatePicker