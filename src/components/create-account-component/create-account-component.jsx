import React from "react";
import LeftArrow from "../../assets/arrow-left.svg";
import StepActive from "../../assets/step-active.svg";
import StepTicked from "../../assets/step-ticked.svg";
import StepInactive from "../../assets/stepper-inactive.svg";
import AppIcon from "../../assets/app-logo.svg";
import HomeIcon from "../../assets/home-icon.svg";
import LeftImage from "../left-image/left-image.component";
import "./create-account-component.styles.scss";
import PersonalInfo from "../personal-info/personal-info.component";

const CreateAccountComponent = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="create-account-component">
      <div className="left-hero">
        <LeftImage />
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
              <span onClick={() => handleNext()} className="login-green">
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

        <div className="form-section">
          <div className="left-stepper">
            <img
              className="step-head-1"
              src={activeStep > 0 ? StepTicked : StepActive}
              alt=""
            />
            <div
              className={activeStep > 0 ? "step-line-1-green" : "step-line-1"}
            ></div>
            <img
              className="step-head-2"
              src={
                activeStep > 1
                  ? StepTicked
                  : activeStep === 1
                  ? StepActive
                  : StepInactive
              }
              alt=""
            />
            <div
              className={
                activeStep > 1
                  ? "step-line-2-green"
                  : activeStep === 1
                  ? "step-line-2"
                  : "step-line-2"
              }
            ></div>
            <img
              className="step-head-3"
              src={
                activeStep > 2
                  ? StepTicked
                  : activeStep === 2
                  ? StepActive
                  : StepInactive
              }
              alt=""
            />
            <div
              className={
                activeStep > 2
                  ? "step-line-3-green"
                  : activeStep === 2
                  ? "step-line-3"
                  : "step-line-3"
              }
            ></div>
            <img
              className="step-head-4"
              src={activeStep === 3 ? StepActive : StepInactive}
              alt=""
            />
          </div>

          <div className="right-form-container">
            <div className="header-text">Create Account</div>

            <div className="form-components">
              {activeStep === 0 ? (
                <PersonalInfo
                  handleNext={() => handleNext()}
                  handleBack={handleBack}
                />
              ) : activeStep === 1 ? (
                <div>under development</div>
              ) : activeStep === 2 ? (
                <div>2</div>
              ) : activeStep === 3 ? (
                <div>3</div>
              ) : (
                <PersonalInfo />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountComponent;
