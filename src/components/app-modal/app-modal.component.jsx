import React from "react";
import PropTypes from "prop-types";
import "./app-modal.styles.scss";
import Modal from "react-bootstrap/Modal";
import Button from "../button/button.component";
import HouseFarmIcon from "../../assets/house-farm.svg";

const AppModal = ({ show, handleClose }) => {
  return (
    <div>
      <Modal show={show}>
        <div className="modal-cont">
          <img className="house-farm" src={HouseFarmIcon} alt="" />
          <div className="modal-text-header">You have added one farm!</div>
          <div className="modal-text-para">
            Would you like to add another farm?
          </div>

          <div className="no-btn">
            <Button disable={false} handleClick={() => {}} type="continue">
              No, create my account
            </Button>
          </div>
          <div className="yes-btn">
            <Button disable={false} handleClick={() => {handleClose()}} type="back">
              Yes, I have another farm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
AppModal.propTypes = {
  handleShow: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.bool,
};
export default AppModal;
