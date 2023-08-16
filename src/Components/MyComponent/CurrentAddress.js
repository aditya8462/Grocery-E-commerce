import React from "react";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../../Stylesheet.css";
export default function CurrentAddress(props) {
  const listAddress = useSelector((state) => state.address);

  return (
    <div style={{ padding: "10px 12px 0px 4px" }}>
      <Grid container className="project__caddbox-2">
        <Grid item lg={10} md={9} sm={9} xs={12}>
            <div>
              <div className="project__dladress2">
                <span class="project__address2">2</span>
                Delivery Address
                <svg
                  height="10"
                  width="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="project__righticon"
                >
                  <path
                    d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"
                    stroke="#2974f0"
                  ></path>
                </svg>
              </div>
              <div
                className="project__caddressdetail"
                style={{ marginLeft: 40 }}
              >
                <span>
                  <span class="project__cdname">{listAddress.name}, </span>
                  <span>{listAddress.address}</span>
                  <span class="project__cdpincode">-{listAddress.pincode}</span>
                </span>
              </div>
            </div>

           
         
        </Grid>
        <Grid style={{textAlign:'right'}} item lg={2} md={3} sm={3} xs={12}>
<>
            <button
              class="project__caddressbutton"
              onClick={props.handleConfirmAddress}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
            >
              Change
            </button></>
        </Grid>
      </Grid>
    </div>
  );
}
