import React, { useEffect, useRef } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import "../../styles/pages/order/OrderDetails.css";
import AllOrderDetails from "../../components/admin/orders/AllOrderDetails";

const OrderDetails = () => {
  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <section>
        <AllOrderDetails orderPageLink={"/order-history"} />
      </section>

      <Footer />
    </div>
  );
};

export default OrderDetails;
