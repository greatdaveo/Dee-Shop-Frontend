// To reduce text length
export const shortenText = (text, n) => {
  if (text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }

  return text;
};

// To check email validation
export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// To calculate the average Product rating
export function calculateAverageRating(ratings) {
  if (!Array.isArray(ratings) || ratings.length === 0) {
    return 0; // This will return 0 if the ratings array is empty or not an array
  }

  var totalStars = 0;
  for (var i = 0; i < ratings.length; i++) {
    var rating = ratings[i];
    if (rating.hasOwnProperty("star")) {
      totalStars += rating.star;
    }
  }

  return totalStars / ratings.length; //This is the calculation of the averageRatings
}

// To get the cart quantity by the id of a product
export const getCartQuantityById = (products, id) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i]._id === id) {
      return products[i].cartQuantity;
    }
  }
  return 0; // If the _id is not found, return 0 or any default value
};

// To Extract id and cart quantity from cartItems
export function extractIdAndCartQuantity(cartItems) {
  return cartItems.map(function (product) {
    return {
      _id: product._id,
      cartQuantity: product.cartQuantity,
    };
  }); 
}