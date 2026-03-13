import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PathView from "./PathView";

const AdminLayout = () => {
  return (
    <div className="d-flex">

      <Sidebar />

      <div className="main-content w-100">
        
        <Header />
        <PathView />


        {/* Child pages render here */}
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;