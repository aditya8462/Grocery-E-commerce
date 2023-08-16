import { Grid, TextField, Button, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import "../../Stylesheet.css";
import StarIcon from "@mui/icons-material/Star";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import { useNavigate } from "react-router-dom";
import {
  getData,
  postData,
  ServerURL,
} from "../Administrator/Services/FetchNodeServices";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header/Header";
import Footer from "./Header/Footer";
import moment from "moment/moment";
import InputAdornment from "@mui/material/InputAdornment";
import { SearchRounded } from "@mui/icons-material";
const MyOrder = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [searchOrder, setSearchOrder] = useState("");
  const [temP, setTemP] = useState([]);
  const matches = useMediaQuery("(max-width:800px)");

  const userDetailList = useSelector((state) => state.userDetails);
  var navigate = useNavigate();
  var dispatch = useDispatch();
  var myMoment = moment();
  const fetchAllOrder = async () => {
    var result = await getData(
      "userinterface/myorder/" + userDetailList.userid
    );
    dispatch({ type: "ADD_BILL", payload: result.data });
    setOrderDetails(result.data);
    setTemP(result.data);
  };

  function searchItem() {
    // alert(searchOrder)
    let inp = temP.filter((item) => {
      return (
        item.productcount == searchOrder ||
        item.total == searchOrder ||
        item.deliverydate == searchOrder
      );
    });
    setOrderDetails(inp);
  }
  useEffect(function () {
    fetchAllOrder();
    screen();
  }, []);
  const screen = () => {
    window.scroll(0, 0);
  };
  useEffect(() => {
    if (searchOrder.length == 0) {
      setOrderDetails(temP);
    }
  }, [searchOrder]);
  const fetchDetails = () => {
    return orderDetails.map((item, index) => {
      return (
        <div
          style={{ maxWidth: matches ? "100%" : "70%", margin: "auto" }}
          key={"myorder_page_" + index}
        >
          <Grid
            style={{ marginTop: "2%", padding: 10 }}
            className="project__ordercontainer"
            container
            spacing={0}
            onClick={() => navigate("/delivery/" + item.billid)}
          >
            <Grid item sm={3} md={3} xs={4.5}>
              <img
                className="project__orderimg"
                src={`${ServerURL}/images/${item.picture}`}
                alt="products"
                {...(index > 2 && { loading: "lazy" })}
              />
            </Grid>
            <Grid className=" Stylesheet_priceText" item sm={3} md={3} xs={4.5}>
              Grocery Order (
              {item.productcount > 1 ? item.productcount + " items" : "1 item"})
            </Grid>
            <Grid className=" Stylesheet_priceText" item sm={3} md={3} xs={3}>
              ₹{item.total}
            </Grid>
            <Grid
              item
              sm={3}
              md={3}
              xs={12}
              style={{ display: "flex", justifyContent: "end" }}
            >
              <span>
                <u
                  style={{
                    listStyle: "none",
                    textDecorationLine: "none",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <li>
                    {/* <span>
                      <CircleIcon fontSize="inherit" color="success" />
                    </span> */}
                    <span>
                      Delivered on &nbsp;
                      {moment(item.deliverydate).format("D/M/YYYY ")}
                    </span>
                  </li>
                  <li style={{ paddingTop: 5 }}>{item.status}</li>
                  <li style={{ paddingTop: 5 }}>
                    <StarIcon color="success" fontSize="small" />
                  </li>
                </u>
              </span>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  return (
    <>
      <Header />
      <Grid container spacing={2} className="Stylesheet_odr-mr">
        <Grid style={{ padding: "60px 28px 0px 45px" }} item md={12} xs={12}>
          <div style={{ maxWidth: matches ? "100%" : "70%", margin: "auto" }}>
            <TextField
              onChange={(e) => {
                setSearchOrder(e.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  searchItem();
                }
              }}
              className="project__searchTextInput"
              placeholder="Search you order here"
              InputProps={{
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchRounded
                      onClick={() => searchItem()}
                      style={{
                        cursor: " pointer",
                        color: "#fff",
                        background: "#000",
                        padding: 10,
                        fontSize: 20,
                        fontWeight: "bold",
                        borderRadius: 5,
                      }}
                      fontSize="small"
                    />
                  </InputAdornment>
                ),
              }}
              fullWidth
            />
          </div>
        </Grid>
        {!orderDetails.length ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img style={{ width: "30%" }} src="/dnf.jpg" alt="dnf" />
          </div>
        ) : (
          <Grid style={{ padding: "5px 28px 20px 45px" }} item md={12} xs={12}>
            {fetchDetails()}
          </Grid>
        )}
      </Grid>
      <Footer />
    </>
  );
};

export default MyOrder;
