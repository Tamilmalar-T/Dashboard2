
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Alert, Spinner } from "react-bootstrap";
// import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";

// const ManageBanner = () => {
//   const [banners, setBanners] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");

//   const [modalBanner, setModalBanner] = useState(null);
//   const [isViewMode, setIsViewMode] = useState(true);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [bannerToDelete, setBannerToDelete] = useState(null);

//   useEffect(() => {
//     fetchBanners();
//   }, []);

//   const fetchBanners = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/banner");
//       const bannerData = Array.isArray(res.data) ? res.data : [res.data];
//       setBanners(bannerData);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching banners:", err);
//       setError("Failed to load banners.");
//       setLoading(false);
//     }
//   };

//   const filteredBanners = banners.filter((b) =>
//     b.title.toLowerCase().includes(search.toLowerCase()) ||
//     b.subtitle.toLowerCase().includes(search.toLowerCase()) ||
//     b.buttonText?.toLowerCase().includes(search.toLowerCase())
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentBanners = filteredBanners.slice(startIndex, endIndex);
//   const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);

//   const handlePageChange = (direction) => {
//     if (direction === "next" && currentPage < totalPages) setCurrentPage(currentPage + 1);
//     if (direction === "prev" && currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const openView = (banner) => {
//     setModalBanner(banner);
//     setIsViewMode(true);
//   };

//   const openEdit = (banner) => {
//     setModalBanner({ ...banner, newImage: null });
//     setIsViewMode(false);
//   };

//   const closeModal = () => {
//     setModalBanner(null);
//   };

//   const handleChange = (e) => {
//     setModalBanner({ ...modalBanner, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("title", modalBanner.title);
//       formData.append("subtitle", modalBanner.subtitle);
//       formData.append("buttonText", modalBanner.buttonText);
//       if (modalBanner.newImage) {
//         formData.append("image", modalBanner.newImage);
//       }

//       await axios.post(
//         `http://localhost:5000/api/banner/update/${modalBanner._id}`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       await fetchBanners();
//       setMessage("Banner updated successfully.");
//       setModalBanner(null);
//     } catch (error) {
//       console.error("Update failed", error);
//       setError("Failed to update banner.");
//     }
//   };

//   const handleDelete = (banner) => {
//     setBannerToDelete(banner);
//     setShowDeletePopup(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/banner/${bannerToDelete._id}`);
//       setBanners(banners.filter((b) => b._id !== bannerToDelete._id));
//       setMessage("Banner deleted successfully.");
//       setShowDeletePopup(false);
//     } catch (err) {
//       console.error("Delete failed", err);
//       setError("Failed to delete banner.");
//     }
//   };

//   const exportToCSV = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredBanners);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Banners");
//     const csvData = XLSX.write(wb, { bookType: "csv", type: "array" });
//     saveAs(new Blob([csvData], { type: "text/csv;charset=utf-8;" }), "banners.csv");
//   };

//   const exportToExcel = () => {
//     const ws = XLSX.utils.json_to_sheet(filteredBanners);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Banners");
//     const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
//     saveAs(new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     }), "banners.xlsx");
//   };

//   return (
//     <div className="container mt-4">
//       <div className="card p-3">
//         <div className="d-flex justify-content-between align-items-center flex-wrap">
//           <div>
//             <h4>Manage Banners</h4>
//             <p className="text-muted">Search, edit or delete banners</p>
//           </div>

//           <div className="position-relative" style={{ maxWidth: "300px" }}>
//             <input
//               type="text"
//               className="form-control ps-5"
//               placeholder="Search banners..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//             />
//             <FaSearch
//               className="position-absolute"
//               style={{ top: "50%", left: "10px", transform: "translateY(-50%)", color: "#aaa" }}
//             />
//           </div>

//           <div className="d-flex gap-2 mt-2 mt-md-0">
//             <button className="btn btn-outline-secondary" onClick={exportToCSV}>📄</button>
//             <button className="btn btn-outline-secondary" onClick={exportToExcel}>📊</button>
//             <button className="btn btn-outline-secondary" onClick={() => window.print()}>🖨️</button>
//           </div>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-end align-items-center gap-2 mt-3">
//           <select
//             className="form-select form-select-sm w-auto"
//             value={itemsPerPage}
//             onChange={(e) => {
//               setItemsPerPage(parseInt(e.target.value));
//               setCurrentPage(1);
//             }}
//           >
//             {[5, 10, 15, 20].map((n) => (
//               <option key={n} value={n}>{n} per page</option>
//             ))}
//           </select>
//           <span>{startIndex + 1}-{Math.min(endIndex, filteredBanners.length)} of {filteredBanners.length}</span>
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>‹</button>
//           <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("next")} disabled={endIndex >= filteredBanners.length}>›</button>
//         </div>

//         {loading ? (
//           <Spinner animation="border" />
//         ) : (
//           <>
//             {message && <Alert variant="success">{message}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}

//             <Table bordered hover responsive>
//               <thead>
//                 <tr>
//                   <th>Title</th>
//                   <th>Subtitle</th>
//                   <th>Button Text</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentBanners.map((b, index) => (
//                   <tr key={index}>
//                     <td>{b.title}</td>
//                     <td>{b.subtitle}</td>
//                     <td>{b.buttonText}</td>
//                     <td>
//                       {b.image ? (
//                         <img src={`http://localhost:5000/uploads/${b.image}`} alt="Banner" style={{ width: "100px" }} />
//                       ) : "No Image"}
//                     </td>
//                     <td className="d-flex gap-2 justify-content-center">
//                       <FaEye className="text-info" onClick={() => openView(b)} />
//                       <FaEdit className="text-warning" onClick={() => openEdit(b)} />
//                       <FaTrash className="text-danger" onClick={() => handleDelete(b)} />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </>
//         )}

//         {/* Modal View/Edit */}
//         {modalBanner && (
//           <div className="modal show fade d-block" tabIndex="-1">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">{isViewMode ? "View Banner" : "Edit Banner"}</h5>
//                   <button type="button" className="btn-close" onClick={closeModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   {isViewMode ? (
//                     <>
//                       <p><strong>Title:</strong> {modalBanner.title}</p>
//                       <p><strong>Subtitle:</strong> {modalBanner.subtitle}</p>
//                       <p><strong>Button:</strong> {modalBanner.buttonText}</p>
//                       {modalBanner.image && (
//                         <img src={`http://localhost:5000/uploads/${modalBanner.image}`} alt="Banner" style={{ width: "100%" }} />
//                       )}
//                     </>
//                   ) : (
//                     <form onSubmit={handleUpdate}>
//                       <input type="text" className="form-control mb-2" name="title" value={modalBanner.title} onChange={handleChange} required />
//                       <input type="text" className="form-control mb-2" name="subtitle" value={modalBanner.subtitle} onChange={handleChange} required />
//                       <input type="text" className="form-control mb-2" name="buttonText" value={modalBanner.buttonText} onChange={handleChange} required />
                      
//                       <div className="mb-2">
//                         <label>Current Image:</label><br />
//                         {modalBanner.image && (
//                           <img src={`http://localhost:5000/uploads/${modalBanner.image}`} alt="Banner" style={{ width: "100%" }} />
//                         )}
//                       </div>

//                       <div className="mb-3">
//                         <label>Upload New Image:</label>
//                         <input
//                           type="file"
//                           accept="image/*"
//                           className="form-control"
//                           onChange={(e) => setModalBanner({ ...modalBanner, newImage: e.target.files[0] })}
//                         />
//                         {modalBanner.newImage && (
//                           <div className="mt-2">
//                             <strong>Selected:</strong> {modalBanner.newImage.name}
//                           </div>
//                         )}
//                       </div>

//                       <button type="submit" className="btn btn-success">Save Changes</button>
//                     </form>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Delete Popup */}
//         {showDeletePopup && (
//           <div className="modal show fade d-block" tabIndex="-1">
//             <div className="modal-dialog modal-dialog-centered">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title">Confirm Delete</h5>
//                   <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <p>Are you sure you want to delete banner: <strong>{bannerToDelete?.title}</strong>?</p>
//                 </div>
//                 <div className="modal-footer">
//                   <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
//                   <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default ManageBanner;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Alert, Spinner } from "react-bootstrap";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

const ManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [modalBanner, setModalBanner] = useState(null);
  const [isViewMode, setIsViewMode] = useState(true);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [bannerToDelete, setBannerToDelete] = useState(null);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/banner");
      const bannerData = Array.isArray(res.data) ? res.data : [res.data];
      setBanners(bannerData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching banners:", err);
      setError("Failed to load banners.");
      setLoading(false);
    }
  };

  const filteredBanners = banners.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.subtitle.toLowerCase().includes(search.toLowerCase()) ||
    b.buttonText?.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBanners = filteredBanners.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBanners.length / itemsPerPage);

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) setCurrentPage(currentPage + 1);
    if (direction === "prev" && currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const openView = (banner) => {
    setModalBanner(banner);
    setIsViewMode(true);
  };

  const openEdit = (banner) => {
    setModalBanner({ ...banner, newImage: null });
    setIsViewMode(false);
  };

  const closeModal = () => {
    setModalBanner(null);
  };

  const handleChange = (e) => {
    setModalBanner({ ...modalBanner, [e.target.name]: e.target.value });
  };

  const handleUpdateBanner = async () => {
    if (!modalBanner) return;

    const formData = new FormData();
    formData.append("title", modalBanner.title);
    formData.append("subtitle", modalBanner.subtitle);
    formData.append("buttonText", modalBanner.buttonText);
    if (modalBanner.newImage instanceof File) {
      formData.append("image", modalBanner.newImage);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/banner/${modalBanner._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchBanners();
      closeModal();
      setMessage("Banner updated successfully.");
    } catch (error) {
      console.error("Error updating banner:", error);
      setError("Failed to update banner.");
    }
  };

  const handleDelete = (banner) => {
    setBannerToDelete(banner);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/banner/${bannerToDelete._id}`);
      setBanners(banners.filter((b) => b._id !== bannerToDelete._id));
      setMessage("Banner deleted successfully.");
      setShowDeletePopup(false);
    } catch (err) {
      console.error("Delete failed", err);
      setError("Failed to delete banner.");
    }
  };

  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBanners);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Banners");
    const csvData = XLSX.write(wb, { bookType: "csv", type: "array" });
    saveAs(new Blob([csvData], { type: "text/csv;charset=utf-8;" }), "banners.csv");
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredBanners);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Banners");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    }), "banners.xlsx");
  };

  return (
    <div className="container mt-4">
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h4>Manage Banners</h4>
            <p className="text-muted">Search, edit or delete banners</p>
          </div>

          <div className="position-relative" style={{ maxWidth: "300px" }}>
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search banners..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <FaSearch
              className="position-absolute"
              style={{ top: "50%", left: "10px", transform: "translateY(-50%)", color: "#aaa" }}
            />
          </div>

          <div className="d-flex gap-2 mt-2 mt-md-0">
            <button className="btn btn-outline-secondary" onClick={exportToCSV}>📄</button>
            <button className="btn btn-outline-secondary" onClick={exportToExcel}>📊</button>
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
            {[5, 10, 15, 20].map((n) => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
          <span>{startIndex + 1}-{Math.min(endIndex, filteredBanners.length)} of {filteredBanners.length}</span>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("prev")} disabled={currentPage === 1}>‹</button>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => handlePageChange("next")} disabled={endIndex >= filteredBanners.length}>›</button>
        </div>

        {loading ? (
          <Spinner animation="border" />
        ) : (
          <>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subtitle</th>
                  <th>Button Text</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBanners.map((b, index) => (
                  <tr key={index}>
                    <td>{b.title}</td>
                    <td>{b.subtitle}</td>
                    <td>{b.buttonText}</td>
                    <td>
                      {b.image ? (
                        <img src={`http://localhost:5000/uploads/${b.image}`} alt="Banner" style={{ width: "100px" }} />
                      ) : "No Image"}
                    </td>
                    <td className="d-flex gap-2 justify-content-center">
                      <FaEye className="text-info" onClick={() => openView(b)} />
                      <FaEdit className="text-warning" onClick={() => openEdit(b)} />
                      <FaTrash className="text-danger" onClick={() => handleDelete(b)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}

        {/* Modal View/Edit */}
        {modalBanner && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{isViewMode ? "View Banner" : "Edit Banner"}</h5>
                  <button type="button" className="btn-close" onClick={closeModal}></button>
                </div>
                <div className="modal-body">
                  {isViewMode ? (
                    <>
                      <p><strong>Title:</strong> {modalBanner.title}</p>
                      <p><strong>Subtitle:</strong> {modalBanner.subtitle}</p>
                      <p><strong>Button:</strong> {modalBanner.buttonText}</p>
                      {modalBanner.image && (
                        <img src={`http://localhost:5000/uploads/${modalBanner.image}`} alt="Banner" style={{ width: "100%" }} />
                      )}
                    </>
                  ) : (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdateBanner(); }}>
                      <input type="text" className="form-control mb-2" name="title" value={modalBanner.title} onChange={handleChange} required />
                      <input type="text" className="form-control mb-2" name="subtitle" value={modalBanner.subtitle} onChange={handleChange} required />
                      <input type="text" className="form-control mb-2" name="buttonText" value={modalBanner.buttonText} onChange={handleChange} required />
                      
                      <div className="mb-2">
                        <label>Current Image:</label><br />
                        {modalBanner.image && (
                          <img src={`http://localhost:5000/uploads/${modalBanner.image}`} alt="Banner" style={{ width: "100%" }} />
                        )}
                      </div>

                      <div className="mb-3">
                        <label>Upload New Image:</label>
                        <input
                          type="file"
                          accept="image/*"
                          className="form-control"
                          onChange={(e) => setModalBanner({ ...modalBanner, newImage: e.target.files[0] })}
                        />
                        {modalBanner.newImage && (
                          <div className="mt-2">
                            <strong>Selected:</strong> {modalBanner.newImage.name}
                          </div>
                        )}
                      </div>

                      <button type="submit" className="btn btn-success">Save Changes</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Popup */}
        {showDeletePopup && (
          <div className="modal show fade d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button type="button" className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete banner: <strong>{bannerToDelete?.title}</strong>?</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete}>Yes, Delete</button>
                  <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageBanner;
