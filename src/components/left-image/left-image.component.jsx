import React from "react";
import HeroImage from "../../assets/hero-img.svg";
import "./left-image.styles.scss";

const LeftImage = () => {
  return (
    <div className="left-image">
      <img className="hero-img" src={HeroImage} alt="" />
    </div>
  );
};

export default LeftImage;
