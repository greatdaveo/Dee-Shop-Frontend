import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/carousel/CarouselItem.css";
// To reduce the text characters
import { shortenText } from "../../utils";

const CarouselItems = ({ url, name, price, description }) => {
  return (
    <div className="carousal-container">
      <div className="carousal-item">
        <Link to="/product-details">
          <img src={url} alt="product" />
          <p className="price">{price}</p>
          <h4 className="name">{shortenText(name, 18)}</h4>
          <p className="description">{shortenText(description, 26)}</p>
        </Link>

        <button className="btn">Add To Cart</button>
      </div>
    </div>
  );
};

export default CarouselItems;
