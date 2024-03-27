import React from "react";
import { useState } from "react";
import "../../../styles/components/admin/category/CreateCategory.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategorySlice } from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import Loader from "../../loader/loader";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const saveCategory = (e) => {
    e.preventDefault();
    // console.log(name);
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 characters!");
    }

    const formData = {
      name,
    };

    dispatch(createCategorySlice(formData));
    setName("");
    toast.success("Category created successfully!");
  };

  return (
    <>
      {isLoading && <Loader />}

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
    </>
  );
};

export default CreateCategory;
