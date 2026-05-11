// src/utils/permissionCheck.js
import { useAuth } from "../context/AuthContext";

/**
 * Returns true/false depending on whether the current user (via AuthContext)
 * has a permission matching { module: moduleName, action: actionName, allowed: true }.
 */
export function useCanAccess(moduleName, actionName) {
  const auth = useAuth();
  const permissions = auth?.permissions || [];
  return permissions.some(
    (perm) =>
      perm.module === moduleName &&
      perm.action === actionName &&
      perm.allowed === true
  );
}
