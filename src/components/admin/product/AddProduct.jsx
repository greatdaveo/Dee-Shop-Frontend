import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import {
  getAllBrandsSlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import { createProductSlice } from "../../../redux/features/products/productSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddProduct = () => {
  const initialState = {
    name: "",
    category: "",
    brand: "",
    quantity: "",
    regularPrice: "",
    discountedPrice: "",
    color: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialState);
  const [filteredBrands, setFilteredBrands] = useState([]);
  // The state of the uploaded images file of the product
  const [files, setFiles] = useState([]);
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

  // To Create SKU - Store Keeping Unit
  const generateSKU = (category) => {
    const letter = category.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };

  // To save the product
  const saveProducts = async (e) => {
    e.preventDefault();
    // console.log(product);
    // console.log(description)

    if (files.length < 1) {
      return toast.error("Please add at least 1 image!");
    }

    const formData = {
      name,
      image: files, // This is the image of the product to be saved in Mongo DB
      sku: generateSKU(category),
      category,
      brand,
      color,
      quantity,
      regularPrice,
      discountedPrice,
      description,
    };

    // console.log(formData);

    // To save the Product Form Data to the Database
    await dispatch(createProductSlice(formData));
    navigate("/admin/all-products");
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
        files={files}
        setFiles={setFiles}
      />
    </section>
  );
};

export default AddProduct;
