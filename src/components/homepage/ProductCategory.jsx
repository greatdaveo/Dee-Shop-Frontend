import React from "react";
import "../../styles/components/homepage/ProductCategory.css";

const categories = [
  {
    id: 1,
    title: "Gadgets",
    image: "https://i.ibb.co/5GVkd3m/c1.jpg",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image: "https://i.ibb.co/fNkBYgr/c3.jpg",
  },
];

const ProductCategory = (title, image) => {
  return (
    <div className="p-cat-container">
      <div className="categories">
        <h1>Catergories</h1>
      </div>

      <div className="p-cat-item">
        {categories.map((category) => (
          <div key={category.id} className="category">
            <h4>{category.title}</h4>
            <img src={category.image} alt={category.title} />
            <br />
            <button>Show Now 🛍️</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;
