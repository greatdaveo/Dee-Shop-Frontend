import React, { useEffect, useState } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/pages/order/OrderHistory.css";
import { getAllOrdersSlice } from "../../redux/features/order/orderSlice";
import ReactPaginate from "react-paginate";
import ListOfOrders from "./ListOfOrders";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, orders } = useSelector((state) => state.order);

  const openOrderDetails = (id) => {
    navigate(`/order-details/${id}`);
  };

  // For Pagination
  const itemsPerPage = 5;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const paginatedOrders = Array.isArray(orders)
    ? orders.slice(itemOffset, endOffset)
    : [];

  const pageCount = Math.ceil(orders?.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % orders.length;

    setItemOffset(newOffset);
  };

  // End of Pagination

  return (
    <div>
      <div style={{ background: "black" }}>
        <NavBar />
      </div>

      <div className="order-history">
        <div className="order-history-header">
          <h1>Your Order History</h1>
          <p>
            Open an order <b>ID</b> to <b>review product</b>
          </p>
        </div>

        <ListOfOrders openOrderDetails={openOrderDetails} />
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
