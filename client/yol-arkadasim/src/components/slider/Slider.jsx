"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import {SlideImages} from "@/datas/SlideImages"
import styles from "./slide.module.css"
const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const auto = false;
    let slideInterval;
  
    const handleNext = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % SlideImages.length);
    }
  
    const handlePrevious = () => {
      setCurrentSlide((prevSlide) =>
        prevSlide === 0 ? SlideImages.length - 1 : prevSlide - 1
      );
    }
  
    if (auto) {
      slideInterval = setInterval(handleNext, intervalTime);
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.slider}>
            <div className={styles.image}>
                <Image src={`${SlideImages[currentSlide].image}`} alt="resim1" width={400} height={400}/>
            </div>
          <div className={styles.slide}>
            <h1>{SlideImages[currentSlide].title}</h1>
            <p>{SlideImages[currentSlide].description}</p>
          </div>
          <div className={styles.arrows}>
            <Image className={styles.arrowLeft} alt='left' src="/arrowleft.png" width={32} height={32}   onClick={handlePrevious}/>
            <Image className={styles.arrowRight} alt='right' src="/arrowright.png"width={32} height={32} onClick={handleNext}/>
          </div>
        </div>

    </div>
  )
}

export default Slider