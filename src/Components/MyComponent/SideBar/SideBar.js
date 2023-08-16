import { Grid, useMediaQuery } from "@mui/material";
import React, { useLayoutEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../../Stylesheet.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function SideBar(props) {
  var dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  var navigate = useNavigate();
  const userDetailList = useSelector((state) => state.userDetails);
  const matches = useMediaQuery("(max-width:800px)");
  const handleShowAdress = () => {
    const eles = document.getElementById("myprr");
    if (matches) {
      if (eles) {
        eles.scrollIntoView({ behavior: "smooth" });
      }
    }
    props.handleAdress();
  };

  const handleShowProfile = () => {
    const ele = document.getElementById("myprr");
    if (matches) {
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth" });
      }
    }
    props.handleProfile();
  };
  const handleShowMyOrder = () => {
    navigate("/myorder");
  };
  const handleLogOut = () => {
    dispatch({ type: "DELETE_USER" });
    dispatch({ type: "DELETE_PRODUCT" });
    dispatch({ type: "DELETE_COUPON" });
    dispatch({ type: "DELETE_ADDRESS" });
    window.location.reload();
  };

  return (
    <div className="Stylesheet_padd-12" style={{ position: "sticky", top: 10 }}>
      <Grid container className={"Stylesheet_side-b2"}>
        <Grid item md={3} xs={2} sm={2}>
          <img
            src="/profile-pic-male_4811a1.svg"
            style={{ width: 50, height: 50 }}
            alrt="icon"
          />
        </Grid>

        <Grid item md={9} xs={4} sm={2}>
          <div style={{ fontSize: 12, paddingLeft: 5 }}>Hello,</div>
          <div style={{ padding: 3, fontSize: 16, fontWeight: 500 }}>
            {userDetailList.firstname} {userDetailList.lastname}
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        className={"Stylesheet_side-b2"}
        style={{ marginTop: "2%", position: "sticky", top: 80 }}
      >
        <Grid item md={12} xs={12} sm={12}>
          <div
            onClick={handleShowMyOrder}
            style={{ display: "flex", alignItems: "center", margin: "2%" }}
          >
            <span>
              <img
                src="/down-load.svg"
                className={"Stylesheet_side-b8"}
                alt="logo"
              />
            </span>

            <span className={"Stylesheet_side-b4"}>MY ORDERS</span>

            <span className={"Stylesheet_side-b7"}>
              <KeyboardArrowRightIcon />
            </span>
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          md={12}
          sm={12}
          style={{ borderTop: "1px solid #f0f0f0", padding: 5 }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <img
                src="/down-load-4.svg"
                alt="logo"
                className={"Stylesheet_side-b8"}
              />
            </span>

            <span className={"Stylesheet_side-b4"}>ACCOUNT SETTING</span>
          </div>
          <div>
            <div className={"Stylesheet_side-b5"} onClick={handleShowProfile}>
              Profile Information
            </div>
            <div
              onClick={handleShowAdress}
              className={"Stylesheet_side-b1  Stylesheet_side-b6"}
            >
              Manage Address
            </div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              PAN Card Information
            </div>
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12} className={"Stylesheet_side-b3"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <img
                src="/down-load-2.svg"
                alt="logo"
                className={"Stylesheet_side-b8"}
              />
            </span>
            <span className={"Stylesheet_side-b4"}>PAYMENTS</span>
          </div>
          <div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              Gift Card
            </div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              Saved UPI
            </div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              Saved Cards
            </div>
          </div>
        </Grid>

        <Grid item md={12} xs={12} sm={12} className={"Stylesheet_side-b3"}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <img
                src="/down-load-3.svg"
                alt="logo"
                className={"Stylesheet_side-b8"}
              />
            </span>

            <span className={"Stylesheet_side-b4"}>MY STUFF</span>
          </div>
          <div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              My Coupons
            </div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              My Reviews & Ratings
            </div>
            <div className={"Stylesheet_side-b1 Stylesheet_side-b6"}>
              All Notifications
            </div>
          </div>
        </Grid>

        <Grid
          id="myprr"
          item
          md={12}
          xs={12}
          sm={12}
          className={"Stylesheet_side-b3"}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>
              <svg
                width="24"
                height="24"
                className={"Stylesheet_side-b8"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2874F0"
                  stroke-width="0.3"
                  stroke="#2874F0"
                  d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                ></path>
              </svg>
            </span>

            <span
              onClick={handleLogOut}
              className={"Stylesheet_side-b1 Stylesheet_side-b4"}
            >
              Log Out
            </span>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
