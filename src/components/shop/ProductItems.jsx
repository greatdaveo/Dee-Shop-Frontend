import React from "react";
import "../../styles/components/shop/ProductItems.css";
import { Link } from "react-router-dom";
import { shortenText } from "../../utils";
import { toast } from "react-toastify";

const ProductItems = ({
  product,
  grid,
  name,
  image,
  regularPrice,
  discountedPrice,
}) => {
  return (
    <div className={grid ? "grid" : "list"}>
      <Link to={`product-details/${product._id}`}>
        <div>
          <img src={image[0]} alt={shortenText(name, 15)} />
        </div>
      </Link>

      <div className="grid-content list-content">
        <p>
          <span>{regularPrice > 0 && <del>${regularPrice}</del>}</span>
          <span>{` $${discountedPrice}`}</span>
        </p>

        <p>Rating ***</p>
        <h4>{shortenText(name, 15)}</h4>

        {product?.quantity > 0 ? (
          <button className="btn-1">Add To Cart</button>
        ) : (
          <button
            className="btn-2"
            onClick={() => toast.error("Product is out of stock!")}
          >
            Out Of Stock
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItems;
