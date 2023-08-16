import { useEffect, useState } from "react";
import { React } from "react";
import {
  getData,
  ServerURL,
} from "../../Administrator/Services/FetchNodeServices";
import { Skeleton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../../Stylesheet.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import Footer from "../Header/Footer";
export default function ShowAllCategory(props) {
  const notify = () => toast("Ufff some thing went to wrong!");
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  const fetchAllCategory = async () => {
    setLoading(true);
    const result = await getData("userinterface/category");
    if (result.status) {
      setCategory(result.data);
    } else {
      {
        notify();
      }
    }
    setLoading(false);
  };
  useEffect(function () {
    fetchAllCategory();
    screen();
  }, []);

  const screen = () => {
    window.scroll(0, 0);
  };
  const matches = useMediaQuery("(max-width:420px)");
  const ListTarget = () => {
    return category.map((item, index) => {
      return (
        <div style={{width:matches?'50%':""}}  key={"category_Showall_page_" + index}>
          <div
            className={"Stylesheet_cat-1 Stylesheet_cur-point"}
            onClick={() => navigate("/productbycategory/" + item.categoryid)}
          >
            <div className={"Stylesheet_cat-2"}>
              {loading ? (
                <Skeleton variant="rectangular" width={150} height={150} />
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

  const handleSubTarget = () => {
    navigate("/home");
  };

  return (
    <>
      <Header />

      <div className={"Stylesheet_tsub-1 Stylesheet_mrg-3t"}>
        <div style={{ margin: "2%" }}>
          <div className={"Stylesheet_tsub-2"}>
            <div className={"Stylesheet_tsub-3"}>Shop All Categories</div>
            <div className={"Stylesheet_tsub-4 "}></div>
          </div>

          <div className={"Stylesheet_tsub-6"}>{ListTarget()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
