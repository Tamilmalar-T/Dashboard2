// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Dashboard.css";

// export default function Status() {
//   const [bookings, setBookings] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/bookings");
//       setBookings(res.data);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     }
//   };

//   const toggleStatus = async (bookingId, currentStatus) => {
//     const newStatus = currentStatus === "Request" ? "Complete" : "Request";
//     try {
//       await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, {
//         status: newStatus,
//       });
//       setBookings(prev =>
//         prev.map(booking =>
//           booking._id === bookingId ? { ...booking, status: newStatus } : booking
//         )
//       );
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <div className="dashboard container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
//           Go Back
//         </button>
//       </div>

//       {bookings.length === 0 ? (
//         <p>No bookings found.</p>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-bordered table-hover">
//             <thead className="table-dark">
//               <tr>
//                 <th>#</th>
//                 <th>Name</th>
//                 <th>Phone</th>
//                 <th>Email</th>
//                 <th>DOB</th>
//                 <th>Gender</th>
//                 <th>Stylist</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Services</th>
//                 <th>Total</th>
//                 <th>Status</th>
//                 <th>Booked At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking, index) => {
//                 const status = booking.status || "Request";
//                 return (
//                   <tr key={booking._id}>
//                     <td>{index + 1}</td>
//                     <td>{booking.customer?.name}</td>
//                     <td>{booking.customer?.phone}</td>
//                     <td>{booking.customer?.email}</td>
//                     <td>{booking.customer?.dob}</td>
//                     <td>{booking.customer?.gender}</td>
//                     <td>{booking.customer?.stylist}</td>
//                     <td>{booking.customer?.date}</td>
//                     <td>{booking.customer?.timeSlot}</td>
//                     <td>
//                       <ul className="list-unstyled mb-0">
//                         {booking.services.map((service, idx) =>
//                           service ? (
//                             <li key={idx}>
//                               {service.name} × {service.quantity} = ₹
//                               {service.price * service.quantity}
//                             </li>
//                           ) : (
//                             <li key={idx} className="text-danger">Invalid service</li>
//                           )
//                         )}
//                       </ul>
//                     </td>
//                     <td>
//                       ₹
//                       {booking.services.reduce(
//                         (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1),
//                         0
//                       )}
//                     </td>
//                     <td>
//                       <button
//                         onClick={() => toggleStatus(booking._id, status)}
//                         className={`btn btn-sm ${
//                           status === "Request" ? "btn-warning" : "btn-success"
//                         }`}
//                       >
//                         {status}
//                       </button>
//                     </td>
//                     <td>{new Date(booking.createdAt).toLocaleString()}</td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";

export default function Status() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}/status`);
      fetchBookings(); // refresh the updated status
    } catch (error) {
      alert(error.response?.data?.msg || "Error updating status");
    }
  };

  return (
    <div className="dashboard container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Booking Status</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/dashboard")}>
          Go Back
        </button>
      </div>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>S.NO</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Stylist</th>
                <th>Date</th>
                <th>Time</th>
                <th>Services</th>
                <th>Total</th>
                <th>Status</th>
                <th>Booked At</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.customer?.name}</td>
                  <td>{booking.customer?.phone}</td>
                  <td>{booking.customer?.email}</td>
                  <td>{booking.customer?.dob}</td>
                  <td>{booking.customer?.gender}</td>
                  <td>{booking.customer?.stylist}</td>
                  <td>{booking.customer?.date}</td>
                  <td>{booking.customer?.timeSlot}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {booking.services.map((service, idx) => (
                        service ? (
                          <li key={idx}>
                            {service.name} × {service.quantity} = ₹{service.price * service.quantity}
                          </li>
                        ) : (
                          <li key={idx} className="text-danger">Invalid service</li>
                        )
                      ))}
                    </ul>
                  </td>
                  <td>
                    ₹{booking.services.reduce(
                      (sum, item) => sum + (item?.price || 0) * (item?.quantity || 1), 0
                    )}
                  </td>
                  <td>
                    {booking.status === "Request" ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => handleStatusUpdate(booking._id)}
                      >
                        Request
                      </button>
                    ) : (
                      <span className="badge bg-success">
                        Completed<br />
                        {booking.completedAt
                          ? new Date(booking.completedAt).toLocaleString()
                          : ""}
                      </span>
                    )}
                  </td>
                  <td>{new Date(booking.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
