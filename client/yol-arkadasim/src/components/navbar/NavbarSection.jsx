"use client"
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./navbarSection.module.css"
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';

const NavbarSection = () => {

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { "Authorization": `Bearer ${token}` } : {}; 
      await axios.post("http://localhost:8080/logout", {}, { headers });
      localStorage.removeItem("token");

      console.log("Logout successful");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={styles.container}>
        <Navbar sticky='top' expand="xl">
          <Container fluid>
            <Navbar.Brand href='/' className={styles.logoSection}>
              <Image className={styles.navLogo} alt='navlogo' src="/navLogo.png" width={200} height={100}/>
              <span>Yol Arkadaşım</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`} />
            <Navbar.Offcanvas
              aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  Yol Arkadaşım
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav navbarScroll className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">Ana Sayfa</Nav.Link>
                  <Nav.Link href="/advert">İlanlar</Nav.Link>
                  <Nav.Link href="/about">Hakkımızda</Nav.Link>
                  <NavDropdown
                    style={{minWidth:"5rem"}}
                    className={styles.navDrop}
                    title="Profil"
                  >
                    <NavDropdown.Item className={styles.dropItem} href="/profile">Bilgilerim</NavDropdown.Item>
                    <NavDropdown.Item className={styles.dropItem} href="/">
                      <Link onClick={handleLogout} href="">Çıkış Yap</Link>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </div>
  );
}

export default NavbarSection;