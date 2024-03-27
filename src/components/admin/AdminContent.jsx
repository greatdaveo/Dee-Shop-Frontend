import React from "react";
import CreateCategory from "./category/CreateCategory";
import CategoryList from "./category/CategoryList";

const AdminContent = () => {
  return (
    <div>
      <CreateCategory />
      <CategoryList />
    </div>
  );
};

export default AdminContent;
