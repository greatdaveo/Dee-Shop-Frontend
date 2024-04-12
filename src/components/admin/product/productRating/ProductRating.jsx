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
            starSpacing="2px"
            numberOfStars={6}
            editing={false}
          />
          ({noOfRatings})
        </div>
      )}
    </div>
  );
};

export default ProductRating;
