import React from "react";
import { Grid, Button, DialogContent } from "@mui/material";
import "../../Stylesheet.css";
import { useState, useEffect } from "react";
import Invoice from "./Invoice";

import Dialog from "@mui/material/Dialog";
export default function InvoiceAdress({ item }) {
  const [open, setOpen] = useState(false);
  const [maxWidth, setMaxWidth] = useState("lg");
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const showBillDialogue = () => {
    return (
      <Dialog
        open={open}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <Invoice />
       
      </Dialog>
    );
  };

  return (
    <>
     
      <div className="Stylesheet_mrg-2t"
        style={{ 
          padding: "38px 20px 0px 20px",
           background: "#f1f3f6" }} 
      >
        
        <Grid container spacing={0} className="_3E8aIl" style={{ padding: 20 }}>
          <Grid item md={6} xs={12}>
            <div>
              <div style={{ paddingBottom: 8 }}>
                <span className="_3jRtMt">Delivery Address</span>
              </div>

              <div style={{ fontWeight: 500 }}>{item.cname}</div>
              <div style={{ paddingTop: 10, fontSize: 14 }}>
                {item.cemail}&nbsp;{item.caddress}
              </div>

              <div style={{ paddingTop: 10 }}>
                <span style={{ fontWeight: 500 }}>Phone Number</span>-
                <span>{item.cmobile}</span>
              </div>
            </div>
          </Grid>

          <Grid item md={6} xs={12} >
            <div>
              <div style={{ paddingBottom: 8 }}>
                <span className="_3jRtMt">More Actions</span>
              </div>

              <div
                style={{
                  paddingTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: 14, display: "flex" }}>
                  <img src="/doInvo.png" alt="invoice" className="_3Y5Y5U" />
                  Download Invoice
                </span>
                <span className="_klmpmr">
                  <Button
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 0,
                      color: "#2874f0",
                    }}
                    variant="outlined"
                    onClick={handleClick}
                  >
                    Download
                  </Button>
                </span>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
     
      {showBillDialogue()}
     
    </>
  );
}
