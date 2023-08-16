import React from "react";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import "../../Stylesheet.css";
export default function CurrentOrderSummary(props) {
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const dispatch = useDispatch();
  return (
    <div style={{ padding: "10px 12px 0px 5px" }}>
      <Grid container className="project__caddbox-2">
      <Grid item lg={10} md={9} sm={9} xs={12}>
            <div>
              <div className="project__dladress2">
                <span class="project__address2">3</span>
                ORDER SUMMARY
               {props.tick?
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
                : <></>}
              </div>
              <div
                className="project__caddressdetail"
                style={{ marginLeft: 40 }}
              >
                <span>
                  <span class="project__cdname">
                    {listProducts.length > 1
                      ? listProducts.length + " items"
                      : "1 item"}
                  </span>
                </span>
              </div>
            </div>

            
        
        </Grid>
        <Grid style={{textAlign:'right'}} item lg={2} md={3} sm={3} xs={12}>
         <>
          <button
              class="project__caddressbutton"
              onClick={props.handleOrderSummary}
              style={{display:'flex',justifyContent:'center',alignItems:'center'}}
           >
              Change
            </button></>
        </Grid>
      </Grid>
    </div>
  );
}
