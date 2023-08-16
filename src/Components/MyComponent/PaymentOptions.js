import React from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import { toast } from "react-toastify";
import { postData } from "../Administrator/Services/FetchNodeServices";
export default function PaymentOptions() {
  const [buttonStatus, setButtonStatus] = useState(false);
  var products = useSelector((state) => state.product);
  var listProducts = Object.values(products);
  const listAddress = useSelector((state) => state.address);
  const userDetailList = useSelector((state) => state.userDetails);
  const userCouponList = useSelector((state) => state.coupon);
  const finalPrice = listProducts.reduce(
    (acc, item) => {
      acc.mrp += Number(item.price) * item.quantity;
      acc.discount +=
        (Number(item.price) - Number(item.offerprice)) * item.quantity;
      acc.pricepaid += Number(item.offerprice) * item.quantity;
      return acc;
    },
    { mrp: 0, discount: 0, pricepaid: 0 }
  );

  const handleClick = (id) => {
    setButtonStatus(id);
  };
  var dispatch =useDispatch()
  const handlePayButton = async () => {
    if (buttonStatus == "payonline") {
      navigate("/paymentgateway");
    } else {
      var body = {
        cmobile: listAddress.mobileno,
        cemail: userDetailList.email,
        caddress: listAddress.address,
        cname: listAddress.name,
        paymentmethod: "Cash on delivery",
        transactionid: null,
        cgst: null,
        deliverycharges: 0,
        userid: userDetailList.userid,
        mrp: finalPrice.mrp,
        discount: finalPrice.discount,
        total: finalPrice.pricepaid,
        status: "Placed",
        deliverydate: listAddress.created_at,

        productlist: listProducts.map((item) => ({
          categoryid: item.categoryid,
          productid: item.productid,
          productname: item.productname,
          price: item.price,
          offerprice: item.offerprice,
          qty: item.quantity,
          picture: item.pictures?.[0],
        })),
      };

      var response = await postData("bill/bill", body);

      if (response.status) {

        toast("order Save Sucessfully");
        navigate("/");
        dispatch({ type: "DELETE_PRODUCT" });
       
      } else {
        toast("order Not Save");
      }
      
    }
  };
  var navigate = useNavigate();
  return (
   
    <div>
      <Grid class="project__oscontainer" container>
        <Grid class="project__osbox" item xs={12}>
          <div class="project__paymentheader">
            <span class="project__paymentno4">4</span>
            <span class="project__pymntoption">Payment Options</span>
          </div>
          <p className="project__persondetail">
            <span>
              <Radio
                value="payonline"
                size="small"
                checked={"payonline" == buttonStatus}
                onClick={(event) => handleClick(event.target.value)}
              />
            </span>

            <span style={{ fontWeight: 500 }}  >Pay Online</span>

            <span class="project__caplaced-2">New</span>

            <span class="Bv11UC">
              <span class="question">?</span>
            </span>
          </p>

          <p className="project__persondetail">
            <span>
              <Radio
                value={"caseOndelivery"}
                size="small"
                checked={"caseOndelivery" == buttonStatus}
                onClick={(event) => handleClick(event.target.value)}
              />
            </span>
            <span style={{ fontWeight: 500 }} >Cash on delivery</span>
          </p>
          {/* {buttonStatus ? (
          <button
              onClick={() => handlePayButton()}
              class="project__paymentbtn"
              type="button"
            >
              PAY ₹
              {(
                finalPrice.pricepaid - (userCouponList?.discount ?? 0)
              ).toLocaleString()}
           
            </button>
             ) : (
            <>
            </>
          )} */}
 {buttonStatus ? (<>
 {Object.keys(listAddress).length == 0?(<>
        <button
        class="project__paymentbtn"
              type="button"
            >
              Add Address
              </button>
              </>):(<>
 <button
              onClick={() => handlePayButton()}
              class="project__paymentbtn"
              type="button"
            >
              PAY ₹
              {(
                finalPrice.pricepaid - (userCouponList?.discount ?? 0)
              ).toLocaleString()}
           
            </button></>) }
 </>) : (<>
 </>)}
 </Grid>
      </Grid>
    </div>
  );
}
