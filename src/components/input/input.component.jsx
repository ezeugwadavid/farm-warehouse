import React from "react";
import DownArrow from "../../assets/arrow-down.svg";
import EyeOff from "../../assets/eye-off.svg";
import AlertCircle from "../../assets/alert-circle.svg";
import PropTypes from "prop-types";
import "./input.styles.scss";

// reuseable input component 
const Input = ({ ...props }) => {
  // props e.g type, error, showIcon, iconName
  const { type, error, showIcon, iconName, placeholder, readOnly, handleClick } = props;
  return showIcon ? (
    <div className="input" onClick={() => handleClick()}>
      <input
        className={error ? "input-field-red" : "input-field"}
        type={type ? type : "text"}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <div className="icon-cover">
        <img
          className="input-icon"
          src={
            error
              ? AlertCircle
              : iconName === "DownArrow"
              ? DownArrow
              : iconName === "EyeOff" ?
              EyeOff
              : DownArrow
          }
          alt=""
        />
      </div>
    </div>
  ) : (
    <div className="input" onClick={() => handleClick()}>
      <input
        className={error ? "input-field-red" : "input-field"}
        type={type ? type : "text"}
        placeholder={placeholder}
        readOnly={readOnly}
      />
    </div>
  );
};

Input.propTypes = {
  props: PropTypes.any,
};

export default Input;
