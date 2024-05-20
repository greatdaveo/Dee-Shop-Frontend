import React from "react";
import "../../styles/components/homepage/ProductCategory.css";

const categories = [
  {
    id: 1,
    title: "Gadgets",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/iphone-15-pro-review-gh-main-650987dcbf4db.jpg?crop=0.6654991243432574xw:1xh;center,top&resize=640:*",
  },
  {
    id: 2,
    title: "Womens Fashion",
    image: "https://i.ibb.co/nQKLjrW/c2.jpg",
  },
  {
    id: 3,
    title: "Sport Sneakers",
    image:
      "https://media.gq.com/photos/63eba1b2275d2fef78a425c2/1:1/w_1125,h_1125,c_limit/nike-running-shoes-streakfly-invincible.jpg",
  },

  {
    id: 3,
    title: "Designer Bags",
    image:
      "https://hips.hearstapps.com/hmg-prod/images/louis-vuitton-bags-aw23-6407341c8c1ff.jpg?crop=0.564xw:1.00xh;0,0&resize=640:*",
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
