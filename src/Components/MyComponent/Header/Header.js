import { React } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Grid,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Box,
  DialogContent,
  Hidden,
} from "@mui/material";
import Menu from "@mui/material/Menu";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import "../../../Stylesheet.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import {
  getData,
  postData,
} from "../../Administrator/Services/FetchNodeServices";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Leftdrawer from "../LeftDrawer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Login from "../Login";
export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const openmenu = Boolean(anchorEl);

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState();
  const [emailid, setEmailid] = useState("");
  const [name, setName] = useState("");
  const [userid, setUserId] = useState("");

  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleStatus = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  var [txtOne, setTxtOne] = useState("");
  var [txtTwo, setTxtTwo] = useState("");
  var [txtThree, setTxtThree] = useState("");
  var [txtFour, setTxtFour] = useState("");
  var [seconds, setSeconds] = useState(true);
  var [time, setTime] = useState(40);
  var [refresh, setRefresh] = useState(false);
  var [btnMsg, setBtnMsg] = useState("get an Otp");
  var [inputOtp, setInputOtp] = useState("");
  const [getOtp, setOtp] = useState();
  const [generatedOtp, setGeneratedOtp] = useState();
  const [searching, setSearching] = useState("");
  const [suggest, setSuggest] = useState([]);
  const [hidesuggest, setHideSuggest] = useState(false);

  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const userDetailList = useSelector((state) => state.userDetails);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({});
  const [errorOne, setErrorOne] = useState({});
  const [errorTwo, setErrorTwo] = useState({});

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

  var dispatch = useDispatch();

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
          alert(result.data);
          dispatch({ type: "ADD_USER", payload: result.data });
          toast("you are now log in !");
        }

        setOpen(false);
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
      } else {
        setSignup((prev) => ({ ...prev, status: true }));
        setOtpInterface((prev) => ({ ...prev, status: false }));
        setCreate((prev) => ({ ...prev, status: false }));
        setLogin((prev) => ({ ...prev, status: false }));
      }
    }
  };
  useEffect(function () {
    myTimer();
  }, []);

  const myTimer = () => {
    if (seconds) {
      var t = time;
      interval = setInterval(() => {
        if (t >= 1) {
          t = t - 1;
          setTime(t);
        } else {
          clearInterval(interval);
          setSeconds(false);
        }
      }, 1000);
      setRefresh(!refresh);
    }
  };
  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/order");
  };
  const handleGotoProfile = () => {
    navigate("/myprofiledetails");
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

  const toggleOTP = () => {
    if (btnMsg == "Change Mobile") {
      setBtnMsg("get an Otp");
      setMobile("");
    } else {
      var otp = parseInt(Math.random() * 8999) + 1000;
      toast(otp);
      setGeneratedOtp(otp);
      setBtnMsg("Change Mobile");
    }
  };

  const verifyOtp = () => {
    if (getOtp == generatedOtp) {
      toast("Correct");
      toast(userDetails.status);
      if (userDetails.status) {
        dispatch({ type: "ADD_USER", payload: userDetails.data });

        setOpen(false);

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
    if (event.target.value.length >= 1) {
      setTxtOne(event.target.value);
      document.getElementById("t2").focus();
    }
  };
  const handleTextTwoChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtTwo(event.target.value);
      document.getElementById("t3").focus();
    }
  };

  const handleTextThreeChange = (event) => {
    if (event.target.value.length >= 1) {
      setTxtThree(event.target.value);
      document.getElementById("t4").focus();
    }
  };

  const handleTextFourChange = (event, value) => {
    if (event.target.value.length >= 1) {
      setTxtFour(event.target.value);
      toast(txtOne + txtTwo + txtThree + event.target.value);
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
      handleError("mobile", "Pls Select Mobile Number");
      isValid = false;
    }

    return isValid;
  };

  const validationOne = () => {
    var isValid = true;

    if (mobile.length !== 10) {
      handleErrorOne("mobile", "Pls Select Mobile Number");
      isValid = false;
    }

    return isValid;
  };

  const validationTwo = () => {
    var isValid = true;

    if (!mobile) {
      handleErrorTwo("mobile", "Pls Select Mobile Number");
      isValid = false;
    }

    if (!getOtp) {
      handleErrorTwo("getOtp", "Pls Input Otp");
      isValid = false;
    }
    if (!name) {
      handleErrorTwo("name", "Pls Select Name");
      isValid = false;
    }
    if (!lastName) {
      handleErrorTwo("lastName", "Pls Input Product LastName");
      isValid = false;
    }
    if (!emailid) {
      handleErrorTwo("emailid", "Pls Select Email");
      isValid = false;
    }
    if (!password) {
      handleErrorTwo("password", "Pls Input Password");
      isValid = false;
    }

    return isValid;
  };

  const handleCloseDialogueInOrder = () => {
    setOpen(false);
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 0,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon style={{ cursor: "pointer" }} />
          </IconButton>

          <Login handleCloseDialogueInOrder={handleCloseDialogueInOrder} />
        </Dialog>
      </div>
    );
  };

  const handleGotoHome = () => {
    navigate("/");
  };

  const handleLogOut = () => {
    dispatch({ type: "DELETE_USER" });
    dispatch({ type: "DELETE_PRODUCT" });
    dispatch({ type: "DELETE_COUPON" });
    dispatch({ type: "DELETE_ADDRESS" });
    dispatch({ type: "DELETE_PINCODE" });
    navigate("/");
    window.location.reload();
  };
  const getSuggestion = async () => {
    setHideSuggest(true);
    const result = await getData(
      "userinterface/global_search?search=" + searching
    );
    if (result.status) {
      setSuggest(result.data);
      // alert(JSON.stringify(suggest))

      // alert(JSON.stringify(result.data));
    } else {
      toast("Error");
    }
  };
  useEffect(() => {
    if (searching.length == 0) {
      setHideSuggest(false);
    }
  }, [searching]);
  return (
    <>
      <div className={"Stylesheet_mainContainer"}>
        <div className={"Stylesheet_box"}>
          <AppBar position="fixed" color="inherit">
            <Toolbar>
              <Grid
                container
                style={{ display: "flex", alignItems: "center", padding: 10 }}
                spacing={2}
              >
                <Grid
                  item
                  lg={1}
                  md={0.5}
                  //sm={0.8}
                  sm={0.4}
                  xs={1}
                  sx={{ display: { lg: "none" } }}
                  className="menu_paddLeft"
                >
                  <img
                    src="/menu.svg"
                    alt="Menu"
                    onClick={handleStatus}
                    style={{ cursor: "pointer", background: "" }}
                  />
                </Grid>

                <Grid
                  item
                  lg={0.8}
                  md={1}
                  //sm={0.8}
                  sm={1.2}
                  xs={2}
                  sx={{ display: { sm: "flex" } }}
                  //className="menu_paddLeft"
                >
                  <img
                    src="/logo2.png"
                    alt="logo"
                    className={"Stylesheet_images"}
                    onClick={handleGotoHome}
                    style={{ cursor: "pointer", background: "" }}
                  />
                </Grid>

                <Grid
                  item
                  lg={1}
                  md={1}
                  xs={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                  sx={{
                    display: { xs: "none", md: "none", sm: "none", lg: "flex" },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/showallcategory")}
                >
                  Categories
                </Grid>

                <Grid
                  item
                  lg={1}
                  md={1}
                  xs={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                  sx={{
                    display: { xs: "none", md: "none", sm: "none", lg: "flex" },
                    cursor: "pointer",
                  }}
                >
                  <div style={{ marginLeft: "25%" }}>Deals</div>
                </Grid>

                <Grid
                  item
                  lg={1.5}
                  md={1}
                  xs={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                  sx={{
                    display: { xs: "none", md: "none", sm: "none", lg: "flex" },
                    cursor: "pointer",
                  }}
                >
                  <div style={{ marginLeft: "10%" }}>What's New</div>
                </Grid>

                <Grid
                  item
                  lg={2}
                  md={1}
                  xs={1}
                  style={{ fontSize: 18, fontWeight: 500 }}
                  sx={{
                    display: { xs: "none", md: "none", sm: "none", lg: "flex" },
                    cursor: "pointer",
                  }}
                >
                  Pickup & Delivery
                </Grid>

                <Grid item lg={4} md={10} sm={9.5} xs={7.5}>
                  <div
                    className={"Stylesheet_center"}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      style={{ position: "relative" }}
                      className={"Stylesheet_searchbox"}
                    >
                      <TextField
                        style={{ marginLeft: "2%" }}
                        placeholder="Search"
                        onKeyDown={getSuggestion}
                        value={searching}
                        onChange={(event) =>
                          setSearching(event.target.value.trimStart())
                        }
                        variant="standard"
                        InputProps={{
                          disableUnderline: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              {searching.length ? (
                                <SearchIcon
                                  style={{ cursor: " pointer" }}
                                  fontSize="small"
                                  onClick={() =>
                                    navigate("/searchallproducts/" + searching)
                                  }
                                />
                              ) : (
                                <SearchIcon
                                  style={{ cursor: " pointer" }}
                                  fontSize="small"
                                />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        fullWidth
                        onKeyPress={(event) => {
                          if (searching.length) {
                            if (event.key === "Enter") {
                              navigate("/searchallproducts/" + searching);
                            }
                          }
                        }}
                      />

                      {hidesuggest ? (
                        <div
                          style={{
                            position: "absolute",
                            top: 40,
                            left: -40,
                            textAlign: "start",
                            width: "100%",
                          }}
                        >
                          <ul
                            style={{
                              listStyle: "none",
                              borderBottomRightRadius: 20,
                            }}
                          >
                            {suggest?.slice(0, 4)?.map((item) => {
                              return (
                                <li
                                  onClick={() => {
                                    setSearching(item.productname);
                                    setHideSuggest(false);
                                    navigate("/searchallproducts/" + searching);
                                  }}
                                  className="suggestcss"
                                >
                                  {item.productname}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Grid>

                {Object.keys(userDetailList).length ? (
                  <Grid
                    item
                    lg={1}
                    md={1}
                    xs={1}
                    sx={{
                      display: {
                        lg: "block",
                        xs: "none",
                        md: "none",
                        sm: "none",
                      },
                      fontWeight: 500,
                    }}
                  >
                    <div
                      onClick={handleClickMenu}
                      onMouseDown={handleCloseMenu}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span
                        style={{ fontSize: 18 }}
                        className="Stylesheet_cur-point"
                      >
                        {userDetailList.firstname}
                      </span>
                      <span className="Stylesheet_cur-point">
                        <KeyboardArrowDownIcon
                          style={{
                            paddingLeft: 10,
                            display: "flex",
                            alignItems: "center",
                          }}
                          fontSize="medium"
                        />
                      </span>
                    </div>

                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openmenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem onClick={handleGotoProfile}>Profile</MenuItem>
                      <MenuItem onClick={() => navigate("/myorder")}>
                        Order
                      </MenuItem>
                      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
                    </Menu>
                  </Grid>
                ) : (
                  <Grid
                    item
                    lg={1.2}
                    md={1}
                    xs={1}
                    sx={{
                      display: {
                        lg: "flex",
                        xs: "none",
                        md: "none",
                        sm: "none",
                      },
                      fontWeight: 500,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <img
                          src="/tar-get-1.svg"
                          className={"Stylesheet_btn-2"}
                          onClick={handleClickOpen}
                          on
                          alt="sign"
                        />
                      </span>

                      <span
                        style={{ fontSize: 20, paddingLeft: 10 }}
                        onClick={handleClickOpen}
                        className="Stylesheet_cur-point"
                      >
                        Sign in
                      </span>
                    </div>
                  </Grid>
                )}

                <Grid item lg={0.5} md={0.5} sm={0.5} xs={1.5}>
                  <Badge
                    color="error"
                    className="Stylesheet_cur-point"
                    badgeContent={listProducts.length}
                    onClick={handleCart}
                  >
                    <img
                      src="/cart.svg"
                      alt="cart"
                      className="Stylesheet_cur-point"
                      onClick={handleCart}
                    />
                  </Badge>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      </div>
      <div>{showDialog()}</div>
      <Leftdrawer
        handleOpenLoginDialogue={handleClickOpen}
        status={drawerOpen}
        handleStatusDrawerClose={handleCloseDrawer}
      />
    </>
  );
}
