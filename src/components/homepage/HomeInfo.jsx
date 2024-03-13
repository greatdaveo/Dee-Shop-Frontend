import React from "react";
import {
  BsCartCheck,
  BsClockHistory,
  BsFillCreditCardFill,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";
import "../../styles/components/homepage/HomeInfo.css";

const HomeInfo = () => {
  const data = [
    {
      icon: <FaShippingFast size={30} color="gold" />,
      heading: "Free Shipping",
      text: "Enjoy free shipping on special items.",
    },
    {
      icon: <BsFillCreditCardFill size={30} color="gold" />,
      heading: "Secure Payment",
      text: "Make fast & secure payment for your product.",
    },
    {
      icon: <BsCartCheck size={30} color="gold" />,
      heading: "Quality Products",
      text: "Buy quality products from tested & trusted brands.",
    },
    {
      icon: <BsClockHistory size={30} color="gold" />,
      heading: "24/7 Support",
      text: "Communicate with our special team anytime & any day.",
    },
  ];

  return (
    <div className="home-info">
      {data.map((info, i) => (
        <div className="home-info-data" key={i}>
          <h3 className="heading">
            <i className="icon">{info.icon}</i> {info.heading}
          </h3>
          <p className="text">{info.text}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeInfo;
