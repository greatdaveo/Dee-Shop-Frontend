import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import {
  getAllBrandsSlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";

const AddProduct = () => {
  const initialState = {
    name: "",
    category: "",
    brand: "",
    quantity: "",
    // description: "",
    regularPrice: "",
    discountedPrice: "",
    color: "",
  };

  const dispatch = useDispatch();
  const [product, setProduct] = useState(initialState);
  const [filteredBrands, setFilteredBrands] = useState([]);
  // For Description state
  const [description, setDescription] = useState("");
  const {
    name,
    category,
    brand,
    quantity,
    color,
    regularPrice,
    discountedPrice,
  } = product;

  const { isLoading } = useSelector((state) => state.product);
  //   To get the Categories and Brands from the Database
  const { categories, brands } = useSelector((state) => state.category);

  //   To fetch the category and the brands when the page is refreshed
  useEffect(() => {
    dispatch(getAllCategorySlice());
    dispatch(getAllBrandsSlice());
  }, [dispatch]);

  // To filter Brands based on the product category selected
  const toFilterBrands = (selectedCategory) => {
    const newBrands = brands.filter(
      (brand) => brand.category === selectedCategory
    );
    setFilteredBrands(newBrands);
  };

  // To activate the function each time there is a change in the selected category
  useEffect(() => {
    toFilterBrands(category);
  }, [category]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // To destructure the product and match the name to its value
    setProduct({ ...product, [name]: value });
  };

  const saveProducts = (e) => {
    e.preventDefault();
    console.log(product);
    console.log(description)
  };

  return (
    <section>
      <h1>Add New Product</h1>

      <ProductForm
        product={product}
        saveProducts={saveProducts}
        handleInputChange={handleInputChange}
        categories={categories}
        brands={brands}
        isEditing={false}
        filteredBrands={filteredBrands}
        description={description}
        setDescription={setDescription}
      />
    </section>
  );
};

export default AddProduct;
