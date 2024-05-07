import React from "react";
import ListOfOrders from "../../../pages/order/ListOfOrders";
import { useNavigate } from "react-router";
import ChangeOrderStatus from "./ChangeOrderStatus";

const AdminOrders = () => {
  const navigate = useNavigate();

  const openOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <div style={{ padding: "0.5rem 0rem" }}>
      <div
        className="order-header"
        style={{
          padding: "1rem 3rem",
          marginBottom: "-1.5rem",
          lineHeight: "0.9",
        }}
      >
        <h1>All Orders Made By Customers</h1>
        <p>
          Open an order to <b>Change Order Status!</b>
        </p>
      </div>

      <ListOfOrders openOrderDetails={openOrderDetails} />
    </div>
  );
};

export default AdminOrders;
