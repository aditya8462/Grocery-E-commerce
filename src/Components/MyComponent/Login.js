import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { TextField, Button, Grid } from "@mui/material";
import "../../Stylesheet.css";
import { postData } from "../Administrator/Services/FetchNodeServices";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import OtpInput from "react-otp-input";

export default function Login(props) {
  var dispatch = useDispatch();
  const field1Ref = useRef(null);
  const field2Ref = useRef(null);
  const field3Ref = useRef(null);
  const field4Ref = useRef(null);

  const handleKeyDown = (event, currentFieldRef, prevFieldRef) => {
    if (event.key === "Backspace" && event.target.value === "") {
      prevFieldRef.current.focus();
    }
  };

  const [signup, setSignup] = useState({
    status: false,
    heading: "Looks like you're new here!",
    subHeading: "Sign Up with your mobile number to get started",
  });

  const [login, setLogin] = useState({
    status: true,
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  });

  const [otpInterface, setOtpInterface] = useState({
    status: false,
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  });

  const [create, setCreate] = useState({
    status: false,
    heading: "Looks like you're new here!",
    subHeading: "Sign Up with your mobile number to get started",
  });

  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState("");
  const [emailid, setEmailid] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  var [txtOne, setTxtOne] = useState("");
  var [txtTwo, setTxtTwo] = useState("");
  var [txtThree, setTxtThree] = useState("");
  var [txtFour, setTxtFour] = useState("");
  var [seconds, setSeconds] = useState(true);
  var [time, setTime] = useState(10);

  var [refresh, setRefresh] = useState(false);
  var [btnMsg, setBtnMsg] = useState("get an Otp");
  var [inputOtp, setInputOtp] = useState("");
  var [status, setStatus] = useState(false);
  const [getOtp, setOtp] = useState();
  const [generatedOtp, setGeneratedOtp] = useState();

  const [error, setError] = useState({});
  const [errorOne, setErrorOne] = useState({});
  const [errorTwo, setErrorTwo] = useState({});

  var [userDetails, setUserDetails] = useState({});

  var interval;
  const handleSubmit = async () => {
    if (validationTwo()) {
      var body = {
        firstname: name,
        lastname: lastName,
        mobileno: mobile,
        email: emailid,
        password: password,
      };

      var response = await postData("users/signup", body);
      if (response.status) {
        var result = await postData("users/checknumber", {
          mobilenumber: mobile,
        });
        if (result.status) {
          dispatch({ type: "ADD_USER", payload: result.data });
          toast("you are now log in !");
        }
        props.handleCloseDialogueInOrder();
      } else {
        toast("log in error");
      }
    }
  };

  const fetchUserDetails = async () => {
    if (validation()) {
      var result = await postData("users/checknumber", {
        mobilenumber: mobile,
      });

      if (result.status) {
        setUserDetails(result);

        var otp = parseInt(Math.random() * 8999) + 1000;
        toast(otp);

        setGeneratedOtp(otp);
        setOtpInterface((prev) => ({ ...prev, status: true }));
        setCreate((prev) => ({ ...prev, status: false }));
        setSignup((prev) => ({ ...prev, status: false }));
        setLogin((prev) => ({ ...prev, status: false }));
        myTimer();
      } else {
        setSignup((prev) => ({ ...prev, status: true }));
        setOtpInterface((prev) => ({ ...prev, status: false }));
        setCreate((prev) => ({ ...prev, status: false }));
        setLogin((prev) => ({ ...prev, status: false }));
      }
    }
  };

  const myTimer = (s) => {
    var interval;
    if (s || seconds) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev >= 1) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setSeconds(false);
            return 10;
          }
        });
      }, 1000);
      setRefresh(!refresh);
    }
  };

  const handleClickOpen = () => {
    setOtp("");
    setMobile("");
    setOpen(true);
    setName("");
    setLastName("");
    setEmailid("");
    setPassword("");
    setCreate((prev) => ({ ...prev, status: false }));
    setLogin((prev) => ({ ...prev, status: true }));
    setSignup((prev) => ({ ...prev, status: false }));
    setOtpInterface((prev) => ({ ...prev, status: false }));
  };

  const handleClose = () => {
    setOpen(false);
    setMobile("");
    setName("");
    setEmailid("");
    setPassword("");
    setOtp("");
    setLastName("");
    setLogin({
      status: true,
      heading: "Login",
      subHeading: "Get access to your Orders, Wishlist and Recommendations",
    });
  };

  const toggleCreate = () => {
    if (validationOne()) {
      var otp = parseInt(Math.random() * 8999) + 1000;
      toast(otp);
      setGeneratedOtp(otp);
      setBtnMsg("Change Mobile");
      setSignup((prev) => ({ ...prev, status: false }));
      setCreate((prev) => ({
        ...prev,
        status: true,
      }));
    }
  };

  const toggleSignUp = () => {
    setSignup({
      status: true,
      heading: "Looks like you're new here!",
      subHeading: "Sign Up with your mobile number to get started",
    });
    fetchUserDetails();
  };

  const toggleChange = () => {
    setLogin((prev) => ({ ...prev, status: true }));
  };

  const toggleOTP = () => {
    setSeconds(true);
    var otp = parseInt(Math.random() * 8999) + 1000;
    toast(otp);
    setGeneratedOtp(otp);
    myTimer(true);
  };

  const verifyOtp = () => {
    if (getOtp == generatedOtp) {
      toast("you are now log in !");
      toast(userDetails.status);

      if (userDetails.status) {
        dispatch({ type: "ADD_USER", payload: userDetails.data });

        props.handleCloseDialogueInOrder();
        setLogin((prev) => ({ ...prev, status: true }));
        setMobile("");
      } else {
        toast("error");
      }
    } else {
      toast("Not Correct");
    }
  };

  const handleTextOneChange = (event) => {
    if (event.target.value.length <= 1) {
      setTxtOne(event.target.value);
      document.getElementById("t2").focus();
    }
  };
  const handleTextTwoChange = (event) => {
    if (event.target.value.length <= 1) {
      setTxtTwo(event.target.value);
      document.getElementById("t3").focus();
    }
  };

  const handleTextThreeChange = (event) => {
    if (event.target.value.length <= 1) {
      setTxtThree(event.target.value);
      document.getElementById("t4").focus();
    }
  };

  const handleTextFourChange = (event, value) => {
    if (event.target.value.length <= 1) {
      setTxtFour(event.target.value);
      // toast(txtOne + txtTwo + txtThree + event.target.value);
      setInputOtp(txtOne + txtTwo + txtThree + event.target.value);
      setOtp(txtOne + txtTwo + txtThree + event.target.value);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(true);
  };
  const handleHidePassword = () => {
    setShowPassword(false);
  };

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  const handleErrorOne = (inputs, value) => {
    setErrorOne((prev) => ({ ...prev, [inputs]: value }));
  };
  const handleErrorTwo = (inputs, value) => {
    setErrorTwo((prev) => ({ ...prev, [inputs]: value }));
  };

  const validation = () => {
    var isValid = true;

    if (mobile.length !== 10) {
      handleError("mobile", "Enter 10 digits Mobile Number");
      isValid = false;
    }

    return isValid;
  };

  const validationOne = () => {
    var isValid = true;

    if (mobile.length !== 10) {
      handleErrorOne("mobile", "Enter 10 digits Mobile Number");
      isValid = false;
    }

    return isValid;
  };

  const validationTwo = () => {
    var isValid = true;

    if (!mobile) {
      handleErrorTwo("mobile", "Enter 10 digits Mobile Number");
      isValid = false;
    }

    if (!getOtp) {
      handleErrorTwo("getOtp", "Pls Input Otp");
      isValid = false;
    }
    if (!name) {
      handleErrorTwo("name", "Pls Input Name");
      isValid = false;
    }
    if (!lastName) {
      handleErrorTwo("lastName", "Pls Input LastName");
      isValid = false;
    }
    if (emailid.length) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailid)) {
        error.emailid = "Required";
        handleErrorTwo("emailid", "Pls Input valid Email");
        isValid = false;
      }
    } else {
    }

    if (!password) {
      handleErrorTwo("password", "Pls Input Password");
      isValid = false;
    }

    return isValid;
  };
  return (
    <>
      {login.status ? (
        <Grid container>
          <Grid item md={5} xs={6} sm={6} className={"Stylesheet_log-1"}>
            <div style={{ margin: "10%" }}>
              <div className={"Stylesheet_log-2"}>{login.heading}</div>

              <div className={"Stylesheet_log-3"}>
                <div>{login.subHeading}</div>
              </div>
              <div style={{ marginTop: "50%" }}>
                <img
                  src="/login_img.png"
                  alt="log_in"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={12} sm={6} className={"Stylesheet_log-4"}>
            <div style={{ margin: "10%" }}>
              <div>
                <TextField
                  id="standard-multiline-flexible"
                  label="Enter Mobile Number"
                  type="number"
                  variant="standard"
                  value={mobile}
                  autoFocus={true}
                  error={!error.mobile ? false : true}
                  helperText={error.mobile}
                  onFocus={() => handleError("mobile", null)}
                  onChange={(event) => setMobile(event.target.value.trim())}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <span style={{ fontWeight: 700, color: "black" }}>
                          +91
                        </span>
                      </InputAdornment>
                    ),
                  }}
                  //Regex(@"^[0-9]{10}$")
                  //   onKeyDown={(event) => {
                  //     const RegexLetter = "^[0-9]{10}$";
                  //  if (!RegexLetter.test(event.key)) {
                  //     event.preventDefault();
                  //   }
                  // }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      toggleSignUp();
                    }
                  }}
                />
              </div>
              <div className={"Stylesheet_log-5"}>
                By continuing, you agree to vipin kirana's Terms of Use and
                Privacy Policy.
              </div>

              <div style={{ marginTop: "10%" }}>
                <Button
                  style={{ background: "#183871", borderRadius: 1 }}
                  variant="contained"
                  fullWidth
                  onClick={() => toggleSignUp()}
                >
                  Request OTP
                </Button>
              </div>

              {/* <div
                      className={"Stylesheet_log-6"}
                      onClick={() => toggleSignUp()}
                    >
                      New to vipin kirana?Create Account
                    </div> */}
            </div>
          </Grid>
        </Grid>
      ) : /////login End///

      signup.status ? (
        <Grid container>
          <Grid item md={5} xs={6} sm={6} className={"Stylesheet_log-1"}>
            <div style={{ margin: "10%" }}>
              <div className={"Stylesheet_log-2"}>{signup.heading}</div>

              <div className={"Stylesheet_log-3"}>
                <div>{signup.subHeading}</div>
              </div>
              <div style={{ marginTop: "20%" }}>
                <img
                  src="/login_img.png"
                  alt="log_in"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={12} sm={6} className={"Stylesheet_log-4"}>
            <div style={{ margin: "10%" }}>
              <div>
                <TextField
                  onChange={(event) => setMobile(event.target.value.trim())}
                  id="standard-multiline-flexible"
                  label="Enter Mobile Number"
                  value={mobile}
                  type="number"
                  error={!errorOne.mobile ? false : true}
                  helperText={errorOne.mobile}
                  onFocus={() => handleErrorOne("mobile", null)}
                  variant="standard"
                  fullWidth
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      toggleCreate();
                    }
                  }}
                />
              </div>
              <div className={"Stylesheet_log-5"}>
                By continuing, you agree to vipin kirana's Terms of Use and
                Privacy Policy.
              </div>

              <div style={{ marginTop: "10%" }}>
                <Button
                  style={{ background: "#183871", borderRadius: 1 }}
                  variant="contained"
                  fullWidth
                  onClick={() => toggleCreate()}
                >
                  CONTINUE
                </Button>
              </div>

              {/* <div>
                      <Button
                        style={{
                          background: "#fff",
                          borderRadius: 1,
                          marginTop: "10%",
                          color: "#183871",
                        }}
                        variant="contained"
                        fullWidth
                      >
                        Existing User?Login in
                      </Button>
                    </div> */}
            </div>
          </Grid>
        </Grid>
      ) : /////////signUp-end////

      otpInterface.status ? (
        <Grid container>
          <Grid item md={5} xs={6} sm={6} className={"Stylesheet_log-1"}>
            <div style={{ margin: "10%" }}>
              <div className={"Stylesheet_log-2"}>{otpInterface.heading}</div>

              <div className={"Stylesheet_log-3"}>
                <div>{otpInterface.subHeading}</div>
              </div>
              <div style={{ marginTop: "50%" }}>
                <img
                  src="/login_img.png"
                  alt="log_in"
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={12} sm={6} className={"Stylesheet_log-4"}>
            <div style={{ margin: "10%", cursor: "pointer" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  textAlign: "center",
                }}
              >
                Please Enter the OTP sent to {mobile}.
                <span
                  style={{ marginLeft: 8, color: "#183871" }}
                  onClick={() => toggleChange()}
                >
                  Change
                </span>
              </div>

              <div>
                <Grid
                  container
                  spacing={2}
                  className={"Stylesheet_mrg-3t"}
                  style={{
                    marginTop: 25,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <OtpInput
                    value={getOtp}
                    onChange={(value) => setOtp(value)}
                    numInputs={4}
                    inputStyle={{ padding: 10, fontSize: 18,fontWeight:"bold" }}
                    renderSeparator={<span>&nbsp;&nbsp;&nbsp;</span>}
                    inputType="number"
                    renderInput={(props) => <input {...props} />}
                    shouldAutoFocus
                  />
                  {/* <Grid
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                    item
                    xs={3}
                  >
                    <TextField
                      id="t1"
                      value={txtOne}
                      autoFocus={true}
                      type="number"
                      // onKeyDown={(event) =>
                      //   handleKeyDown(event, field1Ref, field4Ref)
                      // }
                      inputRef={field1Ref}
                      variant="standard"
                      onChange={handleTextOneChange}
                      InputProps={{
                        style: { fontWeight: 900, paddingLeft: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      value={txtTwo}
                      id="t2"
                      type="number"
                      variant="standard"
                      onKeyDown={(event) =>
                        handleKeyDown(event, field2Ref, field1Ref)
                      }
                      inputRef={field2Ref}
                      onChange={handleTextTwoChange}
                      InputProps={{
                        style: { fontWeight: 900, paddingLeft: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      value={txtThree}
                      id="t3"
                      type="number"
                      onKeyDown={(event) =>
                        handleKeyDown(event, field3Ref, field2Ref)
                      }
                      inputRef={field3Ref}
                      variant="standard"
                      onChange={handleTextThreeChange}
                      InputProps={{
                        style: { fontWeight: 900, paddingLeft: "20px" },
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="t4"
                      onKeyDown={(event) =>
                        handleKeyDown(event, field4Ref, field3Ref)
                      }
                      inputRef={field4Ref}
                      value={txtFour}
                      type="number"
                      variant="standard"
                      onChange={handleTextFourChange}
                      InputProps={{
                        style: { fontWeight: 900, paddingLeft: "20px" },
                      }}
                      onKeyPress={(event) => {
                        if (event.key === "Enter") {
                          verifyOtp();
                        }
                      }}
                    />
                  </Grid> */}

                  <Grid item xs={12}>
                    <div style={{ fontSize: 15, fontWeight: 500 }}>
                      {seconds ? (
                        <div>waiting for OTP...{time}</div>
                      ) : (
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => toggleOTP()}
                        >
                          Resend Otp
                        </div>
                      )}
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div style={{ marginTop: "10%" }}>
                <Button
                  style={{ background: "#183871", borderRadius: 1 }}
                  variant="contained"
                  fullWidth
                  onClick={verifyOtp}
                >
                  Verify
                </Button>
              </div>

              {/* <div className={"Stylesheet_log-6 cur-point"}>
                Not received your code?Resend code
              </div> */}
            </div>
          </Grid>
        </Grid>
      ) : (
        /////Otp end/////
        <Grid container>
          <Grid item md={5} xs={6} sm={6} className={"Stylesheet_log-1"}>
            <div style={{ margin: "10%" }}>
              <div className={"Stylesheet_log-2"}>{create.heading}</div>

              <div className={"Stylesheet_log-3"}>
                <div>{create.subHeading}</div>
              </div>
              <div style={{ marginTop: "20%" }}>
                <img
                  src="/login_img.png"
                  alt="log_in"
                  height="100%"
                  width="100%"
                />
              </div>
            </div>
          </Grid>
          <Grid item md={7} xs={12} sm={6} className={"Stylesheet_log-4"}>
            <div style={{ margin: "10%" }}>
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Mobile Number"
                      value={mobile}
                      type="number"
                      disabled={true}
                      onChange={(event) => setMobile(event.target.value.trim())}
                      error={!errorTwo.mobile ? false : true}
                      helperText={errorTwo.mobile}
                      onFocus={() => handleErrorTwo("mobile", null)}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={() => toggleChange()}
                              style={{
                                textTransform: "none",
                                color: "#183871",
                              }}
                            >
                              change?
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Enter OTP"
                      autoFocus={true}
                      value={getOtp}
                      onChange={(event) => setOtp(event.target.value.trim())}
                      type="number"
                      error={!errorTwo.getOtp ? false : true}
                      helperText={errorTwo.getOtp}
                      onFocus={() => handleErrorTwo("getOtp", null)}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={() => toggleOTP()}
                              style={{
                                textTransform: "none",
                                color: "#183871",
                              }}
                            >
                              resend?
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      onChange={(event) =>
                        setName(event.target.value.trimStart())
                      }
                      value={name}
                      type="text"
                      variant="standard"
                      error={!errorTwo.name ? false : true}
                      helperText={errorTwo.name}
                      onFocus={() => handleErrorTwo("name", null)}
                      onKeyDown={(event) => {
                        const RegexLetter = /^[a-zA-Z\s]*$/;
                        if (!RegexLetter.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Last Name"
                      onChange={(event) =>
                        setLastName(event.target.value.trimStart())
                      }
                      value={lastName}
                      type="text"
                      error={!errorTwo.lastName ? false : true}
                      helperText={errorTwo.lastName}
                      onFocus={() => handleErrorTwo("lastName", null)}
                      onKeyDown={(event) => {
                        const RegexLetter = /^[a-zA-Z\s]*$/;
                        if (!RegexLetter.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Email Id"
                      value={emailid}
                      onChange={(event) =>
                        setEmailid(event.target.value.trim())
                      }
                      type="email"
                      error={!errorTwo.emailid ? false : true}
                      helperText={errorTwo.emailid}
                      onFocus={() => handleErrorTwo("emailid", null)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      label="Password"
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value.trim())
                      }
                      type={showPassword ? "text" : "password"}
                      error={!errorTwo.password ? false : true}
                      helperText={errorTwo.password}
                      onFocus={() => handleErrorTwo("password", null)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {showPassword ? (
                              <>
                                <VisibilityIcon
                                  style={{ cursor: "pointer" }}
                                  onClick={handleHidePassword}
                                />
                              </>
                            ) : (
                              <VisibilityOffIcon
                                style={{ cursor: "pointer" }}
                                onClick={handleShowPassword}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </div>

              <div style={{ marginTop: "10%" }}>
                <Button
                  style={{
                    background: "#183871",
                    borderRadius: 1,
                    textTransform: "none",
                  }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit}
                >
                  SignUp
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      )}
    </>
  );
}

{
  /* {i==1?div:i==2?span:p} */
}
