
  // export default ManageUser;
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import "./ManageUser.css";
  import { FaEdit, FaTrash, FaEye ,FaSearch} from "react-icons/fa";
  import * as XLSX from "xlsx";
  import { saveAs } from "file-saver";


  const ManageUser = () => {
     const [users, setUsers] = useState([]);
  const [error, setError] = useState(""); 

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [modalUser, setModalUser] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);



const fetchUsers = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    setError("Failed to fetch users.");
  }
};


useEffect(() => {
  fetchUsers(); // ✅ Now accessible
}, []);


 
    const filteredUsers = users.filter((user) => {
  const searchTerm = search.toLowerCase();
  return (
    user.name.toLowerCase().includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm) ||
    user.gender.toLowerCase().includes(searchTerm) ||
      user.contact.toLowerCase().includes(searchTerm) ||
      user.location.toLowerCase().includes(searchTerm)|| 
      user.dob.toLowerCase().includes(searchTerm) 
  );
});

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const handlePageChange = (direction) => {
      if (direction === "prev" && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else if (direction === "next" && endIndex < filteredUsers.length) {
        setCurrentPage((prev) => prev + 1);
      }
    };

    const handleCheckboxChange = (userId) => {
      setSelectedUsers((prevSelected) =>
        prevSelected.includes(userId)
          ? prevSelected.filter((id) => id !== userId)
          : [...prevSelected, userId]
      );
    };

    const handleDelete = (id) => {
      setDeleteUserId(id);
      setShowDeletePopup(true);
    };

    const handleBulkDelete = async () => {
  try {
    for (let id of selectedUsers) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
    }
    fetchUsers();
    setSelectedUsers([]);
    alert("Selected users deleted.");
  } catch (err) {
    console.error(err);
    alert("Bulk delete failed.");
  }
};


    const confirmDelete = async () => {
      try {
        await axios.delete(`http://localhost:5000/api/users/${deleteUserId}`);
        setUsers(users.filter((u) => u._id !== deleteUserId));
        setShowDeletePopup(false);
        alert("User deleted successfully.");
      } catch (error) {
        console.error("Delete error:", error);
        alert("Delete failed.");
      }
    };

    const openView = (user) => {
      setIsViewMode(true);
      setModalUser({ ...user });
    };

    const openEdit = (user) => {
      setIsViewMode(false);
      setModalUser({ ...user });
    };

    const closeModal = () => {
      setModalUser(null);
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setModalUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/api/users/${modalUser._id}`, modalUser);
        fetchUsers();
        setModalUser(null);
        alert("User updated successfully.");
      } catch (err) {
        console.error(err);
        alert("Update failed.");
      }
    };

  // Helper: Get data to export based on selection
const getExportData = () => {
  return selectedUsers.length > 0
    ? filteredUsers.filter((user) => selectedUsers.includes(user._id))
    : filteredUsers;
};

// Export as CSV
const exportToCSV = () => {
  const dataToExport = getExportData();
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  const csvData = XLSX.write(wb, { bookType: "csv", type: "array" });
  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, "users.csv");
};

// Export as Excel
const exportToExcel = () => {
  const dataToExport = getExportData();
  const ws = XLSX.utils.json_to_sheet(dataToExport);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Users");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "users.xlsx");
};


    return (
      <div className="container mt-2">
        <div className="card p-3 ps-4">
          <div className="top-controls d-flex justify-content-between align-items-center flex-wrap gap-3">
  {/* Title Section */}
  <div >
    <h4 className="pt-3 mb-0">Manage Users</h4>
    <p className="text-muted mb-0">View or manage user profiles</p>
  </div>

  {/* Search Box with Icon */}
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

  {/* Action Buttons */}
  <div className="d-flex pt-3 gap-2">
    <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>📄</button>
    <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>📊</button>
    <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>🖨️</button>
  </div>
</div>


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
              {startIndex + 1}–{Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length}
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
              disabled={endIndex >= filteredUsers.length}
            >
              &#8250;
            </button>
          </div>




          <div className="table-responsive mt-3">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-dark">
                <tr>
                 <th>
  <input
    type="checkbox"
    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
    onChange={(e) => {
      if (e.target.checked) {
        const currentPageUserIds = currentUsers.map(user => user._id);
        setSelectedUsers(currentPageUserIds);
      } else {
        setSelectedUsers([]);
      }
    }}
  />
</th>

               
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Gender</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="8">No users found</td>
                  </tr>
                ) : (
                  [...currentUsers].reverse().map((user, index) => (
                    <tr key={user._id}>
                      <td>
                       <input
  type="checkbox"
  checked={selectedUsers.includes(user._id)}
  onChange={() => handleCheckboxChange(user._id)}
/>

                      </td>
                   
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.contact}</td>
                      <td>{user.gender}</td>
                     
                      <td>{'*'.repeat(user.password?.length || 6)}</td>
                      
                      <td className="actions d-flex justify-content-center gap-2">
                        <FaEye className="text-info" onClick={() => openView(user)} />
                        <FaEdit className="text-warning" onClick={() => openEdit(user)} />
                        <FaTrash className="text-danger" onClick={() => handleDelete(user._id)} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* View/Edit Modal */}
        {modalUser && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isViewMode ? "View User" : "Edit User"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {isViewMode ? (
                    <div>
                      <p><strong>Name:</strong> {modalUser.name}</p>
                      <p><strong>Email:</strong> {modalUser.email}</p>
                      <p><strong>Contact:</strong> {modalUser.contact}</p>
                      <p><strong>Gender:</strong> {modalUser.gender}</p>
                      <p><strong>Location:</strong> {modalUser.location}</p>
                      <p><strong>Date of Birth:</strong> {modalUser.dob}</p>
                      <p><strong>Password:</strong> {modalUser.password}</p> {/* Add this line */}

                    </div>
                  ) : (
                    <form onSubmit={handleUpdate}>
                      <div className="mb-2">
                        <input type="text" className="form-control" name="name" value={modalUser.name} onChange={handleChange} required />
                      </div>
                      <div className="mb-2">
                        <input type="email" className="form-control" name="email" value={modalUser.email} onChange={handleChange} required />
                      </div>
                      <div className="mb-2">
                        <input type="text" className="form-control" name="contact" value={modalUser.contact} onChange={handleChange} required />
                      </div>
                      <div className="mb-2">
                        <select className="form-select" name="gender" value={modalUser.gender} onChange={handleChange} required>
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>

                      <div className="mb-2">
  <input
    type="text"
    className="form-control"
    name="location"
    value={modalUser.location}
    onChange={handleChange}
    placeholder="Location"
    required
  />
</div>
{/* <div className="mb-2">
  <input
    type="date"
    className="form-control"
    name="dob"
    value={modalUser.dob}
    onChange={handleChange}
    required
  />
</div> */}
<form onSubmit={handleUpdate}>
  {/* other inputs */}
  
  <div className="mb-2">
    <input
      type="password"
      className="form-control"
      name="password"
      value={modalUser.password}
      onChange={handleChange}
      placeholder="Password"
      required
    />
  </div>

  {/* submit button */}
</form>

                      <button type="submit" className="btn btn-success">Save Changes</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeletePopup && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this user?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete }>Yes, Delete</button>
                  <button
  className="btn btn-danger"
  disabled={selectedUsers.length === 0}
  onClick={handleBulkDelete}
>
  Delete Selected
</button>

                  <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ManageUser;

