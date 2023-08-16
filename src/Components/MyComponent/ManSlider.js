import { Hidden, Skeleton } from "@mui/material";
import { useState, useEffect, createRef } from "react";
import {
  getData,
  ServerURL,
} from "../Administrator/Services/FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import React from "react";
import "../../Stylesheet.css";
import { useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export default function ManSlider(props) {
  const navigate = useNavigate();
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  var myslider = createRef();

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div>
      <KeyboardArrowRightIcon
        className={className}
        style={{ ...style, display: "block",color:'black',fontSize: 34}}
        onClick={onClick}
      />
    </div>
     );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div>
      <KeyboardArrowLeftIcon
        className={className}
        style={{ ...style, display: "block",color:'black',fontSize: 34 }}
        onClick={onClick}
      />
    </div>
    );
  }
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    arrows: true,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  const fetchAllBanner = async () => {
    setLoading(true);
    const result = await getData("userinterface/banner");
    if (result.status) {
      setBanner(result.data);
    } else {
    }
   setLoading(false);
  };

  useEffect(function () {
    fetchAllBanner();
  }, []);
  const playSlide = () => {
    return banner.map((item, index) => {
      return (
        <div
          key={"ManSlider_page" + index}
          className="Stylesheet_mainContainerred"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (item.categoryid) {
              navigate("/productbycategory/" + item.categoryid);
            } else if (item.productid) {
              navigate("/productdetails/" + item.productid);
            }
          }}
        >
          <img
            src={`${ServerURL}/images/${item.picture}`}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            alt="banner"
          />
        </div>
      );
    });
  };

  return (
    <div className="Stylesheet_boxxed-1">
      <div className="Stylesheet_slider-3tt">
        {loading ? (<>
          <Hidden lgDown>
  <Skeleton variant="rectangular" width="100%" height={480} />
          </Hidden>
                 
          <Hidden lgUp smDown>
                 <Skeleton variant="rectangular" width="100%" height={200} />
                          </Hidden>
                
                
                 <Hidden smUp >
                 <Skeleton variant="rectangular" width="100%" height={150} />
                          </Hidden>
       
                          </> ) : (
        
        
        <Slider ref={myslider} {...settings}>
            {playSlide()}
          </Slider>
        )}
      </div>
    </div>
  );
}
