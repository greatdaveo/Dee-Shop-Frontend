import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../styles/components/admin/brand/CreateBrand.css";
import {
  createBrandSlice,
  getAllBrandsSlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import { toast } from "react-toastify";

const CreateBrand = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const { isLoading, categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  //   To ensure the category is fetched from the database when the user reloads the page
  useEffect(() => {
    dispatch(getAllCategorySlice());
  }, [dispatch]);

  const saveBrand = async (e) => {
    e.preventDefault();
    console.log(name, category);
    if (name.length < 3) {
      return toast.error("Brand name must be up to 3 characters!");
    }
    if (!category) {
      return toast.error("Please add a parent category!");
    }

    const formData = {
      name,
      category,
    };

    // await To reload and update the brands list after saving
    await dispatch(createBrandSlice(formData));
    await dispatch(getAllBrandsSlice());

    setName("");
    setCategory("");
  };

  return (
    <div>
      <div className="create-brand">
        <h2>Create Brand</h2>
        <p>
          Kindly use this form to <b>Create a Category.</b>
        </p>

        <div>
          <form onSubmit={saveBrand}>
            <label>Brand Name: </label> <br />
            <input
              type="text"
              placeholder="Brand Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Parent Category Name: </label> <br />
            <select
              name="category"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Select category</option>
              {categories.length > 0 &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            <br />
            <button type="submit" className="btn">
              Save Brand
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBrand;
