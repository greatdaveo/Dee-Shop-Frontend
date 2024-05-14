import React from "react";
import "../../styles/components/homepage/LatestProduct.css";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  return (
    <div>
      <div className="latest-product-header">
        <p>Latest Products</p>
        <Link to="/shop">Shop Now 🛍️ </Link>
      </div>
    </div>
  );
};

export default LatestProducts;
