import React, { useState, useEffect } from "react";
import "./personal-info.styles.scss";

import CheckIcon from "../../assets/check-icon.svg";
import CheckIconGreen from "../../assets/check-icon-green.svg";
import Warning from "../../assets/warning-icon.svg";
import UploadIcon from "../../assets/upload-icon.svg";
import UserIcon from "../../assets/user-icon.svg";
import Input from "../input/input.component";
import Button from "../button/button.component";
import Check from "../../assets/check.svg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PropTypes from "prop-types";

//get user personal info component
const PersonalInfo = ({ handleNext }) => {
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState(null);
  const [showIdType, setShowIdType] = useState(false);
  const [showAge, setShowAge] = useState(false);
  const [showSite, setShowSite] = useState(false);
  const [idType, setIdType] = useState("");
  const [age, setAge] = useState("");
  const [site, setSite] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const userField = {
    firstName: "",
    lastName: "",
    credential: "", // should be phone for farmers - you can see verification code in response
    email: "", // optional
    password: "", // must have >= 8 char, at least 1 CAPS, 1 lowercase, 1 number and 1 special char
    password2: "", // must have >= 8 char, at least 1 CAPS, 1 lowercase, 1 number and 1 special char
    roleName: "Farmer",
    gender: "Male", // Male / Female
    resAddress: "",
    ageGroup: "",
    hasBankAccount: "",
    hasSmartphone: true,
    profilePic: {},
    idUpload: {
      idType: "",
      url: "",
    },
    siteid: "",
  };

  const [userCredentials, setUserCredentials] = useState(userField);

  const handleShowIdType = () => {
    setShowIdType((prevIdtype) => !prevIdtype);
  };
  const handleShowAge = () => {
    setShowAge((prevAge) => !prevAge);
  };
  const handleShowSite = () => {
    setShowSite((prevSite) => !prevSite);
  };

  const handleIdType = (name) => {
    setIdType(name);
    setShowIdType((prevIdtype) => !prevIdtype);
    const fileUrl = URL.createObjectURL(selectedFile);
    setUserCredentials({
      ...userCredentials,
      idUpload: { idType: name, url: fileUrl },
    });
  };
  const handleAge = (name) => {
    setAge(name);
    handleShowAge();
    setUserCredentials({ ...userCredentials, ageGroup: name });
  };
  const handleSite = (name) => {
    setSite(name);
    handleShowSite();
  };

  const handleSetPhoneNumber = (res) => {
    setPhoneNumber(res);
  };

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const getUrl = URL.createObjectURL(e.target.files[0]);
    setUserCredentials({
      ...userCredentials,
      idUpload: { idType: idType, url: getUrl },
    });
  };

  const onAvatarSelect = (e) => {
    const avatarObj = e.target.files[0];
    setImage(URL.createObjectURL(e.target.files[0]));
    setUserCredentials({ ...userCredentials, profilePic: avatarObj });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  const checkNumbers = (password) => {
    let regex = /\d/g;
    return regex.test(password);
  };

  const checkCapitalLetters = (password) => {
    return /[A-Z]/.test(password);
  };

  const checkSpecialCharacters = (password) => {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>?~]/;
    return specialChars.test(password);
  };

  const checkLowerCase = (password) => {
    return /[a-z]/.test(password);
  };

  const checkAllInputs = () => {
    if (!checkNumbers(userCredentials.password)) return;
    if (!checkLowerCase(userCredentials.password)) return;
    if (!checkCapitalLetters(userCredentials.password)) return;
    if (!checkSpecialCharacters(userCredentials.password)) return;
    if (!userCredentials.firstName.trim().length > 0) return;
    if (!userCredentials.lastName.trim().length > 0) return;
    if (!userCredentials.credential.trim().length > 0) return;
    if (!userCredentials.resAddress.trim().length > 0) return;
    if (!userCredentials.ageGroup.trim().length > 0) return;
    if (!userCredentials.siteid.trim().length > 0) return;
    if (!userCredentials.idUpload.idType.trim().length > 0) return;
    if (!userCredentials.password.trim().length > 7) return;
    if (userCredentials.password !== userCredentials.password2) return;
    return true;
  };

  const handleSubmit = () => {
    const auth = checkAllInputs();
    if (auth) {
      localStorage.setItem("userCred", JSON.stringify(userCredentials));
      handleNext();
    }
  };

  useEffect(() => {
    setUserCredentials({ ...userCredentials, credential: `+${phonenumber}` });
  }, [phonenumber]);

  return (
    <div className="personal-info">
      <div className="header-desc">Personal Information</div>

      <div className="name-input">
        <div className="left-name-input">
          <div className="input-label">First Name*</div>
          <Input
            name="firstName"
            value={userCredentials.firstName}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
        </div>

        <div className="right-name-input">
          <div className="input-label">Last Name*</div>
          <Input
            name="lastName"
            value={userCredentials.lastName}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
        </div>
      </div>

      <div className="phone">
        <div className="input-label">Phone Number*</div>

        <div className="phone-inpt">
          <PhoneInput
            placeholder=""
            country={"ng"}
            value={phonenumber}
            onChange={handleSetPhoneNumber}
            inputClass={"mobile"}
            buttonClass={"flag-cont"}
          />
        </div>

        <div className="email-input">
          <div className="input-label">
            Email address <span className="optional">(Optional)</span>
          </div>
          <Input
            name="email"
            value={userCredentials.email}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
        </div>

        <div className="age-gender">
          <div className="age-section">
            <div className="input-label">Age*</div>
            <Input
              readOnly={true}
              showIcon={true}
              iconName="DownArrow"
              placeholder="Age"
              value={age}
              handleClick={handleShowAge}
            />

            {showAge ? (
              <div className="input-drop-down-cont">
                <div
                  className="input-item"
                  onClick={() => handleAge("26 - 35")}
                >
                  <div className="id-name">26 - 35</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="gender-section">
            <div className="input-label">Choose Gender*</div>
            <div className="radio-section">
              <div className="male">
                <Input
                  type="radio"
                  name="gender"
                  value="Male"
                  handleChange={handleInputChange}
                  checked={userCredentials.gender === "Male"}
                  handleClick={() => {}}
                />
                <div className="male-text">Male</div>
              </div>

              <div className="female">
                <Input
                  type="radio"
                  name="gender"
                  value="Female"
                  handleChange={handleInputChange}
                  checked={userCredentials.gender === "Female"}
                  handleClick={() => {}}
                />
                <div className="female-text">Female</div>
              </div>
            </div>
          </div>
        </div>

        <div className="address-input">
          <div className="input-label">Residential address*</div>
          <Input
            placeholder="Enter Address"
            name="resAddress"
            value={userCredentials.resAddress}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
        </div>

        <div className="site-input">
          <div className="input-label">Site*</div>
          <Input
            readOnly={true}
            showIcon={true}
            placeholder="Ajegunle"
            value={site}
            handleClick={handleShowSite}
          />
          {showSite ? (
            <div className="input-drop-down-cont">
              <div
                className="input-item"
                onClick={() => handleSite("Maryland")}
              >
                <div className="id-name">Maryland</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
              <div className="input-item" onClick={() => handleSite("Ajah")}>
                <div className="id-name">Ajah</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
              <div className="input-item" onClick={() => handleSite("Ikeja")}>
                <div className="id-name">Ikeja</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="id-type-input">
          <div className="input-label">ID Type*</div>
          <Input
            readOnly={true}
            showIcon={true}
            handleClick={handleShowIdType}
            value={idType}
            placeholder="Select Id Type"
          />

          {showIdType ? (
            <div className="input-drop-down-cont">
              <div
                className="input-item"
                onClick={() => handleIdType("National ID card (NIN)")}
              >
                <div className="id-name">National ID card (NIN)</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
              <div
                className="input-item"
                onClick={() => handleIdType("Voter’s card")}
              >
                <div className="id-name">Voter’s card</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
              <div
                className="input-item"
                onClick={() => handleIdType("International Passport")}
              >
                <div className="id-name">International Passport</div>
                <img className="check-mark" src={Check} alt="" />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="id-number-input">
          <div className="input-label">ID Number*</div>
          <Input
            placeholder="Enter siteid"
            name="siteid"
            value={userCredentials.siteid}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
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
            name="password"
            value={userCredentials.password}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />

          {/* show password guides dynamically */}

          <div className="val-check">
            <img
              src={
                !userCredentials.password.trim().length > 7
                  ? Warning
                  : userCredentials.password.trim().length > 7
                  ? CheckIconGreen
                  : userCredentials.password.trim().length === 0
                  ? CheckIcon
                  : Warning
              }
              alt=""
              className="error-icon"
            />
            <div
              className={
                !userCredentials.password.trim().length > 7
                  ? "text-red"
                  : userCredentials.password.trim().length > 7
                  ? "text-normal"
                  : userCredentials.password.trim().length === 0
                  ? "text-normal"
                  : "text-red"
              }
            >
              Must be at least 8 characters
            </div>
          </div>

          <div className="val-check">
            <img
              src={
                userCredentials.password.trim().length === 0
                  ? CheckIcon
                  : !checkSpecialCharacters(userCredentials.password)
                  ? Warning
                  : checkSpecialCharacters(userCredentials.password)
                  ? CheckIconGreen
                  : CheckIcon
              }
              alt=""
              className="error-icon"
            />
            <div
              className={
                userCredentials.password.trim().length === 0
                  ? "text-normal"
                  : !checkSpecialCharacters(userCredentials.password)
                  ? "text-red"
                  : checkSpecialCharacters(userCredentials.password)
                  ? "text-normal"
                  : "text-normal"
              }
            >
              Must contain one special character
            </div>
          </div>

          <div className="val-check">
            <img
              src={
                userCredentials.password.trim().length === 0
                  ? CheckIcon
                  : !checkNumbers(userCredentials.password)
                  ? Warning
                  : checkNumbers(userCredentials.password)
                  ? CheckIconGreen
                  : CheckIcon
              }
              alt=""
              className="error-icon"
            />
            <div
              className={
                userCredentials.password.trim().length === 0
                  ? "text-normal"
                  : !checkNumbers(userCredentials.password)
                  ? "text-red"
                  : checkNumbers(userCredentials.password)
                  ? "text-normal"
                  : "text-normal"
              }
            >
              Must contain one number
            </div>
          </div>

          <div className="val-check">
            <img
              src={
                userCredentials.password.trim().length === 0
                  ? CheckIcon
                  : !checkCapitalLetters(userCredentials.password)
                  ? Warning
                  : checkCapitalLetters(userCredentials.password)
                  ? CheckIconGreen
                  : CheckIcon
              }
              alt=""
              className="error-icon"
            />
            <div
              className={
                userCredentials.password.trim().length === 0
                  ? "text-normal"
                  : !checkCapitalLetters(userCredentials.password)
                  ? "text-red"
                  : checkCapitalLetters(userCredentials.password)
                  ? "text-normal"
                  : "text-normal"
              }
            >
              Must contain one uppercase letter
            </div>
          </div>

          <div className="val-check">
            <img
              src={
                userCredentials.password.trim().length === 0
                  ? CheckIcon
                  : !checkLowerCase(userCredentials.password)
                  ? Warning
                  : checkLowerCase(userCredentials.password)
                  ? CheckIconGreen
                  : CheckIcon
              }
              alt=""
              className="error-icon"
            />
            <div
              className={
                userCredentials.password.trim().length === 0
                  ? "text-normal"
                  : !checkLowerCase(userCredentials.password)
                  ? "text-red"
                  : checkLowerCase(userCredentials.password)
                  ? "text-normal"
                  : "text-normal"
              }
            >
              Must contain one lowercase letter
            </div>
          </div>
        </div>

        <div className="password-2">
          <div className="input-label">Confirm Password</div>
          <Input
            type="password"
            iconName="EyeOff"
            showIcon={true}
            placeholder=""
            name="password2"
            value={userCredentials.password2}
            handleChange={handleInputChange}
            handleClick={() => {}}
          />
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

        <div className="btn-sec">
          <div className="btn-bck">
            <Button handleClick={() => {}} disable={false} type="back">
              Back
            </Button>
          </div>

          {checkNumbers(userCredentials.password) &&
          checkLowerCase(userCredentials.password) &&
          checkCapitalLetters(userCredentials.password) &&
          checkSpecialCharacters(userCredentials.password) &&
          userCredentials.firstName.trim().length > 0 &&
          userCredentials.lastName.trim().length > 0 &&
          userCredentials.credential.trim().length > 0 &&
          userCredentials.resAddress.trim().length > 0 &&
          userCredentials.ageGroup.trim().length > 0 &&
          userCredentials.siteid.trim().length > 0 &&
          userCredentials.idUpload.idType.trim().length > 0 &&
          userCredentials.password.trim().length > 7 &&
          userCredentials.password === userCredentials.password2 ? (
            <div className="btn-continue">
              <Button
                handleClick={handleSubmit}
                disable={false}
                type="continue"
              >
                Continue
              </Button>
            </div>
          ) : (
            <div className="btn-continue">
              <Button handleClick={() => {}} disable={true} type="continue">
                Continue
              </Button>
            </div>
          )}
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
