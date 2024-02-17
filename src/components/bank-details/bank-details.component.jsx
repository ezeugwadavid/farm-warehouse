import React, { useState } from "react";
import "./bank-details.styles.scss";
import Check from "../../assets/check.svg";
import Input from "../input/input.component";
import Button from "../button/button.component";
import PropTypes from "prop-types";

const BankDetails = ({ handleNext, handleBack}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const handleShowDropDown = () => {
    setShowDropDown((prevDropDown) => !prevDropDown);
  };

  return (
    <div className="bank-details-container">
      <div className="bank-details-header">Bank Details</div>

      {/* radio group section */}
      <div className="user-response-selection">
        <div className="question-text">Do you have a Smartphone?</div>

        <div className="response-section">
          <div className="yes">
            <div className="radio">
              <Input type="radio" />
            </div>

            <div className="res-text">Yes</div>
          </div>

          <div className="no">
            <div className="radio">
              <Input type="radio" />
            </div>

            <div className="res-text">No</div>
          </div>
        </div>
      </div>

      {/* radio group section */}
      <div className="user-response-selection">
        <div className="question-text">Do you have a Bank Account?</div>

        <div className="response-section">
          <div className="yes">
            <div className="radio">
              <Input type="radio" />
            </div>

            <div className="res-text">Yes</div>
          </div>

          <div className="no">
            <div className="radio">
              <Input type="radio" />
            </div>

            <div className="res-text">No</div>
          </div>
        </div>
      </div>

      {/* inputs */}
      <div className="bank-details-inputs">
        <div className="input-group">
          <div className="input-lable">Bank Name*</div>
          <Input
            readOnly={true}
            showIcon={true}
            iconName="DownArrow"
            placeholder="GT Bank"
            handleClick={handleShowDropDown}
          />

          {showDropDown ? (
            <div className="input-drop-down">
              <div className="input-item">
                <div className="bank-name">Guruanty Trust Bank</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="input-group">
          <div className="input-lable">Personal Bank Account Number*</div>
          <Input readOnly={false} showIcon={false} placeholder="01234578" />
          <div className="account-name-verify-text">
            Account Name: Godwin Precious
          </div>
          {/* <div className="account-name-verify-text-error">Couldn't verify account number </div> */}
        </div>
      </div>

      {/* buttons */}
      <div className="btn-section">
        <div className="white-btn">
          <Button disable={false} handleClick={handleBack} type="back">
            Back
          </Button>
        </div>
        <div className="green-btn">
          <Button disable={false} handleClick={handleNext} type="continue">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};
BankDetails.propTypes = {
    handleNext: PropTypes.func,
    handleBack: PropTypes.func,
  };
export default BankDetails;
