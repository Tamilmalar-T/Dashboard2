import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Services.css';

const ServicesByCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchByCategory = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/services/category/${categoryName}`);
        setServices(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch services');
      }
    };
    fetchByCategory();
  }, [categoryName]);

  return (
    <div className="services-container container my-4">
      <h2 className="text-center mb-4 fw-bold text-capitalize">
        Services in "{categoryName}"
      </h2>

      <div className="text-center mb-3">
        <button onClick={() => navigate(-1)} className="back-button btn btn-secondary">
          ← Back
        </button>
      </div>

      {error && <p className="text-danger text-center">{error}</p>}

      {services.length === 0 ? (
        <p className="text-center">No services found in this category.</p>
      ) : (
        <div className="services-grid">
          {services.map(({ _id, name, image, offerPrice }) => (
            <div key={_id} className="card position-relative text-center">

              {/* Offer badge */}
              {offerPrice && (
                <span className="offer-badge position-absolute top-0 start-0 bg-danger text-white px-2 py-1 rounded-end">
                  You have offer
                </span>
              )}

              {/* Image */}
              {image ? (
                <img
                  src={`http://localhost:5000/api/services/images/${image}`}
                  alt={name}
                  className="service-image"
                />
              ) : (
                <div className="no-image p-4">No Image</div>
              )}

              {/* Name and Button */}
              <h3 className="service-name">{name}</h3>
              <button
                className="view-button btn btn-primary"
                onClick={() => navigate(`/services/${_id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesByCategory;
