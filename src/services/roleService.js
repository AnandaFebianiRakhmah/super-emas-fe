// src/services/roleService.js
import api from "./api";

// Fetch all roles
export const fetchRoles = async () => {
  const response = await api.get("/api/admin/roles");
  return response.data; // expect an array of { _id, name }
};

// Fetch permissions for one role
export const fetchPermissions = async (role) => {
  const response = await api.get(`/api/admin/permissions?role=${role}`);
  return response.data;
  /* expect an array like:
     [
       { _id, module: "customer", action: "view", allowed: true },
       { _id, module: "customer", action: "edit", allowed: false },
       …
     ]
  */
};

// Save (bulk‐upsert) a list of permission objects
export const savePermissions = async (role, permissionsArray) => {
  // permissionsArray: [{ module, action, allowed }, …]
  // Backend should infer roleId from query or body. We'll pass roleId explicitly:
  const payload = { role, permissions: permissionsArray };
  const response = await api.post("/api/admin/permissions/bulk-update", payload);
  return response.data; // whatever the API returns on success
};
