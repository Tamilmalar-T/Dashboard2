

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import * as XLSX from "xlsx";
// import { FaEdit, FaTrash, FaSearch } from "react-icons/fa"; 
// import "./Addform.css";

// const ManageCategory = () => {
//   const [categories, setCategories] = useState([]);
//   const [editId, setEditId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [showDeletePopup, setShowDeletePopup] = useState(false);
//   const [deleteCategoryId, setDeleteCategoryId] = useState(null);

//   // Fetch Categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/categories");
//       setCategories(res.data);
//     } catch (err) {
//       console.error("Failed to fetch categories");
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   // Handle Delete
//   const handleDelete = (id) => {
//     setDeleteCategoryId(id);
//     setShowDeletePopup(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/categories/${deleteCategoryId}`);
//       setMessage("Category deleted successfully!");
//       setShowDeletePopup(false);
//       fetchCategories();
//     } catch (err) {
//       setError("Failed to delete category.");
//     }
//   };

//   const handleBulkDelete = async () => {
//     try {
//       for (let id of selectedCategories) {
//         await axios.delete(`http://localhost:5000/api/categories/${id}`);
//       }
//       setMessage("Selected categories deleted successfully!");
//       setSelectedCategories([]);
//       setShowDeletePopup(false);
//       fetchCategories();
//     } catch (err) {
//       setError("Bulk delete failed.");
//     }
//   };

//   // Handle Edit
//   const handleEdit = (id, name) => {
//     setEditId(id);
//     setEditName(name);
//     setMessage("");
//     setError("");
//   };

//   const handleCancel = () => {
//     setEditId(null);
//     setEditName("");
//   };

//   const handleUpdate = async (id) => {
//     try {
//       if (!editName.trim()) {
//         setError("Category name cannot be empty.");
//         return;
//       }
//       const res = await axios.get("http://localhost:5000/api/categories");

//       setMessage("Category updated successfully!");
//       setEditId(null);
//       fetchCategories();
//     } catch (err) {
//       setError("Failed to update category.");
//     }
//   };

//   // Filtered categories
//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

//   const handlePageChange = (direction) => {
//     if (direction === "next" && currentPage < totalPages) {
//       setCurrentPage((prev) => prev + 1);
//     } else if (direction === "prev" && currentPage > 1) {
//       setCurrentPage((prev) => prev - 1);
//     }
//   };

//   // Select categories
//   const handleCheckboxChange = (id) => {
//     setSelectedCategories((prev) =>
//       prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedCategories(filteredCategories.slice(startIndex, endIndex).map((c) => c._id));
//     } else {
//       setSelectedCategories([]);
//     }
//   };

//   // Export Data
//   const getExportData = () => {
//     const data =
//       selectedCategories.length > 0
//         ? filteredCategories.filter((cat) => selectedCategories.includes(cat._id))
//         : filteredCategories;

//     return data.map((c) => ({ Name: c.name }));
//   };

//   const exportToCSV = () => {
//     const dataToExport = getExportData();
//     if (dataToExport.length === 0) {
//       alert("No categories selected to export!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Categories");
//     XLSX.writeFile(wb, "categories.csv");
//   };

//   const exportToExcel = () => {
//     const dataToExport = getExportData();
//     if (dataToExport.length === 0) {
//       alert("No categories selected to export!");
//       return;
//     }
//     const ws = XLSX.utils.json_to_sheet(dataToExport);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Categories");
//     XLSX.writeFile(wb, "categories.xlsx");
//   };

//   return (
//        <div className="container mt-2">
//            <div className="card p-3 ps-4">
//              <div className="top-controls d-flex justify-content-between align-items-center flex-wrap gap-3">
//      {/* Title Section */}
//      <div >
//        <h4 className="pt-3 mb-0">Manage Users</h4>
//        <p className="text-muted mb-0">View or manage user profiles</p>
//      </div>
   
//      {/* Search Box with Icon */}
//      <div className="position-relative pt-3" style={{ maxWidth: "400px", flexGrow: 1 }}>
//        <input
//          type="text"
//          className="form-control ps-5 search-box"
//          placeholder="Search"
//          value={search}
//          onChange={(e) => {
//            setSearch(e.target.value);
//            setCurrentPage(1);
//          }}
//        />
//        <FaSearch
//          className="position-absolute"
//          style={{
//            top: '65%',
//            left: '350px',
          
//            transform: 'translateY(-50%)',
//            color: '#aaa'
//          }}
//        />
//      </div>

//         {/* Action Buttons */}
//         <div className="d-flex gap-2">
//           <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>
//             📄
//           </button>
//           <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>
//             📊
//           </button>
//           <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>
//             🖨️
//           </button>
//         </div>
//       </div>
//        <div className="pagination-bar d-flex justify-content-end align-items-center gap-3 mt-3">
//             <select
//               className="form-select form-select-sm w-auto"
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setItemsPerPage(parseInt(e.target.value));
//                 setCurrentPage(1);
//               }}
//             >
//               <option value={5}>5 per page</option>
//               <option value={10}>10 per page</option>
//               <option value={15}>15 per page</option>
//               <option value={20}>20 per page</option>
//             </select>

//             <span className="range-text">
//               {startIndex + 1}–{Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length}
//             </span>

//             <button
//               className="btn btn-sm btn-outline-secondary"
//               onClick={() => handlePageChange("prev")}
//               disabled={currentPage === 1}
//             >
//               &#8249;
//             </button>
//             <button
//               className="btn btn-sm btn-outline-secondary"
//               onClick={() => handlePageChange("next")}
//               disabled={endIndex >= filteredCategories.length}
//             >
//               &#8250;
//             </button>
//           </div>

      
     

//       {/* Table */}
//       <table className="table table-bordered text-center">
//         <thead className="table-dark">
//           <tr>
//             <th>
//               <input
//                 type="checkbox"
//                 onChange={handleSelectAll}
//                 checked={
//                   selectedCategories.length ===
//                     filteredCategories.slice(startIndex, endIndex).length &&
//                   filteredCategories.slice(startIndex, endIndex).length > 0
//                 }
//               />
//             </th>
//             <th>Category Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {[...filteredCategories.slice(startIndex, endIndex)].reverse().map((cat) => (
//   <tr key={cat._id}>

//               <td>
//                 <input
//                   type="checkbox"
//                   checked={selectedCategories.includes(cat._id)}
//                   onChange={() => handleCheckboxChange(cat._id)}
//                 />
//               </td>
//               <td>
//                 {editId === cat._id ? (
//                   <input
//                     value={editName}
//                     onChange={(e) => setEditName(e.target.value)}
//                     className="form-control"
//                   />
//                 ) : (
//                   cat.name
//                 )}
//               </td>
//               <td>
//                 {editId === cat._id ? (
//                   <>
//                     <button
//                       className="btn btn-success btn-sm me-2"
//                       onClick={() => handleUpdate(cat._id)}
//                     >
//                       Save
//                     </button>
//                     <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <FaEdit
//                       className="text-warning me-2"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => handleEdit(cat._id, cat.name)}
//                     />
//                     <FaTrash
//                       className="text-danger"
//                       style={{ cursor: "pointer" }}
//                       onClick={() => handleDelete(cat._id)}
//                     />
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>


//       {/* Delete Confirmation */}
//       {showDeletePopup && (
//         <div className="modal show fade d-block">
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5>Confirm Delete</h5>
//                 <button className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
//               </div>
//               <div className="modal-body">Are you sure you want to delete this category?</div>
//               <div className="modal-footer">
//                 <button className="btn btn-danger" onClick={confirmDelete}>
//                   Yes, Delete
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   disabled={selectedCategories.length === 0}
//                   onClick={handleBulkDelete}
//                 >
//                   Delete Selected
//                 </button>
//                 <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//     </div>
//   );
// };

// export default ManageCategory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import "./Addform.css";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = (id) => {
    setDeleteCategoryId(id);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${deleteCategoryId}`);
      setMessage("Category deleted successfully!");
      setShowDeletePopup(false);
      fetchCategories();
    } catch (err) {
      setError("Failed to delete category.");
    }
  };

  const handleBulkDelete = async () => {
    try {
      for (let id of selectedCategories) {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
      }
      setMessage("Selected categories deleted successfully!");
      setSelectedCategories([]);
      setShowDeletePopup(false);
      fetchCategories();
    } catch (err) {
      setError("Bulk delete failed.");
    }
  };

  const handleEdit = (id, name) => {
    setEditId(id);
    setEditName(name);
    setMessage("");
    setError("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName("");
  };

  const handleUpdate = async (id) => {
    try {
      if (!editName.trim()) {
        setError("Category name cannot be empty.");
        return;
      }
      await axios.put(`http://localhost:5000/api/categories/${id}`, { name: editName });
      setMessage("Category updated successfully!");
      setEditId(null);
      fetchCategories();
    } catch (err) {
      setError("Failed to update category.");
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const reversedCategories = [...filteredCategories].reverse(); // ✅ Reversed here
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(reversedCategories.length / itemsPerPage);
  const paginatedCategories = reversedCategories.slice(startIndex, endIndex); // ✅ Paginate reversed list

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedCategories(paginatedCategories.map((c) => c._id));
    } else {
      setSelectedCategories([]);
    }
  };

  const getExportData = () => {
    const data =
      selectedCategories.length > 0
        ? filteredCategories.filter((cat) => selectedCategories.includes(cat._id))
        : filteredCategories;
    return data.map((c) => ({ Name: c.name }));
  };

  const exportToCSV = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) {
      alert("No categories selected to export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categories");
    XLSX.writeFile(wb, "categories.csv");
  };

  const exportToExcel = () => {
    const dataToExport = getExportData();
    if (dataToExport.length === 0) {
      alert("No categories selected to export!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Categories");
    XLSX.writeFile(wb, "categories.xlsx");
  };

  return (
    <div className="container mt-2">
      <div className="card p-3 ps-4">
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
                top: "65%",
                left: "350px",
                transform: "translateY(-50%)",
                color: "#aaa"
              }}
            />
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-outline-secondary" title="Export CSV" onClick={exportToCSV}>
              📄
            </button>
            <button className="btn btn-outline-secondary" title="Export Excel" onClick={exportToExcel}>
              📊
            </button>
            <button className="btn btn-outline-secondary" title="Print" onClick={() => window.print()}>
              🖨️
            </button>
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
            {startIndex + 1}–{Math.min(endIndex, reversedCategories.length)} of {reversedCategories.length}
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
            disabled={endIndex >= reversedCategories.length}
          >
            &#8250;
          </button>
        </div>

        <table className="table table-bordered text-center">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={
                    selectedCategories.length === paginatedCategories.length &&
                    paginatedCategories.length > 0
                  }
                />
              </th>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
  {[...paginatedCategories].reverse().map((cat) => (
    <tr key={cat._id}>
      <td>
        <input
          type="checkbox"
          checked={selectedCategories.includes(cat._id)}
          onChange={() => handleCheckboxChange(cat._id)}
        />
      </td>
      <td>
        {editId === cat._id ? (
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="form-control"
          />
        ) : (
          cat.name
        )}
      </td>
      <td>
        {editId === cat._id ? (
          <>
            <button
              className="btn btn-success btn-sm me-2"
              onClick={() => handleUpdate(cat._id)}
            >
              Save
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <FaEdit
              className="text-warning me-2"
              style={{ cursor: "pointer" }}
              onClick={() => handleEdit(cat._id, cat.name)}
            />
            <FaTrash
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(cat._id)}
            />
          </>
        )}
      </td>
    </tr>
  ))}
</tbody>

        </table>

        {showDeletePopup && (
          <div className="modal show fade d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Confirm Delete</h5>
                  <button className="btn-close" onClick={() => setShowDeletePopup(false)}></button>
                </div>
                <div className="modal-body">Are you sure you want to delete this category?</div>
                <div className="modal-footer">
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                  <button
                    className="btn btn-danger"
                    disabled={selectedCategories.length === 0}
                    onClick={handleBulkDelete}
                  >
                    Delete Selected
                  </button>
                  <button className="btn btn-secondary" onClick={() => setShowDeletePopup(false)}>
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

export default ManageCategory;


