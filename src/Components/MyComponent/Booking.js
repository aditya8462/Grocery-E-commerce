import { Grid, Box, Typography } from "@mui/material";
import React ,{useEffect}from "react";
import ConfirmAddress from "./ConfirmAddress";
import ClearIcon from "@mui/icons-material/Clear";

import ConfirmEmail from "./ConfirmEmail";
import CurrentAddress from "./CurrentAddress";
import CurrentLogin from "./CurrentLogin";
import { useState } from "react";
import OrderSummary from "./OrderSummary";
import CurrentOrderSummary from "./CurrentOrderSummary";
import PaymentOptions from "./PaymentOptions";
import CurrentPaymentDetails from "./CurrentPaymentDetails";
import Header from "./Header/Header";
import Footer from "./Header/Footer";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";
import CouponComponent from "./CouponComponent";
import { useDispatch } from "react-redux";
const Booking = (props) => {
  var dispatch = useDispatch();
  const [statusCoupon, setStatusCoupon] = useState(false);


  const [showCurrentAddress, setShowCurrentAddress] = useState(true);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const[tick,setTick]=useState(false)

  const handleConfirmAddress = () => {
    setTick(false);
    setShowCurrentAddress(true);
    setShowOrderSummary(false);
    setShowPayment(false);
  };

  const handleOrderSummary = () => {
    setShowCurrentAddress(false);
    setShowOrderSummary(true);
    setShowPayment(false);
  };

  const handlePayment = () => {
   setTick(true);
    setShowCurrentAddress(false);
    setShowOrderSummary(false);
    setShowPayment(true);
  };
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const userCouponList = useSelector((state) => state.coupon);

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
  const handleCouponSection = () => {
    setStatusCoupon(true);
  };
  const handleRemoveCoupon = () => {
    dispatch({ type: "DELETE_COUPON" });
  };

  useEffect(function () {
   
    screen()
  }, []);
  
  const screen = () => {
    window.scroll(0, 0);
  };
  return (
    <>
      <Header />
      <Grid
        container
        className="Stylesheet_mrg-2t  project__caddcontainer"
        style={{ background: "#f1f3f6" }}
      >
        <Grid item md={8} xs={12}>
          <Grid item xs={12}>
            <CurrentLogin />
          </Grid>
          <Grid item xs={12}>
            {showCurrentAddress ? (
              <ConfirmAddress handleOrderSummary={handleOrderSummary} />
            ) : (
              <CurrentAddress handleConfirmAddress={handleConfirmAddress} />
            )}
          </Grid>
          <Grid item xs={12}>
            {showOrderSummary ? (
              <>
                <OrderSummary />
                <ConfirmEmail handlePayment={handlePayment} />
              </>
            ) : (
              <CurrentOrderSummary tick={tick} handleOrderSummary={handleOrderSummary} />
            )}
          </Grid>
          <Grid item xs={12}>
            {showPayment ? <PaymentOptions /> : <CurrentPaymentDetails />}
          </Grid>
        </Grid>

        <Grid item md={4} xs={12} style={{ padding: "10px 12px 0px 5px" }}>
          <Grid className="Stylesheet_padd-15 Stylesheet_white">
            <CouponComponent handleCouponSection={handleCouponSection} />
          </Grid>

          <Grid className="Stylesheet_white">
            <Box className={"Stylesheet_padd-15  Stylesheet_rightBox"}>
         
              <Box style={{paddingBottom:15}}>
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
                  <Box component="span">₹&nbsp;{finalPrice.mrp.toLocaleString()}</Box>
                </Typography>
                <Typography class={"Stylesheet_flexDisSpas"}>
                  <Box component="span">Product Discount</Box>
                  <Box component="span" class={"Stylesheet_green"}>
                    ₹&nbsp;{finalPrice.discount.toLocaleString()}
                  </Box>
                </Typography>

                <Typography
                  class={"Stylesheet_flexDisSpas"}
                  style={{ color: "#388E3C" }}
                >
                  <Box component="span">Delivery Fee</Box>
                  <Box component="span">Free</Box>
                </Typography>
                {Object.keys(userCouponList).length ? (
                  <Typography
                    class={"Stylesheet_flexDisSpas"}
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

                    <Box component="span">₹&nbsp;{userCouponList.discount}</Box>
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>

              <Box style={{ borderTop: "1px solid #f0f0f0" }}>
                <Typography class={"Stylesheet_flexDisSpas Stylesheet_total"}>
                  <Box component="span">Total Amount</Box>
                  <Box component="span">
                    ₹&nbsp;
                    {(
                      finalPrice.pricepaid - (userCouponList?.discount ?? 0)
                    ).toLocaleString()}
                  </Box>
                </Typography>

                <Typography class={"Stylesheet_save"} style={{paddingTop:20}}>
                  <Box component="span">
                    You will save ₹&nbsp;
                    {(
                      finalPrice.discount + (userCouponList?.discount ?? 0)
                    ).toLocaleString()}&nbsp;
                    on this order
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* right box end */}

          <Grid style={{marginTop:10}}>
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
                <Typography style={{display:'flex',alignItems:'center'}}>
                  <span  style={{ display:'flex',alignItems:'center'}}>
                    <SafetyCheckIcon  />
                  </span>
                  <span style={{ display:'flex',alignItems:'center'}}>
                    Safe and Secure payments.Easy returns.100% 
                    {/* Authentic Products. */}
                   </span>
                 
                </Typography>
                
              </Box>
          </Grid>

          {/* right secong Box  */}
        </Grid>
      </Grid>

      <Footer />
    </>
  );
};

export default Booking;
