import { Grid } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import Footer from "./Header/Footer";

export default function SecurityStaticCard() {
  return (<>
  <Header/>
    <div
      style={{
        background: "#f1f3f6",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop:50
      }}
    >
      <Grid container style={{ background: "#fff", padding: 30, width: "70%" }}>
        <Grid item xs={12}>
          <p style={{ fontSize: 18, fontWeight: 500 }}>Safe and Secure Shopping</p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
          Is it safe to use my credit/debit card on Vipin Kirana?
          </p>
          <p>
          Your online transaction on Vipin Kirana is secure with the highest levels of transaction security currently available on the Internet. Vipin Kirana uses 256-bit encryption technology to protect your card information while securely transmitting it to the respective banks for payment processing. All credit card and debit card payments on Vipin Kirana are processed through secure and trusted payment gateways managed by leading banks. Banks now use the 3D Secure password service for online transactions, providing an additional layer of security through identity verification.
          </p>
        
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
          Does Vipin Kirana store my credit/debit card infomation?
          </p>

          <p>
          Vipin Kirana stores the first 6 and last 4 digits of your card number in a secure and encrypted manner. The first 6 digits (also known as the Bank Identification Number) are used to identify the bank name and country where your card was issued. The first 6 and last 4 digits are together used for fraud detection and prevention purposes.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 18, fontWeight: 500 }}>
          Payment Options
          </p>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
          What credit/debit cards are accepted on Vipin Kirana?
          </p>
          <p>
          We accept VISA, MasterCard, Maestro, Rupay, American Express, Diner's Club and Discover credit/debit cards.
          </p>

          <p style={{ fontSize: 16, fontWeight: 500 }}>
          Do you accept payment made by credit/debit cards issued in other countries?
          </p>
          <p>
          Yes! We accept VISA, MasterCard, Maestro, American Express credit/debit cards issued by banks in India and in the following countries: Australia, Austria, Belgium, Canada, Cyprus, Denmark, Finland, France, Germany, Ireland, Italy, Luxembourg, the Netherlands, New Zealand, Norway, Portugal, Singapore, Spain, Sweden, the UK and the US. Please note that we do not accept internationally issued credit/debit cards for eGV payments/top-ups</p>
       
        
          <p style={{ fontSize: 16, fontWeight: 500 }}>
          What other payment options are available on Vipin Kirana?
          </p>
          <p>
          Apart from Credit and Debit Cards, we accept payments by Internet Banking (covering 44 banks), Cash-on-Delivery, Equated Monthly Installments (EMI), E-Gift Vouchers, PhonePe UPI and PhonePe wallet. </p>
        
        
          <p style={{ fontSize: 16, fontWeight: 500 }}>
          Privacy Policy
          </p>
          <p>
          Vipin Kirana.com respects your privacy and is committed to protecting it. For more details, please see our Privacy Policy</p>

          <p style={{ fontSize: 16, fontWeight: 500 }}>
          Contact Us
          </p>
          <p>
          Couldn't find the information you need? Please Contact Us</p>

        </Grid>

       

       

       

       

        
      
      </Grid>
    </div>
    <Footer/>
    </>  );
}
