import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllOrdersSlice } from "../../redux/features/order/orderSlice";
import ReactPaginate from "react-paginate";
import "../../styles/components/admin/orders/ListOfOrders.css";

const ListOfOrders = ({ openOrderDetails }) => {
  const dispatch = useDispatch();
  const { isLoading, orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrdersSlice());
  }, [dispatch]);

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
  );
};

export default ListOfOrders;
