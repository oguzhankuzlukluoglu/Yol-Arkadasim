"use client"
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

const TimePicker = () => {
    const [startTime,setStartTime] = useState(new Date());
  return (
    <div>
        <ReactDatePicker
            selected={startTime}
            onChange={date => setStartTime(date)}
            showTimeInput
            dateFormat="HH:mm"
            timeInputLabel="Time:"
            customInput={<input />}/>
    </div>
  )
}

export default TimePicker