import React from "react";
import { FaUserCircle } from "react-icons/fa";
import "../../styles/components/admin/AdminSidebar.css";

import { useSelector } from "react-redux";
import { authenticatedUser } from "../../redux/features/auth/authSlice";
import { NavLink } from "react-router-dom";

// For Active Link to know which page is active
const activeLink = ({ isActive }) => (isActive ? "active" : "");

const AdminSidebar = () => {
  const user = useSelector(authenticatedUser);
  const username = user?.name;

  return (
    <div className="sidebar-cover">
      <div className="user">
        <FaUserCircle size={40} color="gold" />
        <p>{username}</p>
      </div>

      <nav className="sidebar-content">
        <li>
          <NavLink to="/admin/home" className={activeLink}>
            Home
          </NavLink>
        </li>

        <li>
          <NavLink to="/admin/category" className={activeLink}>
            Category
          </NavLink>
        </li>
      </nav>
    </div>
  );
};

export default AdminSidebar;
