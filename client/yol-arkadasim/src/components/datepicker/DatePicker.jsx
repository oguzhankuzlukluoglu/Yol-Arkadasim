"use client"
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import styles from  "./datePicker.module.css"
const DatePicker = ({width}) => {
    const [startDate, setStartDate] = useState(new Date());
    
    return (
        <div className={`${width === "advert"} ? ${styles.timeAdvert} : ${styles.timeContainer}`}>
            <ReactDatePicker
            className={styles.container}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            />
      </div>
    )
}

export default DatePicker