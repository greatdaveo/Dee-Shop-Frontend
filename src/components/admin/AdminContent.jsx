import React from "react";
import CreateCategory from "./category/CreateCategory";
import CategoryList from "./category/CategoryList";
import { useDispatch } from "react-redux";
import { getAllCategorySlice } from "../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";

const AdminContent = () => {
  const dispatch = useDispatch();
  // To control how the page reloads when ever a new category is added to the category list
  const reloadCategory = () => {
    dispatch(getAllCategorySlice());
  };

  return (
    <div>
      <CreateCategory reloadCategory={reloadCategory} />
      <CategoryList />
    </div>
  );
};

export default AdminContent;
