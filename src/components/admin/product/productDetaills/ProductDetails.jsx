import React, { useEffect, useState } from "react";
import "../../../../styles/pages/product/ProductDetails.css";
import NavBar from "../../../homepage/NavBar";
import Footer from "../../../Footer";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useDispatch, useSelector } from "react-redux";
import { editProductSlice } from "../../../../redux/features/products/productSlice";
import { Link } from "react-router-dom";
import ProductRating from "../productRating/ProductRating";
import { calculateAverageRating } from "../../../../utils";
import { toast } from "react-toastify";
import DOMPurify from "dompurify";
import {
  ADD_TO_CART,
  DECREASE_CART,
  saveCartDBSlice,
} from "../../../../redux/features/cart/cartSlice";
import Loader from "../../../Loader/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  //   console.log(product);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    dispatch(editProductSlice(id));
  }, [dispatch, id]);

  //   To set up the image slider feature using the image index state
  const slideLength = product?.image?.length;
  const nextSlide = () => {
    setImageIndex(imageIndex === slideLength - 1 ? 0 : imageIndex + 1);
  };

  // To control the seconds to switch the image
  let slideInterval;
  useEffect(() => {
    if (product?.image?.length > 1) {
      const autoSlide = () => {
        slideInterval = setInterval(nextSlide, 3000);
      };
      autoSlide();
    }
    return () => clearInterval(slideInterval);
  }, [imageIndex, slideInterval, product]);

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

  // To decrease cart
  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    // To Sync and save the Cart to DB
    dispatch(
      saveCartDBSlice({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      })
    );
  };

  // To control the cart counting button
  const { cartItems } = useSelector((state) => state.cart);
  // This will find the product id that matches the params id (cartProduct will give details about the product)
  const cartProduct = cartItems.find((cart) => cart._id === id);
  // To check if the product with the id has been added to cart items
  const isAddedToCart = cartItems.findIndex((cart) => {
    return cart._id === id;
  });

  return (
    <div>
      {isLoading && <Loader />}
      <div>
        <div style={{ background: "black" }}>
          <NavBar />
        </div>

        <section className="pd">
          <div className="pd-header">
            <h2>Product Details</h2>
            <Link to="/shop"> &larr; Back to products</Link>
          </div>

          <div className="pd-content">
            <div className="img-cover">
              <img
                src={product?.image[imageIndex]}
                alt={product?.name}
                className="main-img"
              />

              <div className="small-img">
                {product?.image.map((img, i) => {
                  return (
                    <img
                      key={i}
                      src={img}
                      alt="Product Image"
                      onClick={() => setImageIndex(i)}
                      className={imageIndex === i ? "activeImg" : ""}
                    />
                  );
                })}
              </div>
            </div>

            <div className="pd-text-content">
              <h3>{product?.name}</h3>

              <ProductRating
                averageRating={averageRating}
                noOfRatings={product?.ratings?.length}
              />

              <div className="text">
                <p>
                  <b>Price</b>
                </p>

                <p className="p">{` $${product?.discountedPrice}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>SKU</b>
                </p>

                <p>{`${product?.sku}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>Category</b>
                </p>

                <p>{` ${product?.category}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>Brand</b>
                </p>

                <p>{`${product?.brand}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>Color</b>
                </p>

                <p>{`${product?.color}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>Quantity in Stock</b>
                </p>

                <p>{` ${product?.quantity}`}</p>
              </div>

              <div className="text">
                <p>
                  <b>Sold</b>
                </p>

                <p>{` ${product?.sold}`}</p>
              </div>

              {isAddedToCart < 0 ? null : (
                <div className="count-cart-btn">
                  <button
                    className="count-btn-1"
                    onClick={() => decreaseCart(product)}
                  >
                    -
                  </button>
                  <p>
                    <b>{cartProduct.cartQuantity}</b>
                  </p>
                  <button
                    className="count-btn-2"
                    onClick={() => addToCart(product)}
                  >
                    +
                  </button>
                </div>
              )}

              <div className="btn-cover">
                {product?.quantity > 0 ? (
                  <button className="btn-1" onClick={() => addToCart(product)}>
                    ADD TO CART
                  </button>
                ) : (
                  <button
                    className="btn-2"
                    onClick={() =>
                      toast.error("Sorry, product is out of stock!")
                    }
                  >
                    OUT OF STOCK
                  </button>
                )}
                <button className="btn-3">ADD TO WISHLIST</button>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product?.description),
                }}
                className="description"
              ></div>
            </div>
          </div>

          {/*Product Review Section*/}
          <h3>Product Review</h3>
        </section>

        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
