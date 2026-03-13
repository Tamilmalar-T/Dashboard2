
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // ✅ Add this

// const AdminLogin = () => {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate(); // ✅ Hook to navigate

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/admin/login', form);
//       setMessage(res.data.message);

//       // Save token/admin info
//       localStorage.setItem('adminToken', res.data.token);

//       // ✅ Navigate to dashboard
//       navigate('/dashboard');
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: '400px' }}>
//       <h3 className="text-center mb-4">Admin Login</h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input type="text" name="email" className="form-control" onChange={handleChange} />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input type="password" name="password" className="form-control" onChange={handleChange} />
//         </div>
//         <button className="btn btn-primary w-100">Login</button>
//       </form>
//       {message && <div className="alert alert-info mt-3">{message}</div>}
//     </div>
//   );
// };

// export default AdminLogin;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Make sure this file exists and is styled as needed

export default function AdminLogin() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  setMsg("");

  try {
    const res = await axios.post('http://localhost:5000/api/admin/login', form);

    localStorage.setItem("adminToken", res.data.token);
    navigate("/dashboard"); // ✅ Redirect to dashboard
  } catch (err) {
    const error = err.response?.data?.message || "Login failed";
    setMsg(error);
  }
};

//   new
//   localStorage.setItem('adminToken', response.data.token);
// navigate('/dashboard');


  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Left branding */}
        <div className="login-left">
          <h1 className="brand">SALONCLUB<br /><span>WELCOME</span></h1>
          <p className="tagline">Make your own style</p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
            alt="Admin login"
            className="login-img"
          />
        </div>

        {/* Right login form */}
        <div className="login-right">
          <form className="login-form" onSubmit={handleLogin}>
            <h2>Log in as admin</h2>
            {msg && <div className="error-msg">{msg}</div>}

            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="admin@gmail.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            {msg.toLowerCase().includes("user") && (
              <p className="input-error">Invalid user name</p>
            )}

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="admin123"
              value={form.password}
              onChange={handleChange}
              required
            />
            {msg.toLowerCase().includes("password") && (
              <p className="input-error">Invalid password</p>
            )}

            <button type="submit" className="login-btn">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}
