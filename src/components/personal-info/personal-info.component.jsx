import React, { useState } from "react";
import "./personal-info.styles.scss";
import NgFlag from "../../assets/ng.svg";
import ArrowDownSm from "../../assets/arrow-down-sm.svg";
import CheckIcon from "../../assets/check-icon.svg";
import CheckIconGreen from "../../assets/check-icon-green.svg";
import Warning from "../../assets/warning-icon.svg";
import UploadIcon from "../../assets/upload-icon.svg";
import UserIcon from "../../assets/user-icon.svg";
import Input from "../input/input.component";
import Button from "../button/button.component";
import PropTypes from "prop-types";

const PersonalInfo = ({ handleNext, handleBack }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [image, setImage] = useState(null);

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onAvatarSelect = (e) => {
    setSelectedAvatar(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="personal-info">
      <div className="header-desc">Personal Information</div>

      <div className="name-input">
        <div className="left-name-input">
          <div className="input-label">First Name*</div>
          <Input />
        </div>

        <div className="right-name-input">
          <div className="input-label">Last Name*</div>
          <Input />
        </div>
      </div>

      <div className="phone">
        <div className="input-label">Phone Number*</div>

        <div className="phone-input">
          <div className="flag-cont">
            <img className="ng-flag" src={NgFlag} alt="" />
            <img className="arr-dwn" src={ArrowDownSm} alt="" />
          </div>

          <div className="mobile">
            <Input />
          </div>
        </div>

        <div className="email-input">
          <div className="input-label">
            Email address <span className="optional">(Optional)</span>
          </div>
          <Input />
        </div>

        <div className="age-gender">
          <div className="age-section">
            <div className="input-label">Age*</div>
            <Input
              readOnly={true}
              showIcon={true}
              iconName="DownArrow"
              placeholder="34"
            />
          </div>

          <div className="gender-section">
            <div className="input-label">Choose Gender*</div>
            <div className="radio-section">
              <div className="male">
                <Input type="radio" />
                <div className="male-text">Male</div>
              </div>

              <div className="female">
                <Input type="radio" />
                <div className="female-text">Female</div>
              </div>
            </div>
          </div>
        </div>

        <div className="address-input">
          <div className="input-label">Residential address*</div>
          <Input placeholder="No 21 Agaro road, Abeokuta" />
        </div>

        <div className="site-input">
          <div className="input-label">Site*</div>
          <Input readOnly={true} showIcon={true} placeholder="Ajegunle" />
        </div>

        <div className="id-type-input">
          <div className="input-label">ID Type*</div>
          <Input readOnly={true} showIcon={true} placeholder="Voter's card" />
        </div>

        <div className="id-number-input">
          <div className="input-label">ID Number*</div>
          <Input placeholder="102245" />
        </div>

        <div className="upload-doc">
          <div className="input-label">Upload ID document</div>

          <div className="upload-cont">
            <label for="file-upload" className="upload-box">
              Choose file{" "}
              <span>
                <input
                  id="file-upload"
                  type="file"
                  onChange={(e) => onFileChange(e)}
                />
              </span>
            </label>
            <div className="doc-name">
              {selectedFile !== "" ? selectedFile.name : "No file chosen"}
            </div>
          </div>
        </div>

        <div className="password-1">
          <div className="input-label">Create Password</div>
          <Input
            type="password"
            iconName="EyeOff"
            showIcon={true}
            placeholder=""
          />
        </div>

        <div className="password-2">
          <div className="input-label">Confirm Password</div>
          <Input
            type="password"
            iconName="EyeOff"
            showIcon={true}
            placeholder=""
          />
        </div>

        <div className="val-check">
          <img src={CheckIcon} alt="" className="error-icon" />
          <div className="text-normal">Must be at least 8 characters</div>
        </div>

        <div className="val-check">
          <img src={CheckIcon} alt="" className="error-icon" />
          <div className="text-normal">Must contain one special character</div>
        </div>

        <div className="val-check">
          <img src={CheckIconGreen} alt="" className="error-icon" />
          <div className="text-normal">Must contain one special character</div>
        </div>

        <div className="val-check">
          <img src={Warning} alt="" className="error-icon" />
          <div className="text-red">Must be at least 8 characters</div>
        </div>

        <div className="avatar-upload">
          <div className="input-label">
            Upload Profile picture <span className="optional">(Optional)</span>
          </div>
          <div className="upload-content">
            <img
              className="avatar"
              src={image !== null ? image : UserIcon}
              alt=""
            />
            <div className="upload-btn">
              <img className="upload-icon" src={UploadIcon} alt="" />
              <label for="avatar-upload" className="upload-text">
                Upload picture
              </label>
              <span>
                <input
                  id="avatar-upload"
                  type="file"
                  onChange={(e) => onAvatarSelect(e)}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="upload-desc">PNG or JPG (max. 5MB)</div>

        <div className="btn">
          <div className="btn-bck">
            <Button handleClick={handleBack} disable={false} type="back">
              Back
            </Button>
          </div>

          <div className="btn-continue">
            <Button handleClick={handleNext} disable={false} type="continue">
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
PersonalInfo.propTypes = {
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
};
export default PersonalInfo;
