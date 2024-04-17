import React, { useEffect, useState } from "react";
import "../../styles/components/shop/ShopProductFilter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
} from "../../redux/features/products/filterSlice";
import { GET_PRICE_RANGE } from "../../redux/features/products/productSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ShopProductFilter = () => {
  // For Active Link to know which page is active
  const dispatch = useDispatch();

  const { products, minPrice, maxPrice } = useSelector(
    (state) => state.product
  );

  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [price, setPrice] = useState([50, 1000]);

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

  // This will call the FILTER_BY_PRICE reducer function anytime the price range option changes
  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ products, price }));
  }, [dispatch, products, price]);

  // This will call the GET_PRICE_RANGE reducer function anytime the price range option changes
  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ products }));
  }, [dispatch, products]);
  // console.log(minPrice, maxPrice);

  // TO SET THE CLEAR FILTER BUTTON
  const clearFilter = () => {
    setCategory("All");
    setBrand("All");
    setPrice([minPrice, maxPrice]);
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

      <div className="price">
        <h2>Price</h2>
        <Slider
          range
          marks={{
            1: `${price[0]}`,
            1000: `${price[1]}`,
          }}
          min={minPrice}
          max={maxPrice}
          defaultValue={[minPrice, maxPrice]}
          tipFormatter={(value) => `$${value}`}
          tipProps={{
            placement: "top",
            visible: false,
          }}
          value={price}
          onChange={(price) => setPrice(price)}
        />
      </div>

      <button className="btn" onClick={clearFilter}>
        CLEAR
      </button>
    </div>
  );
};

export default ShopProductFilter;
