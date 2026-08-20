import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function AppNavbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar expand="lg" sticky="top" variant="dark" className="navbar-custom">
      <Container fluid className="px-4">
        {/* Logo + Brand */}
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          SUPER EMAS
        </Navbar.Brand>

        {/* Theme Toggle & Hamburger Container */}
        <div className="navbar-controls">
          {/* Theme Toggle Button */}
          <button 
            className="theme-toggle-navbar" 
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FaSun className="theme-icon-navbar" />
            ) : (
              <FaMoon className="theme-icon-navbar" />
            )}
          </button>

          {/* Hamburger Toggler */}
          <Navbar.Toggle aria-controls="main-navbar-nav" />
        </div>

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link">
              Beranda
            </Nav.Link>
            <Nav.Link href="#prices" className="nav-link">
              Harga Emas
            </Nav.Link>
            <Nav.Link href="#about" className="nav-link">
              Tentang
            </Nav.Link>
            <Nav.Link href="#location" className="nav-link">
              Lokasi
            </Nav.Link>
            <Nav.Link href="#guide" className="nav-link">
              Panduan
            </Nav.Link>
            <Nav.Link href="#contact" className="nav-link">
              Kontak
            </Nav.Link>
            <Nav.Link
              href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link-cta"
            >
              Jual Sekarang
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
