

// import React, { useState } from "react";
// import axios from "axios";
// import "./Addform.css";

// const AddBanner = () => {
//   const [title, setTitle] = useState("");
//   const [subtitle, setSubtitle] = useState("");
//   const [buttonText, setButtonText] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please select a banner image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("subtitle", subtitle);
//     formData.append("buttonText", buttonText);
//     formData.append("image", image);

//     try {
//       await axios.post("http://localhost:5000/api/banner", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Banner added successfully!");
//       setTitle("");
//       setSubtitle("");
//       setButtonText("");
//       setImage(null);
//       document.getElementById("imageInput").value = null;
//     } catch (error) {
//       console.error("Error uploading banner:", error);
//       alert("Failed to upload banner.");
//     }
//   };

//   return (
//     <div className="new-user-form">
//       <h4 className="mt-3">Add Banner</h4>
//       <p>Use the below form to add a new banner</p>

//       <form onSubmit={handleSubmit}>
//         {/* Row 1 */}
//         <div className="row">
//           <div className="col-md-6">
//             <label className="form-label">Banner Title</label>
//             <input
//               type="text"
//               className="form-control"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter banner title"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Banner Subtitle</label>
//             <input
//               type="text"
//               className="form-control"
//               value={subtitle}
//               onChange={(e) => setSubtitle(e.target.value)}
//               placeholder="Enter banner subtitle"
//               required
//             />
//           </div>
//         </div>

//         {/* Row 2 */}
//         <div className="row mt-3">
//           <div className="col-md-6">
//             <label className="form-label">Button Text</label>
//             <input
//               type="text"
//               className="form-control"
//               value={buttonText}
//               onChange={(e) => setButtonText(e.target.value)}
//               placeholder="Enter button text"
//               required
//             />
//           </div>

//           <div className="col-md-6">
//             <label className="form-label">Banner Image</label>
//             <input
//               id="imageInput"
//               type="file"
//               className="form-control"
//               accept="image/*"
//               onChange={(e) => setImage(e.target.files[0])}
//               required
//             />
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="buttons mt-3 d-flex justify-content-center">
//           <button
//             type="button"
//             className="cancel-btn me-2"
//             onClick={() => {
//               setTitle("");
//               setSubtitle("");
//               setButtonText("");
//               setImage(null);
//               document.getElementById("imageInput").value = null;
//             }}
//           >
//             Cancel
//           </button>
//           <button type="submit" className="save-btn">
//             Save
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddBanner;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addform.css";

const AddBanner = () => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setError("Please select a banner image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("buttonText", buttonText);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/banner", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Banner added successfully!");
      setError("");
      setTitle("");
      setSubtitle("");
      setButtonText("");
      setImage(null);
      document.getElementById("imageInput").value = null;
    } catch (error) {
      console.error("Error uploading banner:", error);
      setError("Failed to upload banner.");
      setMessage("");
    }
  };

  // Auto-hide alerts after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  return (
    <div className="new-user-form">
      <h4 className="mt-3">Add Banner</h4>
      <p>Use the below form to add a new banner</p>

      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Banner Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter banner title"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Banner Subtitle</label>
            <input
              type="text"
              className="form-control"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Enter banner subtitle"
              required
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <label className="form-label">Button Text</label>
            <input
              type="text"
              className="form-control"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Enter button text"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Banner Image</label>
            <input
              id="imageInput"
              type="file"
              className="form-control"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
        </div>

        <div className="buttons mt-3 d-flex justify-content-center">
          <button
            type="button"
            className="cancel-btn me-2"
            onClick={() => {
              setTitle("");
              setSubtitle("");
              setButtonText("");
              setImage(null);
              setMessage("");
              setError("");
              document.getElementById("imageInput").value = null;
            }}
          >
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBanner;
