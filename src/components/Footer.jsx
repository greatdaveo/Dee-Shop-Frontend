import { Link } from "react-router-dom";
import "../styles/components/homepage/Footer.css";
import { Logo } from "./homepage/Logo";

const Footer = () => {
const date = new Date().getFullYear();

return (
  <div>
    <div className="footer-container">
      <div>{Logo}</div>

      <div>
        <ul>
          <li>
            <p>Features</p>
          </li>
          <li>
            <Link>Branded Links</Link>
          </li>
          <li>
            <Link>Analytics</Link>
          </li>
          <li>
            <Link>Blog</Link>
          </li>
        </ul>

        <ul>
          <li>
            <p>Support</p>
          </li>
          <li>
            <Link>Support docs</Link>
          </li>
          <li>
            <Link>Join Sellers</Link>
          </li>
          <li>
            <Link>Contact</Link>
          </li>
        </ul>

        <ul>
          <li>
            <p>Company</p>
          </li>
          <li>
            <Link>About</Link>
          </li>
          <li>
            <Link>Our Team</Link>
          </li>
          <li>
            <Link>Career</Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="rights">
      <h4>© {date} All Right Reserved</h4>
    </div>
  </div>
);
};

export default Footer;
