'use client';

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingContact() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector(".se-footer");
    if (!footer) return undefined;

    const observer = new IntersectionObserver(([entry]) => {
      setFooterVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <a
      className={`se-whatsapp-fab${footerVisible ? " is-footer-visible" : ""}`}
      href="https://api.whatsapp.com/send/?phone=%2B6285111355020&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat dengan Super Emas melalui WhatsApp"
    >
      <FaWhatsapp aria-hidden="true" />
      <span>Chat Kami</span>
    </a>
  );
}
