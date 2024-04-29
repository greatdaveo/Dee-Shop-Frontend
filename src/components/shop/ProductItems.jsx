import React from "react";
import "../../styles/components/shop/ProductItems.css";
import { Link } from "react-router-dom";
import { calculateAverageRating, shortenText } from "../../utils";
import { toast } from "react-toastify";
import ProductRating from "../admin/product/productRating/ProductRating";
import {
  ADD_TO_CART,
  saveCartDBSlice,
} from "../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const ProductItems = ({
  product,
  grid,
  name,
  image,
  regularPrice,
  discountedPrice,
}) => {
  const dispatch = useDispatch();
  // To calculate the ratings for each product
  const averageRating = calculateAverageRating(product?.ratings);

  //   To add to cart
  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    // To Sync and save the Cart to DB
    dispatch(
      saveCartDBSlice({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      })
    );
  };

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

        <p>
          <ProductRating
            averageRating={averageRating}
            noOfRatings={product?.ratings?.length}
          />
        </p>

        <h4>{shortenText(name, 15)}</h4>

        {product?.quantity > 0 ? (
          <button className="btn-1" onClick={() => addToCart(product)}>
            Add To Cart
          </button>
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
