import React from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import "../../styles/pages/admin/AdminPage.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminContent from "../../components/admin/AdminContent";
import { Route, Routes } from "react-router";
import AdminHome from "../../components/admin/AdminHome";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/loader";

const AdminPage = () => {
  const { isLoading } = useSelector((state) => state.category);
  return (
    <div className="admin">
      <div className="nav">
        <NavBar />
      </div>

      <div className="cover">
        <div className="sidebar">
          <AdminSidebar />
        </div>

        <div className="content">
          <Routes>
            <Route path="home" element={<AdminHome />} />
            <Route path="category" element={<AdminContent />} />
          </Routes>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
