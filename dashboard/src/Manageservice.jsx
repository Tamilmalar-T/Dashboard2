

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ManageUser.css";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// const ManageService = () => {
//   const [services, setServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [modalService, setModalService] = useState(null);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [deleteServiceId, setDeleteServiceId] = useState(null);
//   const [isViewMode, setIsViewMode] = useState(false);
//   const [selectedServices, setSelectedServices] = useState([]); // FIXED

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/services");
//       setServices(res.data);
//     } catch (err) {
//       console.error("Failed to fetch services:", err);
//     }
//   };

//  const filteredServices = services.filter((s) => {
//   const q = search.trim().toLowerCase();
//   if (!q) return true; // no search => keep all

//   return [
//     s.name,
//     s.category,
//     s.description,
//     s.status,
//     s.price,
//     s.offerPrice,
//   ]
//     .map((v) => String(v ?? '').toLowerCase())
//     .some((v) => v.includes(q));
// });


//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentServices = filteredServices.slice(startIndex, endIndex);

//   const handlePageChange = (direction) => {
//     if (direction === "prev" && currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     } else if (direction === "next" && endIndex < filteredServices.length) {
//       setCurrentPage((prev) => prev + 1);
//     }
//   };

//   const handleDelete = (id) => {
//     setDeleteServiceId(id);
//     setShowDeletePopup(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       if (deleteServiceId) {
//         await axios.delete(`http://localhost:5000/api/services/${deleteServiceId}`);
//         setServices(services.filter((s) => s._id !== deleteServiceId));
//         setDeleteServiceId(null);
//       } else if (selectedServices.length > 0) {
//         for (let id of selectedServices) {
//           await axios.delete(`http://localhost:5000/api/services/${id}`);
//         }
//         setServices(services.filter((s) => !selectedServices.includes(s._id)));
//         setSelectedServices([]);
//       }
//       setShowDeletePopup(false);
//       alert("Service(s) deleted successfully.");
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Delete failed.");
//     }
//   };

//     const handleBulkDelete = async () => {
//     try {
//       for (const id of selectedServices) {
//         await axios.delete(`http://localhost:5000/api/services/${id}`);
//       }
//       setStylists((prev) => prev.filter((s) => !selectedServices.includes(s._id)));
//       setSelectedServices([]);
//       setShowDeletePopup(false);
//     } catch (err) {
//       console.error('Failed bulk delete:', err);
//     }
//   };

//   const openView = (service) => {
//     setIsViewMode(true);
//     setModalService({ ...service });
//   };

//   const openEdit = (service) => {
//     setIsViewMode(false);
//     setModalService({ ...service });
//   };

//   const closeModal = () => {
//     setModalService(null);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setModalService((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/services/${modalService._id}`, modalService);
//       fetchServices();
//       setModalService(null);
//       alert("Service updated successfully.");
//     } catch (err) {
//       console.error(err);
//       alert("Update failed.");
//     }
//   };

//   const toggleStatus = async (id, currentStatus) => {
//     const newStatus = currentStatus === "enable" ? "disable" : "enable";
//     try {
//       await axios.put(`http://localhost:5000/api/services/${id}`, { status: newStatus });
//       setServices((prev) =>
//         prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
//       );
//       alert(`Service ${newStatus === "enable" ? "enabled" : "disabled"} successfully.`);
//     } catch (err) {
//       console.error("Failed to toggle status:", err);
//       alert("Failed to update status");
//     }
//   };

//   const handleCheckboxChange = (id) => {
//     setSelectedServices((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedServices(currentServices.map((s) => s._id));
//     } else {
//       setSelectedServices([]);
//     }
//   };


// // Helper: Get data to export based on selection
// const getExportData = () => {
//   const data = selectedServices.length > 0
//     ? filteredServices.filter((s) => selectedServices.includes(s._id))
//     : filteredServices;

//   // Export only the required columns
//   return data.map(({ name, category, price, offerPrice, description, status }) => ({
//     Name: name,
//     Category: category,
//     Price: price,
//     "Offer Price": offerPrice,
//     Description: description,
//     Status: status,
//   }));
// };

//   const exportToCSV = () => {
//   const dataToExport = getExportData();
//   if (dataToExport.length === 0) {
//     alert("No services to export!");
//     return;
//   }
//   const ws = XLSX.utils.json_to_sheet(dataToExport);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Services");
//   const csvData = XLSX.write(wb, { bookType: "csv", type: "array" });
//   const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
//   saveAs(blob, "services.csv");
// };
// const exportToExcel = () => {
//   const dataToExport = getExportData();
//   if (dataToExport.length === 0) {
//     alert("No services to export!");
//     return;
//   }
//   const ws = XLSX.utils.json_to_sheet(dataToExport);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Services");
//   const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//   const blob = new Blob([excelBuffer], {
//     type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//   });
//   saveAs(blob, "services.xlsx");
// };




//   return (
//     <div className="container mt-2">
//       <div className="card p-3">
//         <div className="top-controls d-flex justify-content-between align-items-center flex-wrap gap-3">
//           <div>
//             <h3>Manage Services</h3>
//             <p className="text-muted mb-0">View or manage service list</p>
//           </div>

//           <input
//             type="text"
//             className="form-control search-box"
//             placeholder="Search by service name"
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setCurrentPage(1);
//             }}
//           />

//           <div className="d-flex gap-2">
//             <button className="btn btn-outline-secondary" onClick={exportToCSV}>📄</button>
//             <button className="btn btn-outline-secondary" onClick={exportToExcel}>📊</button>
//             <button className="btn btn-outline-secondary" onClick={() => window.print()}>🖨️</button>
//           </div>
//         </div>

//         <div className="pagination-bar d-flex justify-content-end align-items-center gap-3 mt-3">
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
//             <option value={20}>20 per page</option>
//           </select>

//           <span>
//             {startIndex + 1}–{Math.min(endIndex, filteredServices.length)} of {filteredServices.length}
//           </span>

//           <button
//             className="btn btn-sm btn-outline-secondary"
//             onClick={() => handlePageChange("prev")}
//             disabled={currentPage === 1}
//           >
//             &#8249;
//           </button>
//           <button
//             className="btn btn-sm btn-outline-secondary"
//             onClick={() => handlePageChange("next")}
//             disabled={endIndex >= filteredServices.length}
//           >
//             &#8250;
//           </button>
//         </div>

//         <div className="table-responsive mt-3">
//           <table className="table table-bordered text-center align-middle">
//             <thead className="table-light">
//               <tr>
//                 <th>
//                   <input
//                     type="checkbox"
//                     checked={selectedServices.length === currentServices.length && currentServices.length > 0}
//                     onChange={handleSelectAll}
//                   />
//                 </th>
//                 <th>Service Name</th>
//                 <th>Category</th>
//                 <th>Price</th>
//                 <th>Offer Price</th>
//                 <th>Description</th>
//                 <th>Image</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentServices.length === 0 ? (
//                 <tr><td colSpan="9">No services found.</td></tr>
//               ) : (
//                 currentServices.map((s) => (
//                   <tr key={s._id} style={{ backgroundColor: s.status === 'disable' ? '#f8d7da' : 'inherit' }}>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedServices.includes(s._id)}
//                         onChange={() => handleCheckboxChange(s._id)}
//                       />
//                     </td>
//                     <td>{s.name}</td>
//                     <td>{s.category}</td>
//                     <td>₹{s.price}</td>
//                     <td>₹{s.offerPrice}</td>
//                     <td>{s.description}</td>
//                     <td>
//                       {s.image ? (
//                         <img
//                           src={`http://localhost:5000/api/services/images/${s.image}`}
//                           alt={s.name}
//                           style={{ width: "60px", height: "60px", objectFit: "cover" }}
//                         />
//                       ) : (
//                         "No Image"
//                       )}
//                     </td>
//                     <td>
//                       <span
//                         className={`badge ${s.status === 'enable' ? 'bg-success' : 'bg-danger'}`}
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => toggleStatus(s._id, s.status)}
//                       >
//                         {s.status === 'enable' ? 'Enabled' : 'Disabled'}
//                       </span>
//                     </td>
//                     <td className="actions d-flex justify-content-center gap-2">
//                       <FaEye className="text-info" onClick={() => openView(s)} />
//                       <FaEdit className="text-warning" onClick={() => openEdit(s)} />
//                       <FaTrash className="text-danger" onClick={() => handleDelete(s._id)} />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* View/Edit Modal */}
//       {modalService && (
//         <div className="modal show fade d-block" tabIndex="-1">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{isViewMode ? "View Service" : "Edit Service"}</h5>
//                 <button type="button" className="btn-close" onClick={closeModal}></button>
//               </div>
//               <div className="modal-body">
//                 {isViewMode ? (
//                   <div>
//                     <p><strong>Name:</strong> {modalService.name}</p>
//                     <p><strong>Category:</strong> {modalService.category}</p>
//                     <p><strong>Price:</strong> ₹{modalService.price}</p>
//                     <p><strong>Offer Price:</strong> ₹{modalService.offerPrice}</p>
//                     <p><strong>Description:</strong> {modalService.description}</p>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleUpdate}>
//                     <input type="text" className="form-control mb-2" name="name" value={modalService.name} onChange={handleChange} required />
//                     <input type="text" className="form-control mb-2" name="category" value={modalService.category} onChange={handleChange} required />
//                     <input type="number" className="form-control mb-2" name="price" value={modalService.price} onChange={handleChange} required />
//                     <input type="number" className="form-control mb-2" name="offerPrice" value={modalService.offerPrice} onChange={handleChange} />
//                     <textarea className="form-control mb-2" name="description" value={modalService.description} onChange={handleChange} rows="3" />
//                     <button type="submit" className="btn btn-success">Save Changes</button>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeletePopup && (
//         <div className="modal show fade d-block" tabIndex="-1">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Confirm Delete</h5>
//                 <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <p>Are you sure you want to delete {deleteServiceId ? "this service" : "selected services"}?</p>
//               </div>
//               <div className="modal-footer">
//                 <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
//                 <button className="btn btn-danger" disabled={selectedServices.length === 0} onClick={handleBulkDelete}>Delete Selected</button>
 
//                 <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageService;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManageUser.css";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ManageService = () => {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [modalService, setModalService] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);
  const [isViewMode, setIsViewMode] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    }
  };

  const filteredServices = services.filter((s) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return [s.name, s.category, s.description, s.status, s.price, s.offerPrice]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(q));
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentServices = filteredServices.slice(startIndex, endIndex);

  const handlePageChange = (direction) => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    } else if (direction === "next" && endIndex < filteredServices.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleDelete = (id) => {
    setDeleteServiceId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      if (deleteServiceId) {
        await axios.delete(`http://localhost:5000/api/services/${deleteServiceId}`);
        setServices((prev) => prev.filter((s) => s._id !== deleteServiceId));
        setDeleteServiceId(null);
      } else if (selectedServices.length > 0) {
        for (let id of selectedServices) {
          await axios.delete(`http://localhost:5000/api/services/${id}`);
        }
        setServices((prev) => prev.filter((s) => !selectedServices.includes(s._id)));
        setSelectedServices([]);
      }
      setShowDeletePopup(false);
      alert("Service(s) deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Delete failed.");
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (const id of selectedServices) {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
      }
      setServices((prev) => prev.filter((s) => !selectedServices.includes(s._id)));
      setSelectedServices([]);
      setShowDeletePopup(false);
    } catch (err) {
      console.error("Failed bulk delete:", err);
    }
  };

  const openView = (service) => {
    setIsViewMode(true);
    setModalService({ ...service });
  };

  const openEdit = (service) => {
    setIsViewMode(false);
    setModalService({ ...service });
  };

  const closeModal = () => {
    setModalService(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModalService((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/services/${modalService._id}`, modalService);
      fetchServices();
      setModalService(null);
      alert("Service updated successfully.");
    } catch (err) {
      console.error(err);
      alert("Update failed.");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "enable" ? "disable" : "enable";
    try {
      await axios.put(`http://localhost:5000/api/services/${id}`, { status: newStatus });
      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );
      alert(`Service ${newStatus === "enable" ? "enabled" : "disabled"} successfully.`);
    } catch (err) {
      console.error("Failed to toggle status:", err);
      alert("Failed to update status");
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedServices(currentServices.map((s) => s._id));
    } else {
      setSelectedServices([]);
    }
  };

  const getExportData = () => {
    const data = selectedServices.length > 0
      ? filteredServices.filter((s) => selectedServices.includes(s._id))
      : filteredServices;

    return data.map(({ name, category, price, offerPrice, description, status }) => ({
      Name: name,
      Category: category,
      Price: price,
      "Offer Price": offerPrice,
      Description: description,
      Status: status,
    }));
  };

  const exportToCSV = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) return alert("No services to export!");
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Services");
    const csvData = XLSX.write(wb, { bookType: "csv", type: "array" });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "services.csv");
  };

  const exportToExcel = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) return alert("No services to export!");
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Services");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "services.xlsx");
  };

  return (
    <div className="container mt-2">
      <div className="card p-3">
        <div className="top-controls d-flex justify-content-between align-items-center flex-wrap gap-3">
          <div>
            <h3>Manage Services</h3>
            <p className="text-muted mb-0">View or manage service list</p>
          </div>

          <input
            type="text"
            className="form-control search-box"
            placeholder="Search by service name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" onClick={exportToCSV}>📄</button>
            <button className="btn btn-outline-secondary" onClick={exportToExcel}>📊</button>
            <button className="btn btn-outline-secondary" onClick={() => window.print()}>🖨️</button>
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
            {[5, 10, 15, 20].map((n) => <option key={n} value={n}>{n} per page</option>)}
          </select>
          <span>{startIndex + 1}–{Math.min(endIndex, filteredServices.length)} of {filteredServices.length}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>&#8249;</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("next")} disabled={endIndex >= filteredServices.length}>&#8250;</button>
        </div>

        <div className="table-responsive mt-3">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th><input type="checkbox" checked={selectedServices.length === currentServices.length && currentServices.length > 0} onChange={handleSelectAll} /></th>
                <th>Service Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Offer Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentServices.length === 0 ? (
                <tr><td colSpan="9">No services found.</td></tr>
              ) : (
                currentServices.map((s) => (
                  <tr key={s._id} style={{ backgroundColor: s.status === 'disable' ? '#f8d7da' : 'inherit' }}>
                    <td><input type="checkbox" checked={selectedServices.includes(s._id)} onChange={() => handleCheckboxChange(s._id)} /></td>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>₹{s.price}</td>
                    <td>₹{s.offerPrice}</td>
                    <td>{s.description}</td>
                    <td>{s.image ? <img src={`http://localhost:5000/api/services/images/${s.image}`} alt={s.name} style={{ width: "60px", height: "60px", objectFit: "cover" }} /> : "No Image"}</td>
                    <td>
                      <span className={`badge ${s.status === 'enable' ? 'bg-success' : 'bg-danger'}`} style={{ cursor: 'pointer' }} onClick={() => toggleStatus(s._id, s.status)}>
                        {s.status === 'enable' ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="actions d-flex justify-content-center gap-2">
                      <FaEye className="text-info" onClick={() => openView(s)} />
                      <FaEdit className="text-warning" onClick={() => openEdit(s)} />
                      <FaTrash className="text-danger" onClick={() => handleDelete(s._id)} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Modal */}
      {modalService && (
        <div className="modal show fade d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isViewMode ? "View Service" : "Edit Service"}</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {isViewMode ? (
                  <>
                    <p><strong>Name:</strong> {modalService.name}</p>
                    <p><strong>Category:</strong> {modalService.category}</p>
                    <p><strong>Price:</strong> ₹{modalService.price}</p>
                    <p><strong>Offer Price:</strong> ₹{modalService.offerPrice}</p>
                    <p><strong>Description:</strong> {modalService.description}</p>
                  </>
                ) : (
                  <form onSubmit={handleUpdate}>
                    <input type="text" className="form-control mb-2" name="name" value={modalService.name} onChange={handleChange} required />
                    <input type="text" className="form-control mb-2" name="category" value={modalService.category} onChange={handleChange} required />
                    <input type="number" className="form-control mb-2" name="price" value={modalService.price} onChange={handleChange} required />
                    <input type="number" className="form-control mb-2" name="offerPrice" value={modalService.offerPrice} onChange={handleChange} />
                    <textarea className="form-control mb-2" name="description" value={modalService.description} onChange={handleChange} rows="3" />
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
                <p>Are you sure you want to delete {deleteServiceId ? "this service" : "selected services"}?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
                <button className="btn btn-danger" disabled={selectedServices.length === 0} onClick={handleBulkDelete}>Delete Selected</button>
                <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageService;
