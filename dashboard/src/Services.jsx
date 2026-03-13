
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Services.css";

const Services = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/services");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
      setError("Failed to fetch services.");
    }
  };

  return (
    <div className="services-container" style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Our Services</h1>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <div className="cards-grid">
        {services.map(({ _id, name, image }) => (
          <div key={_id} className="card">
            {image ? (
              <img
                src={`http://localhost:5000/api/services/images/${image}`}
                alt={name}
                className="service-image"
              />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <h3>{name}</h3>

            <button
              className="view-button"
              onClick={() => navigate(`/services/${_id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
