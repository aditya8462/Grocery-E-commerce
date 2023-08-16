import { Grid, Hidden } from "@mui/material";
import React from "react";

export default function StaticCard() {
  return (
    <Grid style={{ textAlign: "center" }} container spacing={0}>
      <Grid style={{ marginBottom: 10 }} item lg={12} sm={12} md={12} xs={12}>
        <Hidden xsDown smDown>
          <div style={{ fontSize: 35, fontWeight: 500 }}>
            Order today, get it today
          </div>
        </Hidden>
        <Hidden lgUp smUp mdUp >
          <div style={{ fontSize: 25, fontWeight: 500 }}>
            Order today, get it today
          </div>
        </Hidden>
      </Grid>
      <Grid item lg={6} sm={12} md={6} xs={12}>
        <img style={{ width: "95%" }} src="/staticimg1.jpg" />
      </Grid>
      <Grid item lg={6} sm={12} md={6} xs={12}>
        <img style={{ width: "95%" }} src="/staticimg2.jpg" />
      </Grid>
    </Grid>
  );
}
