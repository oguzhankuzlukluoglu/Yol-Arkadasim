"use client";
import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datePicker.module.css";

const DatePicker = ({ width, value, onChange }) => {
  const [startDate, setStartDate] = useState(value || "");

  useEffect(() => {
    setStartDate(value);
  }, [value]);

  const handleChange = (date) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div className={width === "advert" ? styles.timeAdvert : styles.timeContainer}>
      <ReactDatePicker
        className={styles.container}
        selected={startDate}
        onChange={handleChange}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export default DatePicker;
