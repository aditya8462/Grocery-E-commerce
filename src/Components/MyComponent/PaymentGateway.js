import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postData } from "../Administrator/Services/FetchNodeServices";
import { css } from "@emotion/react";
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: 32,
  },
  margin: {
    marginRight: "80%",
    paddingLeft: "",
  },
  button: {
    margin: theme.spacing.unit,
  },

  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const PaymentGateway = (props) => {
  const listAddress = useSelector((state) => state.address);
  const userDetailList = useSelector((state) => state.userDetails);

  var products = useSelector((state) => state.product);
  const userCouponList = useSelector((state) => state.coupon);

  var listProducts = Object.values(products);
  var dispatch =useDispatch()
  var navigate=useNavigate()
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

  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: (finalPrice.pricepaid - (userCouponList?.discount ?? 0)) * 100, //  = INR 1
    name: "Kirana",
   
    image: "/Grocery.jpg",
    handler: async function (response) {
      
   
    SaveOrder(response.razorpay_payment_id);
    Swal.fire({
      icon: 'success',
      title: response.razorpay_payment_id,
       text: 'Booking Confirmed',
       })
      dispatch({ type: "DELETE_PRODUCT" });
 
    window.location.href = `/`;
    
    },
    prefill: {
      name: " Aditya",
      contact: "7805058631",
      email: "ak@gmail.com",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const gotoRazorpay = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: "bold",
            color: "GrayText",
            padding: 20,
          }}
        >
          Redirecting to Razorpay pls wait........
        </div>

        <div className="sweet-loading">{openPayModal()}</div>
      </div>
    );
  };

  const openPayModal = async () => {
    var rzp1 = new window.Razorpay(options);
    await rzp1.open();
  };

  const SaveOrder = async (tid) => {
    var body = {
      cmobile: listAddress.mobileno,
      cemail: userDetailList.email,
      caddress: listAddress.address,
      cname: listAddress.name,
      paymentmethod: "Online Paid",
      transactionid: tid,
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
    } else {
      toast("order Not Save");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const { classes } = props;

  return <>{gotoRazorpay()}</>;
};

export default PaymentGateway;
