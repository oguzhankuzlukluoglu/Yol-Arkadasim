"use client"
import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styles from "./navbarSection.module.css"
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance, { removeToken } from '@/utils/axiosInstance';

const NavbarSection = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = async () => {

    try {
      const id = localStorage.getItem("id");
      const headers = id ? { "id": `${id}` } : {};
      const response = await axios.get("http://localhost:8080/get-all-users", { headers });
      console.log(response.data.users)
      response.data.users.map((user) => {
        user.id === id ? router.push(`/profile/${user.username}`) : null
      })
      const { username } = response.data;
    } catch (error) {
      console.error("Error fetching current user data:", error);
    }
  };
 

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { "Authorization": `Bearer ${token}` } : {}; 
      await axiosInstance.post("/logout", {}, { headers });
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      removeToken();  // Token'ı axios instance'ından kaldır

      console.log("Logout successful");
      router.push('/');  // Ana sayfaya yönlendir
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
                    style={{ minWidth: "5rem" }}
                    className={styles.navDrop}
                    title="Profil"
                  >
                     <NavDropdown.Item
                    className={styles.dropItem}
                    onClick={isLoggedIn ? handleProfileClick : () => router.push('/login')}
                  >
                    {isLoggedIn ? "Bilgilerim" : "Giriş Yap"}
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles.dropItem}
                    onClick={isLoggedIn ? handleLogout : () => router.push('/register')}
                  >  
                      {isLoggedIn ? "Çıkış Yap" : "Kayıt Ol"}
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