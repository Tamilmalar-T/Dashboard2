import React from 'react';
import './Pathview.css';

const PathView = ({ activeView }) => {
  const getFullPath = () => {
    switch (activeView) {
      case 'newUser':
        return 'User Module . New User';
      case 'manageUser':
        return 'User Module . Manage User';
      case 'addStylist':
        return 'Stylist . Add Stylist';
      case 'manageStylist':
        return 'Stylist . Manage Stylist';
      case 'viewBooking':
        return 'Booking . View Booking';
      case 'addCategory':
        return 'Service . Add Category';
      case 'addService':
        return 'Service . Add Service';
      case 'manageService':
        return 'Service . Manage Service';
      case 'addbanner':
        return 'Banner . Add Banner';
      case 'managebanner':
        return 'Banner . Manage Banner';
      case 'addlogo':
        return 'Logo . Add Logo';
      case 'managelogo':
        return 'Logo . Manage Logo';
      default:
        return 'Dashboard';
    }
  };

  const [firstPart, secondPart] = getFullPath().split(' . ');

  return (
    <div className="path-view">
      <h6 className="path-text">
        <span className="ms-3 first">{firstPart}</span>
        {secondPart && (
          <>
            <span> . </span>
            <span className="second">{secondPart}</span>
          </>
        )}
      </h6>
    </div>
  );
};

export default PathView;
