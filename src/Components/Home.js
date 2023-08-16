import React from "react";
import { Grid } from "@mui/material";
import ManSlider from "./MyComponent/ManSlider";
import StaticCard from "./MyComponent/StaticCard";
import GroceryCard from "./MyComponent/Grocery/GroceryCard";
import TrendingProduct from "./MyComponent/Products/TrendingProduct";
import Category from "./MyComponent/Category/Category";
import Deals from "./MyComponent/Products/Deals";
import Header from "./MyComponent/Header/Header";
import Footer from "./MyComponent/Header/Footer";
import Leftdrawer from "./MyComponent/LeftDrawer";
export default function Home() {
  return (
    <>
      <Header />
      <Grid container style={{ marginTop: 80 }}>
        <Grid item md={12} xs={12}>
          <ManSlider />
        </Grid>

        <Grid item md={12} xs={12}>
          <Category />
        </Grid>

        <Grid item xs={12} style={{ padding: "20px 40px 20px 40px" }}>
          <TrendingProduct />
        </Grid>
        <Grid item xs={12}>
          <GroceryCard />
        </Grid>
        <Grid item xs={12} style={{ padding: "20px 40px 0px 40px" }}>
          <Deals />
        </Grid>

        <Grid item md={12} xs={12} style={{ padding: "20px 20px 20px 20px" }}>
          <StaticCard />
        </Grid>

        <Grid item md={12} xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}
