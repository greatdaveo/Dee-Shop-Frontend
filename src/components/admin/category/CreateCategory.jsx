import React from "react";
import { useState } from "react";
import "../../../styles/components/admin/category/CreateCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createCategorySlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
// import Loader from "../../loader/loader";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCategory = async (e) => {
    e.preventDefault();
    // console.log(name);
    if (name.length < 3) {
      return toast.error("Category name must be up to 3 characters!");
    }

    const formData = {
      name,
    };

    // await to ensure it reloads and update the created category list in the browser
    await dispatch(createCategorySlice(formData));
    await dispatch(getAllCategorySlice());
    setName("");
  };

  return (
    <div>
      <div className="create-cat">
        <h2>Create Category</h2>
        <p>
          Kindly use this form to <b>Create a Category.</b>
        </p>

        <div>
          <form onSubmit={saveCategory}>
            <label>Category Name: </label> <br />
            <input
              type="text"
              placeholder="Category Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <button type="submit" className="btn">
              Save Category
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
