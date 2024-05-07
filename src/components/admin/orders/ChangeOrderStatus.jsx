import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { updateOrderStatusSlice } from "../../../redux/features/order/orderSlice";

const ChangeOrderStatus = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  //   console.log(id);
  const [status, setStatus] = useState("");

  const updateOrder = async (e, id) => {
    e.preventDefault();
    const formData = {
      orderStatus: status,
    };

    // console.log(formData);
    await dispatch(updateOrderStatusSlice({ id, formData }));
  };

  return (
    <section
      style={{
        padding: "1rem 4rem",
        width: "fit-content",
      }}
    >
      <div
        style={{
          padding: "0rem 0.5rem",
          border: "2px solid gold",
          width: "fit-content",
          lineHeight: "1",
          borderRadius: "5px",
        }}
      >
        <h4>Update Status</h4>
        <form onSubmit={(e) => updateOrder(e, id)}>
          <div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                padding: "0.4rem 0rem",
                width: "20vw",
                borderColor: "gray",
                borderRadius: "5px",
              }}
            >
              <option value="" disabled>
                -- Choose One --
              </option>
              <option value="Order Placed...">Order Placed</option>
              <option value="Processing...">Processing</option>
              <option value="Shipped...">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              style={{
                padding: "0.5rem 0.8rem",
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                border: "none",
                backgroundColor: "#0066d4",
                color: "white",
                borderRadius: "5px",
                fontWeight: "bold",
              }}
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ChangeOrderStatus;
