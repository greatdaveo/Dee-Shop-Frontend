import "../../styles/components/homepage/Hero.css";
import NavBar from "../../components/homepage/NavBar";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <main className="hero-container">
      <NavBar />

      <div className="heroText">
        <h2>Buy online from your home!</h2>
        <p>Unlock the joy of shopping: Order from home and receive at home.</p>
        <Link to="/shop">
          <button>Buy Items 🛒</button>
        </Link>
      </div>
    </main>
  );
};

export default Hero;
