'use client';

import dynamic from "next/dynamic";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../src/context/AuthContext";
import { ThemeProvider } from "../src/context/ThemeContext";

const LegacyApp = dynamic(() => import("../src/App"), { ssr: false });

export default function LegacyAppShell() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <LegacyApp />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
