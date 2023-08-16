import {
  Grid,
  Button,
  Divider,
  DialogContent,
  DialogActions,
  Box,
  TextField,
} from "@mui/material";
import moment from "moment/moment";
import React from "react";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import Dialog from "@mui/material/Dialog";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { getData, postData } from "../Administrator/Services/FetchNodeServices";
import { useDispatch, useSelector } from "react-redux";
import "../../Stylesheet.css";
import { toast } from "react-toastify";
export default function Coupon(props) {
  const userCouponList = useSelector((state) => state.coupon);
  const [open, setOpen] = React.useState(false);
  var myMoment = moment();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setCheckTxt(false);
    setValidCoupon({});
    setCouponCode("");
  };

  var dispatch = useDispatch();
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const finalPrice = listProducts.reduce((acc, item) => {
    acc += Number(item.offerprice) * item.quantity;
    return acc;
  }, 0);
 
  const [coupon, setCoupon] = useState([]);
  const [validCoupon, setValidCoupon] = useState({});
  const [couponCode, setCouponCode] = useState("");
  const [checkTxt, setCheckTxt] = useState(false);
  const fetchAllCoupon = async () => {
    var result = await getData("offers/fetch_all_coupons");
    setCoupon(result.data);
  };

  useEffect(function () {
    fetchAllCoupon();
  }, []);

  const fetchValidCoupon = async (code) => {
    var result = await postData("offers/validatecoupon", {
      code: code || couponCode,
      total: finalPrice,
      date: new Date(),
    });

    if (result.status) {
      setValidCoupon(result);

      toast("correct");
      setCheckTxt(false);
    } else {
      setCheckTxt(true);
      setValidCoupon(result);
      
      toast("incorrect");
    }
  };

  const handleCheck = (code) => {
    fetchValidCoupon(code);
  };

  const handleAddCouponDiscount = () => {
    if (validCoupon.status && finalPrice >= validCoupon?.data?.minimumprice) {
      dispatch({ type: "ADD_COUPON", payload: validCoupon.data });
      toast("Apply Successfully");
      props.handleCouponSection();
      setOpen(false);
      setCheckTxt(false);
    } else {
      toast("error to add");
      setCouponCode((prev) => prev);
    }
  };

  const fetchAllCouponList = () => {
    return coupon.map((item, index) => {
      return (
        <div
          style={{ width: "100%",}}
          key={"xlm_2_page" + index}
        >
          <Grid
            item
            md={12}
            style={{
              background: "#fff",
              width: "100%",
               padding: "23px 0px 20px 17px",
            }}
          >
             <Box>
              <Button
              disabled={finalPrice>=item.minimumprice?false:true}
               variant="outlined"
                onClick={() => {
                  setCouponCode(item.couponcode);
                  handleCheck(item.couponcode);
                }}
                style={{
                  borderRadius: "3px",
                  border: finalPrice>=item.minimumprice?"1px dashed #183871":"1px dashed rgba(0, 0, 0, 0.26)",
                  color:finalPrice>=item.minimumprice? "#183871":" "
                }}
              >
                {item.couponcode}
              </Button>
            </Box>
            <Box
              style={{
                fontWeight: 700,
                fontSize: 14,
                paddingTop: 12,
                color: finalPrice>=item.minimumprice?"#282c3f":"rgba(0, 0, 0, 0.26)"
              }}
            >
              Save ₹{item.discount}
            </Box>
            <Box
              style={{
                fontWeight: 700,
                fontSize: 14,
                paddingTop: 12,
                color: finalPrice>=item.minimumprice?"#282c3f":"rgba(0, 0, 0, 0.26)"
              }}
            >
              {item.description}
            </Box>
            <Box
              style={{
                fontWeight: 700,
                fontSize: 14,
                paddingTop: 12,
                color: finalPrice>=item.minimumprice?"#282c3f":"rgba(0, 0, 0, 0.26)"
              }}
            >
              Expires on: {moment(item.enddate).format("D/M/YYYY ")}
            </Box>
          </Grid>

{index==coupon.length-1 ?(<>

</>):(
<Divider/>
)
}

        </div>
      );
    });
  };

  const ShowDialog = () => {
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span style={{ margin: 4 }}>APPLY COUPON</span>

            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item md={12} xs={12} sm={12} style={{ background: "#fff" }}>
               

                <TextField
                  value={couponCode || userCouponList?.couponcode}
                  onChange={(event) => setCouponCode(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() => handleCheck()}
                          style={{
                            color: "#183871",
                          }}
                        >
                          check
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Enter coupon code"
                  fullWidth
                />

                {checkTxt ? (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 500,
                      color: "#183871",
                    }}
                  >
                    Sorry,this coupon is not valid for this user account
                  </span>
                ) : (
                  <></>
                )}
              </Grid>

              <Grid container>{fetchAllCouponList()}</Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Grid
              container
              style={{
                background: "#fff",
                display: "flex",
                justifyContent: "space-between",
               
              }}
            >
              <Grid item xs={6} style={{ padding: "0px 0px 0px 5px" }}>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 12,

                    color: "#282c3f",
                  }}
                >
                  Maximum saving:
                </div>
                <div
                  style={{
                    fontWeight: "bolder",
                    fontSize: 14,
                    color: "#282c3f",
                  }}
                >
                  ₹&nbsp;{validCoupon?.data?.discount || userCouponList.discount ||0}
                </div>
              </Grid>

              <Grid item xs={6} style={{ padding: "0px 5px 5px 0px" }}>
               {validCoupon.status==true?
               <button
               onClick={handleAddCouponDiscount}
               class="Stylesheet_coupon"
             >
               APPLY
             </button>:
             <button
             onClick={handleClose}
           
             class="Stylesheet_coupon"
           >
             APPLY
           </button>
              }
                
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid
        style={{
          fontSize: 18,
        
          fontWeight: 500,
          textTransform: "uppercase",
          marginBottom: 12,
        }}
        item
        xs={12}
      >
        Coupons
      </Grid>
      <Grid item xs={12}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <LocalOfferOutlinedIcon />
            {Object.keys(userCouponList).length ? (
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  paddingLeft: 36,
                  textTransform: "uppercase",
                }}
              >
                1 Coupon Applied
                <div
                  style={{ fontSize: 10, fontWeight: 500, color: "#388E3C" }}
                >
                  You saved additional ₹{userCouponList.discount}{" "}
                </div>
              </span>
            ) : (
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  paddingLeft: 20,
                  textTransform: "uppercase",
                }}
              >
                Apply Coupons
              </span>
            )}
          </div>
          <span>
            {Object.keys(userCouponList).length ? (
              <Button
                onClick={handleClickOpen}
                style={{
                  borderRadius: 0,
                  height: 30,
                  color: "#183871",
                  borderColor: "#183871",
                }}
                variant="outlined"
              >
                EDIT
              </Button>
            ) : (
              <Button
                onClick={handleClickOpen}
                style={{
                  borderRadius: 0,
                  height: 30,
                  color: "#183871",
                  borderColor: "#183871",
                }}
                variant="outlined"
              >
                APPLY
              </Button>
            )}
          </span>
        </div>
      </Grid>

      <div>{ShowDialog()}</div>
    </Grid>
  );
}
