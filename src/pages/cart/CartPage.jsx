import Footer from "../../components/Footer";
import NavBar from "../../components/homepage/NavBar";
import "../../styles/cart/CartPage.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
} from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  //   To add to cart
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  // To decrease cart
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <section className="cart-cover">
        <h2>Shopping Cart</h2>

        <div className="table">
          {cartItems?.length === 0 ? (
            <div>
              <p>Your cart is empty.</p>

              <div>
                <Link to="/shop">&larr; Continuing Shopping </Link>
              </div>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cartItems?.map((cart, i) => {
                  const { _id, name, discountedPrice, image, cartQuantity } =
                    cart;

                  return (
                    <tr key={_id}>
                      <td style={{ padding: "10px" }}>{i + 1}</td>
                      <td style={{ verticalAlign: "top" }}>
                        <p style={{ marginBottom: "1px" }}>
                          <b>{name}</b>
                        </p>
                        <img
                          src={image[0]}
                          alt={name}
                          style={{
                            width: "100px",
                            height: "fit-content",
                            marginTop: "0px",
                          }}
                        />
                      </td>
                      <td>${discountedPrice}</td>

                      <td>
                        <div className="count-cart-btn">
                          <button
                            className="count-btn-1"
                            onClick={() => decreaseCart(cart)}
                          >
                            -
                          </button>
                          <p>
                            <b>{cartQuantity}</b>
                          </p>
                          <button
                            className="count-btn-2"
                            onClick={() => increaseCart(cart)}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      <td>{discountedPrice * cartQuantity}</td>
                      <td>
                        <button>
                          <FaTrashAlt
                            size={15}
                            color="red"
                            onClick={() => removeFromCart(cart)}
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="summary">
          <button onClick={clearCart} className="btn">
            CLEAR CART
          </button>

          <div className="checkout">
            <Link to="/shop">&larr; Continue shopping</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;