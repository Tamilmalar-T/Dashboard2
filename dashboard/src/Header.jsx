
// export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { FaSearch } from "react-icons/fa";

import './Header.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLoginClick = () => {
    navigate('/admin-login'); // Route to login page
  };

  const handleLogoutClick = () => { 
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <div className="header ">
      {/* Left: Search bar */}
         <div className="search-container">
      <FaSearch className="input-icon" />
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
      />
    </div>
      {/* Right: Profile & Dropdown */}
      <div className="header-right position-relative">
        <div className="profile-dropdown" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
          <FaUserCircle size={32} className="profile-icon text-dark" />

        </div>
        <div className="profile-info ms-0 me-3">
                
             <div className="role">Admin</div>   
                   </div>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="dropdown-content position-absolute bg-white shadow p-2 rounded">
         
            {/* <p className="dropdown-item" onClick={handleLogoutClick}>Log out</p> */}
            <p className="dropdown-item mb-1" onClick={(handleLogoutClick) => {
  localStorage.removeItem('adminToken');
  window.location.href = '/admin-login';
}}>Log out</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
