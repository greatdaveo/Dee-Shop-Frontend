import React, { useEffect } from "react";
import "../../../styles/components/admin/category/CategoryList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategorySlice,
  getAllCategorySlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CategoryList = () => {
  const { categories, isError, isSuccess } = useSelector(
    (state) => state.category
  );

  // console.log(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategorySlice());
  }, [dispatch]);

  const confirmToDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Please confirm to delete category!",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteCat(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const deleteCat = async (slug) => {
    await dispatch(deleteCategorySlice(slug));
    // To refresh the page after deleting
    await dispatch(getAllCategorySlice());
  };

  return (
    <div className="cat-cover">
      <h1>CategoryList</h1>

      <div className="cat-table">
        {categories.length === 0 ? (
          <p>No Category Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(categories) ? (
                categories.map((cat, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{cat.name}</td>
                    <td>
                      <button>
                        <FaTrashAlt
                          size={15}
                          color="red"
                          onClick={() => confirmToDelete(cat.slug)}
                        />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No Categories found!</p>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
