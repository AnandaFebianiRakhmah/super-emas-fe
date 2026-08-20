// src/pages/Transactions/InitializationPage.js

import React, { useState, useEffect, useRef, Fragment } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Spinner,
  Card,
  Image,
} from "react-bootstrap";
import { Navigate } from "react-router-dom";

import {
  fetchInitializationTransactions,
  createInitializationTransaction,
  updateInitializationTransaction,
  deleteInitializationTransaction,
} from "../../services/transactionService";
import { fetchCustomers } from "../../services/customerService";
import { useAuth } from "../../context/AuthContext";

import "./InitializationPage.css";

export default function InitializationPage() {
  // 1) Grab permissions from AuthContext:
  const { permissions } = useAuth();
  console.log("🔑 InitializationPage permissions:", permissions);

  // 2) State for customers & transactions:
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);

  // 3) Autocomplete "Cari Pelanggan":
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  // 4) Expandable row in the table:
  const [expandedRowId, setExpandedRowId] = useState("");

  // 5) Form fields for create/edit:
  const [weightGram, setWeightGram] = useState("");
  const [weightGramFiles, setWeightGramFiles] = useState([]);
  const [goldContent, setGoldContent] = useState("");
  const [goldContentFiles, setGoldContentFiles] = useState([]);
  const [proformaFiles, setProformaFiles] = useState([]);
  const [remarks, setRemarks] = useState("");

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // 6) If we are in "edit mode," store that transaction's ID:
  const [editingTxnId, setEditingTxnId] = useState("");

  // 7) Refs to handle closing the autocomplete dropdown:
  const searchInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // 8) On mount, load customers & initialization‐only transactions:
  useEffect(() => {
    async function loadCustomers() {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        console.error("Error fetching customers:", err);
      }
    }

    async function loadInitTransactions() {
      try {
        setLoadingTransactions(true);
        const data = await fetchInitializationTransactions();
        setTransactions(data);
      } catch (err) {
        console.error("Error fetching initialization transactions:", err);
      } finally {
        setLoadingTransactions(false);
      }
    }

    loadCustomers();
    loadInitTransactions();
  }, []);

  // 9) "Live filter" the customer list as the user types:
  useEffect(() => {
    if (!customerSearchTerm.trim()) {
      setFilteredCustomers([]);
      return;
    }
    const term = customerSearchTerm.toLowerCase();
    const filtered = customers.filter((c) => {
      const idMatch =
        c.customerId !== undefined &&
        String(c.customerId).toLowerCase().includes(term);
      const nameMatch = c.name && c.name.toLowerCase().includes(term);
      return idMatch || nameMatch;
    });
    setFilteredCustomers(filtered);
  }, [customerSearchTerm, customers]);

  // 10) Close that dropdown if we click outside of it:
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 11) Simple file‐size/type validator (≤1 MB, jpg/jpeg/png only)
  const validateFileList = (fileList) => {
    const maxBytes = 1 * 1024 * 1024; // 1 MB
    for (let i = 0; i < fileList.length; i += 1) {
      const f = fileList[i];
      if (!["image/jpeg", "image/jpg", "image/png"].includes(f.type)) {
        return `File "${f.name}" memiliki tipe tidak valid (${f.type}). Hanya JPG/JPEG/PNG yang diperbolehkan.`;
      }
      if (f.size > maxBytes) {
        return `File "${f.name}" is too large (${(
          f.size /
          (1024 * 1024)
        ).toFixed(2)} MB). Maximum is 1 MB.`;
      }
    }
    return "";
  };

  const handleFileChange = (e, setter) => {
    const files = Array.from(e.target.files);
    const err = validateFileList(files);
    if (err) {
      setFormError(err);
      e.target.value = null; // reset the file input
      setter([]);
    } else {
      setFormError("");
      setter(files);
    }
  };

  // 12) Handle "Submit" (either create or update):
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");

    // If we're not already editing, check "transaction:create":
    if (!editingTxnId && !permissions.includes("transaction:create")) {
      setFormError("Anda tidak memiliki izin untuk membuat inisialisasi.");
      return;
    }
    // If we are editing, check "transaction:edit":
    if (editingTxnId && !permissions.includes("transaction:edit")) {
      setFormError("Anda tidak memiliki izin untuk mengubah inisialisasi.");
      return;
    }

    // Basic field validation:
    if (!selectedCustomerId) {
      setFormError("Pilih pelanggan dari dropdown.");
      return;
    }
    if (!weightGram || isNaN(weightGram)) {
      setFormError("Berat (gram) harus diisi dengan angka.");
      return;
    }
    if (!goldContent || isNaN(goldContent)) {
      setFormError("Kandungan Emas (%) harus diisi dengan angka.");
      return;
    }

    // Build up a FormData payload containing the numeric fields + file uploads:
    const formData = new FormData();
    formData.append("customerId", selectedCustomerId);
    formData.append("weightGram", parseFloat(weightGram));
    formData.append("goldContent", parseFloat(goldContent));
    formData.append("remarks", remarks || "");

    weightGramFiles.forEach((file) => {
      formData.append("weightGramPhotos", file);
    });
    goldContentFiles.forEach((file) => {
      formData.append("goldContentPhotos", file);
    });
    proformaFiles.forEach((file) => {
      formData.append("proformaPhotos", file);
    });

    try {
      setFormLoading(true);

      if (editingTxnId) {
        // EDIT existing "initialization" record
        await updateInitializationTransaction(editingTxnId, formData);
        setFormSuccess("Inisialisasi berhasil diperbarui.");
      } else {
        // CREATE brand‐new "initialization" record
        await createInitializationTransaction(formData);
        setFormSuccess("Inisialisasi berhasil dibuat.");
      }

      // Clear all form fields and exit "edit mode":
      setSelectedCustomerId("");
      setCustomerSearchTerm("");
      setWeightGram("");
      setWeightGramFiles([]);
      setGoldContent("");
      setGoldContentFiles([]);
      setProformaFiles([]);
      setRemarks("");
      setEditingTxnId("");

      // Reload the table:
      const updatedList = await fetchInitializationTransactions();
      setTransactions(updatedList);
    } catch (err) {
      console.error("Form submit error:", err);
      setFormError(
        err.response?.data?.message || "Gagal menyimpan data inisialisasi."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // 13) "Start editing" → prefill the form fields:
  const startEditing = (txn) => {
    setEditingTxnId(txn._id);
    setSelectedCustomerId(txn.customerId._id);
    setCustomerSearchTerm(
      `${txn.customerId.customerId} | ${txn.customerId.name}`
    );
    setWeightGram(txn.weightGram);
    setGoldContent(txn.goldContent);
    setRemarks(txn.remarks || "");
    // Clear out any previously‐selected File objects (user can re‐upload if they want):
    setWeightGramFiles([]);
    setGoldContentFiles([]);
    setProformaFiles([]);
    setFormError("");
    setFormSuccess("");
  };

  // 14) "Delete" button → remove that record entirely:
  const handleDelete = async (id) => {
    if (!permissions.includes("transaction:delete")) {
      alert("Anda tidak memiliki izin untuk menghapus inisialisasi.");
      return;
    }
    if (!window.confirm("Yakin ingin menghapus transaksi inisialisasi ini?"))
      return;
    try {
      await deleteInitializationTransaction(id);
      const updated = await fetchInitializationTransactions();
      setTransactions(updated);
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Gagal menghapus transaksi.");
    }
  };

  // ─── B) Permission guard: redirect _only_ if the user lacks "transaction:view":
  if (!permissions.includes("transaction:view")) {
    return <Navigate to="/dashboard" replace />;
  }

  // ─── C) Now that the guard has passed, render the form + table ─────────────────────
  return (
    <Container fluid className="init-page-container">
      <Row>
        {/* ─── Form Column (left) ─────────────────────────────────────────────── */}
        <Col lg={4} className="mb-4">
          <Card className="shadow-sm init-card">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">
                {editingTxnId ? "Ubah Inisialisasi" : "Inisialisasi Transaksi"}
              </h5>
            </Card.Header>
            <Card.Body className="init-card-body">
              {/* If user cannot "create" (and is not in edit mode) → show a warning */}
              {!permissions.includes("transaction:create") && !editingTxnId && (
                <Alert variant="warning">
                  Anda tidak memiliki izin untuk membuat inisialisasi.
                </Alert>
              )}

              {/* Only show the form if they _do_ have create‐or‐we're‐editing */}
              {(permissions.includes("transaction:create") || editingTxnId) && (
                <>
                  {formError && <Alert variant="danger">{formError}</Alert>}
                  {formSuccess && (
                    <Alert variant="success">{formSuccess}</Alert>
                  )}

                  <Form onSubmit={handleSubmit} className="init-form">
                    {/* 1) Autocomplete "Cari Pelanggan" */}
                    <Form.Group className="mb-3" controlId="formCustomerSearch">
                      <Form.Label>Cari Pelanggan</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Ketik nama atau ID..."
                        value={customerSearchTerm}
                        onChange={(e) => {
                          setCustomerSearchTerm(e.target.value);
                          setSelectedCustomerId("");
                          setShowDropdown(true);
                        }}
                        onFocus={() => {
                          if (customerSearchTerm.trim()) {
                            setShowDropdown(true);
                          }
                        }}
                        ref={searchInputRef}
                        autoComplete="off"
                        required={!editingTxnId}
                      />
                      <Form.Text className="text-muted mb-1">
                        Ketik sebagian nama atau ID, lalu pilih dari daftar.
                      </Form.Text>
                      {showDropdown && filteredCustomers.length > 0 && (
                        <div
                          className="autocomplete-dropdown"
                          ref={dropdownRef}
                        >
                          {filteredCustomers.map((c) => (
                            <div
                              key={c._id}
                              className="autocomplete-item"
                              onClick={() => {
                                setSelectedCustomerId(c._id);
                                setCustomerSearchTerm(
                                  `${c.customerId} | ${c.name}`
                                );
                                setShowDropdown(false);
                              }}
                            >
                              <strong>{c.customerId}</strong> | {c.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Group>

                    {/* 2) "Berat (gram)" & "Gold Content (%)" side‐by‐side */}
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3" controlId="formWeightGram">
                          <Form.Label>Berat (gram)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.01"
                            value={weightGram}
                            onChange={(e) => setWeightGram(e.target.value)}
                            placeholder="Contoh: 150.50"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group
                          className="mb-3"
                          controlId="formGoldContent"
                        >
                          <Form.Label>Kandungan Emas (%)</Form.Label>
                          <Form.Control
                            type="number"
                            step="0.01"
                            value={goldContent}
                            onChange={(e) => setGoldContent(e.target.value)}
                            placeholder="Contoh: 18"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* 3) Photo Timbangan */}
                    <Form.Group className="mb-3" controlId="formWeightPhotos">
                      <Form.Label>
                        Foto Timbangan (JPG/PNG, {"<"}=1MB/file)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(e, setWeightGramFiles)
                        }
                      />
                      <Form.Text className="text-muted">
                        Pilih satu atau lebih file.
                      </Form.Text>
                    </Form.Group>

                    {/* 4) Photo Tes Kandungan */}
                    <Form.Group className="mb-3" controlId="formGoldPhotos">
                      <Form.Label>
                        Foto Tes Kandungan (JPG/PNG, {"<"}=1MB/file)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileChange(e, setGoldContentFiles)
                        }
                      />
                      <Form.Text className="text-muted">
                        Pilih satu atau lebih file.
                      </Form.Text>
                    </Form.Group>

                    {/* 5) Photo Proforma */}
                    <Form.Group className="mb-3" controlId="formProformaPhotos">
                      <Form.Label>
                        Foto Proforma (JPG/PNG, {"<"}=1MB/file)
                      </Form.Label>
                      <Form.Control
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png"
                        onChange={(e) => handleFileChange(e, setProformaFiles)}
                      />
                      <Form.Text className="text-muted">
                        Pilih satu atau lebih file.
                      </Form.Text>
                    </Form.Group>

                    {/* 6) Remarks */}
                    <Form.Group className="mb-3" controlId="formRemarks">
                      <Form.Label>Catatan</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                        placeholder="Catatan tambahan (opsional)"
                      />
                    </Form.Group>

                    <Button
                      variant="success"
                      type="submit"
                      className="w-100"
                      disabled={formLoading}
                    >
                      {formLoading ? (
                        <>
                          <Spinner animation="border" size="sm" /> Memproses…
                        </>
                      ) : editingTxnId ? (
                        "Perbarui Inisialisasi"
                      ) : (
                        "Kirim Inisialisasi"
                      )}
                    </Button>
                  </Form>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* ─── List Column (right) ───────────────────────────────────────────── */}
        <Col lg={8}>
          <Card className="shadow-sm init-card">
            <Card.Header className="bg-secondary text-white">
              <h5 className="mb-0">Daftar Inisialisasi</h5>
            </Card.Header>
            <Card.Body className="init-card-body">
              {loadingTransactions ? (
                <div className="text-center my-4">
                  <Spinner animation="border" />
                </div>
              ) : transactions.length > 0 ? (
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  className="init-transactions-table"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID Pelanggan</th>
                      <th>Nama Pelanggan</th>
                      <th>Berat (gm)</th>
                      <th>Emas (%)</th>
                      <th>Dibuat Pada</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((tx, idx) => (
                      <Fragment key={tx._id}>
                        <tr>
                          <td>{idx + 1}</td>
                          <td>{tx.customerId.customerId}</td>
                          <td>{tx.customerId.name}</td>
                          <td>{tx.weightGram}</td>
                          <td>{tx.goldContent}</td>
                          <td>
                            {new Date(tx.createdAt).toLocaleString("id-ID", {
                              dateStyle: "short",
                              timeStyle: "short",
                            })}
                          </td>
                          <td className="text-center">
                            {/* ▶/▼ to expand or collapse the row */}
                            <Button
                              variant="link"
                              onClick={() =>
                                setExpandedRowId(
                                  expandedRowId === tx._id ? "" : tx._id
                                )
                              }
                            >
                              {expandedRowId === tx._id ? "🔽" : "▶️"}
                            </Button>

                            {/* "Edit" button (if permitted) */}
                            {permissions.includes("transaction:edit") && (
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => startEditing(tx)}
                              >
                                Ubah
                              </Button>
                            )}

                            {/* "Delete" button (if permitted) */}
                            {permissions.includes("transaction:delete") && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(tx._id)}
                              >
                                Hapus
                              </Button>
                            )}
                          </td>
                        </tr>

                        {/* ─── Expanded row to show photo thumbnails ───────────────────── */}
                        {expandedRowId === tx._id && (
                          <tr>
                            <td colSpan={7}>
                              {/* WeightGram Photos */}
                              <div>
                                <strong>Foto Timbangan:</strong>
                                <div className="photo-row">
                                  {tx.weightGramPhotos.length > 0 ? (
                                    tx.weightGramPhotos.map((url, i) => (
                                      <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Image
                                          src={url}
                                          thumbnail
                                          className="detail-thumb"
                                        />
                                      </a>
                                    ))
                                  ) : (
                                    <em>Tidak ada foto timbangan</em>
                                  )}
                                </div>
                              </div>

                              {/* GoldContent Photos */}
                              <div className="mt-3">
                                <strong>Foto Tes Kandungan:</strong>
                                <div className="photo-row">
                                  {tx.goldContentPhotos.length > 0 ? (
                                    tx.goldContentPhotos.map((url, i) => (
                                      <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Image
                                          src={url}
                                          thumbnail
                                          className="detail-thumb"
                                        />
                                      </a>
                                    ))
                                  ) : (
                                    <em>Tidak ada foto tes kandungan</em>
                                  )}
                                </div>
                              </div>

                              {/* Proforma Photos */}
                              <div className="mt-3">
                                <strong>Foto Proforma:</strong>
                                <div className="photo-row">
                                  {tx.proformaPhotos.length > 0 ? (
                                    tx.proformaPhotos.map((url, i) => (
                                      <a
                                        key={i}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Image
                                          src={url}
                                          thumbnail
                                          className="detail-thumb"
                                        />
                                      </a>
                                    ))
                                  ) : (
                                    <em>Tidak ada foto proforma</em>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Alert variant="info">Tidak ada transaksi inisialisasi.</Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
