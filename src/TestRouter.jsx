// src/TestRouter.jsx
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";

function LayoutTest() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <nav style={{ width: 200, background: "#333", color: "#fff" }}>
        <LinkContainer to="/home">
          <Nav.Link style={{ color: "#fff" }}>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/foo">
          <Nav.Link style={{ color: "#fff" }}>Foo</Nav.Link>
        </LinkContainer>
      </nav>
      <div style={{ flex: 1, padding: "1rem" }}>
        <Routes>
          <Route path="/home" element={<div>Home Page</div>} />
          <Route path="/foo" element={<div>Foo Page</div>} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default function TestRouter() {
  return (
    <BrowserRouter>
      <LayoutTest />
    </BrowserRouter>
  );
}
