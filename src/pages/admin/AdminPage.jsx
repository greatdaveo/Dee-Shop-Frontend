import React from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import "../../styles/pages/admin/AdminPage.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminContent from "../../components/admin/AdminContent";

const AdminPage = () => {
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
          <AdminContent />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminPage;
