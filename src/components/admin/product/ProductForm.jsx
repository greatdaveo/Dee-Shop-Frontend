import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProductForm = ({
  product,
  categories,
  saveProducts,
  handleInputChange,
  isEditing,
  filteredBrands,
}) => {
  return (
    <div>
      <form onSubmit={saveProducts}>
        <h3>Upload Widget Placeholder</h3>
        <label>Product Name: </label> <br />
        <input
          type="text"
          placeholder="Product Name"
          name="name"
          value={product?.name}
          onChange={handleInputChange}
        />
        <br />
        <label>Product Category: </label> <br />
        <select
          name="category"
          value={product?.category}
          onChange={handleInputChange}
        >
          {isEditing ? (
            <option value={product?.category}>{product?.category}</option>
          ) : (
            <option>Select category</option>
          )}
          {categories?.length > 0 &&
            categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
        <br />
        <label>Product Brand: </label> <br />
        <select name="brand" value={product.brand} onChange={handleInputChange}>
          {isEditing ? (
            <option value={product.brand}>{product.brand}</option>
          ) : (
            <option>Select brand</option>
          )}
          {filteredBrands.length > 0 &&
            filteredBrands.map((brand) => (
              <option key={brand._id} value={brand.name}>
                {brand.name}
              </option>
            ))}
        </select>
        <br />
        <button type="submit" className="btn">
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
