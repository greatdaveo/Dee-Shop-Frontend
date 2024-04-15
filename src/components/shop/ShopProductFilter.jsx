import React, { useEffect, useState } from "react";
import "../../styles/components/shop/ShopProductFilter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
} from "../../redux/features/products/filterSlice";

const ShopProductFilter = () => {
  // For Active Link to know which page is active
  const dispatch = useDispatch();

  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");

  const allCategories = [
    "All",
    // this will create a new set and it will contain the list of the product category
    ...new Set(products?.map((product) => product.category)), // new Set() method will make a duplicate category one
  ];
  // console.log(allCategories);

  const allBrands = [
    "All",
    // this will create a new set and it will contain the list of the product category
    ...new Set(products?.map((product) => product.brand)), // new Set() method will make a duplicate category one
  ];
  // console.log(allBrands);

  const filterProductsByCategory = (cat) => {
    // console.log(cat);
    setCategory(cat); // this will set the category to whatever is clicked by the user
    dispatch(FILTER_BY_CATEGORY({ products, category: cat })); //this will call the FILTER_BY_CATEGORY reducer function
  };

  // TO monitor the Brands state
  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ products, brand }));
  }, [dispatch, products, brand]);

  return (
    <div className="shop-filter">
      <h2>Categories</h2>

      <div>
        {allCategories.map((cat, i) => {
          return (
            <h4
              key={i}
              type="button"
              className={`${category}` === cat ? "isActive" : "null"}
              onClick={() => filterProductsByCategory(cat)}
            >
              &#8250; {cat}
            </h4>
          );
        })}
      </div>

      <div className="brands">
        <h2>Brands</h2>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          {allBrands.map((brand, i) => {
            return (
              <option key={i} value={brand}>
                {brand}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ShopProductFilter;
