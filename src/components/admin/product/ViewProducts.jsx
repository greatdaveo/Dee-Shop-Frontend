import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/admin/product/ViewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSlice } from "../../../redux/features/products/productSlice";
import Search from "../../search/Search";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { shortenText } from "../../../utils/index";
import ReactPaginate from "react-paginate";

const ViewProducts = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  // For Searching component
  const { search, setSearch } = useState();

  // It should only fetch the all the products when the user is Logged in
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProductsSlice());
    }
  }, [isLoggedIn, dispatch]);

  // For Pagination
  const itemsPerPage = 5;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;

    setItemOffset(newOffset);
  };

  // End of Pagination

  return (
    <section className="product-list">
      <h2>All Products</h2>
      <div className="header">
        <p>
          <b>{products.length}</b> ~ Products Found
        </p>

        <span>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </span>
      </div>
      <div className="table">
        {!isLoading && products.length === 0 ? (
          <p>--No Product Found...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((product, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{shortenText(product.name, 16)}</td>
                  <td>{product.category}</td>
                  <td>${product.discountedPrice}</td>
                  <td>{product.quantity}</td>
                  <td>${product.discountedPrice * product.quantity}</td>
                  <td className="td-icons">
                    <span>
                      <Link to="/">
                        <AiOutlineEye size={25} color={"purple"} />
                      </Link>
                    </span>

                    <span>
                      <Link to="/">
                        <FaEdit size={20} color={"green"} />
                      </Link>
                    </span>

                    <span>
                      <FaTrashAlt size={20} color={"red"} />
                    </span>
                  </td>
                </tr>
              ))}
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
    </section>
  );
};

export default ViewProducts;
