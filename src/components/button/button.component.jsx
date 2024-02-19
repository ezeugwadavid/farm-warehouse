import React from "react";
import "./button.styles.scss";
import PropTypes from "prop-types";

//resuable button component
const Button = ({ children, handleClick, ...otherProps }) => {
  const { disable, type } = otherProps;
  return disable ? (
    <div className={type === "continue" ? "green-disable" : "white-disable"}>
      <div className="button-text"> {children} </div>
    </div>
  ) : (
    <div
      className={type === "continue" ? "green" : "white"}
      onClick={() => handleClick()}
    >
      <div className="button-text"> {children} </div>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  handleClick: PropTypes.func,
};

export default Button;
