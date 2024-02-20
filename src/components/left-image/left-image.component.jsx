import React from "react";
import HeroImage from "../../assets/hero-img.svg";
import BankHero from "../../assets/bank-hero.svg";
import FarmRegHero from "../../assets/farm-reg-hero.svg";
import FingerPrintHero from "../../assets/fingerprint-hero.svg";
import HeroIconVeg from "../../assets/woman-veg.svg";
import PropTypes from "prop-types";
import "./left-image.styles.scss";

const LeftImage = ({ activeStep }) => {
  return (
    <div className="left-image">
      <img
        className="hero-img"
        src={
          activeStep === 0
            ? HeroImage
            : activeStep === 1
            ? BankHero
            : activeStep === 2
            ? FingerPrintHero
            : activeStep === 3
            ? FarmRegHero
            : HeroIconVeg
        }
        alt=""
      />
    </div>
  );
};
LeftImage.propTypes = {
  activeStep: PropTypes.string,
};
export default LeftImage;
