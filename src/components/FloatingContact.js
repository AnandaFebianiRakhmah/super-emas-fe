// src/components/FloatingContact.js
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaTiktok, FaEnvelope, FaTimes, FaComments } from "react-icons/fa";
import "./FloatingContact.css";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      url: "https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0",
      color: "#25D366"
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      url: "https://www.instagram.com/superemasid/",
      color: "#E4405F"
    },
    {
      icon: <FaTiktok />,
      label: "TikTok",
      url: "https://www.tiktok.com/@superemas_id",
      color: "#000000"
    },
    {
      icon: <FaEnvelope />,
      label: "Email",
      url: "mailto:info@superemas.co.id",
      color: "#EA4335"
    }
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="floating-contact">
      {/* Contact Menu Items */}
      <div className={`contact-menu ${isOpen ? 'open' : ''}`}>
        {contacts.map((contact, index) => (
          <a
            key={index}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
            style={{ 
              '--item-index': index,
              '--item-color': contact.color 
            }}
            onClick={() => setIsOpen(false)}
          >
            <span className="contact-icon">{contact.icon}</span>
            <span className="contact-label">{contact.label}</span>
          </a>
        ))}
      </div>

      {/* Badge Label */}
      {!isOpen && (
        <div className="floating-badge">
          Hubungi Kami
        </div>
      )}

      {/* Main Toggle Button */}
      <button 
        className={`floating-button ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Contact Menu"
      >
        {isOpen ? <FaTimes /> : <FaComments />}
      </button>

      {/* Backdrop */}
      {isOpen && <div className="floating-backdrop" onClick={toggleMenu}></div>}
    </div>
  );
}
