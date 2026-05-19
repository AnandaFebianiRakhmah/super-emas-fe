// src/context/AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
const API_BASE_URL = "https://super-emas-be.onrender.com";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // On mount, try to "rehydrate" from a cookie via GET /auth/me
  useEffect(() => {
    async function fetchMe() {
      try {
        // Cek apakah kita di halaman yang memerlukan auth
        const isAuthRequired = window.location.pathname.startsWith('/dashboard') || 
                               window.location.pathname.startsWith('/login') ||
                               window.location.pathname.startsWith('/inventory') ||
                               window.location.pathname.startsWith('/customers') ||
                               window.location.pathname.startsWith('/transactions');
        
        // Hanya fetch /auth/me jika di halaman yang memerlukan auth
        if (!isAuthRequired) {
          setLoadingAuth(false);
          return;
        }

        const response = await axios.get(
          `${API_BASE_URL}/api/auth/me`,
          { withCredentials: true }
        );
        const { user: me, permissions: perms = [] } = response.data;
        setUser(me);
        setPermissions(perms);
      } catch {
        setUser(null);
        setPermissions([]);
      } finally {
        setLoadingAuth(false);
      }
    }
    fetchMe();
  }, []);

  // login only sets state (no navigation here)
  const login = async ({ username, password }) => {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/login`,
      { username, password },
      { withCredentials: true }
    );
    const { user: loggedInUser, permissions: perms = [] } = response.data;
    setUser(loggedInUser);
    setPermissions(perms);
    return loggedInUser;
  };

  // logout clears state (no navigation here)
  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setUser(null);
      setPermissions([]);
    }
  };

  // While we're fetching /auth/me, don't render any children:
  if (loadingAuth) {
    return null; // or <Spinner /> if you like
  }

  return (
    <AuthContext.Provider value={{ user, permissions, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
