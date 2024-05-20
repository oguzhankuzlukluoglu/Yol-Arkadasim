"use client"
import React from 'react'
import { Cursor, useTypewriter } from 'react-simple-typewriter'
import styles from "./writer.module.css"

const Writer = () => {
    const [text] = useTypewriter({
        words: ['KOLAY','HIZLI','PRATİK'],
        loop:{},
        typeSpeed:100,
        deleteSpeed:70
      })
  return (
    <div className={styles.container}>
        ÇOK
        <span className={styles.text}>{text}</span>
        <Cursor style={{margin:'0px'}} cursorStyle='|'/>
    </div>
  )
}

export default Writer