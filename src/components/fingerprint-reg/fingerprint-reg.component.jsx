import React, { useState } from "react";
import "./fingerprint-reg.styles.scss";
import Thumb from "../../assets/thumb.svg";
import Index from "../../assets/index.svg";
import InfoIcon from "../../assets/thumb-info.svg";
import CheckBoxSquare from "../../assets/checkbox-square.svg";
import CheckBoxSquareTicked from "../../assets/checkbox-square-ticked.svg";
import Button from "../button/button.component";
import PropTypes from "prop-types";

const FingerprintReg = ({ handleBack, handleNext }) => {
  const [checkTicked, setCheckTicked] = useState(false);
  return (
    <div className="fingerprint-container">
      <div className="fingerprint-header">
        Security - Setup Fingerprint{" "}
        <span className="optional-italic">(Optional)</span>
      </div>

      <div className="finger-print-box">
        <div className="box-header">
          Capture Fingerprint (Your L-R Index fingers)
        </div>
        <div className="thumb-section">
          <div className="thumb-item">
            <img src={Thumb} alt="" />
            <div className="thumb-text">Left thumb</div>
          </div>
          <div className="thumb-item">
            <img src={Thumb} alt="" />
            <div className="thumb-text">Left thumb</div>
          </div>
          <div className="thumb-item">
            <img src={Index} alt="" />
            <div className="thumb-text">Right thumb</div>
          </div>

          <div className="thumb-item">
            <img src={Index} alt="" />
            <div className="thumb-text">Right index</div>
          </div>
        </div>

        <div className="thumb-info">
          <img className="info-icon" src={InfoIcon} alt="" />
          <div className="thumb-info-text">
            Place your finger on the fingerprint scanner to capture your
            fingerprint. Ensure your finger covers the entire scanner.
          </div>
        </div>

        <div className="skip-box">
          <img
            onClick={() => setCheckTicked(!checkTicked)}
            src={checkTicked ? CheckBoxSquareTicked : CheckBoxSquare}
            alt=""
          />
          <div className="skip-text">Skip for now</div>
        </div>

        {/* buttons */}
        <div className="btn-section-fingerprint">
          <div className="fingerprint-bck">
            <Button disable={false} handleClick={handleBack} type="back">
              Back
            </Button>
          </div>
          {checkTicked ? (
            <div className="fingerprint-forward">
              <Button disable={false} handleClick={handleNext} type="continue">
                Continue
              </Button>
            </div>
          ) : (
            <div className="fingerprint-forward">
              <Button disable={true} handleClick={() => {}} type="continue">
                Continue
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

FingerprintReg.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};

export default FingerprintReg;
