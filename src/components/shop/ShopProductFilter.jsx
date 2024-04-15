import React, { useEffect, useState } from "react";
import "../../styles/components/shop/ShopProductFilter.css";
import { useSelector } from "react-redux";

const ShopProductFilter = () => {
  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const [category, setCategory] = useState("All");
  const allCategories = [
    "All",
    // this will create a new set and it will contain the list of the product category
    ...new Set(products?.map((product) => product.category)), // new Set() method will make a duplicate category one
  ];
  // console.log(allCategories);

  const filterProductsByCategory = (cat) => {
    console.log(cat);
  };

  return (
    <div className="shop-filter">
      <h2>Categories</h2>

      <div>
        {allCategories.map((cat, i) => {
          return (
            <h4
              key={i}
              type="button"
              className={`${category}` === cat ? "isActive" : "mull"}
              onClick={() => filterProductsByCategory(cat)}
            >
              &#8250; {cat}
            </h4>
          );
        })}
      </div>
    </div>
  );
};

export default ShopProductFilter;
