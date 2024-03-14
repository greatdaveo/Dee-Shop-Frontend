import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/components/PageMenu/PageMenu.css";

const PageMenu = () => {
  return (
    <div className="page-menu">
      <nav>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="wallet">My Wallet</NavLink>
        <NavLink to="wishlist">Wishlist</NavLink>
      </nav>
    </div>
  );
};

export default PageMenu;
