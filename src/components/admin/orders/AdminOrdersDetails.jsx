import React from "react";
import { Link } from "react-router-dom";
import OrderDetails from "../../../pages/order/OrderDetails";
import ChangeOrderStatus from "./ChangeOrderStatus";
import AllOrderDetails from "./AllOrderDetails";

const AdminOrdersDetails = () => {
  return (
    <div>
      <AllOrderDetails orderPageLink={"/admin/orders"} />
      <ChangeOrderStatus />
    </div>
  );
};

export default AdminOrdersDetails;
