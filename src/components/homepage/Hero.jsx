import "../../styles/components/homepage/Hero.css";
import NavBar from "../../components/homepage/NavBar";

const Hero = () => {
  return (
    <main className="hero-container">
      <NavBar />

      <div className="heroText">
        <h2>Buy online from your home!</h2>
        <p>Unlock the joy of shopping: Order from home and receive at home.</p>
        <button>Buy Items 🛒</button>
      </div>
    </main>
  );
};

export default Hero;
