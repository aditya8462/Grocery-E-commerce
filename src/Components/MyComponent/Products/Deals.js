import React from "react";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { Grid, Hidden, Button, Paper } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect, createRef } from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import Slider from "react-slick";
import { toast } from "react-toastify";

export default function Deals() {
  const [deal, setDeal] = useState([]);
  const navigate = useNavigate();

  const fetchAllDeals = async () => {
    const result = await getData("userinterface/deals_and_trending_products");

    if (result.status) {
      setDeal(result.data);
    } else {
      toast("Error");
    }
  };

  useEffect(function () {
    fetchAllDeals();
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
    return deal.map((item, index) => {
      return (
        <Grid
          container
          onClick={() => navigate("/productdetails/" + item.productid)}
          key={"Deals_page" + index}
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
                >
                  <img
                    src={`${ServerURL}/images/${item.picture}`}
                    className="Stylesheet_trendingimg"
                    alt="deal"
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

              <div className="Stylesheet_padding">
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

  const handleClickLeft = () => {
    myslider.current.slickNext();
  };

  return (
    <Grid
      container
      style={{
       
        backgroundColor:'#FBFCFC'
      }}
    >
      <Hidden mdDown>
        <Grid item md={9} xs={12} sm={12}>
          <div
            className="Stylesheet_boxxed-2t"
            style={{ justifyContent: "center" }}
          >
            <div>
              <KeyboardArrowLeftIcon
                style={{ fontSize: 30, fontWeight: "bold" }}
                onClick={handleClickLeft}
              />
            </div>
            <div className="Stylesheet_trending-deal">
              {/* <div style={{ width: "100%" }}> */}
              <Slider ref={myslider} {...settings}>
                {ListTarget()}
              </Slider>
              {/* </div> */}
            </div>
          </div>
        </Grid>
        <Grid item md={3} xs={12} sm={12}>
          <div
            style={{ paddingRight: 25, textAlign: "center" }}
            className="Stylesheet_trend_2"
          >
            <div className="Stylesheet_trend_1">Trending Deals</div>
          </div>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid item md={3} xs={12} sm={12}>
          <div className="Stylesheet_trend_2">
            <div className="Stylesheet_trend_1">Trending Deals</div>
          </div>
        </Grid>
        <Grid item md={9} xs={12} sm={12}>
          <div className="Stylesheet_boxxed-2t">
            <div>
              <KeyboardArrowLeftIcon
                style={{ fontSize: 30, fontWeight: "bold" }}
                onClick={handleClickLeft}
              />
            </div>
            <div className="Stylesheet_trending-deal">
              <Slider ref={myslider} {...settings}>
                {ListTarget()}
              </Slider>
            </div>
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
}
