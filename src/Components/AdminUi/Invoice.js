import React,{useState,useEffect} from "react";
import { Grid } from "@mui/material";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import { useParams } from "react-router-dom";
import moment from "moment/moment";
export default function Invoice() {
    const [bill, setBill] = useState({});

  const params = useParams();

  const fetchOrderByBill = async () => {
    var result = await getData("bill/myorderbybill/" + params.billid);
    if (result.status) {
      setBill(result.data);
    }
  };

  useEffect(function () {
    fetchOrderByBill();
  }, []);
  
function DisplayAllDates(){
  var myMoment = moment()
} 

 
return (
    <Grid style={{ padding: 10 }} container spacing={2}>
      <Grid item xs={12}>
        <center style={{ fontSize: 20, fontWeight: "bold" }}>
          {" "}
          Tax Invoice
        </center>
      </Grid>
      <Grid item xs={9}>
        <div style={{ fontSize: 18, fontWeight: "bold" }}>
          {" "}
          Sold By:Vipin Kirana Store,
        </div>
        <div style={{ paddingTop: 5 }}>
          <div style={{ fontWeight: "bold", fontSize: 16 }}>
            Ship-from Address:
            <span style={{ fontWeight: 500, fontSize: 14 }}>
              Subhash Nagar A B Road Bahodapur Gwalior
            </span>
          </div>

          <div style={{ fontWeight: "bold", fontSize: 16 }}>
            Payment Mode:
            <span style={{ fontWeight: 500, fontSize: 14 }}>
              {bill?.paymentmethod}
            </span>
          </div>
        </div>
      </Grid>
      <Grid item xs={3}>
        <div
          style={{
            borderStyle: "dotted",
            textAlign: "center",
            fontSize: 18,
            fontWeight: "bold",
            padding: 5,
          }}
        >
          Invoice Number
          <span style={{ fontWeight: 400 }}> #VKS-{bill?.billid}</span>
          <div>Invoice Date:19-02-2021</div>
        </div>
      </Grid>
      <hr style={{ background: "#000", height: 1, width: "100%" }} />
      <Grid style={{ fontSize: 16, fontWeight: "bold" }} item xs={2}>
        <div>Order ID: {bill?.billid}</div>
        <div>Order Date: {moment(bill?.created_at).format("D/M/YYYY ")} </div>
      </Grid>
      <Grid item xs={5}>
        <div style={{ fontSize: 16, fontWeight: "bold" }}> Bill To:-</div>
        <div style={{ fontSize: 16, fontWeight: "bold" }}>{bill?.cname}</div>
        <div>{bill?.cname},{bill?.caddress}</div>
      </Grid>
      <Grid item xs={5}>
        <div style={{ fontSize: 16, fontWeight: "bold" }}> Ship To:-</div>
        <div style={{ fontSize: 16, fontWeight: "bold" }}>{bill?.cname}</div>
        <div>{bill?.cname},{bill?.caddress}</div>
      </Grid>
      <hr style={{ background: "#000", height: 0.5, width: "100%" }} />

      <Grid item xs={12}>
        <font size={2}>
          <table
            style={{ width: "100%", borderCollapse: "collapse" }}
            cellPadding={5}
            cellSpacing={10}
          >
            <tr style={{ borderBottom: "1px solid #000", padding: 10 }}>
              <th>Product</th>
              <th>Title</th>
              <th>qty</th>
              <th>Gross Amount₹</th>
              <th>Discount₹</th>
              {/* <th>IGST₹</th> */}
              <th>Total₹</th>
            </tr>
            {bill?.products?.map((item,index) => {
            return(
            <tr style={{ borderBottom: "1px solid #000", padding: 10 }}>

              <th>{index+1}</th>
              <th>{item.productname}</th>
              <th>{item.qty}</th>
              <th>{(item.price)*(item.qty)} </th>
              <th>{(parseInt(item.price)-parseInt(item.offerprice))*(item.qty)}</th>
              {/* <th>20</th> */}
              <th>{(item.offerprice)*(item.qty)}</th>
            </tr>)
             })
        }
            <tr>
              <th></th>
              <th>Total</th>
              <th>{bill?.productcount}</th>
              <th>₹{bill?.mrp}</th>
              <th>₹{bill?.discount}</th>
               
            <th>₹{bill?.total}</th>
            </tr>
          </table>
        </font>
      </Grid>
      <hr style={{ background: "#000", height: 0.5, width: "100%" }} />

      <Grid item xs={12}>
        <div
          style={{
            fontSize: 20,
            textAlign: "right",
            fontWeight: "600",
            padding: 10,
          }}
        >
          Grand Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <span style={{ fontWeight: "bold" }}>₹&nbsp;{bill?.total}</span>
          <div style={{ fontSize: 20, paddingTop: "5%" }}>
            Vipin kirana private limited
          </div>
          <div style={{ fontSize: 16 }}>Authorized Signatory</div>
        </div>
        <hr style={{ background: "#000", height: 0.5, width: "100%" }} />
        <button onClick={window.print}>Print this page</button>
      </Grid>
    </Grid>
  );
}