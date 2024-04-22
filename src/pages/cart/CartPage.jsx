import Footer from "../../components/Footer";
import NavBar from "../../components/homepage/NavBar";
import "../../styles/cart/CartPage.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect } from "react";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  saveCartDBSlice,
} from "../../redux/features/cart/cartSlice";

const CartPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.cart
  );

  //   To add to cart
  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
    // To Sync and save the Cart to DB
    dispatch(
      saveCartDBSlice({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      })
    );
  };

  // To decrease cart
  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
    // To Sync and save the Cart to DB
    dispatch(
      saveCartDBSlice({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      })
    );
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART(cart));
    // To Sync and save the Cart to DB
    dispatch(
      saveCartDBSlice({
        cartItems: JSON.parse(localStorage.getItem("cartItems")),
      })
    );
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
    // To Sync and save the Cart to DB
    dispatch(saveCartDBSlice({ cartItems: [] }));
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch, cartItems]);

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
          <div>
            <button onClick={clearCart} className="summary-btn">
              CLEAR CART
            </button>
          </div>

          <div className="checkout-text">
            <Link to="/shop">&larr; Continue shopping</Link>

            <div className="cart-checkout">
              <p>
                <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
              </p>

              <div className="checkout-text">
                <h4>
                  Subtotal:
                  <span> ${cartTotalAmount?.toFixed(2)}</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CartPage;
