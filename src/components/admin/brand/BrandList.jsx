import React, { useEffect } from "react";
import "../../../styles/components/admin/brand/BrandList.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBrandSlice,
  getAllBrandsSlice,
} from "../../../redux/features/CategoryAndBrands/CategoryAndBrandSlice";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const BrandList = () => {
  const { brands } = useSelector((state) => state.category);

  // console.log(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBrandsSlice());
  }, [dispatch]);

  const confirmToDelete = (slug) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure you want to delete brand?",
      buttons: [
        {
          label: "Delete",
          onClick: () => deleteBrand(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const deleteBrand = async (slug) => {
    await dispatch(deleteBrandSlice(slug));

    // To refresh the page and the brands state after deleting
    await dispatch(getAllBrandsSlice());
  };
  return (
    <div className="brand-cover">
      <h1>Brands List 📃</h1>

      <div className="brand-table">
        {brands.length === 0 ? (
          <p>No Brand Found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Array.isArray(brands) ? (
                brands.map((brand, i) => (
                  <tr key={brand._id}>
                    <td>{i + 1}</td>
                    <td>{brand.name}</td>
                    <td>{brand.category}</td>
                    <td>
                      <button>
                        <FaTrashAlt
                          size={15}
                          color="red"
                          onClick={() => confirmToDelete(brand.slug)}
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

export default BrandList;
