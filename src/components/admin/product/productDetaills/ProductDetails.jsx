import React, { useEffect, useState } from "react";
import "../../../../styles/pages/product/ProductDetails.css";
import NavBar from "../../../homepage/NavBar";
import Footer from "../../../Footer";
import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../loader/loader";
import { editProductSlice } from "../../../../redux/features/products/productSlice";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  //   console.log(product);

  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    dispatch(editProductSlice(id));
  }, [dispatch, id]);

  return (
    <div>
      {isLoading && <Loader />}
      <div>
        <div style={{ background: "black" }}>
          <NavBar />
        </div>

        <section className="pd">
          <div className="pd-header">
            <h2>Product Details</h2>
            <Link to="/shop"> &larr; Back to products</Link>
          </div>

          <div className="pd-content">
            <div className="img-cover">
              <img
                src={product?.image[imageIndex]}
                alt={product?.name}
                className="main-img"
              />

              <div className="small-img">
                {product?.image.map((img, i) => {
                  return (
                    <img
                      key={i}
                      src={img}
                      alt="Product Image"
                      onClick={() => setImageIndex(i)}
                      className={imageIndex === i ? "activeImg" : ""}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
