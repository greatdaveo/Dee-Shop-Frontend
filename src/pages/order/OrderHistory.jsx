import React, { useEffect, useState } from "react";
import NavBar from "../../components/homepage/NavBar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "../../styles/pages/order/OrderHistory.css";
import { getAllOrdersSlice } from "../../redux/features/order/orderSlice";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { shortenText } from "../../utils";
import ReactPaginate from "react-paginate";

const OrderHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersSlice());
  }, [dispatch]);

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

        <div className="table">
          {!isLoading && orders?.length === 0 ? (
            <p>--No order Found...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(orders) ? (
                  paginatedOrders.map((order, i) => {
                    return (
                      <tr key={i} onClick={() => openOrderDetails(order._id)}>
                        <td>{i + 1}</td>
                        <td>
                          {order.orderDate} @ {order.orderTime}
                        </td>
                        <td>{order._id}</td>
                        <td>${order.orderAmount}</td>
                        <td
                          className={
                            order.orderStatus !== "Delivered"
                              ? "pending"
                              : "delivered"
                          }
                        >
                          <>{order.orderStatus}</>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <p>No Order Found!</p>
                )}
              </tbody>
            </table>
          )}
        </div>

        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< Prev"
            renderOnZeroPageCount={null}
            className="pagination"
            // containerClassName="pagination-container"
            pageLinkClassName="pageLinkClassName"
            previousLinkClassName="previousLinkClassName"
            nextLinkClassName="nextLinkClassName"
            activeLinkClassName="activeLinkClassName"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderHistory;
