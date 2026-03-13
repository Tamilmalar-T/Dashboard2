
//   import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Dashboard.css";

// const Dashboard = () => {
//   const [totalBookings, setTotalBookings] = useState(0);
//   const [totalUsers, setTotalUsers] = useState(0);
//   const [totalSales, setTotalSales] = useState(0);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [totalServices, setTotalServices] = useState(0);

//   useEffect(() => {
//     fetchCounts();
//   }, []);


//   const fetchCounts = async () => {
//   try {
 

//     const usersRes = await axios.get("http://localhost:5000/api/users/count");
//     setTotalUsers(usersRes.data.count);




//   } catch (error) {
//     console.error("Error fetching dashboard data:", error);
//   }
// };


//   const cards = [
//     { label: "Total Bookings", count: totalBookings, color: "#FF6384" },
//     { label: "Total Users", count: totalUsers, color: "#36A2EB" },
   
//   ];

//   return (
//     <div className="dashboard-content">
//       <h2>Dashboard</h2>
//       <div className="dashboard-grid">
//   {cards.map((item, idx) => (
//     <div key={idx}>

//             <div className="card summary-card" style={{ borderLeft: `6px solid ${item.color}` }}>
//               <div className="card-body">
//                 <h5 className="card-title">{item.label}</h5>
//                 <h3>{item.count}</h3>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [totalBookings, setTotalBookings] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalServices, setTotalServices] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      // Fetch total users
      const usersRes = await axios.get("http://localhost:5000/api/users/count");
      setTotalUsers(usersRes.data.count);

      // Fetch total bookings
      const bookingsRes = await axios.get("http://localhost:5000/api/bookings/count");
      setTotalBookings(bookingsRes.data.count);

      // Fetch total services
      const servicesRes = await axios.get("http://localhost:5000/api/services/count");
      setTotalServices(servicesRes.data.count);

      // Fetch total revenue
      const revenueRes = await axios.get("http://localhost:5000/api/bookings/revenue");
      setTotalRevenue(revenueRes.data.totalRevenue);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const cards = [
    { label: "Total Bookings", count: totalBookings, color: "#FF6384" },
    { label: "Total Users", count: totalUsers, color: "#36A2EB" },
    { label: "Total Services", count: totalServices, color: "#FFCE56" },
    { label: "Total Revenue", count: `$${totalRevenue}`, color: "#4BC0C0" },
  ];

  return (
    <div className="dashboard-content">
      <h2>Dashboard</h2>
      <div className="dashboard-grid">
        {cards.map((item, idx) => (
          <div key={idx}>
            <div
              className="card summary-card"
              style={{ borderLeft: `6px solid ${item.color}` }}
            >
              <div className="card-body">
                <h5 className="card-title">{item.label}</h5>
                <h3>{item.count}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;