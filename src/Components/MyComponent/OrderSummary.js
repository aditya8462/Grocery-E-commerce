import {
  Grid,
  Box,
  Typography,
  Button,
  ButtonGroup,
  Hidden,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import { ServerURL } from "../Administrator/Services/FetchNodeServices";

export default function OrderSummary(props) {
  var navigate = useNavigate();
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  const [open, setOpen] = useState(false);
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
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
  const userCouponList = useSelector((state) => state.coupon);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const ShowCartItems = () => {
    return listProducts.map((item, index) => {
      return (
        <Grid
          container
          spacing={2}
          style={{ display: "flex" }}
          className={"Stylesheet_borderTop Stylesheet_pl-30"}
          key={"listproduct_page" + index}
        >
          <Grid item md={2}>
            <img
              src={`${ServerURL}/images/${item.picture}`}
              width={50}
              height={50}
              alt="products"
            />
          </Grid>

          <Grid item md={10}>
            <Typography>
              {item.productname} ({item.qty})
            </Typography>

            <Typography className={"Stylesheet_lightText"} id="description-two">
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
                saved
              </Box>
            </Typography>
          </Grid>
        </Grid>
      );
    });
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
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <div class="_2dD-MY">Grocery Basket</div>
          {ShowCartItems()}
        </Dialog>
      </div>
    );
  };
  return (
    <div>
      <Grid style={{ padding: "25px 12px 0px 20px" }} container spacing={2}>
        <Grid className="project__osbox" item md={12} xs={12}>
          <div className="project__orheader">
            <span class="project__ors-3">3</span>
            <span>Order Summary</span>
          </div>

          <div className="project__ordrdetailcontainer">
            <img
              className="project__basketimg"
              src="./ordercart.png"
              alt="logo"
            />
            <div className="project__detailbasket">
              <div className="project__orderalldetail">
                <span>
                  Grocery Basket (
                  {listProducts.length > 1
                    ? listProducts.length + " items"
                    : "1 item"}
                  )
                </span>
                <Hidden smDown>
                  <span class="project__viewbasket" onClick={handleClickOpen}>
                    View Basket
                  </span>
                </Hidden>
                <div style={{ marginTop: 5 }}>
                  <Hidden smUp>
                    <span
                      class="project__viewbasket2"
                      onClick={handleClickOpen}
                    >
                      View Basket
                    </span>
                  </Hidden>
                </div>
              </div>

              <span className="project__ordersumprice">
                ₹
                {(
                  finalPrice.pricepaid - (userCouponList?.discount ?? 0)
                ).toLocaleString()}
              </span>
              <span className="project__mainpriceos">
                ₹{finalPrice.mrp.toLocaleString()}
              </span>
              <span class="project__offerpriceos">
                ₹{" "}
                {(
                  finalPrice.discount + (userCouponList?.discount ?? 0)
                ).toLocaleString()}{" "}
                saved
              </span>
              <div className="project__removebasket">
                <span
                  className="Stylesheet_cur-point"
                  onClick={() => navigate("/order")}
                >
                  Remove Basket
                </span>
              </div>
            </div>
          </div>
        </Grid>

        {/* <Grid className="project__osbox-2" item md={2} xs={12}>
          <div className="project__deliverydate">
            <div className="project__dlvrystyle">
              Same Day Delivery|
              <span className="project__freeprice">
                <span class="project__freeoff">Charges</span>
              </span>
              <span class="project__order50">Free</span>
            </div>
          </div>
        </Grid> */}
      </Grid>

      {showDialog()}
    </div>
  );
}
