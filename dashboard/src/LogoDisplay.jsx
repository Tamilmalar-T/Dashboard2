import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogoDisplay.css'; // Import the CSS

const LogoDisplay = () => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/logo/latest');
        setLogoUrl(`http://localhost:5000/uploads/logos/${res.data.image}`);
      } catch (err) {
        console.error('Failed to load logo:', err);
      }
    };

    fetchLogo();
  }, []);

  return (
    <div className="logo-container text-center">
      {logoUrl ? (
        <img src={logoUrl} alt="Logo" className="responsive-logo" />
      ) : (
        <p className="text-muted">No logo uploaded</p>
      )}
    </div>
  );
};

export default LogoDisplay;
