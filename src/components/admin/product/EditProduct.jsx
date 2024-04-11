import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  editProductSlice,
  singleProduct,
  updateProductSlice,
} from "../../../redux/features/products/productSlice";
import {
  getAllBrandsSlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import ProductForm from "./ProductForm";

const EditProduct = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message } = useSelector((state) => state.product);
  // For the single product to be edited
  const productToEdit = useSelector(singleProduct);
  const [product, setProduct] = useState(productToEdit);

  // This is to get the id of the product to be edited
  useEffect(() => {
    dispatch(editProductSlice(id));
  }, [dispatch, id]);

  // This to control the editing state of the Product, Description and the files
  useEffect(() => {
    setProduct(productToEdit);

    setDescription(
      productToEdit && productToEdit.description
        ? productToEdit.description
        : ""
    );

    if (productToEdit && productToEdit.image) {
      setFiles(productToEdit.image);
    }
  }, [productToEdit]);

  const [filteredBrands, setFilteredBrands] = useState([]);

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
    toFilterBrands(product?.category);
  }, [product?.category]);

  // The state of the uploaded images file of the product
  const [files, setFiles] = useState([]);
  // For Description state
  const [description, setDescription] = useState("");

  // To save the product after editing
  const saveProducts = async (e) => {
    e.preventDefault();
    // console.log(product);
    // console.log(description)

    if (files.length < 1) {
      return toast.error("Please add at least 1 image!");
    }

    const formData = {
      name: product.name,
      image: files, // This is the image of the product to be saved in Mongo DB
      // sku: generateSKU(category), this remains the same, as I am not changing it
      category: product.category,
      brand: product.brand,
      color: product.color,
      quantity: Number(product.quantity),
      regularPrice: product.regularPrice,
      discountedPrice: product.discountedPrice,
      description,
    };

    // console.log(formData);

    // After editing to save the Product Form Data to the Database
    await dispatch(updateProductSlice(id, formData));

    navigate("/admin/all-products");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // To destructure the product and match the name to its value
    setProduct({ ...product, [name]: value });
  };

  return (
    <section>
      <h1>Edit and Update Product</h1>

      <ProductForm
        product={product}
        saveProducts={saveProducts}
        handleInputChange={handleInputChange}
        categories={categories}
        brands={brands}
        isEditing={true}
        filteredBrands={filteredBrands}
        description={description}
        setDescription={setDescription}
        files={files}
        setFiles={setFiles}
      />
    </section>
  );
};

export default EditProduct;
