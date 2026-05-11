// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./pages/Layout/Layout";

import LoginPage from "./pages/Login/LoginPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomersPage from "./pages/Customers/CustomersPage";
import InventoryPage from "./pages/Inventory/InventoryPage";
import SoldPage from "./pages/Sold/SoldPage";
import RolesPage from "./pages/Roles/RolesPage";

import InitializationPage from "./pages/Transactions/InitializationPage";
import ApprovalPage from "./pages/Transactions/ApprovalPage";
import TransferPage from "./pages/Transactions/TransferPage";
import CompletePage from "./pages/Transactions/CompletePage";

import Navbar from "./components/Navbar";
import HeroSection from "./pages/LandingPage/HeroSection";
import TableSection from "./pages/LandingPage/TableSection";
import AboutSection from "./pages/LandingPage/AboutSection";
import GuideSection from "./pages/LandingPage/GuideSection";
import StoreLocation from "./pages/LandingPage/StoreLocation";
import Footer from "./components/Footer";
import FloatingContact from "./components/FloatingContact";

export default function App() {
  return (
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
            <StoreLocation />
            <Footer />
            <FloatingContact />
          </>
        }
      />

      {/* ─── Public Login ───────────────────────────────────────────────── */}
      <Route path="/login" element={<LoginPage />} />

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

      {/* ─── Catch-All: redirect unknown paths to “/” ───────────────────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
