import React, { useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import withTokenExpirationCheck from "./withTokenExpirationCheck";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");

  //Error 
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const modalDisplayDuration = 3000; // Duration in milliseconds

  const API = "http://localhost:3000";

  const navigate = useNavigate()

  const handleReturn = () => {
    navigate("/profile")
  }

  const displayErrorModal = (message) => {
    setErrorMessage(message);
    setShowErrorModal(true);
    setTimeout(() => {
      setShowErrorModal(false);
    }, modalDisplayDuration);
  };

  const handlePasswordChange = async () => {
    try {

      // check if any fields are empty
      if(newPassword1 === "" || newPassword2 === "" || oldPassword === ""){
        displayErrorModal("Fields are empty please try again")
      }

      // Check if new passwords match
      if (newPassword1 === newPassword2) {
        await Axios.post(
          `${API}/users/change_password`,
          {
            oldPassword: oldPassword,
            newPassword: newPassword1,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${Cookies.get("userToken")}`,
            },
          }
        );
  
        navigate("/profile");
      } 
      else {
        displayErrorModal("New passwords do not match");
      }
    } catch (error) {
      console.error(error);
      displayErrorModal("Internal Server Error");
    }
  };
  

  return (
    <div className="ChangePassword-Page">
      <div className="cp-container">
        <h1 id="cp-title">Change Password</h1>
        <label className="cp-label">Old Password</label>
          <input 
            type="password" 
            className="cp-password"
            value={oldPassword}
            placeholder="Enter your old password ..."
            onChange={(e) => setOldPassword(e.target.value)}
          />
        <label className="cp-label">New Password</label>
          <input 
              type="password" 
              className="cp-password"
              value={newPassword1}
              placeholder="Enter your new password ..."
              onChange={(e) => setNewPassword1(e.target.value)}
          />
        <label className="cp-label">Re-enter New Password</label>
          <input 
            type="password" 
            className="cp-password"
            value={newPassword2}
            placeholder="Re-enter your new password ..."
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        <div className="cp-button-container">
          <button id="cp-button-C" onClick={handlePasswordChange}>Confirm</button>
          
          <button id="cp-button-R" onClick={handleReturn}>Return</button>

        </div>
      </div>
      {showErrorModal && (
          <div className="error-modal">
            <div className="error-modal-content">
              <p>{errorMessage}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default withTokenExpirationCheck(ChangePassword);
