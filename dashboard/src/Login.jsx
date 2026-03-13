import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Add this
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); // ✅ Hook to navigate
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await axios.post(`http://localhost:4455/api/user/${endpoint}`, form);
      alert(res.data.message || "Success");

      if (isLogin) {
        localStorage.setItem("token", res.data.token);
        navigate('/booking'); // ✅ Navigate after login
      } else {
        setIsLogin(true);
        setForm({ name: "", email: "", password: "", phone: "" });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Something went wrong";
      alert(errorMsg);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>{isLogin ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <p>
          {isLogin ? "New user?" : "Already registered?"}{" "}
          <button type="button" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
