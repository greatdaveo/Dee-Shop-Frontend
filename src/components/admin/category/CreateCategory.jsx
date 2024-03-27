import React from "react";
import { useState } from "react";
import "../../../styles/components/admin/category/CreateCategory.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const saveCategory = (e) => {
    e.preventDefault();

    console.log(e);
  };
  return (
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
  );
};

export default CreateCategory;
