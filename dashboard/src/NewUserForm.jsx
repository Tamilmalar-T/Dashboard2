

// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import './NewUserForm.css'; 

// const NewUserForm = () => {
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors }
//   } = useForm();

//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(''), 5000);
//       return () => clearTimeout(timer); // Cleanup
//     }
//   }, [successMessage]);

//  const onSubmit = async (data) => {
//   if (data.password !== data.confirmPassword) {
//     setServerError('Passwords do not match.');
//     return;
//   }

//   try {
//     // Pre-check for existing contact/email (optional but improves UX)
//     const checkRes = await axios.post('http://localhost:5000/api/users/check', {
//       email: data.email,
//       contact: data.contact,
//     });

//     if (checkRes.data.exists) {
//       setServerError(checkRes.data.message);
//       return;
//     }

//     // Proceed with user creation
//     const res = await axios.post('http://localhost:5000/api/users/add', data);
//     setSuccessMessage(res.data.message || 'User added successfully!');
//     setServerError('');
//     reset();
//   } catch (err) {
//     setServerError(err.response?.data?.error || 'Something went wrong.');
//   }
// };


//   return (
//     <div className="new-user-form">
//       <h4 className="mt-3">New User</h4>
//       <p>Use the below form to update your profile</p>

//       {serverError && <div className="error text-danger">{serverError}</div>}
//       {successMessage && (
//         <div className="alert alert-success" role="alert">
//           {successMessage}
//         </div>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="row">
//           <div>
//             <label>Name</label>
//             <input
//               {...register('name', { required: 'Name is required' })}
//               type="text"
//             />
//             {errors.name && <p className="text-danger">{errors.name.message}</p>}
//           </div>
//           <div>
//             <label>Email ID</label>
//             <input
//               {...register('email', {
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^\S+@\S+$/i,
//                   message: 'Invalid email format'
//                 }
//               })}
//               type="email"
//             />
//             {errors.email && <p className="text-danger">{errors.email.message}</p>}
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <label>Contact No.</label>
//             <input
//               {...register('contact', {
//                 required: 'Contact is required',
//                 pattern: {
//                   value: /^[0-9]{10}$/,
//                   message: 'Enter a valid 10-digit number'
//                 }
//               })}
//               type="text"
//             />
//             {errors.contact && <p className="text-danger">{errors.contact.message}</p>}
//           </div>
//           <div>
//             <label>Location</label>
//             <input
//               {...register('location', { required: 'Location is required' })}
//               type="text"
//             />
//             {errors.location && <p className="text-danger">{errors.location.message}</p>}
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <label>Date of Birth</label>
//             <input
//               {...register('dob', { required: 'DOB is required' })}
//               type="date"
//             />
//             {errors.dob && <p className="text-danger">{errors.dob.message}</p>}
//           </div>
//           <div>
//             <label>Gender</label>
//             <select {...register('gender', { required: 'Gender is required' })}>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             {errors.gender && <p className="text-danger">{errors.gender.message}</p>}
//           </div>
//         </div>

//         <div className="row">
//           <div>
//             <label>Password</label>
//             <div className="input-icon-wrapper">
//               <input
//                 {...register('password', {
//                   required: 'Password is required',
//                   minLength: { value: 6, message: 'Minimum 6 characters' }
//                 })}
//                 type={showPassword ? 'text' : 'password'}
//               />
//               <span className="input-icons" onClick={() => setShowPassword(!showPassword)}>
//                 {showPassword ? '🙈' : '👁️'}
//               </span>
//             </div>
//             {errors.password && <p className="text-danger">{errors.password.message}</p>}
//           </div>

//           <div>
//             <label>Confirm Password</label>
//             <div className="input-icon-wrapper">
//               <input
//                 {...register('confirmPassword', {
//                   required: 'Confirm your password'
//                 })}
//                 type={showConfirmPassword ? 'text' : 'password'}
//               />
//               <span className="input-icons" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
//                 {showConfirmPassword ? '🙈' : '👁️'}
//               </span>
//             </div>
//             {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
//           </div>
//         </div>

//         <div className="buttons mt-3 d-flex justify-content-center">
//           <button type="button" className="cancel-btn me-2" onClick={() => reset()}>
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

// export default NewUserForm;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./NewUserForm.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const NewUserForm = () => {
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setServerError("Passwords do not match.");
      return;
    }

    try {
      const checkRes = await axios.post(
        "http://localhost:5000/api/users/check",
        {
          email: data.email,
          contact: data.contact,
        }
      );

      if (checkRes.data.exists) {
        setServerError(checkRes.data.message);
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/users/add",
        data
      );

      setSuccessMessage(res.data.message || "User added successfully!");
      setServerError("");
      reset();
    } catch (err) {
      setServerError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="d-flex">
  

      <div className="main-content w-100">
        <Outlet />

        <div className="new-user-form">
          <h4 className="mt-3">New User</h4>
          <p>Use the below form to update your profile</p>

          {serverError && (
            <div className="error text-danger">{serverError}</div>
          )}

          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div>
                <label>Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                />
                {errors.name && (
                  <p className="text-danger">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label>Email ID</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  type="email"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div>
                <label>Contact No.</label>
                <input
                  {...register("contact", {
                    required: "Contact is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  type="text"
                />
                {errors.contact && (
                  <p className="text-danger">{errors.contact.message}</p>
                )}
              </div>

              <div>
                <label>Location</label>
                <input
                  {...register("location", {
                    required: "Location is required",
                  })}
                  type="text"
                />
                {errors.location && (
                  <p className="text-danger">{errors.location.message}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div>
                <label>Date of Birth</label>
                <input
                  {...register("dob", { required: "DOB is required" })}
                  type="date"
                />
                {errors.dob && (
                  <p className="text-danger">{errors.dob.message}</p>
                )}
              </div>

              <div>
                <label>Gender</label>
                <select
                  {...register("gender", {
                    required: "Gender is required",
                  })}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="text-danger">{errors.gender.message}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div>
                <label>Password</label>

                <div className="input-icon-wrapper">
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                  />

                  <span
                    className="input-icons"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>

                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label>Confirm Password</label>

                <div className="input-icon-wrapper">
                  <input
                    {...register("confirmPassword", {
                      required: "Confirm your password",
                    })}
                    type={showConfirmPassword ? "text" : "password"}
                  />

                  <span
                    className="input-icons"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </span>
                </div>

                {errors.confirmPassword && (
                  <p className="text-danger">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="buttons mt-3 d-flex justify-content-center">
              <button
                type="button"
                className="cancel-btn me-2"
                onClick={() => reset()}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;