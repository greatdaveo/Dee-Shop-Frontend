import React from "react";
import "../../styles/components/shop/ShopProductList.css";
import Search from "../../components/search/Search";
import { FaListAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";
import ProductItems from "./ProductItems";

const ShopProductsList = ({ products }) => {
  // console.log(products);

  const [grid, setGrid] = useState(true);

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
            <b>{products.length} ~ Products Found</b>
          </p>
        </div>

        <div>
          <Search />
        </div>

        <div className="sort">
          <label>Sort by: </label>
          <select>
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
          {products.map((product) => {
            return (
              <div key={product._id}>
                <ProductItems {...product} grid={grid} product={product} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShopProductsList;
