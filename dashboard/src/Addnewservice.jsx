
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';

// // import './Addform.css';

// // const Addnewservice = () => {
// //   const [form, setForm] = useState({
// //     category: '',
// //     name: '',
// //     price: '',
// //     offerPrice: '',
// //     description: ''
// //   });

// //   const [categories, setCategories] = useState([]);
// //   const [image, setImage] = useState(null);
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');

// //   // Fetch categories from backend
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await axios.get('http://localhost:5000/api/categories');
// //         setCategories(res.data);
// //       } catch (err) {
// //         setError('Failed to load categories');
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm({ ...form, [name]: value });
// //   };

// //   const handleImageChange = (e) => {
// //     setImage(e.target.files[0]);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const formData = new FormData();
// //     Object.keys(form).forEach(key => formData.append(key, form[key]));
// //     formData.append('image', image);

// //     try {
// //       await axios.post('http://localhost:5000/api/services', formData);
// //       setMessage('Service added successfully!');
// //       setError('');
// //       setForm({
// //         category: '',
// //         name: '',
// //         price: '',
// //         offerPrice: '',
// //         description: ''
// //       });
// //       setImage(null);
// //       alert('Service added successfully!');
// //     } catch (err) {
// //       console.error(err);
// //       setError('Failed to add service.');
// //       setMessage('');
// //     }
// //   };

// //   return (
// //     <div className="new-user-form">
// //       <h3>New Service</h3>
// //       <p>Use the form below to add a new service</p>
// //       {message && <div className="success">{message}</div>}
// //       {error && <div className="error">{error}</div>}

// //       <form onSubmit={handleSubmit}>
// //         <div className="row">
// //           <div>
// //             <label>Category</label>
// //             <select
// //               name="category"
// //               value={form.category}
// //               onChange={handleChange}
// //               required
// //             >
// //               <option value="">Select Category</option>
// //               {categories.map(cat => (
// //                 <option key={cat._id} value={cat.name}>{cat.name}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <div>
// //             <label>Service Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={form.name}
// //               onChange={handleChange}
// //               placeholder="Enter service name"
// //               required
// //             />
// //           </div>
// //         </div>

// //         <div className="row">
// //           <div>
// //             <label>Price (₹)</label>
// //             <input
// //               type="number"
// //               name="price"
// //               value={form.price}
// //               onChange={handleChange}
// //               placeholder="Enter original price"
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label>Offer Price (₹)</label>
// //             <input
// //               type="number"
// //               name="offerPrice"
// //               value={form.offerPrice}
// //               onChange={handleChange}
// //               placeholder="Enter discounted price"
// //             />
// //           </div>
// //         </div>

// //         <div className="row">
// //           <div>
// //             <label>Description</label>
// //             <input
// //               type="text"
// //               name="description"
// //               value={form.description}
// //               onChange={handleChange}
// //               placeholder="Brief about the service"
// //               required
// //             />
// //           </div>
// //           <div className="full-width">
// //             <label>Upload Image</label>
// //             <input
// //               type="file"
// //               name="image"
// //               onChange={handleImageChange}
// //               accept="image/*"
// //               required
// //             />
// //           </div>
// //         </div>

// //         <div className="buttons my-5 d-flex justify-content-center">
// //           <button type="button" className="cancel-btn">Cancel</button>
// //           <button type="submit" className="save-btn">Save</button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Addnewservice;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Addform.css';

// const Addnewservice = () => {
//   const [form, setForm] = useState({
//     category: '',
//     name: '',
//     price: '',
//     offerPrice: '',
//     description: '',
//     offerValidUntil: ''  // ✅ New Field
//   });

//   const [categories, setCategories] = useState([]);
//   const [image, setImage] = useState(null);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get('http://localhost:5000/api/categories');
//         setCategories(res.data);
//       } catch (err) {
//         setError('Failed to load categories');
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(form).forEach(key => formData.append(key, form[key]));
//     formData.append('image', image);

//     try {
//       await axios.post('http://localhost:5000/api/services', formData);
//       setMessage('Service added successfully!');
//       setError('');
//       setForm({
//         category: '',
//         name: '',
//         price: '',
//         offerPrice: '',
//         description: '',
//         offerValidUntil: '' // reset
//       });
//       setImage(null);
//       alert('Service added successfully!');
//     } catch (err) {
//       console.error(err);
//       setError('Failed to add service.');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="new-user-form">
//       <h3>New Service</h3>
//       <p>Use the form below to add a new service</p>
//       {message && <div className="success">{message}</div>}
//       {error && <div className="error">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div>
//             <label>Category</label>
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Category</option>
//               {categories.map(cat => (
//                 <option key={cat._id} value={cat.name}>{cat.name}</option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label>Service Name</label>
//             <input
//               type="text"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//               placeholder="Enter service name"
//               required
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <label>Price (₹)</label>
//             <input
//               type="number"
//               name="price"
//               value={form.price}
//               onChange={handleChange}
//               placeholder="Enter original price"
//               required
//             />
//           </div>
//           <div>
//             <label>Offer Price (₹)</label>
//             <input
//               type="number"
//               name="offerPrice"
//               value={form.offerPrice}
//               onChange={handleChange}
//               placeholder="Enter discounted price"
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <label>Description</label>
//             <input
//               type="text"
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               placeholder="Brief about the service"
//               required
//             />
//           </div>
          
//         </div>

//         <div className="row">
//           <div className="full-width">
//             <label>Upload Image</label>
//             <input
//               type="file"
//               name="image"
//               onChange={handleImageChange}
//               accept="image/*"
//               required
//             />
//           </div>
//         </div>

//         <div className="buttons my-5 d-flex justify-content-center">
//           <button type="button" className="cancel-btn">Cancel</button>
//           <button type="submit" className="save-btn">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Addnewservice;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addform.css';

const Addnewservice = () => {
  const [form, setForm] = useState({
    category: '',
    name: '',
    price: '',
    offerPrice: '',
    description: '',
    offerValidUntil: ''
  });

  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/categories');
        setCategories(res.data);
      } catch (err) {
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

  // Automatically hide success/error messages after 5 seconds
  useEffect(() => {
    if (message || error) {
      const timer = setTimeout(() => {
        setMessage('');
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));
    formData.append('image', image);

    try {
      await axios.post('http://localhost:5000/api/services', formData);
      setMessage('Service added successfully!');
      setError('');
      setForm({
        category: '',
        name: '',
        price: '',
        offerPrice: '',
        description: '',
        offerValidUntil: ''
      });
      setImage(null);
    } catch (err) {
      console.error(err);
      setError('Failed to add service.');
      setMessage('');
    }
  };

  return (
    <div className="new-user-form">
      <h3>New Service</h3>
      <p>Use the form below to add a new service</p>

      {message && <div className="success alert alert-success">{message}</div>}
      {error && <div className="error alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter service name"
              required
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter original price"
              required
            />
          </div>
          <div>
            <label>Offer Price (₹)</label>
            <input
              type="number"
              name="offerPrice"
              value={form.offerPrice}
              onChange={handleChange}
              placeholder="Enter discounted price"
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Brief about the service"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="full-width">
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              accept="image/*"
              required
            />
          </div>
        </div>

        <div className="buttons my-5 d-flex justify-content-center">
          <button type="button" className="cancel-btn">Cancel</button>
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Addnewservice;
