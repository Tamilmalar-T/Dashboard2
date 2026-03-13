import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { HiOutlineViewGrid, HiOutlineUserCircle, HiUser } from 'react-icons/hi';
import { FaRegCalendarAlt, FaCut } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const [dropdown, setDropdown] = useState({
    user: false,
    team: false,
    booking: false,
    service: false,
    setting: false,
     banner: false, 
     logo: false,
  });

  const toggleDropdown = (menu) => {
    setDropdown((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="sidebar d-flex flex-column pt-3 bg-dark text-white">
      <h4 className="text-warning mt-4 mb-5 ps-5">Salon Club</h4>
      <ul className="nav nav-pills flex-column mb-auto">

        {/* Dashboard */}
        <li className="nav-item py-2">
          <Link to="/dashboard" className={`nav-link d-flex align-items-center ${isActive('/dashboard') ? 'active' : 'text-white'}`}>
            <HiOutlineViewGrid className="ms-2" size={18} />
            <span className="maintext">Dashboard</span>
          </Link>
        </li>

        {/* User Dropdown */}
        <li className="nav-item">
          <div
            className={`nav-link ${dropdown.user ? 'bg-white text-dark' : 'text-white'}`}
            onClick={() => toggleDropdown('user')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <HiOutlineUserCircle className="ms-2 mb-1" size={18} />
                <span className="maintext ms-2">User</span>
              </div>
              <span className="me-2" style={{ fontSize: '0.7rem' }}>{dropdown.user ? '▲' : '▼'}</span>
            </div>
          </div>
          {dropdown.user && (
            <ul className="nav flex-column">
              <li>
                <Link to="/new-user" className={`nav-link ${isActive('/new-user') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Add New User</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-user" className={`nav-link ${isActive('/manage-user') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Manage User</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Team Dropdown */}
        <li className="nav-item py-2">
          <div
            className={`nav-link ${dropdown.team ? 'bg-white text-dark' : 'text-white'}`}
            onClick={() => toggleDropdown('team')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <HiUser className="ms-2 mb-1" size={18} />
                <span className="maintext ms-2">Stylist</span>
              </div>
              <span className="me-2" style={{ fontSize: '0.7rem' }}>{dropdown.team ? '▲' : '▼'}</span>
            </div>
          </div>
          {dropdown.team && (
            <ul className="nav flex-column">
              <li>
                <Link to="/add-stylist" className={`nav-link ${isActive('/add-stylist') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Add Stylist</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-stylist" className={`nav-link ${isActive('/manage-stylist') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Manage Stylist</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Booking Dropdown */}
        <li className="nav-item py-2">
          <div
            className={`nav-link ${dropdown.booking ? 'bg-white text-dark' : 'text-white'}`}
            onClick={() => toggleDropdown('booking')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaRegCalendarAlt className="ms-2 mb-1" size={18} />
                <span className="maintext ms-2">Booking</span>
              </div>
              <span className="me-2" style={{ fontSize: '0.7rem' }}>{dropdown.booking ? '▲' : '▼'}</span>
            </div>
          </div>
          {dropdown.booking && (
            <ul className="nav flex-column">
              <li>
                <Link to="/view-booking" className={`nav-link ${isActive('/view-booking') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | View Booking</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Service Dropdown */}
        <li className="nav-item py-2">
          <div
            className={`nav-link ${dropdown.service ? 'bg-white text-dark' : 'text-white'}`}
            onClick={() => toggleDropdown('service')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <FaCut className="ms-2 mb-1" size={18} />
                <span className="maintext ms-2">Service</span>
              </div>
              <span className="me-2" style={{ fontSize: '0.7rem' }}>{dropdown.service ? '▲' : '▼'}</span>
            </div>
          </div>
          {dropdown.service && (
            <ul className="nav flex-column">
              <li>
                <Link to="/add-category" className={`nav-link ${isActive('/add-category') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Add Category</span>
                </Link>
                <Link to="/manage-category" className={`nav-link ${isActive('/manage-category') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Manage Category</span>
                </Link>
              </li>
              <li>
                <Link to="/add-service" className={`nav-link ${isActive('/add-service') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Add Service</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-service" className={`nav-link ${isActive('/manage-service') ? 'active' : 'text-warning'}`}>
                  <span className='dt'> | Manage Service</span>
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Setting Dropdown */}
        <li className="nav-item py-2">
          <div
            className={`nav-link ${dropdown.setting ? 'bg-white text-dark' : 'text-white'}`}
            onClick={() => toggleDropdown('setting')}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <HiOutlineViewGrid className="ms-2 mb-1" size={18} />
                <span className="maintext ms-2">Setting</span>
              </div>
              <span className="me-2" style={{ fontSize: '0.7rem' }}>{dropdown.setting ? '▲' : '▼'}</span>
            </div>
          </div>
          {dropdown.setting && (
            <ul className="nav flex-column">
             {/* Banner Dropdown */}
<li className="nav-item py-2">
  <div
    className={`nav-link ${dropdown.banner ? 'bg-white text-dark' : 'text-white'}`}
    onClick={() => toggleDropdown('banner')}
    style={{ cursor: 'pointer' }}
  >
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <span className="maintext ms-2">Banner</span>
      </div>
      <span className="me-2" style={{ fontSize: '0.7rem' }}>
        {dropdown.banner ? '▲' : '▼'}
      </span>
    </div>
  </div>

  {dropdown.banner && (
    <ul className="nav flex-column ">
      <li>
        <Link to="/add-banner" className={`nav-link ${isActive('/add-banner') ? 'active' : 'text-warning'}`}>
          <span className='dt'> | Add Banner</span>
        </Link>
      </li>
      <li>
        <Link to="/manage-banner" className={`nav-link ${isActive('/manage-banner') ? 'active' : 'text-warning'}`}>
          <span className='dt'> | Manage Banner</span>
        </Link>
      </li>
    </ul>
  )}
</li>

            {/* Logo Dropdown */}
<li className="nav-item py-2">
  <div
    className={`nav-link ${dropdown.logo ? 'bg-white text-dark' : 'text-white'}`}
    onClick={() => toggleDropdown('logo')}
    style={{ cursor: 'pointer' }}
  >
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <span className="maintext ms-2">Logo</span>
      </div>
      <span className="me-2" style={{ fontSize: '0.7rem' }}>
        {dropdown.logo ? '▲' : '▼'}
      </span>
    </div>
  </div>

  {dropdown.logo && (
    <ul className="nav flex-column">
      <li>
        <Link
          to="/add-logo"
          className={`nav-link ${isActive('/add-logo') ? 'active' : 'text-warning'}`}
        >
          <span className="dt">| Add Logo</span>
        </Link>
      </li>
      <li>
        <Link
          to="/manage-logo"
          className={`nav-link ${isActive('/manage-logo') ? 'active' : 'text-warning'}`}
        >
          <span className="dt">| Manage Logo</span>
        </Link>
      </li>
    </ul>
  )}
</li>

              
            </ul>
          )}
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
