// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../src/Store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(form));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
        <br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <br />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
