import React, { useEffect } from "react";
import "../../styles/components/shop/ShopProductList.css";
import Search from "../../components/search/Search";
import { FaListAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";
import ProductItems from "./ProductItems";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_SEARCH,
  SORT_PRODUCTS,
} from "../../redux/features/products/filterSlice";
import ReactPaginate from "react-paginate";

const ShopProductsList = ({ products }) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("latest");
  // console.log(products);

  const dispatch = useDispatch();
  // This filteredProducts will be updated with the products and I will have to map through this to get the product that is being searched
  const { filteredProducts } = useSelector((state) => state.filter);

  // This will call the FILTER_BY_SEARCH reducer function anytime the search value changes
  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  // This will call the SORT_PRODUCTS reducer function anytime the sort option changes
  useEffect(() => {
    dispatch(SORT_PRODUCTS({ products, sort }));
  }, [dispatch, products, sort]);

  // For Pagination
  const itemsPerPage = 8;

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // const currentItems = products.slice(itemOffset, endOffset);
  const currentItems = Array.isArray(products)
    ? filteredProducts.slice(itemOffset, endOffset)
    : [];

  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;

    setItemOffset(newOffset);
  };

  return (
    <div className="product-list">
      <div className="top">
        <div className="icons">
          <BsFillGridFill
            size={22}
            color="#0066d4"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="gold" onClick={() => setGrid(false)} />

          <p>
            <b>{currentItems.length} ~ Products Found</b>
          </p>
          
        </div>

        <div>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="sort">
          <label>Sort by: </label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>

      {products.length === 0 ? (
        <p style={{ textAlign: "center" }}>No product found!</p>
      ) : (
        <div className={grid ? "grid-products" : "list-products"}>
          {currentItems.map((product) => {
            return (
              <div key={product._id}>
                <ProductItems {...product} grid={grid} product={product} />
              </div>
            );
          })}
        </div>
      )}

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

export default ShopProductsList;
