import {
  Grid,
  Box,
  Typography,
  Button,
  ButtonGroup,
  DialogContent,
  Skeleton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import CouponComponent from "../CouponComponent";
import React, { useEffect, useState } from "react";
import "../../../Stylesheet.css";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";
import Address from "../Login/Address";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import { toast } from "react-toastify";
import Login from "../Login";
import Emptycart from "../Emptycart";

export default function Order(props) {
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [statusCoupon, setStatusCoupon] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [dailogueOpen, setDialogueOpen] = useState(false);

  const userDetailList = useSelector((state) => state.userDetails);
  const userCouponList = useSelector((state) => state.coupon);
 

  const listAddress = useSelector((state) => state.address);
 

  const fetchAllAddress = async () => {
    setLoading(true);
    if (
      Object.keys(listAddress).length == 0 &&
      Object.keys(userDetailList).length != 0
    ) {
      var result = await getData("address/" + userDetailList.userid);
      if (result.status) {
        if (result.data.length) {
          
          dispatch({ type: "ADD_ADDRESS", payload: result.data[0] });
        }
        setRefresh(!refresh);
      }
    }
    setLoading(false);
  };
  useEffect(
    function () {
      fetchAllAddress();
      screen();
    },
    [userDetailList]
  );

  const finalPrice = listProducts.reduce(
    (acc, item) => {
      acc.mrp += Number(item.price) * item.quantity;
      acc.discount +=
        (Number(item.price) - Number(item.offerprice)) * item.quantity;
      acc.pricepaid += Number(item.offerprice) * item.quantity;
      return acc;
    },
    { mrp: 0, discount: 0, pricepaid: 0 }
  );

  const IncreasePrice = (item) => {
    const data = { ...item, quantity: item.quantity + 1 };
    dispatch({
      type: "ADD_PRODUCT",
      payload: [data.productid + "-" + data.priceid, data],
    });
    setRefresh(!refresh);
  };

  useEffect(() => {
    if (Object.keys(userCouponList).length) {
      if (finalPrice?.pricepaid >= userCouponList?.minimumprice) {
      } else {
        handleRemoveCoupon();
      }
    }
  }, [finalPrice]);

  const DecreasePrice = (item) => {
    const data = { ...item, quantity: item.quantity - 1 };
    if (data.quantity != 0) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: [data.productid + "-" + data.priceid, data],
      });
    } else {
   
      dispatch({
        type: "REMOVE_PRODUCT",
        payload: data.productid + "-" + data.priceid,
      });
    }
    setRefresh(!refresh);
  };

  const ShowCartItems = () => {
    return listProducts.map((item, index) => {
      return (
        <Grid
          container
          className={"Stylesheet_borderTop Stylesheet_pl-30"}
          key={"list_address" + index}
        >
          <Grid item xs={12} md={1.5} sm={2} lg={1.5}>
            <img
              src={`${ServerURL}/images/${item.picture}`}
              alt="products"
              width={50}
              height={50}
              {...(index > 2 && { loading: "lazy" })}
            />
          </Grid>

          <Grid item xs={12} md={7.5} sm={6} lg={7.5}>
            <Typography>
              {item.productname} ({item.qty})
            </Typography>
            <Typography className={"Stylesheet_lightText"} id="description">
              {item.description}
            </Typography>
            <Typography>
              <Box component="span" className={"Stylesheet_priceText"}>
                ₹{item.offerprice * item.quantity}
              </Box>
              <Box component="span" className={"Stylesheet_strikPrice"}>
                <strike>₹{item.price * item.quantity}</strike>
              </Box>
              <Box component="span" className={"Stylesheet_offPrice"}>
                ₹{item.price * item.quantity - item.offerprice * item.quantity}{" "}
                Off
              </Box>
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} sm={4} lg={3}>
            <ButtonGroup className={"Stylesheet_right Stylesheet_cur-point"}>
              <Button onClick={() => DecreasePrice(item)}>-</Button>
              <Button disabled>
                <span style={{ fontSize: 18, fontWeight: 700, color: "black" }}>
                  &#215;{item.quantity}
                </span>
              </Button>
              <Button onClick={() => IncreasePrice(item)}>+</Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      );
    });
  };

  const navigate = useNavigate();
  const handleGotoBooking = () => {
    navigate("/booking");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeAddressSummary = () => {
    setOpen(false);
  
  };
  const screen = () => {
    window.scroll(0, 0);
  };

  const showDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              backgroundColor: "transparent",
              boxShadow: "none",
              overflowY: "hidden",
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 20,
              top: 15,

              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {<Address handleChangeAddressSummary={handleChangeAddressSummary} />}
        </Dialog>
      </div>
    );
  };
  const handleCouponSection = () => {
    setStatusCoupon(true);
  };

  const handleRemoveCoupon = () => {
    toast('coupon removed')
    dispatch({ type: "DELETE_COUPON" });
  };

  const handleLogInAlert = () => {
 
    setDialogueOpen(true);
  };
  const handleCloseDialogueInOrder = () => {
    setDialogueOpen(false);
  };

  const showLoginDialog = () => {
    return (
      <div>
        <Dialog
          open={dailogueOpen}
        
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={handleCloseDialogueInOrder}
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

  return (
    <>
      <Header />
      {listProducts.length == 0 ? (
        <center  >
        <div style={{width:'80%',marginTop:70,marginBottom:10}}>
          <Emptycart />
          </div>
        </center>
      ) : (
        <div className="Stylesheet_margin-7t">
          <Grid container spacing={2} className={"Stylesheet_gridContainer"}>
            <Grid item md={8} xs={12}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={60} />
              ) : (
                <Grid style={{ background: "#fff" }}>
                  <Box className={"Stylesheet_padd-15"}>
                    {Object.keys(listAddress).length != 0 &&
                    Object.keys(userDetailList).length ? (
                      <>
                        <Box component="span">
                          <Typography>
                            Deliver&nbsp;to:
                            <span style={{ fontWeight: 600 }}>
                              {listAddress?.name},{listAddress?.pincode}
                            </span>
                            <Box component="span" style={{ paddingLeft: 5 }}>
                              <span className="Stylesheet_work">
                                {listAddress?.addresstype}
                              </span>
                            </Box>
                          </Typography>
                          <Typography className={"Stylesheet_address"}>
                            {listAddress?.address}
                          </Typography>
                        </Box>
                        {/* <div>
                        
                        <span>
                        Deliver&nbsp;to:<span style={{ fontWeight: 600 }}>{listAddress?.name},{listAddress?.pincode}</span><span>{listAddress?.addresstype}</span>
                        </span>
                        
                        <div className='Stylesheet_address'>
                      {listAddress?.address}
                      </div>
                      </div> */}

                        <Box>
                          <Box
                            component="span"
                            className={"Stylesheet_change Stylesheet_cur-point"}
                            onClick={handleClickOpen}
                          >
                            Change
                          </Box>
                        </Box>
                      </>
                    ) : Object.keys(listAddress).length == 0 &&
                      Object.keys(userDetailList).length ? (
                      <>
                        <Typography
                          style={{ cursor: "pointer", width: "100%" }}
                          onClick={handleClickOpen}
                        
                        >
                          <span style={{ fontWeight: 600 }}>Add Address?</span>
                          <Box component="span" className={"Stylesheet_work"}>
                            here
                          </Box>
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography
                          style={{ cursor: "pointer", width: "100%" }}
                        >
                          <span style={{ fontWeight: 600 }}>
                            Please Log in Or Sign Up?
                          </span>
                          <span className={"Stylesheet_work"} onClick={handleLogInAlert}>Login</span>
                        </Typography>
                      </>
                    )}
                  </Box>
                </Grid>
              )}

              {loading ? (
                <Skeleton variant="rectangular" width="100%" height="70%" />
              ) : (
                <Grid className={"Stylesheet_bodered Stylesheet_scrollitem"}>
                  {ShowCartItems()}
                </Grid>
              )}

              <Grid>
                <Box className={"Stylesheet_placeOrder"}>
                  <Box component="span">
                    {Object.keys(userDetailList).length ? (
                      <button
                        className="project__btncnfemail-2 Stylesheet_cur-point"
                        onClick={handleGotoBooking}
                      >
                        {" "}
                        Place Order
                      </button>
                    ) : (
                      <button
                        className="project__btncnfemail-2 Stylesheet_cur-point"
                        onClick={handleLogInAlert}
                      >
                        {" "}
                        Log In
                      </button>
                    )}
                  </Box>
                </Box>
              </Grid>

              {/* 4 box end */}
            </Grid>

            <Grid item lg={4} md={4} sm={12} xs={12}>
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={100} />
              ) : (
                <Grid className="Stylesheet_padd-15">
                  <CouponComponent handleCouponSection={handleCouponSection} />
                </Grid>
              )}
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
              ) : (
                <Grid className="Stylesheet_white">
                  <Box className={"Stylesheet_padd-15  Stylesheet_rightBox"}>
                    <Box style={{ paddingBottom: 15 }}>
                      <Typography>
                        <span style={{ fontWeight: 600 }}>PRICE DETAILS</span>
                      </Typography>
                    </Box>

                    <Box style={{ borderTop: "1px solid #f0f0f0" }}>
                      <Typography
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "5%",
                          fontWeight: 500,
                        }}
                      >
                        <Box component="span">
                          MRP (
                          {listProducts.length > 1
                            ? listProducts.length + " items"
                            : "1 item"}
                          )
                        </Box>
                        <Box component="span">
                          ₹&nbsp;{finalPrice.mrp.toLocaleString()}
                        </Box>
                      </Typography>
                      <div className="Stylesheet_flexDisSpas">
                        <Box component="span">Product Discount</Box>
                        <Box component="span">
                          ₹&nbsp;{finalPrice.discount.toLocaleString()}
                        </Box>
                      </div>

                      <div
                        className="Stylesheet_flexDisSpas"
                        style={{ color: "#388E3C" }}
                      >
                        <Box component="span">Delivery Fee</Box>
                        <Box component="span">Free</Box>
                      </div>
                      {Object.keys(userCouponList).length ? (
                        <div
                          className="Stylesheet_flexDisSpas"
                          style={{ color: "#388E3C" }}
                        >
                          <Box
                            style={{ display: "flex", alignItems: "center" }}
                            component="span"
                          >
                            Coupon
                            <ClearIcon
                              onClick={handleRemoveCoupon}
                              style={{
                                color: " rgb(204, 0, 0)",
                                cursor: "pointer",
                                marginLeft: 5,
                              }}
                            />
                          </Box>

                          <Box component="span">
                            ₹&nbsp;{userCouponList.discount}
                          </Box>
                        </div>
                      ) : (
                        <></>
                      )}
                    </Box>

                    <Box style={{ borderTop: "1px solid #f0f0f0" }}>
                      <div className="Stylesheet_flexDisSpas Stylesheet_total">
                        <Box component="span">Total Amount</Box>
                        <Box component="span">
                          ₹&nbsp;
                          {(
                            finalPrice.pricepaid -
                            (userCouponList?.discount ?? 0)
                          ).toLocaleString()}
                        </Box>
                      </div>

                      <div
                        className="Stylesheet_save"
                        style={{ paddingTop: 20 }}
                      >
                        <Box component="span">
                          You will save ₹&nbsp;
                          {(
                            finalPrice.discount +
                            (userCouponList?.discount ?? 0)
                          ).toLocaleString()}
                          &nbsp;on this order
                        </Box>
                      </div>
                    </Box>
                  </Box>
                </Grid>
              )}
              {/* right box end */}

              <Grid item xs={12} style={{ paddingTop: 15 }}>
                <Box
                  className={
                    "Stylesheet_padd-15 Stylesheet_rightBox  Stylesheet_white"
                  }
                >
                  <Box>
                    <Typography className={"Stylesheet_flexDisSpas"}>
                      <span style={{ fontWeight: 600 }}>Same Day delivery</span>
                      <span>
                        <img
                          src="/pickvehicle.jpg"
                          alt="vehicle"
                          width={40}
                          height={30}
                        />
                      </span>
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      className={"Stylesheet_flexDisSpas Stylesheet_quik"}
                    >
                      <Box component="span">Quik picks under 24 hours</Box>
                      <Box component="span">
                        <KeyboardArrowRightIcon />
                      </Box>
                    </Typography>
                  </Box>
                </Box>
                <Box
                  style={{
                    color: "#878787",
                    display: "flex",
                    justifyContent: "center",
                    margin: "5%",
                    alignItem: "center",
                  }}
                >
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <SafetyCheckIcon />
                    </span>
                    <span style={{ display: "flex", alignItems: "center" }}>
                      Safe and Secure payments.Easy returns.100%
                      {/* Authentic Products. */}
                    </span>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          {showDialog()}
          {showLoginDialog()}
        </div>
      )}
      <Footer />
    </>
  );
}
