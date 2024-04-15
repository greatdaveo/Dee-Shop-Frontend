import React from "react";
import StarRatings from "react-star-ratings";

const ProductRating = ({ averageRating, noOfRatings }) => {
  return (
    <div>
      {averageRating > 0 && (
        <div>
          <StarRatings
            rating={averageRating}
            starRatedColor="#F6B01E"
            starDimension="20px"
            starSpacing="2px"
            numberOfStars={5}
            editing={false}
          />

          {/* ({noOfRatings}) */}
        </div>
      )}
    </div>
  );
};

export default ProductRating;
