import React from "react";
import "../../../styles/components/admin/product/ProductForm.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import UploadWidget from "./UploadWidget";
import { BsTrash } from "react-icons/bs";

const ProductForm = ({
  product,
  categories,
  saveProducts,
  handleInputChange,
  isEditing,
  filteredBrands,
  description,
  setDescription,
  files,
  setFiles,
}) => {
  // To remover the product image

  const removeImage = (image) => {
    setFiles(files.filter((img) => img !== image));
  };
  return (
    <div className="product-form">
      <form onSubmit={saveProducts}>
        <div>
          <UploadWidget files={files} setFiles={setFiles} />
          <label>Product Images: </label>
          <div className="slide-container">
            <aside>
              {files.length > 0 &&
                files.map((image, i) => (
                  <div key={i} className="thumbnail">
                    <img src={image} alt="Product Image" height={100} />
                    <div>
                      <button>
                        <BsTrash
                          size={25}
                          className="thumbnail-icon"
                          onClick={() => removeImage(image)}
                        />
                      </button>
                    </div>
                  </div>
                ))}
            </aside>
          </div>
          <label>Product Name: </label> <br />
          <input
            type="text"
            placeholder="Product Name"
            name="name"
            value={product?.name}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Category: </label> <br />
          <select
            name="category"
            value={product?.category}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product?.category}>{product?.category}</option>
            ) : (
              <option>Select category</option>
            )}
            {categories?.length > 0 &&
              categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
          </select>
          <br />
          <label>Product Brand: </label> <br />
          <select
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          >
            {isEditing ? (
              <option value={product.brand}>{product.brand}</option>
            ) : (
              <option>Select brand</option>
            )}
            {filteredBrands.length > 0 &&
              filteredBrands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
          </select>
          <br />
          <label>Product Color:</label> <br />
          <input
            type="text"
            placeholder="Color"
            name="color"
            value={product.color}
            onChange={handleInputChange}
          />
          <br />
          <label>Regular Price:</label> <br />
          <input
            type="number"
            name="regularPrice"
            placeholder="Regular Price"
            value={product.regularPrice}
            onChange={handleInputChange}
          />
          <br />
          <label>Discounted Price:</label> <br />
          <input
            type="number"
            name="discountedPrice"
            placeholder="Discount Price"
            value={product.discountedPrice}
            onChange={handleInputChange}
          />
          <br />
          <label>Product Quantity:</label> <br />
          <input
            type="number"
            name="quantity"
            placeholder="Product Quantity"
            value={product.quantity}
            onChange={handleInputChange}
          />
          <br />
        </div>

        <div className="description">
          <label>Product Description: </label> <br />
          <ReactQuill
            theme="snow"
            value={description}
            style={{ width: "30vw", height: "20vh" }}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />
          <button type="submit" className="btn">
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],

    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],

    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
