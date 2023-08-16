import React, { useState, useEffect, createRef } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Grid, Hidden, Skeleton } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  Autorenew,
  CurrencyRupeeRounded,
  LocalOffer,
  Pin,
} from "@mui/icons-material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import Slider from "react-slick";
import "../../Stylesheet.css";
import {
  getData,
  ServerURL,
} from "../Administrator/Services/FetchNodeServices";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Header/Footer";
import Emptyproduct from "./Emptyproduct";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetails(props) {
  var item = props.item;
  const params = useParams();
  const [productView, setProductView] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [images, setImages] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedPriceData, setSelectedPriceData] = useState({});
  const [mainPrice, setMainPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingTwo, setLoadingTwo] = useState(false);

  const [coupon, setCoupon] = useState([]);
  const [pincode, setPincode] = useState("");
  const [chkPin, setChkPin] = useState(false);
  const [chkPin2, setChkPin2] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const userDetailList = useSelector((state) => state.userDetails);
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const PincodeDetails = useSelector((state) => state.pincode);
  var dispatch = useDispatch();
  var navigate = useNavigate();

  useEffect(() => {
    setPincode(PincodeDetails);
  }, [PincodeDetails]);

  const handleClick = () => {
    var data = { ...productView, ...selectedPriceData, quantity: 1 };
    if (!products[data.productid + "-" + data.priceid]) {
      dispatch({
        type: "ADD_PRODUCT",
        payload: [data.productid + "-" + data.priceid, data],
      });
      setRefresh(!refresh);
      toast("Add to cart!");
    } else {
      toast("Already exist");
    }
  };

  const fetchAllCoupon = async () => {
    var result = await getData("offers/fetch_all_coupons");
    setCoupon(result.data);
  };

  useEffect(function () {
    fetchAllCoupon();
  }, []);

  const fetchAllProductView = async () => {
    setLoadingTwo(true);
    setLoading(true);

    const result = await getData("userinterface/product/" + params.productid);
    if (result.status) {
      // alert(JSON.stringify(result.data.pricetype))
      setProductView(result.data);
      setSelectedImage(
        `${ServerURL}/images/${result.data.prices[0].pictures[0]}`
      );
      setSelectedPriceData(result.data.prices[0]);
      setImages(result.data.prices[0].pictures);
      setMainPrice(result.data.prices[0].price);
      setOfferPrice(result.data.prices[0].offerprice);
      setQuantity(result.data.prices[0].qty);
      setLoadingTwo(false);
    } else {
      setLoadingTwo(false);
    }
    setLoadingTwo(false);
    setLoading(false);
  };
  useEffect(() => {
    fetchAllProductView();
    screen();
  }, []);

  const handleLessCoupon = () => {
    setSelectedCoupon(false);
  };
  const handleMoreCoupon = () => {
    setSelectedCoupon(true);
  };

  var myslider = createRef(null);
  const handleClickLeft = () => {
    myslider.current.slickPrev();
  };
  const handleClickRight = () => {
    myslider.current.slickNext();
  };

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  var settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  var data = [];
  const arr = images.map((item) => data.push(item));
  // alert(data);

  const playSlide = () => {
    return images.map((item, index) => {
      return (
        <div
          key={"productview_play_slide" + index}
          className="project__slider-images"
          onClick={() => setSelectedImage(`${ServerURL}/images/${item}`)}
        >
          <img
            src={`${ServerURL}/images/${item}`}
            className="project__slider-image"
            alt="images"
            {...(index > 2 && { loading: "lazy" })}
          />
        </div>
      );
    });
  };
  const playImage = () => {
    return images.map((item, index) => {
      return (
        <img
          src={`${ServerURL}/images/${item}`}
          className="productimgstl"
          alt="images2"
        />
      );
    });
  };

  const handleSelectedPrice = (index) => {
    setSelectedPriceData(productView.prices[index]);
    setImages(productView.prices[index].pictures);
    setSelectedImage(
      `${ServerURL}/images/${productView.prices[index].pictures[0]}`
    );
    setMainPrice(productView.prices[index].price);
    setOfferPrice(productView.prices[index].offerprice);
    setQuantity(productView.prices[index].qty);
  };

  const screen = () => {
    window.scroll(0, 0);
  };

  var array = [
    "474001",
    "474002",
    "474003",
    "474004",
    "474005",
    "474006",
    "474007",
    "474008",
    "474009",
    "474010",
    "474011",
    "474012",
    "474013",
  ];

  const pincodematch = () => {
    const isCorrect = array.indexOf(pincode) != -1 ? true : false;
    if (isCorrect == true) {
      setChkPin(true);
      setChkPin2(false);
      dispatch({ type: "ADD_PINCODE", payload: pincode });
    } else {
      setChkPin(false);
      setChkPin2(true);
    }
  };

  const handleClickShowPincodeAlert = () => {
    toast("please check pin");
  };

  return (
    <>
      <Header />

      {Object.keys(productView).length == 0 ? (
        <center>
          {loadingTwo ? (
            <Skeleton variant="rectangular" width={"90%"} height={500} />
          ) : (
            <div style={{ width: "80%", marginTop: 70, marginBottom: 10 }}>
              <Emptyproduct />
            </div>
          )}
        </center>
      ) : (
        <Grid className="project__productdetailcontainer" container spacing={2}>
          <Grid item xs={12} md={6}>
            <div style={{ position: "sticky", top: 50, zIndex: 100 }}>
              <Grid item className="magnifyproductimage" xs={12} md={12}>
                <Hidden mdDown>
                  {loading ? (
                    <Skeleton variant="rectangular" width={300} height={300} />
                  ) : (
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "Wristwatch by Ted Baker",
                          width: 325,
                          height: 325,
                          isFluidWidth: false,
                          src: selectedImage,
                        },
                        largeImage: {
                          src: selectedImage,
                          width: 1000,
                          height: 1000,
                        },
                        enlargedImageContainerDimensions: {
                          width: "180%",
                          height: "140%",
                        },
                      }}
                    />
                  )}
                </Hidden>

                <Hidden mdUp>
                  {loading ? (
                    <Skeleton variant="rectangular" width={300} height={300} />
                  ) : (
                    <div style={{ width: "100%" }}>
                      <Slider {...settings2}>{playImage()}</Slider>
                    </div>
                  )}
                </Hidden>
              </Grid>
              <Hidden xsDown smDown mdDown>
              <Grid item xs={12} md={12}>
                <div className="Stylesheet_boxxed-1">
                  {data.length >= 4 ? (
                    <>
                      <div>
                        <KeyboardArrowLeftIcon
                          style={{ fontSize: 34 }}
                          onClick={handleClickLeft}
                        />
                      </div>
                     
                      <div style={{ width: "70%" }}>
                        <Slider ref={myslider} {...settings}>
                          {playSlide()}
                        </Slider>
                      </div>
                      <div>
                        <KeyboardArrowRightIcon
                          style={{ fontSize: 34 }}
                          onClick={handleClickRight}
                        />
                      </div>
                      </>
                  ) : (
                    <>
                      {data.map((item) => (
                        <div
                          onClick={() =>
                            setSelectedImage(`${ServerURL}/images/${item}`)
                          }
                          style={{
                            flexDirection: "row",
                            borderRadius: 5,
                            border: "1px solid rgb(220, 221, 225) ",
                            margin: 5,
                            cursor: "pointer",
                            outline: "none",
                            width: 100,
                            height: 70,
                            alignItems: "center",
                            justifyContent: "center",
                            display: "flex",
                          }}
                        >
                          <img
                            src={`${ServerURL}/images/${item}`}
                            className="project__slider-image"
                            alt="images"
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Grid>
              </Hidden>


              <Grid item xs={12} md={12} className="cartmainbtn">
                {chkPin ? (
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="btncart Stylesheet_cur-point"
                    value={0}
                    onClick={() => handleClick()}
                  >
                    <span>
                      <ShoppingCartIcon style={{ marginRight: 4 }} />
                    </span>
                    <span style={{ fontSize: 18 }}> ADD</span>
                  </button>
                ) : chkPin2 ? (
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="btncart Stylesheet_cur-point"
                    value={0}
                    onClick={() => {
                      handleClickShowPincodeAlert();
                    }}
                  >
                    Check Pin
                  </button>
                ) : PincodeDetails ? (
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="btncart Stylesheet_cur-point"
                    value={0}
                    onClick={() => {
                      handleClick();
                    }}
                  >
                    <span>
                      <ShoppingCartIcon style={{ marginRight: 4 }} />
                    </span>
                    <span style={{ fontSize: 18 }}> ADD</span>
                  </button>
                ) : Object.keys(userDetailList).length ? (
                  <button
                    className="btncart Stylesheet_cur-point"
                    value={0}
                    onClick={() => handleClickShowPincodeAlert()}
                  >
                    Check Pin
                  </button>
                ) : (
                  <button
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="btncart Stylesheet_cur-point"
                    value={0}
                    onClick={() => {
                      handleClickShowPincodeAlert();
                    }}
                  >
                    <span>
                      <ShoppingCartIcon style={{ marginRight: 4 }} />
                    </span>
                    <span style={{ fontSize: 18 }}> ADD</span>
                  </button>
                )}
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6} container>
            <Grid item xs={12} md={12}>
              <div>
                <h1 className="producttitle">
                  <span className="titlestyle">{productView.productname}</span>
                </h1>
                <div>
                  <div className="mainratingreview">
                    <div className="mainratingreview2">
                      <span className="mainrateing1">
                        <div className="ratepoint">
                          3.6
                          <img
                            className="ratestar"
                            src="/ratestar.svg"
                            alt="ratings"
                          />
                        </div>
                      </span>
                      <span className="ratenoorreviewno">
                        <span>
                          <span>173 Ratings&nbsp;</span>
                          <span>&amp;</span>
                          <span>&nbsp;19 Reviews</span>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="productsprice">
                  <span>Special price</span>
                </div>
                <div className="productsprsqty">
                  <div>
                    <div>
                      <div className="mprice">₹{offerPrice}</div>
                      <div className="sprice">₹{mainPrice}</div>
                      <div className="offprice">
                        <span>
                          ₹{parseFloat(mainPrice - offerPrice).toFixed(2)}off
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="headoffertitle">Available offers</div>
                {selectedCoupon ? (
                  <>
                    {coupon?.map((item, index) => (
                      <div
                        className="availableoffermain"
                        key={"coupon_page_product" + index}
                      >
                        <div className="avloferhead"></div>
                        <div className="avlblofferdetail">
                          <div>
                            <span className="tagofferdetail">
                              <li className="ofrcpncode">
                                <span className="sppricehl">
                                  {" "}
                                  <LocalOffer
                                    fontSize="small"
                                    style={{ color: "#26a541", marginRight: 5 }}
                                  />
                                  <span>
                                    {" "}
                                    <b>{item.couponcode}</b>&nbsp;
                                    {item.description}&nbsp;
                                    <b className="tndstyle">T&amp;C</b>
                                  </span>
                                </span>
                              </li>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    {coupon.slice(0, 3)?.map((item, index) => (
                      <div
                        className="availableoffermain"
                        key={"coupon_page2_product" + index}
                      >
                        <div className="avloferhead"></div>
                        <div className="avlblofferdetail">
                          <div>
                            <span className="tagofferdetail">
                              <li className="ofrcpncode">
                                <span className="sppricehl">
                                  {" "}
                                  <LocalOffer
                                    fontSize="small"
                                    style={{ color: "#26a541", marginRight: 5 }}
                                  />
                                  <span>
                                    {" "}
                                    <b>{item.couponcode}</b>&nbsp;
                                    {item.description}&nbsp;
                                    <b className="tndstyle">T&amp;C</b>
                                  </span>
                                </span>
                              </li>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {coupon.length > 3 ? (
                  <>
                    {selectedCoupon ? (
                      <>
                        <button
                          className="btnextraofr"
                          onClick={handleLessCoupon}
                        >
                          <div className="btnextof2">
                            <div className="btnextof3">
                              <span>View less offer</span>
                            </div>
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btnextraofr"
                          onClick={handleMoreCoupon}
                        >
                          <div className="btnextof2">
                            <div className="btnextof3">
                              <span>View more offer</span>
                            </div>
                          </div>
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <> </>
                )}

                <div className="deleverymainp">
                  <div className="deleverymainp2">
                    <div className="quantihead">
                      <div className="delivrystye">Delivery</div>
                      <TextField
                        onChange={(event) => setPincode(event.target.value)}
                        placeholder="Pincode"
                        type="number"
                        value={pincode}
                        id="input-with-icon-textfield"
                        sx={{ m: 1, width: "22ch" }}
                        inputProps={{ maxLength: 7 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOnIcon
                                className="detlloactn"
                                fontSize="small"
                              />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <span onClick={pincodematch} className="chngpncd">
                                Check
                                <button className="chngbtnp"></button>
                              </span>
                            </InputAdornment>
                          ),
                        }}
                        variant="standard"
                      />
                    </div>

                    <div className="dlvydte">
                      <div className="dlvydte1">
                        {chkPin ? (
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: "bold",
                              color: "green",
                            }}
                          >
                            This pincode is serviceable!
                          </div>
                        ) : chkPin2 ? (
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: "bold",
                              color: "rgb(204 0 0)",
                            }}
                          >
                            This pincode is not serviceable!
                          </div>
                        ) : (
                          <> </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    paddingTop: 25,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ fontSize: 16, fontWeight: "500", color: "grey" }}
                  >
                    Quantity
                  </div>
                  <div
                    style={{
                      flexDirection: "row",
                      display: "flex",
                      paddingLeft: 40,
                    }}
                  >
                    {productView?.prices?.map((item, index) => (
                      <div
                        key={"coupon_page_productview" + index}
                        className="Stylesheet_cur-point"
                        style={{
                          border:
                            selectedPrice == index
                              ? "2px solid #183871"
                              : "2px solid #e0e0e0",
                          padding: 10,
                          width: 60,
                          height: 30,
                          marginLeft: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onClick={() => {
                          setSelectedPrice(index);
                          handleSelectedPrice(index);
                        }}
                      >
                        <div
                          style={{
                            color: "#183871",
                            display: "flex",
                            justifyContent: "center",
                            fontWeight: 700,
                          }}
                        >
                          {item.qty}&nbsp;
                          {productView.pricetype}
                        </div>
                        {/* <div
                          style={{
                            fontSize: 10,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          Rs.{item.offerprice / item.qty}/
                          {productView.pricetype}
                        </div> */}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="srvceprdmain">Services</div>

                  <ul style={{ marginLeft: 70 }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <Autorenew
                          style={{ color: "#183871" }}
                          fontSize="small"
                        />
                      </span>{" "}
                      <li className="nrapllcble">No Returns Applicable</li>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <span>
                        <CurrencyRupeeRounded
                          style={{ color: "#183871" }}
                          fontSize="small"
                        />
                      </span>{" "}
                      <li className="nrapllcble">Cash on Delivery available</li>
                    </div>
                  </ul>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Grid className="project__main-spf" container spacing={0}>
                <Grid className="project__specification" item xs={12}>
                  Specifications
                </Grid>
                <Grid
                  className="project__specification"
                  style={{
                    paddingBottom: 16,
                    fontSize: 18,
                    whiteSpace: "nowrap",
                    lineHeight: 1.4,
                    fontWeight: 500,
                  }}
                  item
                  xs={12}
                >
                  In the Box
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    <tbody>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                            width: "25%",
                          }}
                        >
                          Pack of
                        </td>
                        <td
                          style={{
                            width: "75%",
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          <ul>
                            <li style={{ listStyle: "none", paddingBottom: 0 }}>
                              1
                            </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                <Grid
                  className="project__specification"
                  style={{
                    paddingBottom: 16,
                    fontSize: 18,
                    lineHeight: 1.4,
                    fontWeight: "500",
                  }}
                  item
                  xs={12}
                >
                  General
                  <table
                    style={{
                      borderCollapse: "collapse",
                      fontSize: 14,
                      fontWeight: "500",
                    }}
                    cellPadding="10"
                  >
                    <tbody>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Product Name
                        </td>
                        <td
                          style={{
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          {productView.productname}
                        </td>
                      </tr>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Quantity
                        </td>
                        <td
                          style={{
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          {quantity} {productView.pricetype}
                        </td>
                      </tr>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Type
                        </td>
                        <td
                          style={{
                            width: "75%",
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          {productView.category_name}
                        </td>
                      </tr>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Maximum Shelf Life
                        </td>
                        <td
                          style={{
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          12 Months
                        </td>
                      </tr>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Food Preference
                        </td>
                        <td
                          style={{
                            color: "#212121",
                            lineHeight: 1.4,
                            wordBreak: "break-word",
                          }}
                        >
                          Vegetarian
                        </td>
                      </tr>
                      <tr style={{ paddingBottom: 16 }}>
                        <td
                          valign="top"
                          style={{
                            color: "#878787",
                            paddingRight: 8,
                          }}
                        >
                          Description
                        </td>
                        <td
                          style={{
                            color: "#212121",
                            lineHeight: 1.4,
                          }}
                        >
                          {productView.description}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>

                <Grid className="project__dsclmr" item xs={12}>
                  Legal Disclaimer
                  <div className="project__dsclmrdtl">
                    Vipin Kirana endeavors to ensure the accuracy of the
                    information about the products. It is pertinent to note
                    that, actual product packaging and materials may contain
                    more and/or different information which may include
                    nutritional information/allergen declaration/special
                    instruction for intended use/warning/directions etc. We
                    recommend the consumers to always read the label carefully
                    before using or consuming any products. Please do not solely
                    rely on the information provided on this website. For
                    additional information, please contact the manufacturer.
                  </div>
                </Grid>
                <Grid className="project__mfg" item xs={12}>
                  Manufacturing, Packaging and Import Info
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Footer />
    </>
  );
}
