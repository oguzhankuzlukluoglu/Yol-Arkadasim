"use client"
import React, { useState, useEffect } from 'react';
import ReactDatePicker from 'react-datepicker';

const TimePicker = ({ value, onChange }) => {
    const [startTime, setStartTime] = useState(value);

    useEffect(() => {
        setStartTime(value);
    }, [value]);

    const handleChange = (time) => {
        setStartTime(time);
        onChange(time);
    };

    return (
        <div>
            <ReactDatePicker
                selected={startTime}
                onChange={handleChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="HH:mm"
                customInput={<input />}
            />
        </div>
    );
};

export default TimePicker;
