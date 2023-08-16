import React from "react";
import { Button, Grid } from "@mui/material";
import "../../Stylesheet.css";
import { useSelector } from "react-redux";

export default function ConfirmEmail(props) {
  const userDetailList = useSelector((state) => state.userDetails);
  return (
    <div style={{ padding: "0px 12px 0px 4px" }}>
      <Grid className="maincontainerconfirmremail"
        container
        spacing={0}
      >
        <Grid item lg={9} xs={12} md={7} sm={6}>
          <span>Order confirmation email will be sent to</span>
          <span style={{ paddingLeft: 10 }}>
            <b>{userDetailList.email}</b>
          </span>
        </Grid>
        <Grid className="confirmbtnbox"  item lg={3} xs={12} md={5} sm={6}>
          <Button
            className="confirmEmailButton"
            style={{
              background: "#183871",
             

              borderRadius: 0,
            }}
            onClick={props.handlePayment}
            variant="contained"
          >
            CONTINUE
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
