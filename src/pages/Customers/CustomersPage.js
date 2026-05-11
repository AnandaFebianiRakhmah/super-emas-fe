// src/pages/Customers/CustomersPage.js
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Form,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  fetchCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../../services/customerService";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal & form state
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form fields (including new ones)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    address: "",
    email: "",
    remarks: "",
    notes: "",
  });

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data pelanggan.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowCreate = () => {
    setEditingCustomer(null);
    setFormData({
      name: "",
      phone: "",
      city: "",
      address: "",
      email: "",
      remarks: "",
      notes: "",
    });
    setShowModal(true);
  };

  const handleShowEdit = (customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      phone: customer.phone,
      city: customer.city,
      address: customer.address,
      email: customer.email,
      remarks: customer.remarks || "",
      notes: customer.notes || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSaving(false);
    setError("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pelanggan ini?")) return;
    try {
      await deleteCustomer(id);
      loadCustomers();
    } catch (err) {
      console.error(err);
      setError("Gagal menghapus pelanggan.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      // Build the payload object exactly how the backend expects it
      const payload = {
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        address: formData.address,
        email: formData.email,
        remarks: formData.remarks,
        notes: formData.notes,
      };

      if (editingCustomer) {
        // Update by Mongo _id
        await updateCustomer(editingCustomer._id, payload);
      } else {
        // Create new (backend auto-assigns customerId)
        await createCustomer(payload);
      }

      handleCloseModal();
      loadCustomers();
    } catch (err) {
      console.error(err);
      setError("Gagal menyimpan data pelanggan.");
      setSaving(false);
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>Data Pelanggan</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowCreate}>
            + Tambah Pelanggan
          </Button>
        </Col>
      </Row>

      {error && (
        <Row>
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row>
        <Col>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>ID Pelanggan</th>                  <th>Nama</th>
                  <th>No. HP</th>
                  <th>Kota</th>
                  <th>Alamat</th>
                  <th>Email</th>
                  <th>Catatan</th>
                  <th>Keterangan</th>                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {customers.length > 0 ? (
                  customers.map((cust) => (
                    <tr key={cust._id}>
                      <td>{cust.customerId}</td>
                      <td>{cust.name}</td>
                      <td>{cust.phone}</td>
                      <td>{cust.city}</td>
                      <td>{cust.address}</td>
                      <td>{cust.email}</td>
                      <td>{cust.remarks || "-"}</td>
                      <td>{cust.notes || "-"}</td>
                      <td className="text-center">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleShowEdit(cust)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(cust._id)}
                        >
                          Hapus
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center">
                      Belum ada data pelanggan.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>

      {/* ─── Modal for Create / Edit ─────────────────────────────────── */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingCustomer ? "Edit Pelanggan" : "Tambah Pelanggan"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* If editing, show a read-only customerId */}
            {editingCustomer && (
              <Form.Group className="mb-3" controlId="formCustomerId">
                <Form.Label>ID Pelanggan</Form.Label>                <Form.Control
                  type="text"
                  readOnly
                  value={editingCustomer.customerId}
                />
              </Form.Group>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nama</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>No. HP</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label>Kota</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formRemarks">
                  <Form.Label>Catatan</Form.Label>                  <Form.Control
                    type="text"
                    value={formData.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="formNotes">
              <Form.Label>Keterangan</Form.Label>              <Form.Control
                as="textarea"
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button variant="primary" type="submit" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
