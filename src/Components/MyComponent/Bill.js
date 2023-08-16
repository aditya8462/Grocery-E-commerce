import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const Bill = () => {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Box>
            <Box>
              <Typography>
                <span style={{ fontWeight: 600 }}>Specification</span>
              </Typography>
            </Box>
            <Box style={{ borderTop: "1px solid #f0f0f0" }}>
              <Typography class={"flexDisSpas total"}>
                <Box component="span">In The Box</Box>
              </Typography>
              <Typography class={"flexDisSpas total"}>
                <Box component="span">pack of </Box>
                <Box component="span">1</Box>
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
                <Box component="span">Brand</Box>
                <Box component="span">Candyman</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Model Name</Box>
                <Box component="span" class={"green"}>
                  Eclairs
                </Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Quantity</Box>
                <Box component="span">270 g</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Type</Box>
                <Box component="span">Toffee</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Maximum Shelf Life</Box>
                <Box component="span">12 Months</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Food Preference</Box>
                <Box component="span">Vegetarian</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Ingredients</Box>
                <Box component="span">NA</Box>
              </Typography>
              <Typography
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "5%",
                  fontWeight: 500,
                }}
              >
                <Box component="span">Nutrient Content</Box>
                <Box component="span">NA</Box>
              </Typography>
            </Box>

            <Box style={{ borderTop: "1px solid #f0f0f0" }}>
              <Typography class={"flexDisSpas total"}>
                <Box component="span">Total Amount</Box>
                <Box component="span">₹408</Box>
              </Typography>

              <Typography class={"save"}>
                <Box component="span">You will save ₹1,688 on this order</Box>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Bill;
