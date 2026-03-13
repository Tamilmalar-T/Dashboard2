// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Team.css";

// const Team = () => {
//   const [stylists, setStylists] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchStylists = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/stylists");
//         setStylists(res.data.reverse()); // ✅ Reverse order
//       } catch (err) {
//         console.error("Error fetching stylists:", err);
//         setError("Failed to load stylists. Please try again.");
//       }
//     };
//     fetchStylists();
//   }, []);

//   return (
//     <section className="team-section text-center py-5">
//       <div className="container">
//         <div className="row align-items-center mb-5">
//           <div className="col-md-6 text-start">
//             <h2 className="section-title">Meet Our Dedicated Team</h2>
//           </div>
//           <div className="col-md-6 text-end">
//             <p className="section-subtitle">
//               Behind every great experience is a passionate team committed to delivering the best.
//             </p>
//           </div>
//         </div>

//         {error && <div className="alert alert-danger">{error}</div>}

//         <div className="row g-4">
//           {stylists.length > 0 ? (
//             stylists.map((stylist, index) => (
//               <div className="col-sm-12 col-md-6 col-lg-4 d-flex" key={index}>
//                 <div
//                   className={`stylist-card w-100 ${
//                     stylist.status === "disable" ? "locked-stylist" : ""
//                   }`}
//                 >
//                   <img
//                     src={`http://localhost:5000/uploads/${stylist.image}`}
//                     alt={stylist.name}
//                     className="stylist-img"
//                     style={{
//                       filter: stylist.status === "disable" ? "grayscale(100%)" : "none",
//                       opacity: stylist.status === "disable" ? 0.4 : 1,
//                     }}
//                   />
//                   <div className="stylist-info p-3">
//                     {stylist.status === "enable" ? (
//                       <>
//                         <h5 className="mb-1">{stylist.name}</h5>
//                         <p className="text-muted">{stylist.speciality}</p>
//                       </>
//                     ) : (
//                       <div className="text-danger">
//                         <h5 className="mb-1">Stylist Locked</h5>
//                         <p className="text-muted">View not available</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-danger text-center fw-bold">No stylists found.</p>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Team;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Team.css";

const Team = () => {
  const [stylists, setStylists] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const stylistsPerPage = 3;

  useEffect(() => {
    const fetchStylists = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/stylists");
        setStylists(res.data.reverse());
      } catch (err) {
        console.error("Error fetching stylists:", err);
        setError("Failed to load stylists. Please try again.");
      }
    };

    fetchStylists();
  }, []);

  /* ---------- Pagination Logic ---------- */

  const indexOfLast = currentPage * stylistsPerPage;
  const indexOfFirst = indexOfLast - stylistsPerPage;
  const currentStylists = stylists.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(stylists.length / stylistsPerPage);

  return (
    <section className="team-section text-center py-5">
      <div className="container">

        {/* Section Header */}

        <div className="row align-items-center mb-5">
          <div className="col-md-6 text-start">
            <h2 className="section-title">Meet Our Dedicated Team</h2>
          </div>

          <div className="col-md-6 text-end">
            <p className="section-subtitle">
              Behind every great experience is a passionate team committed to delivering the best.
            </p>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        {/* Stylists */}

        <div
          className={`row g-4 ${
            currentStylists.length === 1 ? "justify-content-center" : ""
          }`}
        >
          {currentStylists.length > 0 ? (
            currentStylists.map((stylist, index) => (
              <div
                className="col-sm-12 col-md-6 col-lg-4 d-flex justify-content-center"
                key={index}
              >
                <div
                  className={`stylist-card w-100 ${
                    stylist.status === "disable" ? "locked-stylist" : ""
                  }`}
                >
                  <img
                    src={`http://localhost:5000/uploads/${stylist.image}`}
                    alt={stylist.name}
                    className="stylist-img"
                    style={{
                      filter:
                        stylist.status === "disable"
                          ? "grayscale(100%)"
                          : "none",
                      opacity: stylist.status === "disable" ? 0.4 : 1,
                    }}
                  />

                  <div className="stylist-info p-3">
                    {stylist.status === "enable" ? (
                      <>
                        <h5 className="mb-1">{stylist.name}</h5>
                        <p className="text-muted">{stylist.speciality}</p>
                      </>
                    ) : (
                      <div className="text-danger">
                        <h5 className="mb-1">Stylist Locked</h5>
                        <p className="text-muted">View not available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-danger text-center fw-bold">
              No stylists found.
            </p>
          )}
        </div>

        {/* Pagination */}

        {stylists.length > stylistsPerPage && (
          <div className="mt-4">

            <button
              className="btn btn-outline-dark me-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            <span className="fw-bold">
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-outline-dark ms-2"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>

          </div>
        )}

      </div>
    </section>
  );
};

export default Team;
