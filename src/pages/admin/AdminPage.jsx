import React from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import "../../styles/pages/admin/AdminPage.css";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Category from "../../components/admin/category/Category";
import { Route, Routes } from "react-router";
import AdminHome from "../../components/admin/AdminHome";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/loader";
import Brand from "../../components/admin/brand/Brand";
import ProductForm from "../../components/admin/product/ProductForm";
import ViewProducts from "../../components/admin/product/ViewProducts";
import EditProduct from "../../components/admin/product/EditProduct";

const AdminPage = () => {
  const { isLoading } = useSelector((state) => state.category);
  return (
    <div>
      {isLoading && <Loader />}

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
              <Route path="category" element={<Category />} />
              <Route path="brand" element={<Brand />} />
              <Route path="add-product" element={<ProductForm />} />
              <Route path="all-products" element={<ViewProducts />} />
              <Route path="edit-product/:id" element={<EditProduct />} />
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default AdminPage;
