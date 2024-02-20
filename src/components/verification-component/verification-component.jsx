import React, { useState } from "react";
import LeftArrow from "../../assets/arrow-left.svg";
import LeftImage from "../left-image/left-image.component";
import AppIcon from "../../assets/app-logo.svg";
import HomeIcon from "../../assets/home-icon.svg";
import AttentionIcon from "../../assets/attention-icon.svg";
import "./verification-component.styles.scss";
import "../create-account-component/create-account-component.styles.scss";
import Button from "../button/button.component";
import AuthCode from "react-auth-code-input";

const VerificationComponent = () => {
    const [code, setCode ] = useState('');
    const handleChange = (res) => {
        setCode(res);
      };
  return (
    <div className="create-account-component">
      <div className="left-hero">
        <LeftImage  />
      </div>
      <div className="right-personal-info">
        <div className="top-nav-desktop">
          <div className="top-section">
            <div className="left">
              <img className="arr-bck" src={LeftArrow} alt="" />
              <div className="bck-text">Back home</div>
            </div>
            <div className="right">
              Already have an account?{" "}
              <span className="login-green">
                Log in
              </span>
            </div>
          </div>
        </div>

        <div className="top-nav-mobile">
          <div className="top-section-mobile">
            <div className="left-nav">
              <img src={AppIcon} alt="" />
            </div>
            <div className="right-nav">
              <img className="home-icon" src={HomeIcon} alt="" />
              <div className="nav-txt">Back home</div>
            </div>
          </div>
        </div>


        <div className="veri-cont">
        <img className="att-icon" src={AttentionIcon} alt="" />
        <div className="verif-header">Verification required</div>
        <div className="veri-para">
        Account successfully created. 
        A verification code has been sent via SMS. 
        This code expires in 30 minutes.
        </div>

        <div className="enter-code">Enter verification code</div>
        <div className="code-input-container">
          <AuthCode 
          length={5}
          onChange={handleChange}
          containerClassName="code-input-container"
          inputClassName="box-class"
          />
        </div>

        <div className="green-bt">
            <Button disable={true} handleClick={() => {}} type="continue">
              Continue
            </Button>
            </div>

        <div className="resend-cont">
         Didn’t receive the code? <span className="click">Click to resend</span>
        </div>


      </div>

     
      </div>

     




    </div>
  );
};

export default VerificationComponent ;