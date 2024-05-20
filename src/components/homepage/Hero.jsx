import "../../styles/components/homepage/Hero.css";
import NavBar from "../../components/homepage/NavBar";
import { Link } from "react-router-dom";
import Search from "../search/Search";

const Hero = () => {
  return (
    <main className="hero-container">
      <div style={{ background: "#2e2d2d" }}>
        <NavBar />
      </div>

      <div className="heroText">
        <h2>Buy everything online from your home!</h2>
        <p>Unlock the joy of shopping: Order from home and receive at home.</p>

        <div className="hero-search">
          <input type="text" placeholder="Search by product or category" />
          <span>Search</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
