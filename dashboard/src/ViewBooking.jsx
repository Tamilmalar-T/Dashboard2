


import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaTrash, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./viewbooking.css";

export default function ViewBooking() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewBooking, setViewBooking] = useState(null); // For modal
  const [showModal, setShowModal] = useState(false);   // Modal visibility

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

const filteredBookings = bookings.filter((b) =>
  `${b.customerName}${b.email}${b.phone}${b.date}${b.time}${b.totalAmount}`
    .toLowerCase()
    .includes(search.toLowerCase())
);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBookings = filteredBookings.slice(startIndex, endIndex);

  const toggleId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const idsThisPage = currentBookings.map((b) => b._id);
      setSelectedIds(idsThisPage);
    } else {
      setSelectedIds([]);
    }
  };

  const handleBulkDelete = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm(`Delete ${selectedIds.length} booking(s)?`)) return;

    try {
      await axios.delete("http://localhost:5000/api/bookings/bulk-delete", {
        data: { ids: selectedIds },
      });
      setBookings((prev) =>
        prev.filter((b) => !selectedIds.includes(b._id))
      );
      setSelectedIds([]);
      alert("Deleted successfully");
    } catch (err) {
      console.error("Bulk delete failed:", err);
      alert("Failed to delete selected bookings");
    }
  };

const exportToCSV = () => {
  const selectedBookings = bookings.filter(b => selectedIds.includes(b._id));
  if (selectedBookings.length === 0) {
    alert("Please select at least one booking to export.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(selectedBookings);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Selected Bookings");
  const csv = XLSX.write(wb, { bookType: "csv", type: "array" });
  saveAs(new Blob([csv], { type: "text/csv;charset=utf-8;" }), "selected_bookings.csv");
};


const exportToExcel = () => {
  const selectedBookings = bookings.filter(b => selectedIds.includes(b._id));
  if (selectedBookings.length === 0) {
    alert("Please select at least one booking to export.");
    return;
  }

  const ws = XLSX.utils.json_to_sheet(selectedBookings);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Selected Bookings");
  const xlsx = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  saveAs(
    new Blob([xlsx], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    "selected_bookings.xlsx"
  );
};


  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (
      direction === "next" &&
      endIndex < filteredBookings.length
    ) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const openViewModal = (booking) => {
    setViewBooking(booking);
    setShowModal(true);
  };

  const closeViewModal = () => {
    setViewBooking(null);
    setShowModal(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-2">
      <div className="card p-3 ps-4">
        {/* Top Controls */}
        <div className="top-controls d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4 className="pt-3 mb-0">Manage Users</h4>
            <p className="text-muted mb-0">View or manage user profiles</p>
          </div>

          <div className="position-relative pt-3" style={{ maxWidth: "400px", flexGrow: 1 }}>
            <input
              type="text"
              className="form-control ps-5 search-box"
              placeholder="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch
              className="position-absolute"
              style={{
                top: '65%',
                left: '350px',
                transform: 'translateY(-50%)',
                color: '#aaa'
              }}
            />
          </div>

          <div className="d-flex pt-3 gap-2">
            <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>📄</button>
            <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>📊</button>
            <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>🖨️</button>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="pagination-bar d-flex justify-content-end align-items-center gap-3 mt-3">
          <select
            className="form-select form-select-sm w-auto"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
          </select>

          <span className="range-text">
            {startIndex + 1}–{Math.min(endIndex, filteredBookings.length)} of {filteredBookings.length}
          </span>

          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            &#8249;
          </button>
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handlePageChange("next")}
            disabled={endIndex >= filteredBookings.length}
          >
            &#8250;
          </button>
        </div>

        {/* Table */}
        <table className="table table-bordered text-center mt-3">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    currentBookings.length > 0 &&
                    currentBookings.every((b) => selectedIds.includes(b._id))
                  }
                />
              </th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Total (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.length === 0 ? (
              <tr>
                <td colSpan="9">No bookings found</td>
              </tr>
            ) : (
              currentBookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(b._id)}
                      onChange={() => toggleId(b._id)}
                    />
                  </td>
                  <td>{b.customerName}</td>
                  <td>{b.email}</td>
                  <td>{b.phone}</td>
                  <td>{b.date}</td>
                  <td>{b.time}</td>
                  <td>₹{b.totalAmount}</td>
                  <td className="d-flex justify-content-center gap-3">
                    <FaEye
                      className="text-info"
                      title="View"
                      style={{ cursor: "pointer" }}
                      onClick={() => openViewModal(b)}
                    />
                    <FaTrash
                      className="text-danger"
                      title="Delete"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedIds([b._id]);
                        handleBulkDelete();
                      }}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && viewBooking && (
        <div className="modal show d-block" tabIndex="-1" onClick={closeViewModal}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Booking Details</h5>
                <button type="button" className="btn-close" onClick={closeViewModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Customer:</strong> {viewBooking.customerName}</p>
                <p><strong>Email:</strong> {viewBooking.email}</p>
                <p><strong>Phone:</strong> {viewBooking.phone}</p>
                <p><strong>Date:</strong> {viewBooking.date}</p>
                <p><strong>Time:</strong> {viewBooking.time}</p>
                <p><strong>Total Amount:</strong> ₹{viewBooking.totalAmount}</p>
                <p><strong>Stylist:</strong> {viewBooking.stylist}</p>
                <p><strong>Service:</strong> {viewBooking.service}</p>
               
                {/* Add more fields if needed */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeViewModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
