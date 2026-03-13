// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';
// import './ManageUser.css';

// function ManageStylist() {
//   const [stylists, setStylists] = useState([]);
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [selectedStylists, setSelectedStylists] = useState([]);
//   const [stylistToDelete, setStylistToDelete] = useState(null);
//   const [modalStylist, setModalStylist] = useState(null);
//   const [isViewMode, setIsViewMode] = useState(true);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [newImage, setNewImage] = useState(null);

//   useEffect(() => {
//     fetchStylists();
//   }, []);

//   const fetchStylists = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/stylists');
//       setStylists(res.data);
//     } catch (err) {
//       console.error('Error fetching stylists:', err);
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedStylists((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/stylists/${stylistToDelete}`);
//       setStylists((prev) => prev.filter((s) => s._id !== stylistToDelete));
//       setStylistToDelete(null);
//       setShowDeletePopup(false);
//     } catch (err) {
//       console.error('Failed to delete stylist:', err);
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       for (const id of selectedStylists) {
//         await axios.delete(`http://localhost:5000/api/stylists/${id}`);
//       }
//       setStylists((prev) => prev.filter((s) => !selectedStylists.includes(s._id)));
//       setSelectedStylists([]);
//       setShowDeletePopup(false);
//     } catch (err) {
//       console.error('Failed bulk delete:', err);
//     }
//   };

//   const handlePageChange = (direction) => {
//     if (direction === 'next' && currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     } else if (direction === 'prev' && currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setModalStylist((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('name', modalStylist.name);
//     formData.append('speciality', modalStylist.speciality);
//     if (newImage) formData.append('image', newImage);

//     try {
//       const response = await axios.put(
//         `http://localhost:5000/api/stylists/${modalStylist._id}`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' } }
//       );

//       setStylists((prev) =>
//         prev.map((s) => (s._id === modalStylist._id ? response.data : s))
//       );
//       setModalStylist(null);
//       setNewImage(null);
//     } catch (err) {
//       console.error('Error updating stylist:', err);
//     }
//   };

//   const openView = (id) => {
//     const stylist = stylists.find((s) => s._id === id);
//     setModalStylist(stylist);
//     setIsViewMode(true);
//   };

//   const openEdit = (id) => {
//     const stylist = stylists.find((s) => s._id === id);
//     setModalStylist(stylist);
//     setIsViewMode(false);
//   };

//   const closeModal = () => {
//     setModalStylist(null);
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === 'enable' ? 'disable' : 'enable';
//     try {
//       await axios.put(`http://localhost:5000/api/stylists/${id}`, { status: newStatus });
//       setStylists((prev) =>
//         prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
//       );
//       alert(`Stylist ${newStatus === 'enable' ? 'enabled' : 'disabled'} successfully.`);
//     } catch (err) {
//       console.error('Failed to toggle status:', err);
//     }
//   };

//   // Filter by Name or Speciality
//   const filteredStylists = stylists.filter((s) => {
//     const searchLower = search.toLowerCase();
//     return (
//       s?.name?.toLowerCase().includes(searchLower) ||
//       s?.speciality?.toLowerCase().includes(searchLower)
//     );
//   });

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const totalPages = Math.ceil(filteredStylists.length / itemsPerPage);



// const getExportData = () => {
//   const dataSource =
//     selectedStylists.length > 0
//       ? stylists.filter((s) => selectedStylists.includes(s._id))
//       : filteredStylists;

//   return dataSource.map((s) => ({
//     Name: s.name,
//     Speciality: s.speciality,
//     Status: s.status,
//   }));
// };

// // Export as CSV
// const exportToCSV = () => {
//   const dataToExport = getExportData();
//   if (dataToExport.length === 0) {
//     alert("No stylists selected for export!");
//     return;
//   }
//   const ws = XLSX.utils.json_to_sheet(dataToExport);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Stylists');
//   XLSX.writeFile(wb, 'stylists.csv');
// };

// // Export as Excel
// const exportToExcel = () => {
//   const dataToExport = getExportData();
//   if (dataToExport.length === 0) {
//     alert("No stylists selected for export!");
//     return;
//   }
//   const ws = XLSX.utils.json_to_sheet(dataToExport);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, 'Stylists');
//   XLSX.writeFile(wb, 'stylists.xlsx');
// };

//   return (
//     <div className="container mt-2">
//       <div className="card p-3 ps-4">
//         {/* Header + Search + Export */}
//         <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
//           <div>
//             <h4>Manage Stylists</h4>
//             <p className="text-muted mb-0">View or manage stylist profiles</p>
//           </div>

//           <input
//             type="text"
//             className="form-control search-box"
//             placeholder="Search by name or speciality"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//           />

//           <div className="d-flex pt-3 gap-2">
//             <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>📄</button>
//             <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>📊</button>
//             <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>🖨️</button>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="pagination-bar d-flex justify-content-end gap-3 mt-3">
//           <select
//             className="form-select form-select-sm w-auto"
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(parseInt(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             <option value={5}>5 per page</option>
//             <option value={10}>10 per page</option>
//             <option value={15}>15 per page</option>
//           </select>

//           <span>
//             {startIndex + 1}–{Math.min(endIndex, filteredStylists.length)} of {filteredStylists.length}
//           </span>
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>&#8249;</button>
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange('next')} disabled={endIndex >= filteredStylists.length}>&#8250;</button>
//         </div>

//         {/* Table */}
//         <table className="table table-striped table-bordered text-center mt-4">
//           <thead className="table-dark">
//             <tr>
//               <th><input type="checkbox" /></th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Speciality</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStylists.slice(startIndex, endIndex).map((s) => (
//               <tr key={s._id} style={{ backgroundColor: s.status === 'disable' ? '#f8d7da' : '' }}>
//                 <td>
//                   <input
//                     type="checkbox"
//                     checked={selectedStylists.includes(s._id)}
//                     onChange={() => handleCheckboxChange(s._id)}
//                   />
//                 </td>
//                 <td><img src={`http://localhost:5000/uploads/${s.image}`} alt={s.name} width="50" height="50" style={{ borderRadius: '50%' }} /></td>
//                 <td>{s.name}</td>
//                 <td>{s.speciality}</td>
//                 <td>
//                   <span
//                     className={`badge ${s.status === 'enable' ? 'bg-success' : 'bg-danger'}`}
//                     style={{ cursor: 'pointer' }}
//                     onClick={() => toggleStatus(s._id, s.status)}
//                   >
//                     {s.status === 'enable' ? 'Enabled' : 'Disabled'}
//                   </span>
//                 </td>
//                 <td className="d-flex justify-content-center gap-2">
//                   <button className="btn btn-sm btn-info" onClick={() => openView(s._id)}><FaEye /></button>
//                   <button className="btn btn-sm btn-warning" onClick={() => openEdit(s._id)}><FaEdit /></button>
//                   <button className="btn btn-sm btn-danger" onClick={() => { setStylistToDelete(s._id); setShowDeletePopup(true); }}><FaTrash /></button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* View/Edit Modal */}
//         {modalStylist && (
//           <div className="modal show fade d-block" tabIndex="-1">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">{isViewMode ? "View Stylist" : "Edit Stylist"}</h5>
//                   <button type="button" className="btn-close" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   {isViewMode ? (
//                     <div>
//                       <p><strong>Name:</strong> {modalStylist.name}</p>
//                       <p><strong>Speciality:</strong> {modalStylist.speciality}</p>
//                       <p><strong>Status:</strong> {modalStylist.status}</p>
//                     </div>
//                   ) : (
//                     <form onSubmit={handleUpdate}>
//                       <input type="text" className="form-control mb-2" name="name" value={modalStylist.name} onChange={handleChange} />
//                       <input type="text" className="form-control mb-2" name="speciality" value={modalStylist.speciality} onChange={handleChange} />
//                       <input type="file" className="form-control mb-2" onChange={(e) => setNewImage(e.target.files[0])} />
//                       <button type="submit" className="btn btn-success">Save</button>
//                     </form>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Confirmation */}
//         {showDeletePopup && (
//           <div className="modal show fade d-block" tabIndex="-1">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Confirm Delete</h5>
//                   <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>Are you sure you want to delete?</p>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
//                   <button className="btn btn-danger" disabled={selectedStylists.length === 0} onClick={handleBulkDelete}>Delete Selected</button>
//                   <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ManageStylist;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './ManageUser.css';

function ManageStylist() {
  const [stylists, setStylists] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedStylists, setSelectedStylists] = useState([]);
  const [stylistToDelete, setStylistToDelete] = useState(null);
  const [modalStylist, setModalStylist] = useState(null);
  const [isViewMode, setIsViewMode] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchStylists();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchStylists = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stylists');
      setStylists(res.data);
    } catch (err) {
      console.error('Error fetching stylists:', err);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedStylists((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/stylists/${stylistToDelete}`);
      setStylists((prev) => prev.filter((s) => s._id !== stylistToDelete));
      setStylistToDelete(null);
      setShowDeletePopup(false);
      setSuccessMessage("Stylist deleted successfully.");
    } catch (err) {
      console.error('Failed to delete stylist:', err);
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedStylists) {
        await axios.delete(`http://localhost:5000/api/stylists/${id}`);
      }
      setStylists((prev) => prev.filter((s) => !selectedStylists.includes(s._id)));
      setSelectedStylists([]);
      setShowDeletePopup(false);
      setSuccessMessage("Selected stylists deleted successfully.");
    } catch (err) {
      console.error('Failed bulk delete:', err);
    }
  };

  const handlePageChange = (direction) => {
    if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalStylist((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', modalStylist.name);
    formData.append('speciality', modalStylist.speciality);
    if (newImage) formData.append('image', newImage);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/stylists/${modalStylist._id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setStylists((prev) =>
        prev.map((s) => (s._id === modalStylist._id ? response.data : s))
      );
      setModalStylist(null);
      setNewImage(null);
      setSuccessMessage("Stylist updated successfully.");
    } catch (err) {
      console.error('Error updating stylist:', err);
    }
  };

  const openView = (id) => {
    const stylist = stylists.find((s) => s._id === id);
    setModalStylist(stylist);
    setIsViewMode(true);
  };

  const openEdit = (id) => {
    const stylist = stylists.find((s) => s._id === id);
    setModalStylist(stylist);
    setIsViewMode(false);
  };

  const closeModal = () => {
    setModalStylist(null);
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'enable' ? 'disable' : 'enable';
    try {
      await axios.put(`http://localhost:5000/api/stylists/${id}`, { status: newStatus });
      setStylists((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );
      setSuccessMessage(`Stylist ${newStatus === 'enable' ? 'enabled' : 'disabled'} successfully.`);
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const filteredStylists = stylists.filter((s) => {
    const searchLower = search.toLowerCase();
    return (
      s?.name?.toLowerCase().includes(searchLower) ||
      s?.speciality?.toLowerCase().includes(searchLower)
    );
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(filteredStylists.length / itemsPerPage);

  const getExportData = () => {
    const dataSource =
      selectedStylists.length > 0
        ? stylists.filter((s) => selectedStylists.includes(s._id))
        : filteredStylists;

    return dataSource.map((s) => ({
      Name: s.name,
      Speciality: s.speciality,
      Status: s.status,
    }));
  };

  const exportToCSV = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) {
      alert("No stylists selected for export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stylists');
    XLSX.writeFile(wb, 'stylists.csv');
  };

  const exportToExcel = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) {
      alert("No stylists selected for export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Stylists');
    XLSX.writeFile(wb, 'stylists.xlsx');
  };

  return (
    <div className="container mt-2">
      <div className="card p-3 ps-4">

        {successMessage && (
          <div className="alert alert-success text-center" role="alert">
            {successMessage}
          </div>
        )}

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h4>Manage Stylists</h4>
            <p className="text-muted mb-0">View or manage stylist profiles</p>
          </div>

          <input
            type="text"
            className="form-control search-box"
            placeholder="Search by name or speciality"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="d-flex pt-3 gap-2">
            <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>📄</button>
            <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>📊</button>
            <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>🖨️</button>
          </div>
        </div>

        <div className="pagination-bar d-flex justify-content-end gap-3 mt-3">
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
          </select>

          <span>
            {startIndex + 1}–{Math.min(endIndex, filteredStylists.length)} of {filteredStylists.length}
          </span>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange('prev')} disabled={currentPage === 1}>&#8249;</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange('next')} disabled={endIndex >= filteredStylists.length}>&#8250;</button>
        </div>

        <table className="table table-striped table-bordered text-center mt-4">
          <thead className="table-dark">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Image</th>
              <th>Name</th>
              <th>Speciality</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStylists.slice(startIndex, endIndex).map((s) => (
              <tr key={s._id} style={{ backgroundColor: s.status === 'disable' ? '#f8d7da' : '' }}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedStylists.includes(s._id)}
                    onChange={() => handleCheckboxChange(s._id)}
                  />
                </td>
                <td><img src={`http://localhost:5000/uploads/${s.image}`} alt={s.name} width="50" height="50" style={{ borderRadius: '50%' }} /></td>
                <td>{s.name}</td>
                <td>{s.speciality}</td>
                <td>
                  <span
                    className={`badge ${s.status === 'enable' ? 'bg-success' : 'bg-danger'}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleStatus(s._id, s.status)}
                  >
                    {s.status === 'enable' ? 'Enabled' : 'Disabled'}
                  </span>
                </td>
                <td className="d-flex justify-content-center gap-2">
                  <button className="btn btn-sm btn-info" onClick={() => openView(s._id)}><FaEye /></button>
                  <button className="btn btn-sm btn-warning" onClick={() => openEdit(s._id)}><FaEdit /></button>
                  <button className="btn btn-sm btn-danger" onClick={() => { setStylistToDelete(s._id); setShowDeletePopup(true); }}><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalStylist && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isViewMode ? "View Stylist" : "Edit Stylist"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {isViewMode ? (
                    <div className="text-center">
                      <img
                        src={`http://localhost:5000/uploads/${modalStylist.image}`}
                        alt={modalStylist.name}
                        className="img-thumbnail mb-3"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <p><strong>Name:</strong> {modalStylist.name}</p>
                      <p><strong>Speciality:</strong> {modalStylist.speciality}</p>
                      <p><strong>Status:</strong> {modalStylist.status}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleUpdate}>
                      <input type="text" className="form-control mb-2" name="name" value={modalStylist.name} onChange={handleChange} />
                      <input type="text" className="form-control mb-2" name="speciality" value={modalStylist.speciality} onChange={handleChange} />
                      <input type="file" className="form-control mb-2" onChange={(e) => setNewImage(e.target.files[0])} />
                      <button type="submit" className="btn btn-success">Save</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {showDeletePopup && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
                  <button className="btn btn-danger" disabled={selectedStylists.length === 0} onClick={handleBulkDelete}>Delete Selected</button>
                  <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ManageStylist;
