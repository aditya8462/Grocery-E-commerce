import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const Specification = () => {
  return (
    <Grid className="main-spf" container spacing={2}>
      <Grid className="specification" item xs={12}>
        Specifications
      </Grid>
      <Grid className="intbox" item xs={12}>
        In the Box
        <div className="packof">
          Pack of{" "}
          <span style={{ paddingLeft: "18%", color: "#000", fontWeight: 400 }}>
            1
          </span>
        </div>
      </Grid>
      <Grid className="intbox" item xs={12}>
        General
        <Box>
          <Typography
            style={{
              display: "flex",
              justifyContent: "space-between",
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
              fontWeight: 500,
            }}
          >
            <Box component="span">Nutrient Content</Box>
            <Box component="span">NA</Box>
          </Typography>
        </Box>
      </Grid>

      <Grid className="dsclmr" item xs={12}>
        Legal Disclaimer
        <div className="dsclmrdtl">
          Flipkart endeavors to ensure the accuracy of the information about the
          products. It is pertinent to note that, actual product packaging and
          materials may contain more and/or different information which may
          include nutritional information/allergen declaration/special
          instruction for intended use/warning/directions etc. We recommend the
          consumers to always read the label carefully before using or consuming
          any products. Please do not solely rely on the information provided on
          this website. For additional information, please contact the
          manufacturer.
        </div>
      </Grid>
      <Grid className="mfg" item xs={12}>
        Manufacturing, Packaging and Import Info
      </Grid>
    </Grid>
  );
};

export default Specification;
