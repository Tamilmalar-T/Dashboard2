import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Alert, Spinner } from "react-bootstrap";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ManageLogo = () => {
  const [logos, setLogos] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [modalLogo, setModalLogo] = useState(null);
  const [isViewMode, setIsViewMode] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [logoToDelete, setLogoToDelete] = useState(null);

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/logo");
      setLogos(res.data);
    } catch (err) {
      console.error("Failed to fetch logos", err);
      setError("Error loading logos.");
    } finally {
      setLoading(false);
    }
  };

  const getLatestLogoId = () => {
    if (!logos.length) return null;
    return logos.reduce((latest, logo) =>
      new Date(logo.createdAt) > new Date(latest.createdAt) ? logo : latest
    )._id;
  };

  const latestLogoId = getLatestLogoId();

  const filteredLogos = logos.filter((logo) =>
    new Date(logo.createdAt).toLocaleString().toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLogos = filteredLogos.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredLogos.length / itemsPerPage);

  const handlePageChange = (dir) => {
    if (dir === "next" && currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    if (dir === "prev" && currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    const idsOnPage = currentLogos.map((l) => l._id);
    if (e.target.checked) {
      setSelectedIds((prev) => [...new Set([...prev, ...idsOnPage])]);
    } else {
      setSelectedIds((prev) => prev.filter((id) => !idsOnPage.includes(id)));
    }
  };

  const getSelectedLogos = () => logos.filter((logo) => selectedIds.includes(logo._id));

  const exportData = (type = "csv") => {
    const data = getSelectedLogos().length ? getSelectedLogos() : filteredLogos;
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((l) => ({
        Image: l.image,
        UploadedAt: new Date(l.createdAt).toLocaleString(),
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Logos");
    const fileType =
      type === "csv"
        ? { ext: "csv", mime: "text/csv;charset=utf-8;" }
        : {
            ext: "xlsx",
            mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          };
    const buffer = XLSX.write(workbook, { bookType: fileType.ext, type: "array" });
    saveAs(new Blob([buffer], { type: fileType.mime }), `logos.${fileType.ext}`);
  };

  const openView = (logo) => {
    setModalLogo(logo);
    setIsViewMode(true);
  };

  const openEdit = (logo) => {
    setModalLogo({ ...logo, newImage: null });
    setIsViewMode(false);
  };

  const closeModal = () => setModalLogo(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      if (modalLogo.newImage) {
        formData.append("logo", modalLogo.newImage);
      }
      await axios.put(
        `http://localhost:5000/api/logo/update/${modalLogo._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMessage("Logo updated successfully.");
      setModalLogo(null);
      fetchLogos();
    } catch (err) {
      console.error("Update error:", err);
      setError("Update failed.");
    }
  };

  const handleDelete = (logo) => {
    setLogoToDelete(logo);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/logo/${logoToDelete._id}`);
      setMessage("Logo deleted.");
      setShowDeletePopup(false);
      fetchLogos();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Delete failed.");
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm(`Delete ${selectedIds.length} selected logos?`)) return;
    try {
      await axios.post("http://localhost:5000/api/logo/bulk-delete", { ids: selectedIds });
      setMessage(`${selectedIds.length} logos deleted.`);
      setSelectedIds([]);
      fetchLogos();
    } catch (err) {
      console.error("Bulk delete error:", err);
      setError("Bulk delete failed.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h4>Manage Logos</h4>
            <p className="text-muted">Search, update, or delete logo</p>
          </div>
          <div className="position-relative" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search by date"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch
              className="position-absolute"
              style={{
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#aaa",
              }}
            />
          </div>
          <div className="d-flex gap-2 mt-2 mt-md-0">
            <button className="btn btn-outline-secondary" onClick={() => exportData("csv")}>📄</button>
            <button className="btn btn-outline-secondary" onClick={() => exportData("xlsx")}>📊</button>
            <button className="btn btn-outline-secondary" onClick={() => window.print()}>🖨️</button>
          </div>
        </div>

      
        {/* Pagination */}
        <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
          <select
            className="form-select form-select-sm w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[5, 10, 15].map((n) => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
          <span>
            {startIndex + 1}-{Math.min(endIndex, filteredLogos.length)} of {filteredLogos.length}
          </span>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            ‹
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange("next")}
            disabled={endIndex >= filteredLogos.length}
          >
            ›
          </button>
        </div>

        {/* Logo Table */}
        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Table bordered hover responsive className="mt-3">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={currentLogos.every((l) => selectedIds.includes(l._id))}
                    />
                  </th>
                  <th>Image</th>
                  <th>Uploaded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentLogos.map((logo) => (
                  <tr key={logo._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(logo._id)}
                        onChange={() => handleCheckboxChange(logo._id)}
                      />
                    </td>
                    <td>
                      <img
                        src={`http://localhost:5000/uploads/logos/${logo.image}`}
                        alt="Logo"
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{new Date(logo.createdAt).toLocaleString()}</td>
                    <td className="d-flex gap-2 justify-content-center">
                      <FaEye className="text-info" onClick={() => openView(logo)} />
                      {logo._id === latestLogoId && (
                        <FaEdit className="text-warning" onClick={() => openEdit(logo)} />
                      )}
                      <FaTrash className="text-danger" onClick={() => handleDelete(logo)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Modal: View / Edit */}
        {modalLogo && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isViewMode ? "View Logo" : "Edit Logo"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {isViewMode ? (
                    <img
                      src={`http://localhost:5000/uploads/logos/${modalLogo.image}`}
                      alt="Logo"
                      className="w-100"
                    />
                  ) : (
                    <form onSubmit={handleUpdate}>
                      <p>Current Logo:</p>
                      <img
                        src={`http://localhost:5000/uploads/logos/${modalLogo.image}`}
                        alt="Logo"
                        className="w-100 mb-2"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) =>
                          setModalLogo({ ...modalLogo, newImage: e.target.files[0] })
                        }
                      />
                      {modalLogo.newImage && (
                        <p className="mt-2">
                          Selected: <strong>{modalLogo.newImage.name}</strong>
                        </p>
                      )}
                      <button type="submit" className="btn btn-success mt-3">
                        Update
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Delete Confirmation */}
        {showDeletePopup && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowDeletePopup(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this logo?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                    {/* Bulk Delete */}
        {selectedIds.length > 0 && (
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-danger" onClick={handleBulkDelete}>
              Delete Selected ({selectedIds.length})
            </button>
          </div>
        )}

                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowDeletePopup(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLogo;
