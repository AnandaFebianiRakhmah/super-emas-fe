// src/pages/Roles/RolesPage.js
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  fetchRoles,
  fetchPermissions,
  savePermissions,
} from "../../services/roleService";
import "./RolesPage.css";

export default function RolesPage() {
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [permissions, setPermissions] = useState([]); // array of { module, action, allowed }
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [loadingPerms, setLoadingPerms] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Define the modules and actions your system supports
  // src/pages/Roles/RolesPage.js
  const modules = [
    "price",
    "customer",
    "transaction", // ← Add this line
    "inventory",
    "sold",
    "role",
  ];
  const actions = ["view", "create", "edit", "delete", "approve"];

  // On mount, fetch all roles
  useEffect(() => {
    async function loadRoles() {
      try {
        const data = await fetchRoles();
        setRoles(data);
      } catch (err) {
        console.error("Failed to load roles:", err);
        setError("Gagal memuat daftar peran (roles).");
      } finally {
        setLoadingRoles(false);
      }
    }
    loadRoles();
  }, []);

  // Whenever a role is selected, fetch that role’s permissions
  useEffect(() => {
    if (!selectedRoleId) {
      setPermissions([]);
      return;
    }
    setLoadingPerms(true);
    async function loadPerms() {
      try {
        const data = await fetchPermissions(selectedRoleId);
        // Normalize so that we have a flat array of { module, action, allowed }
        // If any module/action is missing, default allowed = false
        const permsMap = {};
        data.forEach((p) => {
          permsMap[`${p.module}|${p.action}`] = p.allowed;
        });
        const normalized = [];
        modules.forEach((m) => {
          actions.forEach((a) => {
            const key = `${m}|${a}`;
            normalized.push({
              module: m,
              action: a,
              allowed: !!permsMap[key],
            });
          });
        });
        setPermissions(normalized);
      } catch (err) {
        console.error("Failed to load permissions:", err);
        setError("Gagal memuat izin (permissions) untuk peran ini.");
      } finally {
        setLoadingPerms(false);
      }
    }
    loadPerms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoleId]);

  // Handle checkbox toggle
  const togglePermission = (moduleName, actionName) => {
    setPermissions((prev) =>
      prev.map((p) =>
        p.module === moduleName && p.action === actionName
          ? { ...p, allowed: !p.allowed }
          : p
      )
    );
  };

  // Save changes
  const handleSave = async () => {
    if (!selectedRoleId) return;
    setSaving(true);
    setError("");
    setSuccessMsg("");
    try {
      // Prepare payload: only module/action/allowed
      const payload = permissions.map(({ module, action, allowed }) => ({
        module,
        action,
        allowed,
      }));
      await savePermissions(selectedRoleId, payload);
      setSuccessMsg("Perubahan izin berhasil disimpan.");
    } catch (err) {
      console.error("Failed to save permissions:", err);
      setError("Gagal menyimpan perubahan izin. Coba lagi.");
    } finally {
      setSaving(false);
    }
    // Auto‐clear success message after 3s
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  console.log("API base URL:", process.env.REACT_APP_API_BASE_URL);

  return (
    <Container className="roles-container">
      <Row>
        <Col>
          <h2>Manajemen Peran & Izin</h2>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="my-3 align-items-center">
        <Col md={4}>
          <Form.Group controlId="roleSelect">
            <Form.Label>Pilih Peran (Role):</Form.Label>
            {loadingRoles ? (
              <Spinner animation="border" variant="warning" />
            ) : (
              <Form.Select
                value={selectedRoleId}
                onChange={(e) => setSelectedRoleId(e.target.value)}
              >
                <option value="">-- Pilih peran --</option>
                {roles.map((r) => (
                  <option key={r._id} value={r._id}>
                    {r.name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>
        </Col>
        <Col md={8} className="text-end">
          <Button
            variant="success"
            onClick={handleSave}
            disabled={!selectedRoleId || saving || loadingPerms}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </Col>
      </Row>

      {loadingPerms ? (
        <Spinner animation="border" variant="warning" />
      ) : selectedRoleId ? (
        <Row>
          <Col>
            <Table
              bordered
              hover
              responsive
              className="table-custom roles-table"
            >
              <thead>
                <tr>
                  <th>Modul ↓ / Aksi →</th>
                  {actions.map((a) => (
                    <th key={a} className="text-center text-capitalize">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((m) => (
                  <tr key={m}>
                    <td className="module-cell text-capitalize">{m}</td>
                    {actions.map((a) => {
                      const perm = permissions.find(
                        (p) => p.module === m && p.action === a
                      );
                      return (
                        <td key={`${m}|${a}`} className="text-center">
                          <Form.Check
                            type="checkbox"
                            checked={perm?.allowed || false}
                            onChange={() => togglePermission(m, a)}
                          />
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <p>
              Silakan pilih peran terlebih dahulu untuk melihat/mengedit izin.
            </p>
          </Col>
        </Row>
      )}

      {successMsg && (
        <Row>
          <Col>
            <Alert variant="success">{successMsg}</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
}
