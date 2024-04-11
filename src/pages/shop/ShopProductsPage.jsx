import React, { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import NavBar from "../../components/homepage/NavBar";
import "../../styles/pages/shop/ShopProductsPage.css";
import ShopProductFilter from "../../components/shop/ShopProductFilter";
import ShopProductsList from "../../components/shop/ShopProductsList";
import Loader from "../../components/loader/loader";
import { FaCogs } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsSlice } from "../../redux/features/products/productSlice";

const ShopProductPage = () => {
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(true);
  const { products, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getAllProductsSlice());
  }, [dispatch]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <div>
      <div className="shop-page">
        <div style={{ background: "black" }}>
          <NavBar />
        </div>

        <div className="cover">
          {showFilter && (
            <div className="sidebar">
              <ShopProductFilter />
            </div>
          )}

          <div className="content">
            <div className="icon" onClick={toggleFilter}>
              <FaCogs size={20} color="gold" />

              <p>
                <b>{showFilter ? "Hide FIlter" : "Show Filter"}</b>
              </p>
            </div>

            <ShopProductsList products={products} />
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default ShopProductPage;
