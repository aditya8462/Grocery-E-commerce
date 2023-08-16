import React from "react";
import { Grid } from "@mui/material";
import "../../Stylesheet.css";
import { ServerURL } from "../Administrator/Services/FetchNodeServices";
export default function DeliverySecond({ bill }) {
  return (
    <div style={{ background: "#f1f3f6",
     padding: "35px 20px 0px 35px"
    
  }}>
      <Grid
        className="_3E8aIl"
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          padding: 15,
        }}
        container
        spacing={2}
      >
        <Grid item md={3} xs={12} sm={2}>
          <img
            src={`${ServerURL}/images/${bill?.picture}`}
            width={"50%"}
            height={"80%"}
            alt="products"
           

          />
        </Grid>
        <Grid className=" Stylesheet_priceText" item md={3} xs={12} sm={4}>
          Grocery Order (
          {bill?.productcount > 1 ? bill?.productcount + " items" : "1 item"})
        </Grid>
        <Grid className=" Stylesheet_priceText" item md={3} xs={12} sm={2}>
          ₹ {bill?.total}
        </Grid>
        <Grid   className="project__orderdelivered" item md={3} xs={12} sm={4}>
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
    </div>
  );
}
