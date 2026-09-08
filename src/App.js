// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./legacy-pages/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop";

import LoginPage from "./legacy-pages/Login/LoginPage";
import Dashboard from "./legacy-pages/Dashboard/Dashboard";
import CustomersPage from "./legacy-pages/Customers/CustomersPage";
import InventoryPage from "./legacy-pages/Inventory/InventoryPage";
import SoldPage from "./legacy-pages/Sold/SoldPage";
import RolesPage from "./legacy-pages/Roles/RolesPage";

import InitializationPage from "./legacy-pages/Transactions/InitializationPage";
import ApprovalPage from "./legacy-pages/Transactions/ApprovalPage";
import TransferPage from "./legacy-pages/Transactions/TransferPage";
import CompletePage from "./legacy-pages/Transactions/CompletePage";

import Navbar from "./components/Navbar";
import HeroSection from "./legacy-pages/LandingPage/HeroSection";
import TableSection from "./legacy-pages/LandingPage/TableSection";
import GoldPriceByLocation from "./legacy-pages/LandingPage/GoldPriceByLocation";
import AboutSection from "./legacy-pages/LandingPage/AboutSection";
import GuideSection from "./legacy-pages/LandingPage/GuideSection";
import StoreLocation from "./legacy-pages/LandingPage/StoreLocation";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";
import ContactPage from "./legacy-pages/ContactPage/ContactPage";
import GoldPriceLocationPage from "./legacy-pages/GoldPriceLocation/GoldPriceLocationPage";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* ─── Public Landing (no sidebar) ───────────────────────────────── */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <TableSection />
              <AboutSection />
              <GuideSection />
              <GoldPriceByLocation />
              <StoreLocation />
              <Footer />
              <FloatingContact />
            </>
          }
        />

        {/* ─── Public Login ───────────────────────────────────────────────── */}
        <Route path="/login" element={<LoginPage />} />

        {/* ─── Contact Page (hidden - no navigation link) ─────────────────── */}
        <Route path="/contact" element={<ContactPage />} />

        {/* ─── Gold Price Location Pages (SEO) ────────────────────────────── */}
        <Route path="/harga-emas-hari-ini/:location" element={<GoldPriceLocationPage />} />
        <Route path="/harga-emas-:location" element={<GoldPriceLocationPage />} />

        {/* ─── Protected Routes: wrap Layout + child routes ──────────────── */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />

          <Route path="/transactions/init" element={<InitializationPage />} />
          <Route path="/transactions/approval" element={<ApprovalPage />} />
          <Route path="/transactions/transfer" element={<TransferPage />} />
          <Route path="/transactions/complete" element={<CompletePage />} />

          <Route path="/sold" element={<SoldPage />} />
          <Route path="/roles" element={<RolesPage />} />
        </Route>

        {/* ─── Catch-All: redirect unknown paths to "/" ───────────────────── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
