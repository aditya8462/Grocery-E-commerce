import React from "react";
import { Grid } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import StarsIcon from "@mui/icons-material/Stars";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpIcon from "@mui/icons-material/Help";
import "../../../Stylesheet.css";
import { useNavigate } from "react-router-dom";
export default function Footer() {
  var navigate = useNavigate();
  return (
    <>
      <Grid
        container
        item
        md={12}
        xs={12}
        className={"Stylesheet_ba-p60"}
        style={{ height: "75%" }}
      >
        <Grid item md={2} xs={6} sm={6}>
          <div>
            <div className={"Stylesheet_f12-w400"}>ABOUT</div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point"}>
              <div
                onClick={() => navigate("/contactUscard")}
                className="Stylesheet_txt-1"
              >
                Contact Us
              </div>
              <div className="Stylesheet_txt-1">About Us</div>
            </div>
          </div>
        </Grid>

        <Grid item md={2} xs={6} sm={6}>
          <div>
            <div className={"Stylesheet_f12-w400"}>HELP</div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point"}>
              <div
                onClick={() => navigate("/paymentstatic")}
                className="Stylesheet_txt-1"
              >
                Payments
              </div>
              <div
                onClick={() => navigate("/shippingCart")}
                className="Stylesheet_txt-1"
              >
                Shipping
              </div>
              <div className="Stylesheet_txt-1">Cancellation & Returns</div>
            </div>
          </div>
        </Grid>
        <Grid item md={2} xs={6} sm={6}>
          <div>
            <div className={"Stylesheet_f12-w400"}>POLICY</div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point "}>
              <div
                onClick={() => navigate("/returnpolicy")}
                className="Stylesheet_txt-1"
              >
                Return Policy
              </div>
              <div
                onClick={() => navigate("/termofuse")}
                className="Stylesheet_txt-1"
              >
                Terms of use
              </div>
              <div
                onClick={() => navigate("/securitystaticcard")}
                className="Stylesheet_txt-1"
              >
                Security
              </div>
              <div
                onClick={() => navigate("/privacystaticcard")}
                className="Stylesheet_txt-1"
              >
                Privacy
              </div>
            </div>
          </div>
        </Grid>
        <Grid item md={2} xs={6} sm={6}>
          <div>
            <div className={"Stylesheet_f12-w400"}>SOCIAL</div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point "}>
              <div className="Stylesheet_txt-1">Facebook</div>
              <div className="Stylesheet_txt-1">Twitter</div>
              <div className="Stylesheet_txt-1">YouTube</div>
            </div>
          </div>
        </Grid>

        <Grid item md={2} xs={6} sm={6} className={"Stylesheet_bor-left"}>
          <div>
            <div className={"Stylesheet_f12-w400"}>Mail Us:</div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point "}>
              <div className="Stylesheet_txt-1">
                Vipin Kirana Store,
              </div>
              <div className="Stylesheet_txt-1">13,Gulabchand Ki Bagichi,</div>
              <div className="Stylesheet_txt-1">Behind,Jhawar Estate,</div>
              <div className="Stylesheet_txt-1">Thatipur, Gwalior,</div>
              <div className="Stylesheet_txt-1">Gwalior, 474011,</div>
              <div className="Stylesheet_txt-1">Madhya Pradesh, India</div>
            </div>
          </div>
        </Grid>

        <Grid item md={2} xs={6} sm={6}>
          <div>
            <div className={"Stylesheet_f12-w400"}>
              Registered Office Address:
            </div>
            <div className={"Stylesheet_font-12 Stylesheet_cur-point "}>
              <div className="Stylesheet_txt-1">
                Vipin Kirana Store,
              </div>
              <div className="Stylesheet_txt-1">13, Gulabchand Ki Bagichi,</div>
              <div className="Stylesheet_txt-1">Behind Jhawar Estate,</div>
              <div className="Stylesheet_txt-1">Thatipur, Gwalior, 474011,</div>
              <div className="Stylesheet_txt-1">Madhya Pradesh, India</div>
              <div className="Stylesheet_txt-1">
                CIN : U51109KA2012PTC066107
              </div>
              <div className="Stylesheet_txt-1">
                <span>Telephone:</span>
                <span className={"Stylesheet_bu-cl  Stylesheet_txt-1 "}>
                  044-45614700
                </span>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>

      <Grid
        container
        item
        md={12}
        xs={12}
        className={"Stylesheet_bor-top Stylesheet_ba-p20"}
      >
        <Grid
          item
          md={2}
          xs={12}
          className={"Stylesheet_cur-point"}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span className={"Stylesheet_or-ng"}>
            <WorkIcon
              fontSize="17"
              style={{ display: "flex", alignItems: "center" }}
            />
          </span>
          <span className={"Stylesheet_ic-txt"}>Become a Seller</span>
        </Grid>

        <Grid
          item
          md={2}
          xs={12}
          className={"Stylesheet_cur-point"}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span className={"Stylesheet_or-ng"}>
            <StarsIcon
              fontSize="17"
              style={{ display: "flex", alignItems: "center" }}
            />
          </span>
          <span className={"Stylesheet_ic-txt"}>Advertise</span>
        </Grid>

        <Grid
          item
          md={2}
          xs={12}
          className={"Stylesheet_cur-point"}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span className={"Stylesheet_or-ng"}>
            <CardGiftcardIcon
              fontSize="17"
              style={{ display: "flex", alignItems: "center" }}
            />
          </span>
          <span className={"Stylesheet_ic-txt"}>GiftCards</span>
        </Grid>

        <Grid
          item
          md={1}
          xs={12}
          className={"Stylesheet_cur-point"}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span className={"Stylesheet_or-ng"}>
            <HelpIcon
              fontSize="17"
              style={{ display: "flex", alignItems: "center" }}
            />
          </span>
          <span className={"Stylesheet_ic-txt"}>Help Center</span>
        </Grid>

        <Grid
          item
          md={2}
          xs={12}
          className={"Stylesheet_cur-point"}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              fontSize: 19,
            }}
          >
            ©
          </span>
          <span className={"Stylesheet_ic-txt"}>2023 VipinKirana.in</span>
        </Grid>
        {/* <Grid item md={1} xs={12} className={'Stylesheet_cur-point'} style={{display:'flex',alignItems:'center',height:25}} >
                    <span style={{display:'flex',alignItems:'center',color:'#fff',fontSize:19}}>©</span><span className={'Stylesheet_ic-txt'}>2007-2023 Vipin Kirana.com</span>
                </Grid> */}

        <Grid
          item
          md={3}
          xs={12}
          style={{ display: "flex", alignItems: "center", height: 25 }}
        >
          <span>
            <img
              src="/payments.svg"
              width={"100%"}
              height={"80%"}
              alt="payment"
              loading="lazy"
              style={{ display: "flex", alignItems: "center" }}
            />
          </span>
        </Grid>
      </Grid>
    </>
  );
}
