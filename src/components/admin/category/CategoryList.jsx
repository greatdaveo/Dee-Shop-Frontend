import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategorySlice } from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import { FaTrashAlt } from "react-icons/fa";
// import Loader from "../../loader/loader";

const CategoryList = () => {
  const { categories, isError, isSuccess } = useSelector(
    (state) => state.category
  );

  // console.log(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategorySlice());
  }, [dispatch]);

  return (
    <div>
      <div>
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
                    // const { _id, name, slug } = cat;

                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{cat.name}</td>
                      <td>
                        <span>
                          <FaTrashAlt size={15} color="red" />
                        </span>
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
    </div>
  );
};

export default CategoryList;
