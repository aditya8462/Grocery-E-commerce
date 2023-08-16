import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Stylesheet.css";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
export default function Category(props) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
const dispatch=useDispatch()
  const navigate = useNavigate();

  const handleTargetSub = () => {
    navigate("/showallcategory");
  };

  const fetchAllCategory = async () => {
    setLoading(true);
    const result = await getData("userinterface/category");
    if (result.status) {
      setCategory(result.data.slice(0, 6));
    } else {
      toast("Error");
    }
    setLoading(false);
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);
  const matches = useMediaQuery("(max-width:420px)");
  const ListTarget = () => {
    return category.map((item, index) => {
      return (
        <div style={{width:matches?'50%':""}} key={"category_page_" + index}>
          <div
            className={"Stylesheet_cat-1 Stylesheet_cur-point"}
            onClick={() => navigate("/productbycategory/" + item.categoryid)}
          >
            <div className={"Stylesheet_cat-2"}>
              {loading ? (
                <Skeleton
                  variant="rectangular"
                  className="Stylesheet_slider-3tt"
                  height={150}
                />
              ) : (
                <img
                  src={`${ServerURL}/images/${item.picture}`}
                  style={{ width: 150, height: 150 }}
                  alt="category"
                  loading="lazy"
                />
              )}
            </div>
            <div className={"Stylesheet_cat-3"}>
              <div
                className={"Stylesheet_cat-4"}
                style={{ textAlign: "center" }}
              >
                {item.categoryname}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={"Stylesheet_tsub-1"}>
      <div className="Stylesheet_tsub-7">
        <div className={"Stylesheet_tsub-2"}>
          <div className={"Stylesheet_tsub-3"}>Featured Categories</div>
          <div
            className={"Stylesheet_tsub-4 Stylesheet_txt-1"}
            onClick={handleTargetSub}
          >
            Shop all Categories
          </div>
        </div>
        <div className={"Stylesheet_tsub-6"}>{ListTarget()}</div>
      </div>
    </div>
  );
}
