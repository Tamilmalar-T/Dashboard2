
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Addform.css';

// const AddCategory = () => {
//   const [name, setName] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   // Fetch all categories
//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/categories');
//       setCategories(res.data);
//     } catch (err) {
//       console.error('Failed to load categories');
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/categories', { name });
//       setMessage('Category added successfully!');
//       setError('');
//       setName('');
//       fetchCategories(); // Refresh list
//       alert('Category added successfully!');
//     } catch (err) {
//       setError('Category already exists or invalid input.');
//       setMessage('');
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this category?')) return;

//     try {
//       await axios.delete(`http://localhost:5000/api/categories/${id}`);
//       setMessage('Category deleted successfully!');
//       setError('');
//       fetchCategories(); // Refresh list
//     } catch (err) {
//       setError('Failed to delete category.');
//       setMessage('');
//     }
//   };

//   return (
//     <div className="new-user-form">
//       <h3>Add New Category</h3>
//       {message && <div className="success">{message}</div>}
//       {error && <div className="error">{error}</div>}

//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div>
//             <label>Category Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="e.g. Haircut, Facial"
//               required
//             />
//           </div>
//         </div>
//         <div className="buttons my-5 d-flex justify-content-center">
//           <button type="submit" className="save-btn">Save</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCategory;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Addform.css';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to load categories');
    }
  };

  useEffect(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/categories', { name });
      setMessage('Category added successfully!');
      setError('');
      setName('');
      fetchCategories(); // Refresh list
    } catch (err) {
      setError('Category already exists or invalid input.');
      setMessage('');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setMessage('Category deleted successfully!');
      setError('');
      fetchCategories(); // Refresh list
    } catch (err) {
      setError('Failed to delete category.');
      setMessage('');
    }
  };

  return (
    <div className="new-user-form">
      <h3>Add New Category</h3>

      {message && <div className="success alert alert-success">{message}</div>}
      {error && <div className="error alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div>
            <label>Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Haircut, Facial"
              required
            />
          </div>
        </div>
        <div className="buttons my-5 d-flex justify-content-center">
          <button type="submit" className="save-btn">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
