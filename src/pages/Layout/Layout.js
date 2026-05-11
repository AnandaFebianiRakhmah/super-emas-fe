// src/pages/Layout/Layout.js
import React, { useState } from "react";
import { Nav, Collapse } from "react-bootstrap";
import { Link } from "react-router-dom"; // ← Import Link instead of LinkContainer
import { useAuth } from "../../context/AuthContext";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const { logout } = useAuth();
  const [txnOpen, setTxnOpen] = useState(false);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ─── Sidebar ───────────────────────────────────────────────────── */}
      <nav
        style={{
          width: 250,
          backgroundColor: "#0d0d0d",
          color: "#f0c000",
          paddingTop: 20,
        }}
      >
        <h4 className="px-3 mb-4" style={{ color: "#f0c000" }}>
          Super Emas
        </h4>

        <Nav className="flex-column px-2">
          {/* Dashboard */}
          <Nav.Link as={Link} to="/dashboard" style={{ color: "#f0c000" }}>
            Dashboard
          </Nav.Link>

          {/* Data Customer */}
          <Nav.Link as={Link} to="/customers" style={{ color: "#f0c000" }}>
            Data Customer
          </Nav.Link>

          {/* Transaksi (collapsible) */}
          <Nav.Link
            onClick={() => setTxnOpen(!txnOpen)}
            aria-controls="txn-collapse"
            aria-expanded={txnOpen}
            style={{
              color: "#f0c000",
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Transaksi{" "}
            <span style={{ fontSize: "0.8rem" }}>{txnOpen ? "▾" : "▸"}</span>
          </Nav.Link>
          <Collapse in={txnOpen}>
            <div id="txn-collapse" className="ms-3">
              <Nav className="flex-column">
                <Nav.Link
                  as={Link}
                  to="/transactions/init"
                  style={{ color: "#f0c000" }}
                >
                  • Initialization
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/transactions/approval"
                  style={{ color: "#f0c000" }}
                >
                  • Approval
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/transactions/transfer"
                  style={{ color: "#f0c000" }}
                >
                  • Transfer
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/transactions/complete"
                  style={{ color: "#f0c000" }}
                >
                  • Complete
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>

          {/* Inventory */}
          <Nav.Link as={Link} to="/inventory" style={{ color: "#f0c000" }}>
            Inventory
          </Nav.Link>

          {/* Penjualan */}
          <Nav.Link as={Link} to="/sold" style={{ color: "#f0c000" }}>
            Penjualan
          </Nav.Link>

          {/* Roles */}
          <Nav.Link as={Link} to="/roles" style={{ color: "#f0c000" }}>
            Roles
          </Nav.Link>

          {/* Log Out */}
          <Nav.Link
            onClick={logout}
            style={{ color: "#f0c000", cursor: "pointer" }}
          >
            Log Out
          </Nav.Link>
        </Nav>
      </nav>

      {/* ─── Main Content Area ────────────────────────────────────────── */}
      <main
        style={{
          flexGrow: 1,
          backgroundColor: "#121212",
          padding: "1rem",
        }}
      >
        {/* Outlet renders whichever child route (Dashboard, Customers, etc.) is active */}
        <Outlet />
      </main>
    </div>
  );
}
