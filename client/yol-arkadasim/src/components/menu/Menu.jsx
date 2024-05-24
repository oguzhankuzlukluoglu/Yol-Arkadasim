"use client"
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import UpdateInterest from '../updateInterest/UpdateInterest'
import styles from "./menu.module.css"
import Image from 'next/image'

const Menu = ({type}) => {
  return (
    <div className={styles.container}>
    {type === "interest" && (

    <Dropdown className={styles.interest}>
      <Dropdown.Toggle id="dropdown-basic">
        Düzenle
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
            <UpdateInterest/>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
            <Image style={{marginRight:"4px"}} alt='delete' src="/delete.png" width={24} height={24}/> 
            Sil
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )}
    { type === "comment" &&
    (
        <Dropdown className={styles.comment}>
        <Dropdown.Toggle id="dropdown-basic">
          Düzenle
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
              <Image style={{marginRight:"4px"}} alt='edit' src="/plus.png" width={24} height={24}/> 
              Ekle
          </Dropdown.Item>  
          <Dropdown.Item href="#/action-1">
              <Image style={{marginRight:"4px"}} alt='edit' src="/edit.png" width={24} height={24}/> 
              Düzenle
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
              <Image style={{marginRight:"4px"}} alt='delete' src="/delete.png" width={24} height={24}/> 
              Sil
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> 
    )}
    {type === "advert" && (
        <Dropdown className={styles.advert}>
        <Dropdown.Toggle id="dropdown-basic"></Dropdown.Toggle>
        <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">
              <Image style={{marginRight:"4px"}} alt='edit' src="/crossarrow.png" width={24} height={24}/> 
                Git
          </Dropdown.Item>
          <Dropdown.Item href="#/action-1">
              <Image style={{marginRight:"4px"}} alt='edit' src="/edit.png" width={24} height={24}/> 
              Düzenle
          </Dropdown.Item>
          <Dropdown.Item href="#/action-2">
              <Image style={{marginRight:"4px"}} alt='delete' src="/delete.png" width={24} height={24}/> 
              Sil
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )}

    </div>
  )
}

export default Menu