import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { Button, Grid, Hidden, Skeleton } from "@mui/material";
import "../../../Stylesheet.css";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
import { toast } from "react-toastify";
export default function ProductByCategory() {
  const [productByCategory, setProductByCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const fetchAllProductByCategory = async () => {
    setLoading(true);
    const result = await getData(
      "userinterface/productByCategory/" + params.categoryid
    );

    if (result.status) {
      setProductByCategory(result.data.reverse());
    } else {
      toast("Error");
    }
    setLoading(false);
  };
  const screen = () => {
    window.scroll(0, 0);
  };

  useEffect(
    function () {
      fetchAllProductByCategory();
      screen();
    },
    [params.categoryid]
  );

  const ListTarget = () => {
    return productByCategory.map((item, index) => {
      return (
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          style={{ padding: 10, cursor: "pointer" }}
          onClick={() => navigate("/productdetails/" + item.productid)}
          key={"product_by_category" + index}
        >
          <Paper
            className="Stylesheet_padding"
            style={{ border: "1px solid rgb(214 214 214)", height: "95%" }}
          >
            <div
              style={{
                background: "#fff",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {loading ? (
                <Skeleton variant="rectangular" width={300} height={300} />
              ) : (
                <img
                  src={`${ServerURL}/images/${item.picture}`}
                  alt="products"
                  className="Stylesheet_productimgmain"
                  {...(index > 2 && { loading: "lazy" })}
                />
              )}
            </div>

            <div className={"Stylesheet_cardimgtxt"}>
              <span id="productsnamecss">{item.productname}</span>
              {/* <span>
                <FavoriteBorderIcon />
              </span> */}
            </div>

            <div>
              <div>
                <div
                  style={{ fontWeight: 500, height: 45 }}
                  className={"Stylesheet_red"}
                  id="description"
                >
                  {item.description}
                  {/* $16.99 <br /> Sale */}
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ fontWeight: "bold", fontSize: 20 }}>
                    ₹{item.offerprice}
                  </div>
                  <div
                    style={{
                      paddingLeft: 10,
                      textDecoration: "line-through",
                      color: "red",
                    }}
                  >
                    ₹{item.price}
                  </div>
                </div>
                <div style={{ fontSize: 18, fontWeight: 400 }}>{item.qty}</div>
              </div>
              <Hidden smDown>
                <div>
                  <span className={"Stylesheet_green"}>Free shipping*</span>
                  <br />
                  <span className={"Stylesheet_underline"}>
                    *Exclusions Apply.
                  </span>
                </div>
                <div>
                  <span className={"Stylesheet_green"}>In stock </span>at
                  Portage
                  <br />
                  <span className={"Stylesheet_green"}>
                    Ready within 2 hours
                  </span>{" "}
                  with pickup
                </div>
              </Hidden>
            </div>
            <Button
              className="Stylesheet_trends_1tx"
              style={{
                backgroundColor: "#183871",
                textTransform: "none",
                color: "#fff",
                marginTop: 10,
                cursor: "pointer",
              }}
            >
              Add to cart
            </Button>
          </Paper>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Header />
      {productByCategory.length == 0 ? (
        <div className="dnfimage">
          <img style={{ width: "30%" }} src="/dnf.jpg" alt="dnf" />
        </div>
      ) : (
        <div className={"Stylesheet_maincontainered Stylesheet_mrg-3t"}>
          <Grid container spacing={0}>
            <Hidden mdDown smDown xsDown>
              <Grid item xs={12} md={3}>
                <div className={"Stylesheet_offerbox"}>
                  <Grid container spacing={2} className="Stylesheet_padding">
                    <Grid item xs={12} md={12}>
                      <Grid item xs={12} md={12}>
                        <div className={"Stylesheet_offerheading"}>
                          How are you shopping today?
                        </div>
                      </Grid>
                      <Paper className="Stylesheet_container  Stylesheet_padding">
                        <div>
                          <div className={"Stylesheet_sub-container"}>
                            <AddBusinessIcon className="Stylesheet_red" />{" "}
                            <div className="Stylesheet_pl-10 Stylesheet_bold">
                              {" "}
                              PickUp
                            </div>
                          </div>
                        </div>

                        <div className={"Stylesheet_secondtext"}>
                          In store pickup ready with in 2 hours
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Paper className="Stylesheet_container  Stylesheet_padding">
                        <div>
                          <div
                            className={
                              "Stylesheet_text Stylesheet_sub-container"
                            }
                          >
                            <ShoppingBagIcon className="Stylesheet_red" />{" "}
                            <div className="Stylesheet_pl-10 Stylesheet_bold">
                              {" "}
                              Same Day Delivery
                            </div>
                          </div>
                        </div>

                        <div className={"Stylesheet_secondtext"}>
                          Schedules contactless delivery as soon as today
                        </div>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Paper className="Stylesheet_container  Stylesheet_padding">
                        <div>
                          <div className={"Stylesheet_sub-container"}>
                            <LocalShippingIcon className="Stylesheet_red" />{" "}
                            <div className="Stylesheet_pl-10 Stylesheet_bold">
                              {" "}
                              Shipping
                            </div>
                          </div>
                        </div>

                        <div className={"Stylesheet_secondtext"}>
                          Free with RedCard or $35 orders
                        </div>
                      </Paper>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Hidden>

            <Grid item xs={12} md={9}>
              <div className={"Stylesheet_cardbox"}>
                {/* <div className={"Stylesheet_displayfilter"}>
                <div className={"Stylesheet_filter"}>
                  <SyncAltIcon className="Stylesheet_trend_4" />
                  <span className="Stylesheet_trend_4" style={{ fontSize: 18 }}>
                    Filter
                  </span>
                </div>
                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Category
                  </span>
                </div>
                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Type
                  </span>
                </div>
                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Brand
                  </span>
                </div>

                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Price
                  </span>
                </div>

                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Color
                  </span>
                </div>

                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Ratings
                  </span>
                </div>

                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Material
                  </span>
                </div>

                <div className={"Stylesheet_filter"}>
                  <span style={{ fontSize: 18 }} className="Stylesheet_trend_4">
                    Finish
                  </span>
                </div>
              </div> */}

                <Grid container>{ListTarget()}</Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      )}

      <Footer />
    </div>
  );
}
