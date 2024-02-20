import React, { useState } from "react";
import PropTypes from "prop-types";
import "./app-modal.styles.scss";
import Modal from "react-bootstrap/Modal";
import Button from "../button/button.component";
import HouseFarmIcon from "../../assets/house-farm.svg";
import { registerUser } from "../../services/register";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AppModal = ({ show, handleClose }) => {
 const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const getFarms = localStorage.getItem("farm");
  const getUserCred = localStorage.getItem("userCred");
  const bankDetails = localStorage.getItem("bankDetails");
  let farms;
  let userCred;
  let bankCred;
  if (getFarms !== "undefined") {
    farms = JSON.parse(getFarms);
  }
  if (getUserCred !== "undefined") {
    userCred = JSON.parse(getUserCred);
  }
  if (bankDetails !== "undefined") {
    bankCred = JSON.parse(bankDetails);
  }

  const createAcct = async () => {
    const regObject = {
      userDetails: {
        firstName: userCred.firstName,
        lastName: userCred.lastName,
        credential: userCred.credential,
        email: userCred.email.length > 0 ? userCred.email : "johndoe123",
        password: userCred.password,
        roleName: userCred.roleName,
        gender: userCred.gender,
        resAddress: userCred.resAddress,
        ageGroup: userCred.ageGroup,
        hasBankAccount: bankCred.hasBankAccount,
        hasSmartphone: bankCred.hasSmartphone,
        profilePic: userCred.profilePic,
      },

      idUpload: userCred.idUpload,
      siteId: userCred.siteid,
      bankDetails: {
        accountNumber: bankCred.accountnumber,
        bankName: bankCred.bankname,
      },
      farmDetails: farms,
    };
    setLoading(true);

    try {
      const res = await registerUser(regObject);
      const { message } = res.data;
      setMessage({ ...message, message });
      setLoading(false);
      navigate("/verification", { replace: true });
    } catch (error) {
      setLoading(false);
      handleClose();
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Modal show={show}>
        <div className="modal-cont">
          <img className="house-farm" src={HouseFarmIcon} alt="" />
          <div className="modal-text-header">You have added one farm!</div>
          <div className="modal-text-para">
            Would you like to add another farm?
          </div>

          <div className="no-btn">
            <Button
              disable={false}
              handleClick={() => createAcct()}
              type="continue"
            >
              No, create my account
            </Button>
          </div>
          {loading ? (
            <div className="spiner">
              <Spinner animation="border" />;
            </div>
          ) : (
            ""
          )}

          <div className="yes-btn">
            <Button
              disable={false}
              handleClick={() => {
                handleClose();
              }}
              type="back"
            >
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
