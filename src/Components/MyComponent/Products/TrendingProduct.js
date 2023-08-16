import React from "react";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { Grid, Button, Paper } from "@mui/material";
import { useState, useEffect, createRef } from "react";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Slider from "react-slick";
import { toast } from "react-toastify";

export default function TrendingProduct() {
  const [trendinProduct, setTrendingProduct] = useState([]);
  const navigate = useNavigate();

  const fetchAllTrendingProducts = async () => {
    const result = await getData("userinterface/trending_products");

    if (result.status) {
      setTrendingProduct(result.data);
    } else {
      toast("Error");
    }
  };

  useEffect(function () {
    fetchAllTrendingProducts();
  }, []);

  var myslider = createRef();
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,

    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    leftArrow: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  const ListTarget = () => {
    return trendinProduct.map((item, index) => {
      return (
        <Grid
          container
          onClick={() => navigate("/productdetails/" + item.productid)}
          key={"Trending_page" + index}
        >
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            className="Stylesheet_col-3 Stylesheet_cur-point"
            style={{ padding: 10 }}
          >
            <Paper className="Stylesheet_trend_3">
              <div>
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "#fff",
                  }}
                  onClick={() => navigate("/productdetails/" + item.productid)}
                >
                  <img
                    src={`${ServerURL}/images/${item.picture}`}
                    alt="trending"
                    className="Stylesheet_trendingimg"
                    loading="lazy"
                  />
                </div>

                <div style={{ margin: "5%" }}>
                  <span className={"Stylesheet_green"} id="productsnamecss">
                    {item.productname}
                  </span>
                  <br />
                  <span
                    style={{ fontWeight: 500, height: 45 }}
                    id="description"
                  >
                    {item.description}...
                  </span>
                </div>
              </div>

              <div className="Stylesheet_padding ">
                <Button
                  fullWidth
                  className="Stylesheet_trends_1tx"
                  style={{
                    backgroundColor: "#183871",
                    textTransform: "none",
                    color: "#fff",
                  }}
                >
                  Add to cart
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      );
    });
  };

  const handleClickRight = () => {
    myslider.current.slickPrev();
  };

  return (
    <Grid
      container
      style={{
        backgroundColor: "#FBFCFC",
      }}
    >
      <Grid item md={3} xs={12} sm={12}>
        <div className="Stylesheet_trend_2">
          <div className="Stylesheet_trend_1">Now Trending</div>
        </div>
      </Grid>

      <Grid item md={9} xs={12} sm={12}>
        <div className="Stylesheet_boxxed-2t">
          <div style={{ width: "94%" }}>
            <Slider ref={myslider} {...settings}>
              {ListTarget()}
            </Slider>
          </div>
          <div>
            <KeyboardArrowRightIcon
              style={{ fontSize: 30, fontWeight: "bold" }}
              onClick={handleClickRight}
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
