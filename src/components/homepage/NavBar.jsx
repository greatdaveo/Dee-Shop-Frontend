import React, { useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "../../styles/components/homepage/NavBar.css";
import { Logo } from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, logoutSlice } from "../../redux/features/auth/authSlice";
import { UserName } from "../../pages/profile/ProfilePage";
import { AdminOnlyLink } from "../../protectedRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY } from "../../redux/features/cart/cartSlice";
import { useState } from "react";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { cartItems, cartTotalQuantity } = useSelector((state) => state.cart);
  const [isMobile, setIsMobile] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutSlice());
    await dispatch(RESET_AUTH());

    navigate("/login");
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  return (
    <nav>
      <div>{Logo}</div>

      <div className="mobile-nav-1">
        <NavLink to="/shop">Check Items 👁️</NavLink>
        <AdminOnlyLink>
          <NavLink to="/admin/home"> | Admin</NavLink>
        </AdminOnlyLink>
      </div>

      <div className={isMobile ? "mobile" : "desktop"}>
        {isLoggedIn ? (
          <span>
            <NavLink to="/profile" className="username">
              <i class="fa-solid fa-user"></i>
              <UserName />
            </NavLink>

            <NavLink to="/order-history">
              <button className="order">My Order</button>
            </NavLink>

            <Link to="/" onClick={handleLogout}>
              <button className="login">Log Out</button>
            </Link>

            <NavLink to="/cart">
              <button className="cart">
                Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                <b>{cartTotalQuantity}</b>
              </button>
            </NavLink>
          </span>
        ) : (
          <NavLink to="/login">
            <button className="login">Log In</button>
          </NavLink>
        )}

        {!isLoggedIn && (
          <NavLink to="/register">
            <button className="signup">Sign Up</button>
          </NavLink>
        )}

        {!isMobile && (
          <NavLink to="/cart">
            <button className="cart">
              Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
              </svg>
              <b>{cartTotalQuantity}</b>
            </button>
          </NavLink>
        )}
      </div>

      <div className="mobile-icon" onClick={() => setIsMobile(!isMobile)}>
        {isMobile ? (
          <div>
            <i className="fa-solid fa-xmark"></i>
          </div>
        ) : (
          <div>
            <NavLink to="/cart">
              <button className="cart" style={{ marginRight: "1rem" }}>
                Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                <b>{cartTotalQuantity}</b>
              </button>
            </NavLink>

            <i className="fa-solid fa-bars"></i>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
