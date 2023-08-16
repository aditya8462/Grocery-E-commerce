import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { createRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React,{useEffect,useState} from "react";
import "../../../Stylesheet.css";
import { useNavigate } from "react-router-dom";
import { getData,ServerURL} from "../../Administrator/Services/FetchNodeServices";



export default function GroceryCard(props) {
  const [coupon, setCoupon] = useState([]);

  var navigate = useNavigate();
  var myslider = createRef();

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3 ,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.1,
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
  const fetchAllCoupon = async () => {
    var result = await getData("offers/fetch_all_coupons");
    setCoupon(result.data);
  };

  useEffect(function () {
    fetchAllCoupon();
  }, []);

  const playSlide = () => {
    return coupon.map((item, index) => {
      return (
        <div
          className={"Stylesheet_mainContainerred"}
          key={"kmjk" + index}
        >
          <img
             src={`${ServerURL}/images/${item.picture}`}
            className={"Stylesheet_Images-10"}
            alt="offers"
            loading="lazy"
          />
        </div>
      );
    });
  };
  const handleClickLeft = () => {
    myslider.current.slickPrev();
  };
  const handleClickRight = () => {
    myslider.current.slickNext();
  };

  return (
    <div className={"Stylesheet_boxxed-1"}>
      <div>
        <KeyboardArrowLeftIcon
          style={{ fontSize: 34 ,color:'black'}}
          onClick={handleClickLeft}
        />
      </div>
      <div className="Stylesheet_slider-1t">
        <Slider ref={myslider} {...settings}>
          {playSlide()}
        </Slider>
      </div>
      <div>
        <KeyboardArrowRightIcon
          style={{ fontSize: 34,color:'black' }}
          onClick={handleClickRight}
        />
      </div>
    </div>
  );
}