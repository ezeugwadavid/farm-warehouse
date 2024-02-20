import React, { useState, useEffect } from "react";
import "./bank-details.styles.scss";
import Check from "../../assets/check.svg";
import Input from "../input/input.component";
import Button from "../button/button.component";
import PropTypes from "prop-types";

// get user bank details component
const BankDetails = ({ handleNext, handleBack }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [bankName, setBankName] = useState("");

  const bankDetail = {
    hasBankAccount: "true",
    hasSmartphone: "true",
    accountnumber: "",
    bankname: "",
  };

  const [bankCredentials, setBankCredentials] = useState(bankDetail);

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankCredentials({ ...bankCredentials, [name]: value });
  };

  const saveBankDetails = () => {
    if (!bankCredentials.bankname.trim().length > 0) return;
    if (!bankCredentials.accountnumber.trim().length > 3) return;
    localStorage.setItem("bankDetails", JSON.stringify(bankCredentials));
    handleNext();
  };

  const handleShowDropDown = () => {
    setShowDropDown((prevDropDown) => !prevDropDown);
  };

  const addBankName = (name) => {
    setBankName(name);
    setBankCredentials({ ...bankCredentials, bankname: name });
    handleShowDropDown();
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
              <Input
                type="radio"
                value="true"
                name="hasSmartphone"
                handleChange={handleBankDetailsChange}
                checked={bankCredentials.hasSmartphone === "true"}
                handleClick={() => {}}
              />
            </div>

            <div className="res-text">Yes</div>
          </div>

          <div className="no">
            <div className="radio">
              <Input
                type="radio"
                value="false"
                name="hasSmartphone"
                handleChange={handleBankDetailsChange}
                checked={bankCredentials.hasSmartphone === "false"}
                handleClick={() => {}}
              />
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
              <Input
                type="radio"
                name="hasBankAccount"
                value="true"
                handleChange={handleBankDetailsChange}
                checked={bankCredentials.hasBankAccount === "true"}
                handleClick={() => {}}
              />
            </div>

            <div className="res-text">Yes</div>
          </div>

          <div className="no">
            <div className="radio">
              <Input
                type="radio"
                name="hasBankAccount"
                value="false"
                handleChange={handleBankDetailsChange}
                checked={bankCredentials.hasBankAccount === "false"}
                handleClick={() => {}}
              />
            </div>

            <div className="res-text">No</div>
          </div>
        </div>
      </div>

      {/* inputs */}
      {bankCredentials.hasBankAccount === "true" ? (
        <div className="bank-details-inputs">
          <div className="input-grp">
            <div className="input-lable">Bank Name*</div>
            <Input
              readOnly={true}
              showIcon={true}
              value={bankName}
              iconName="DownArrow"
              placeholder="GT Bank"
              handleClick={handleShowDropDown}
            />

            {showDropDown ? (
              <div className="input-drop-down">
                <div
                  className="input-item"
                  onClick={() => addBankName("Guruanty Trust Bank")}
                >
                  <div className="bank-name">Guruanty Trust Bank</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => addBankName("United Bank of Africa")}
                >
                  <div className="bank-name">United Bank of Africa</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => addBankName("Zenith Bank")}
                >
                  <div className="bank-name">Zenith Bank</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => addBankName("Access Bank")}
                >
                  <div className="bank-name">Access Bank</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => addBankName("First Bank")}
                >
                  <div className="bank-name">First Bank</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="input-grp">
            <div className="input-lable">Personal Bank Account Number*</div>
            <Input
              readOnly={false}
              showIcon={false}
              placeholder="Enter account number"
              name="accountnumber"
              handleChange={handleBankDetailsChange}
              value={bankCredentials.accountnumber}
              handleClick={() => {}}
              type="number"
            />
            {/* <div className="account-name-verify-text">
          Account Name: Godwin Precious
        </div> */}
            {/* <div className="account-name-verify-text-error">Couldn't verify account number </div> */}
          </div>
        </div>
      ) : (
        ""
      )}

      {/* buttons */}
      <div className="btn-sections">
        <div className="white-btn">
          <Button disable={false} handleClick={handleBack} type="back">
            Back
          </Button>
        </div>

        {bankCredentials.bankname.trim().length > 0 &&
        bankCredentials.accountnumber.trim().length > 3 ? (
          <div className="green-btn">
            <Button
              disable={false}
              handleClick={saveBankDetails}
              type="continue"
            >
              Continue
            </Button>
          </div>
        ) : (
          <div className="green-btn">
            <Button disable={true} handleClick={() => {}} type="continue">
              Continue
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
BankDetails.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default BankDetails;
