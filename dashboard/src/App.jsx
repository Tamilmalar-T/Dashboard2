import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import NewUserForm from './NewUserForm';
import ManageUser from './ManageUser';
import AddStylist from "./Addstylist";
import ManageStylist from "./ManageStylist";
import ViewBooking from "./ViewBooking";
import AddCategory from "./AddCategory";
import ManageCategory from "./Managecategory";
import Addnewservice from "./Addnewservice";
import Manageservice from "./Manageservice";
import AddBanner from "./AddBanner";
import ManageBanner from "./ManageBanner";
import Addlogo from "./Addlogo";
import ManageLogo from "./ManageLogo";

function App() {
  const location = useLocation();

  return (
    <div className="app-container d-flex">
      {localStorage.getItem("adminToken") && <Sidebar />}
      <div className="main-content flex-grow-1">
        {localStorage.getItem("adminToken") && <Header />}
        <div className="view-container p-3">
          <Routes>
           

            <Route
              path="/dashboard"element={ <Dashboard /> }
            />

            <Route
              path="/new-user"
              element={
               
                  <NewUserForm />
              
              }
            />

            <Route
              path="/manage-user"
              element={
               
                  <ManageUser />
             
              }
            />

             <Route path="/add-stylist" element={<AddStylist />} />
             <Route path="/manage-stylist" element={<ManageStylist />} />
             <Route path="/view-booking" element={<ViewBooking />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/manage-category" element={<ManageCategory />} />
              <Route path="/add-service" element={<Addnewservice />} />
              <Route path="/manage-service" element={<Manageservice />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/manage-banner" element={<ManageBanner />} />
              <Route path="/add-logo" element={<Addlogo />} />


            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;