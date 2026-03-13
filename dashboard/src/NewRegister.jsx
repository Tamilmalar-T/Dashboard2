import React, { useState } from "react";
import axios from "axios";

const NewRegister = ({ onRegistered }) => {
  const [form, setForm] = useState({
    username: "",
    empid: "",
    email: "",
    mobileno: "",
    dept_name: "",
    designation: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:4455/user/signup", form);
      alert(data.message || "Registered Successfully");
      onRegistered(); // redirect or change view
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Register New User</h3>
      <form onSubmit={handleRegister}>
        <input type="text" name="username" placeholder="Name" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="empid" placeholder="Employee ID" className="form-control my-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="mobileno" placeholder="Mobile No" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="dept_name" placeholder="Department" className="form-control my-2" onChange={handleChange} required />
        <input type="text" name="designation" placeholder="Designation" className="form-control my-2" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control my-2" onChange={handleChange} required />
        <button className="btn btn-success">Register</button>
      </form>
    </div>
  );
};

export default NewRegister;
