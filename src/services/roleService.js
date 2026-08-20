// src/services/roleService.js
import api from "./api";

// Fetch all roles
export const fetchRoles = async () => {
  const response = await api.get("/api/admin/roles");
  return response.data;
};

// Fetch permissions for one role
export const fetchPermissions = async (role) => {
  const response = await api.get(`/api/admin/permissions?role=${role}`);
  return response.data;
};

// Save (bulk‐upsert) a list of permission objects
export const savePermissions = async (role, permissionsArray) => {
  const payload = { role, permissions: permissionsArray };
  const response = await api.post("/api/admin/permissions/bulk-update", payload);
  return response.data;
};
