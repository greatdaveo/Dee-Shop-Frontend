import React, { useEffect, useRef } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getSingleOrderSlice } from "../../redux/features/order/orderSlice";
import { Link } from "react-router-dom";
import "../../styles/pages/order/OrderDetails.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const OrderDetails = () => {
  const { id } = useParams();
  const pdfRef = useRef();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSingleOrderSlice(id));
  }, [dispatch, id]);

  const downloadPDf = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imageWidth = canvas.width;
      const imageHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imageWidth, pdfHeight / imageHeight);
      const imgX = (pdfWidth - imageWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imageWidth * ratio,
        imageHeight * ratio
      );
      pdf.save(`DeeShopApp-Invoice.pdf`);
    });
  };

  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <section>
        <div className="order-details-text" ref={pdfRef}>
          <h2>Order Details</h2>
          <Link to="/order-history">&larr; Back to Orders</Link>

          <div>
            <p>
              <b>Ship to: </b> {order?.shippingAddress?.name}
            </p>

            <p>
              <b>Order Amount: </b> {order?._id}
            </p>

            <p>
              <b>Order Amount: </b> ${order?.orderAmount}
            </p>

            <p>
              <b>Coupon: </b> {order?.coupon.name} | {order?.coupon?.discount}%
            </p>

            <p>
              <b>Payment Method: </b> {order?.paymentMethod}
            </p>
            <p>
              <b>Order Status: </b> {order?.orderStatus}
            </p>

            <p>
              <b>Shipping Address:</b>
              <br />
              Address: {order?.shippingAddress?.line1},{" "}
              {order?.shippingAddress?.line2}
              <br />
              City: {order?.shippingAddress?.city}
              <br />
              State: {order?.shippingAddress?.state}
              <br />
              Country: {order?.shippingAddress?.country}
            </p>
          </div>

          {/* TABLE */}
          <div className="table">
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
                {order?.cartItems?.map((cart, i) => {
                  const { _id, name, discountedPrice, image, cartQuantity } =
                    cart;

                  return (
                    <tr key={_id}>
                      <td style={{ padding: "10px" }}>{i + 1}</td>
                      <td>
                        <p style={{ marginBottom: "1px", marginTop: "8px" }}>
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

                      <td>{cartQuantity}</td>

                      <td>{discountedPrice * cartQuantity}</td>
                      <td>
                        <button className="review-btn">Review Product</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pdf-btn">
          <button onClick={downloadPDf}>Download as PDF</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrderDetails;
