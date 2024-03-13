import "../../styles/components/loader/loader.css";
import loaderImg from "../../assets/components/loader.gif";

const Loader = () => {
  return (
    <div className="loading-wrapper">
      <div className="loader">
        <img src={loaderImg} alt="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
