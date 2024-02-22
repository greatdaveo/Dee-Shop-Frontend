import React from "react";
import Hero from "../components/homepage/Hero";
import HomeInfo from "../components/homepage/HomeInfo";
import LatestProducts from "../components/homepage/LatestProducts";
import Footer from "../components/Footer";
import { productData } from "../data/data";
import CarouselItems from "../components/carousel/CarouselItems";
import CarouselProducts from "../components/carousel/CarouselProducts";

const HomePage = () => {
  const products = productData.map((data, i) => (
    <div key={i}>
      <CarouselItems
        name={data.name}
        url={data.imageurl}
        price={data.price}
        description={data.description}
      />
    </div>
  ));

  return (
    <div>
      <Hero />
      <HomeInfo />
      <LatestProducts />

      <CarouselProducts products={products} />
      <h1>Home Page</h1>
      <Footer />
    </div>
  );
};

export default HomePage;
