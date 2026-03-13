import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { AuthProvider } from "./AuthContext";
import store from "./Store/Store";
import "./App.css";

/* ---------- Frontend Components ---------- */

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Details from "./Details";
import Booking from "./Booking";
import Contact from "./Contact";
import Team from "./Team";
import Cart from "./Cart";
import Category from "./Category";
import ServicesByCategory from "./ServicesByCategory";
// import Login from "./Login"

/* ---------- Admin Components ---------- */

import Sidebar from "./Sidebar";
import Header from "./Header";
import PathView from "./PathView";
import Dashboard from "./Dashboard";
import NewUserForm from "./NewUserForm";
import ManageUser from "./ManageUser";
import ViewBooking from "./ViewBooking";
import AddCategory from "./AddCategory";
import ManageCategory from "./Managecategory";
import Addnewservice from "./Addnewservice";
import Manageservice from "./Manageservice";
import AddStylist from "./Addstylist";
import ManageStylist from "./Managestylist";
import AddBanner from "./AddBanner";
import ManageBanner from "./ManageBanner";
import Addlogo from "./Addlogo";
import ManageLogo from "./ManageLogo";
import AdminLogin from "./AdminLogin";

function App() {
  const location = useLocation();
  const [activeView, setActiveView] = useState("");

  const isAuthenticated = localStorage.getItem("adminToken");

  const isAdminPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/manage") ||
    location.pathname.startsWith("/add") ||
    location.pathname.startsWith("/view") ||
    location.pathname === "/login";

  useEffect(() => {
    const path = location.pathname;

    if (path.includes("dashboard")) setActiveView("dashboard");
    else if (path.includes("new-user")) setActiveView("newUser");
    else if (path.includes("manage-user")) setActiveView("manageUser");
    else if (path.includes("view-booking")) setActiveView("viewBooking");
    else if (path.includes("add-category")) setActiveView("addCategory");
    else if (path.includes("manage-category")) setActiveView("manageCategory");
    else if (path.includes("add-service")) setActiveView("addService");
    else if (path.includes("manage-service")) setActiveView("manageService");
    else if (path.includes("add-stylist")) setActiveView("addStylist");
    else if (path.includes("manage-stylist")) setActiveView("manageStylist");
    else if (path.includes("add-banner")) setActiveView("addBanner");
    else if (path.includes("manage-banner")) setActiveView("manageBanner");
    else if (path.includes("add-logo")) setActiveView("addLogo");
    else if (path.includes("manage-logo")) setActiveView("manageLogo");
  }, [location.pathname]);
  
          

  return (
    <Provider store={store}>
      <AuthProvider>
        <div>

          {/* ---------- FRONTEND WEBSITE ---------- */}

          {!isAdminPage && <Navbar />}

          <Routes>

            {/* Frontend Routes */}

            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/category" element={<Category />} />
            <Route path="/category/:categoryName" element={<ServicesByCategory />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<Details />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/booking" element={<Booking />} />
            </Routes>

            {/* ---------- ADMIN ROUTES ---------- */}
{/* 
            <Route path="/login" element={<Login />} /> */}
            
<Routes>
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <AdminLayout activeView={activeView} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route path="/new-user" element={<NewUserForm />} />
            <Route path="/manage-user" element={<ManageUser />} />
            <Route path="/view-booking" element={<ViewBooking />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/add-service" element={<Addnewservice />} />
            <Route path="/manage-service" element={<Manageservice />} />
            <Route path="/add-stylist" element={<AddStylist />} />
            <Route path="/manage-stylist" element={<ManageStylist />} />
            <Route path="/add-banner" element={<AddBanner />} />
            <Route path="/manage-banner" element={<ManageBanner />} />
            <Route path="/add-logo" element={<Addlogo />} />
            <Route path="/manage-logo" element={<ManageLogo />} />

          </Routes>


        </div>
      </AuthProvider>
    </Provider>
  );
}

/* ---------- ADMIN LAYOUT ---------- */

function AdminLayout({ activeView }) {
  return (
    <div className="app-container d-flex">
      <Sidebar />

      <div className="main-content flex-grow-1">
        <Header />
        <PathView activeView={activeView} />
        <Dashboard />
      </div>
    </div>
  );
}

export default App;