import React, { useState } from "react";
import "./farm-registration.styles.scss";
import CheckRoundGreen from "../../assets/check-round-green.svg";
import DragDropIcon from "../../assets/drag-drop-icon.svg";
import FileIcon from "../../assets/file-04.svg";
import PlusIcon from "../../assets/plus.svg";
import ProgressBar from "../../assets/progress.svg";
import Input from "../input/input.component";
import Button from "../button/button.component";
import PropTypes from "prop-types";
import AddedFarm from "../added-farm/added-farm.component";
import Check from "../../assets/check.svg";
import AppModal from "../app-modal/app-modal.component";

const FarmRegistration = ({ handleBack }) => {
  const [showCrops, setShowCrops] = useState(false);
  const [showStartMonth, setShowStartMonth] = useState(false);
  const [showEndMonth, setShowEndMonth] = useState(false);

  const [cropType, setCropType] = useState("");
  const [startMonthType, setStartMonthType] = useState("");
  const [endMonthType, setEndMonthType] = useState("");

  const handleShowCropType = () => {
    setShowCrops((prevCrop) => !prevCrop);
  };
  const handleShowStartMonthType = () => {
    setShowStartMonth((prevStartMonthType) => !prevStartMonthType);
  };

  const handleShowEndMonthType = () => {
    setShowEndMonth((prevEndMonthType) => !prevEndMonthType);
  };

  const handleCropType = (name) => {
    setCropType(name);
    handleShowCropType();
  };
  const handleStartMonth = (name) => {
    setStartMonthType(name);
    handleShowStartMonthType();
  };
  const handleEndMonth = (name) => {
    setEndMonthType(name);
    handleShowEndMonthType();
  };

  const farmField = {
    farmname: "",
    longitude: "",
    latitude: "",
  };

  const cropField = {
    cropname: cropType,
    startmonth: startMonthType,
    endmonth: endMonthType,
  };

  const [farmDetails, setFarmDetails] = useState(farmField);
  const [cropDetails, setCropDetails] = useState(cropField);
  const [cropInputs, setCropInputs] = useState([]);
  const [showAddFarmInput, setShowAddFarmInput] = useState(true);
  const [hasError, setHasError] = useState({ farmname: "", cropName: "" });
  const [enableSubmit, setEnableSubmit] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    const emptyCrop = {
      cropname: "",
      startmonth: "",
      endmonth: "",
    };
    const emptyField = {
      farmname: "",
      longitude: "",
      latitude: "",
    };
    setCropDetails({ ...cropDetails, emptyCrop });
    setFarmDetails(emptyField);
    setCropInputs([]);
  };
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFarmDetails({ ...farmDetails, [name]: value });
    setCropDetails({ ...cropDetails, [name]: value });
  };

  const addCrop = () => {
    const validatedCropFieldArray = [];
    const cropFieldValues = Object.values(cropField);
    cropFieldValues.map((val) => {
      if (val.length > 0) {
        validatedCropFieldArray.push(true);
      }
    });

    if (validatedCropFieldArray.length === 3) {
      setCropInputs([...cropInputs, cropField]);
      setCropType("");
      setStartMonthType("");
      setEndMonthType("");
    }
    setShowAddFarmInput((showAddFarmInput) => !showAddFarmInput);
  };

  const checkAllInputs = () => {
    if (farmDetails.farmname.trim().length === 0) {
      const errorMessage = "Enter farm name";
      setHasError({ ...hasError.farmname, errorMessage });
      setError(true);
      return;
    }

    if (cropInputs.length === 0) {
      const errorMessage = "Add crop";
      setHasError({ ...hasError.cropName, errorMessage });
      setError(true);
      return;
    }

    return true;
  };

  const [farm, setFarm] = useState([]);
  localStorage.setItem("farm", JSON.stringify(farm));

  const registerFarm = () => {
    checkAllInputs();
    const farmField = {
      name: farmDetails.farmname,
      address: "Nigeria",
      long: farmDetails.longitude,
      lat: farmDetails.latitude,
      docUploads: [
        {
          url: "https://",
        },
        {
          url: "https://",
        },
      ],
      crops: cropInputs,
    };

    setFarm([...farm, farmField]);
    handleShow();

    // if (auth){
    // };
  };

  return (
    <div className="farm-reg-container">
      {/* modal */}
      <AppModal show={show} handleClose={handleClose} handleShow={handleShow} />

      <div className="farm-reg-header">Farm Registration</div>

      {/* added farm container shows after farm is being added */}
      <AddedFarm />
      {/* new farm form */}
      <div className="register-input-group">
        <div className="label">Farm Name*</div>
        <Input
          readOnly={false}
          showIcon={false}
          placeholder="Enter Farm Name"
          name="farmname"
          value={farmDetails.farmname}
          handleChange={handleChange}
          error={hasError.farmname.length > 1 ? true : false}
        />
        {hasError.farmname.length > 0 ? (
          <div className="account-name-verify-text-error">
            {hasError.farmname}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="register-input-group">
        <div className="label">
          Farm Coordinates<span className="optional-reg">(Optional)</span>
        </div>

        <div className="coordinates-section">
          <div className="longitude-left">
            <Input
              readOnly={false}
              showIcon={false}
              placeholder="Longitude"
              name="longitude"
              value={farmDetails.longitude}
              handleChange={handleChange}
            />
          </div>
          <div className="latitude-right">
            <Input
              readOnly={false}
              showIcon={false}
              placeholder="Latitude"
              name="latitude"
              value={farmDetails.latitude}
              handleChange={handleChange}
            />
          </div>
        </div>

        <div className="coordinate-text-sample">
          Ex: Longitude: 8.6753° E. Latitude: 9.0820° N
        </div>
      </div>

      <div className="farm-topic">Crops cultivated and planting season</div>

      {/* added crop container */}
      {cropInputs.length > 0
        ? cropInputs.map((detail) => {
            return (
              <div
                className="add-farm-container"
                key={parseInt(cropInputs.indexOf(detail)) + 1}
              >
                <div className="crop-action-cont">
                  <div className="crop-no">
                    Crop {parseInt(cropInputs.indexOf(detail)) + 1}
                  </div>
                  <div
                    className="close"
                    onClick={() => {
                      setCropInputs(
                        cropInputs.filter(
                          (input) =>
                            cropInputs.indexOf(input) !==
                            cropInputs.indexOf(detail)
                        )
                      );
                    }}
                  >
                    X
                  </div>
                </div>
                <div className="register-input-group">
                  <div className="label">
                    What crop do you cultivate on this farm?
                  </div>
                  <Input
                    readOnly={true}
                    showIcon={true}
                    iconName="DownArrow"
                    placeholder="Select crop"
                    value={detail.cropname}
                  />
                </div>

                <div className="register-input-group-month">
                  <div className="start-mnth">
                    <div className="label">Start month</div>
                    <Input
                      readOnly={true}
                      showIcon={true}
                      iconName="DownArrow"
                      placeholder="Select month"
                      value={detail.startmonth}
                    />
                  </div>

                  <div className="end-mnth">
                    <div className="label">End month</div>
                    <Input
                      readOnly={true}
                      showIcon={true}
                      iconName="DownArrow"
                      placeholder="Select month"
                      value={detail.endmonth}
                    />
                  </div>
                </div>
              </div>
            );
          })
        : ""}

      {/* add crop container, disappears after a crop has been added and shows back if you click on "add another crop" */}
      {showAddFarmInput ? (
        <div className="add-farm-container">
          <div className="register-input-group">
            <div className="label">
              What crop do you cultivate on this farm?
            </div>
            <Input
              readOnly={true}
              showIcon={true}
              iconName="DownArrow"
              placeholder="Select crop"
              value={cropType}
              handleClick={handleShowCropType}
            />
            {showCrops ? (
              <div className="input-drop-down-cont">
                <div
                  className="input-item"
                  onClick={() => handleCropType("Banana")}
                >
                  <div className="id-name">Banana</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => handleCropType("Yam")}
                >
                  <div className="id-name">Yam</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
                <div
                  className="input-item"
                  onClick={() => handleCropType("Cassava")}
                >
                  <div className="id-name">Cassava</div>
                  <img className="check-mark" src={Check} alt="" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="register-input-group-month">
            <div className="start-mnth">
              <div className="label">Start month</div>
              <Input
                readOnly={true}
                showIcon={true}
                iconName="DownArrow"
                placeholder="Select month"
                value={startMonthType}
                handleClick={handleShowStartMonthType}
              />
              {showStartMonth ? (
                <div className="input-drop-down-cont">
                  <div
                    className="input-item"
                    onClick={() => handleStartMonth("January")}
                  >
                    <div className="id-name">January</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                  <div
                    className="input-item"
                    onClick={() => handleStartMonth("Febuary")}
                  >
                    <div className="id-name">Febuary</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                  <div
                    className="input-item"
                    onClick={() => handleStartMonth("March")}
                  >
                    <div className="id-name">March</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="end-mnth">
              <div className="label">End month</div>
              <Input
                readOnly={true}
                showIcon={true}
                iconName="DownArrow"
                placeholder="Select month"
                value={endMonthType}
                handleClick={handleShowEndMonthType}
              />
              {showEndMonth ? (
                <div className="input-drop-down-cont">
                  <div
                    className="input-item"
                    onClick={() => handleEndMonth("April")}
                  >
                    <div className="id-name">April</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                  <div
                    className="input-item"
                    onClick={() => handleEndMonth("May")}
                  >
                    <div className="id-name">May</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                  <div
                    className="input-item"
                    onClick={() => handleEndMonth("June")}
                  >
                    <div className="id-name">June</div>
                    <img className="check-mark" src={Check} alt="" />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {/* add crop btn */}
      <div className="anothercrop-btn" onClick={() => addCrop()}>
        <img src={PlusIcon} alt="" />
        <div className="another-text">Add Crop</div>
      </div>

      <div className="doc-text">Upload farm documents</div>
      
      {/* functionality coming soon */}
      <div className="drop-area">
        <img src={DragDropIcon} alt="" className="drop-icon" />
        <div className="drop-info">
          <span className="info-green">Click to upload</span> or drag and drop
        </div>
        <div className="file-type">PNG, JPG or PDF (max. 10MB)</div>
      </div>
      {/* functionality coming soon */}
      {/* <div className="file-upload-cont">
        <div className="file-details">
          <div className="name-doc">
            <img src={FileIcon} alt="" className="file-icon" />
            <div className="filename">Dashboard prototype FINAL.fig</div>
          </div>

          <img src={CheckRoundGreen} alt="" className="del-icon" />
        </div>

        <div className="file-size">4.2 MB</div>

        <div className="progress-container">
          <img src={ProgressBar} alt="" className="progress-bar" />
          <div className="progress-text">100%</div>
        </div>
      </div> */}

      {/* shows enabled button if form requirements are met */}

      {farmDetails.farmname.trim().length === 0 ? (
        <div className="btn-sections">
          <div className="white-but">
            <Button disable={false} handleClick={handleBack} type="back">
              Back
            </Button>
          </div>
          <div classN ame="green-but">
            <Button disable={true} handleClick={() => {}} type="continue">
              Add Farm
            </Button>
          </div>
        </div>
      ) : cropInputs.length === 0 ? (
        <div className="btn-sections">
          <div className="white-but">
            <Button disable={false} handleClick={handleBack} type="back">
              Back
            </Button>
          </div>
          <div classN ame="green-but">
            <Button disable={true} handleClick={() => {}} type="continue">
              Add Farm
            </Button>
          </div>
        </div>
      ) : (
        <div className="btn-section">
          <div className="white-but">
            <Button disable={false} handleClick={handleBack} type="back">
              Back
            </Button>
          </div>
          <div className="green-but">
            <Button disable={false} handleClick={registerFarm} type="continue">
              Add Farm
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
FarmRegistration.propTypes = {
  handleBack: PropTypes.func,
};
export default FarmRegistration;
