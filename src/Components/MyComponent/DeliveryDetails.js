import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Divider } from "@mui/material";
import "../../Stylesheet.css";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import {getData, ServerURL } from "../Administrator/Services/FetchNodeServices";
import { useParams } from "react-router-dom";
import DeliverySecond from "./DeliverySecond";
import Header from "./Header/Header";
import Footer from "./Header/Footer";
import InvoiceAdress from "./InvoiceAdress";
export default function DeliveryDetails() {
  const steps = ["Select ", "Create ", "Create "];
  const [bill, setBill] = useState({});

  const params = useParams();
  const fetchOrderByBill = async () => {
    var result = await getData("userinterface/myorderbybill/" + params.billid);
    if (result.status) {
      setBill(result.data);
    }
  };

  useEffect(function () {
    fetchOrderByBill();
    screen();
  }, []);

  const screen = () => {
    window.scroll(0, 0);
  };

  const fetchOrder = () => {
    return bill?.products?.map((item,index) => {
      return (
        <div key={"delivery_page_3"+index}>
          <Grid container className="_3E8aIl" style={{ padding: 20 }}>
            <Grid  item md={1} xs={2} sm={2}>
              <img
                src={`${ServerURL}/images/${item.picture}`}
                alt="products"
                width={"100%"}
                height={"100%"}
                {...(index > 1 && { loading: "lazy" })}

              />
            </Grid>
            <Grid item md={7} xs={10} sm={4}>
              <div style={{ padding: "0px 0px 0px 30px" }}>
                <Typography>{item.productname}</Typography>
                <Typography className={"Stylesheet_lightText"}>
                  {item.description}
                </Typography>
                <Typography>
                  <Box component="span" className={"Stylesheet_priceText"}>
                    ₹{item.offerprice}
                  </Box>
                  <Box component="span" className={"Stylesheet_strikPrice"}>
                    <strike>₹{item.price}</strike>
                  </Box>
                  <Box component="span" className={"Stylesheet_offPrice"}>
                    Quantity:{item.qty}
                  </Box>
                </Typography>
              </div>
            </Grid>

            <Grid item md={4} xs={12} sm={6} className="_klmpmr">
              <div>
                <div style={{ display: "flex" }}>
                  <span>
                    <img src="/starrs.svg" alt="star" width={20} height={20} />
                  </span>
                  <span style={{ marginLeft: 10 }}>Rate & Review Product</span>
                </div>

                <div style={{ display: "flex",paddingTop:10 }}>
                  <span>
                    <img src="/help.svg" alt="help" width={20} height={20} />
                  </span>
                  <span style={{ marginLeft: 10 }}>Need help?</span>
                </div>
              </div>
            </Grid>
          </Grid>
          <Divider />
        </div>
      );
    });
  };
  return (
    <div className="no-printme">
      <Header />
      {<InvoiceAdress item={bill} />}
      {<DeliverySecond bill={bill} />}

      <div style={{ background: "#f1f3f6",
       padding: '20px 20px 20px 20px'}} >
        <Grid container className="_3E8aIl" style={{ padding: 20 }}>
          <Grid item md={1} xs={2} sm={1}>
            <img
              src={`${ServerURL}/images/${bill.picture}`}
              alt="items"
              width={"100%"}
              height={"100%"}
            />
          </Grid>

          <Grid item md={2} xs={10} sm={3}>
            <div style={{
               padding: "0px 0px 0px 30px"
                }}>
              <Typography>
                Shipment 1
                <Box component="span">
                  (
                  {bill.productcount > 1
                    ? bill.productcount + " items"
                    : "1 item"}
                  )
                </Box>
              </Typography>
              <Typography className={"Stylesheet_lightText"}>
                Black, Pack of 1
              </Typography>
              <Typography>
                <Box component="span" className={"Stylesheet_priceText"}>
                  ₹{bill?.total?.toLocaleString()}
                </Box>
              </Typography>
            </div>
          </Grid>
          <Grid  item md={5} xs={12} sm={4} className="_klmpmr">
            <Stepper activeStep={1} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Grid>
          <Grid item md={4} xs={12} sm={4} className="_klmpmr">
            <div>
              <div style={{ display: "flex" }}>
                <span>
                  <img src="/starrs.svg" alt="star" width={20} height={20} />
                </span>
                <span style={{ marginLeft: 10 }}>Rate & Review Product</span>
              </div>

              <div style={{ display: "flex",paddingTop:10 }}>
                <span>
                  <img src="/help.svg" alt="help" width={20} height={20} />
                </span>
                <span style={{ marginLeft: 10 }}>Need help?</span>
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider />
        {fetchOrder()}
      </div>
     
      <Footer />
    
    </div>
  );
}
