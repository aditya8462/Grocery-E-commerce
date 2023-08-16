import React, { useState, useEffect } from "react";
import { Grid, Button, TextField, useIsFocusVisible } from "@mui/material";
import "../../Stylesheet.css";
import { useSelector, useDispatch } from "react-redux";
import { putData } from "../Administrator/Services/FetchNodeServices";
import { toast } from "react-toastify";
const MyProfile = () => {
  const [nameButtonStatus, setNameButtonStatus] = useState(false);
  const [emailButtonStatus, setEmailButtonStatus] = useState(false);
  const [mobileButtonStatus, setMobileButtonStatus] = useState(false);
  const userDetailList = useSelector((state) => state.userDetails);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabledEmail, setIsDisabledEmail] = useState(true);
  const [isDisabledMobile, setIsDisabledMobile] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error1, setError1] = useState({});
  const [error2, setError2] = useState({});
  const [error3, setError3] = useState({});

  var dispatch = useDispatch();

  const handleErrorName = (inputs, value) => {
    setError1((prev) => ({ ...prev, [inputs]: value }));
  };
  const handleErrorEmail = (inputs, value) => {
    setError2((prev) => ({ ...prev, [inputs]: value }));
  };
  const handleErrorMobile = (inputs, value) => {
    setError3((prev) => ({ ...prev, [inputs]: value }));
  };
  const validationName = () => {
    var isValid = true;
    if (!firstName) {
      handleErrorName("firstName", "Please fill out this firstName.");
      isValid = false;
    }
    if (!lastName) {
      handleErrorName("lastName", "Please fill out this lastName.");
      isValid = false;
    }
    return isValid;
  };
  const validationEmail = () => {
    var isValid = true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailId)) {
      error2.emailId = "Required";
      handleErrorEmail("emailId", "Please enter valid EmailId.");
      isValid = false;
    }

    return isValid;
  };
  const validationMobile = () => {
    var isValid = true;
    if (mobileNo.length == 0 || mobileNo.length > 10 || mobileNo.length < 10) {
      handleErrorMobile("mobileNo", "Enter 10 Digit mobile Number.");
      isValid = false;
    }

    return isValid;
  };
  const handleEditDataName = async () => {
    if (validationName()) {
      setIsDisabled(true);
      setNameButtonStatus(false);

      var body = {
        firstname: firstName,
        lastname: lastName,
      };

      var response = await putData("users/" + userDetailList.userid, body);
      if (response.status) {
        toast("Edit successfully name");
        dispatch({
          type: "ADD_USER",
          payload: {
            ...userDetailList,
            firstname: firstName,
            lastname: lastName,
          },
        });
      } else {
        toast("Error");
      }
    }
  };
  const handleEditDataEmail = async () => {
    if (validationEmail()) {
      setIsDisabledEmail(true);
      setEmailButtonStatus(false);

      var body = {
        email: emailId,
      };

      var response = await putData("users/" + userDetailList.userid, body);
      if (response.status) {
        toast("Edit successfully Emailid");
        dispatch({
          type: "ADD_USER",
          payload: { ...userDetailList, email: emailId },
        });
      } else {
        toast("Error");
      }
    }
  };
  const handleEditDataMobile = async () => {
    if (validationMobile()) {
      setIsDisabledMobile(true);
      setMobileButtonStatus(false);

      var body = {
        mobileno: mobileNo,
      };

      var response = await putData("users/" + userDetailList.userid, body);
      if (response.status) {
        toast("Edit successfully Mobileno");
        dispatch({
          type: "ADD_USER",
          payload: {
            ...userDetailList,
            mobileno: mobileNo,
          },
        });
      } else {
        toast("Error");
      }
    }
  };

  useEffect(() => {
    setFirstName(userDetailList.firstname);
    setLastName(userDetailList.lastname);
    setEmailId(userDetailList.email);
    setMobileNo(userDetailList.mobileno);
  }, []);

  const RegexLetter = /^[a-zA-Z\s]*$/;

  const showNameHideSaveButton = () => {
    return (
      <div>
        {nameButtonStatus ? (
          <>
            <Button
              style={{
                width: 130,
                borderRadius: 1,
                height: 55,
                marginLeft: 0,
              }}
              variant="contained"
              onClick={handleEditDataName}
            >
              Save
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  const showEmailHideSaveButton = () => {
    return (
      <div>
        {emailButtonStatus ? (
          <>
            <Button
              style={{
                width: 130,
                borderRadius: 1,
                height: 55,
                marginLeft: 14,
              }}
              onClick={handleEditDataEmail}
              variant="contained"
            >
              Save
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  const showMobileHideSaveButton = () => {
    return (
      <div>
        {mobileButtonStatus ? (
          <>
            <Button
              style={{
                width: 130,
                borderRadius: 1,
                height: 55,
                marginLeft: 14,
              }}
              variant="contained"
              onClick={handleEditDataMobile}
            >
              Save
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    );
  };
  const handleNameShowSaveButton = (event) => {
    setNameButtonStatus(true);
    setIsDisabled(false);
  };
  const handleNameHideSaveButton = (event) => {
    handleErrorName("lastName", null);
    handleErrorName("firstName", null);
    setFirstName(userDetailList.firstname);
    setLastName(userDetailList.lastname);
    setNameButtonStatus(false);
    setIsDisabled(true);
  };
  const handleEmailShowSaveButton = (event) => {
    setEmailButtonStatus(true);
    setIsDisabledEmail(false);
  };
  const handleEmailHideSaveButton = (event) => {
    handleErrorEmail("emailId", null);
    setEmailId(userDetailList.email);
    setEmailButtonStatus(false);
    setIsDisabledEmail(true);
  };
  const handleMobileShowSaveButton = (event) => {
    setMobileButtonStatus(true);
    setIsDisabledMobile(false);
  };
  const handleMobileHideSaveButton = (event) => {
    handleErrorMobile("mobileNo", null);
    setMobileNo(userDetailList.mobileno);
    setMobileButtonStatus(false);
    setIsDisabledMobile(true);
  };
  return (
    <div className="project__profilecontainer">
      <Grid container spacing={2}>
        <Grid
          className="project__profileedit"
          item
          xs={12}
          md={12}
          sm={12}
          lg={12}
        >
          <div className="project__personalinformation">
            {" "}
            Personal Information{" "}
            {nameButtonStatus ? (
              <Button
                onClick={handleNameHideSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleNameShowSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Edit
              </Button>
            )}
          </div>

          <div className="project__profile1name">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} md={3} lg={4}>
                <TextField
                  error={!error1.firstName ? false : true}
                  helperText={error1.firstName}
                  onFocus={() => handleErrorName("firstName", null)}
                  InputProps={{ style: { borderRadius: 1 } }}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setFirstName(e.target.value.trimStart())}
                  disabled={isDisabled}
                  onKeyDown={(event) => {
                    if (!RegexLetter.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  value={firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={4}>
                <TextField
                  InputProps={{ style: { borderRadius: 1 } }}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  error={!error1.lastName ? false : true}
                  helperText={error1.lastName}
                  onFocus={() => handleErrorName("lastName", null)}
                  onChange={(e) => setLastName(e.target.value.trimStart())}
                  disabled={isDisabled}
                  value={lastName}
                  onKeyDown={(event) => {
                    if (!RegexLetter.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4} md={3} lg={4}>
                <span>{showNameHideSaveButton()}</span>
              </Grid>
            </Grid>
          </div>

          <div className="project__profileemailadd">
            Email Address{" "}
            {emailButtonStatus ? (
              <Button
                onClick={handleEmailHideSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleEmailShowSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Edit
              </Button>
            )}
          </div>
          <div className="project__profile2email">
            <Grid item xs={12} sm={4} md={3} lg={4}>
              <TextField
                InputProps={{ style: { borderRadius: 1 } }}
                id="outlined-basic"
                label="Email Address"
                variant="outlined"
                fullWidth
                error={!error2.emailId ? false : true}
                helperText={error2.emailId}
                onFocus={() => handleErrorEmail("emailId", null)}
                onChange={(e) => setEmailId(e.target.value.trimStart())}
                disabled={isDisabledEmail}
                value={emailId}
                required
                type="email"
              />
            </Grid>
            <span>{showEmailHideSaveButton()}</span>{" "}
          </div>
          <div className="project__profilemobileadd">
            Mobile Number{" "}
            {mobileButtonStatus ? (
              <Button
                onClick={handleMobileHideSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Cancel
              </Button>
            ) : (
              <Button
                onClick={handleMobileShowSaveButton}
                style={{ textTransform: "none" }}
                size="small"
              >
                Edit
              </Button>
            )}
          </div>
          <div className="project__profile2mobile">
            <Grid item xs={12} sm={4} md={3} lg={4}>
              <TextField
                InputProps={{ style: { borderRadius: 1 } }}
                id="outlined-basic"
                label="Mobile Number"
                error={!error3.mobileNo ? false : true}
                helperText={error3.mobileNo}
                onFocus={() => handleErrorMobile("mobileNo", null)}
                variant="outlined"
                fullWidth
                required
                type="number"
                onChange={(e) => setMobileNo(e.target.value.trim())}
                disabled={isDisabledMobile}
                value={mobileNo}
              />
            </Grid>
            <span>{showMobileHideSaveButton()}</span>{" "}
          </div>
          <div className="project__profile3faq">FAQs</div>
          <h5>
            What happens when I update my email address (or mobile number)?
          </h5>
          <p>
            Your login email id (or mobile number) changes, likewise. You'll
            receive all your account related communication on your updated email
            address (or mobile number).{" "}
          </p>
          <h5>
            When will my Flipkart account be updated with the new email address
            (or mobile number)?
          </h5>
          <p>
            It happens as soon as you confirm the verification code sent to your
            email (or mobile) and save the changes.
          </p>
          <h5>
            What happens to my existing Flipkart account when I update my email
            address (or mobile number)?
          </h5>
          <p>
            Updating your email address (or mobile number) doesn't invalidate
            your account. Your account remains fully functional. You'll continue
            seeing your Order history, saved information and personal details.
          </p>
          <h5>
            Does my Seller account get affected when I update my email address?
          </h5>
          <p>
            Flipkart has a 'single sign-on' policy. Any changes will reflect in
            your Seller account also.
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyProfile;
