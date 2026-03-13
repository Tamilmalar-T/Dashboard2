

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Addform.css';
// import axios from 'axios';

// function AddStylist() {
//   const [form, setForm] = useState({
//     name: "",
//     speciality: "",
//     image: null,
//   });

//   const [message, setMessage] = useState(""); 
//   const [error, setError] = useState("");     
//   const navigate = useNavigate();


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setForm({ ...form, image: e.target.files[0] });
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   const data = new FormData();
//   data.append("name", form.name);
//   data.append("speciality", form.speciality);
//   if (form.image) data.append("image", form.image);

//   try {
//     await axios.post("http://localhost:5000/api/stylists", data);
//     setMessage("Stylist added successfully");
//     setError("");
//     // 👇 Remove the reset below if you don't want to clear the form
//     setForm({ name: "", speciality: "", image: null });
//   } catch (err) {
//     console.error("Add stylist error:", err);
//     setError("Failed to add stylist");
//     setMessage("");
//   }
// };


//   return (
//     <div className="new-user-form">
//       <h3>Add New Stylist</h3>
//       <p>Use the below form to update your profile</p>
//       {message && <div className="success">{message}</div>}
//       {error && <div className="error">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div>
//             <label>Stylist Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               required
//             />

//           </div>
//           <div>
//              <label>Speciality</label>
//         <input
//           type="text"
//           name="speciality"
//           value={form.speciality}
//           onChange={handleChange}
//           required
//         />
//           </div>

//         </div>

//         <div className="row">
//           <div>
            
//         <label>Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           required
          
//         />
//           </div>
         
//         </div>

//         <div className="buttons my-5 d-flex justify-content-center">
//           <button type="button " className="cancel-btn">Cancel</button>
//           <button type="submit" className="save-btn">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddStylist;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Addform.css';
import axios from 'axios';

function AddStylist() {
  const [form, setForm] = useState({
    name: '',
    speciality: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', form.name);
    data.append('speciality', form.speciality);
    if (form.image) data.append('image', form.image);

    try {
      await axios.post('http://localhost:5000/api/stylists', data);
      setMessage('Stylist added successfully');
      setError('');
      setForm({ name: '', speciality: '', image: null });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (err) {
      console.error('Add stylist error:', err);
      setError('Failed to add stylist');
      setMessage('');

      // Optionally hide error after 5 seconds
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };

  return (
    <div className="new-user-form">
      <h3>Add New Stylist</h3>
      <p>Use the below form to update your profile</p>

      {message && <div className="alert alert-success text-center">{message}</div>}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Stylist Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Speciality</label>
            <input
              type="text"
              name="speciality"
              value={form.speciality}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>
        </div>

        <div className="buttons my-5 d-flex justify-content-center">
          <button type="button" className="cancel-btn btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="save-btn btn btn-primary ms-3">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStylist;
