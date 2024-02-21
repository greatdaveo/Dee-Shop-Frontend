import React from "react";
import Hero from "../components/homepage/Hero";
import HomeInfo from "../components/homepage/HomeInfo";
import LatestProducts from "../components/homepage/LatestProducts";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <HomeInfo />
      <LatestProducts />
      <h1>Home Page</h1>
      <Footer />
    </div>
  );
};

export default HomePage;
