import { Grid } from "@mui/material";
import React from "react";
import Header from "./Header/Header";
import Footer from "./Header/Footer";

export default function PaymentStatic() {
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
          <p style={{ fontSize: 18, fontWeight: 500 }}>Paymnets</p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            How do I pay for a Vipin Kirana purchase?
          </p>
          <p>
            Vipin Kirana offers you multiple payment methods. Whatever your online
            mode of payment, you can rest assured that Vipin Kirana's trusted
            payment gateway partners use secure encryption technology to keep
            your transaction details confidential at all times.
          </p>
          <p>
            You may use Internet Banking, Gift Card, Cash on Delivery and Wallet
            to make your purchase.
          </p>
          <p>
            Vipin Kirana also accepts payments made using Visa, MasterCard, Maestro
            and American Express credit/debit cards in India and 21 other
            countries.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            Are there any hidden charges (Octroi or Sales Tax) when I make a
            purchase on Vipin Kirana?
          </p>
          <p>
            There are NO hidden charges when you make a purchase on Vipin Kirana.
            The prices listed for all the items are final and all-inclusive. The
            price you see on the product page is exactly what you pay.
          </p>
          <p>
            Delivery charges may be extra depending on the seller policy. Please
            check individual seller for the same. In case of seller WS Retail,
            the ₹50 delivery charge is waived off on orders worth ₹500 and over.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            What is Cash on Delivery?
          </p>
          <p>
            If you are not comfortable making an online payment on Vipin Kirana.com,
            you can opt for the Cash on Delivery (C-o-D) payment method instead.
            With C-o-D you can pay in cash at the time of actual delivery of the
            product at your doorstep, without requiring you to make any advance
            payment online.
          </p>
          <p>
            The maximum order value for a Cash on Delivery (C-o-D) payment is
            ₹50,000. It is strictly a cash-only payment method. Gift Cards or
            store credit cannot be used for C-o-D orders. Foreign currency
            cannot be used to make a C-o-D payment. Only Indian Rupees accepted.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            How do I pay using a credit/debit card?
          </p>
          <p>
            We accept payments made by credit/debit cards issued in India and 21
            other countries.{" "}
          </p>

          <p style={{ fontSize: 16, fontWeight: 500 }}>Credit cards</p>
          <p>
            We accept payments made using Visa, MasterCard and American Express
            credit cards.
          </p>

          <p>
            To pay using your credit card at checkout, you will need your card
            number, expiry date, three-digit CVV number (found on the backside
            of your card). After entering these details, you will be redirected
            to the bank's page for entering the online 3D Secure password.
          </p>

          <p style={{ fontSize: 16, fontWeight: 500 }}>Debit cards</p>
          <p>
            We accept payments made using Visa, MasterCard and Maestro debit
            cards.
          </p>

          <p>
            To pay using your debit card at checkout, you will need your card
            number, expiry date (optional for Maestro cards), three-digit CVV
            number (optional for Maestro cards). You will then be redirected to
            your bank's secure page for entering your online password (issued by
            your bank) to complete the payment.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            Is it safe to use my credit/debit card on Vipin Kirana?
          </p>
          <p>
            Your online transaction on Vipin Kirana is secure with the highest
            levels of transaction security currently available on the Internet.
            Vipin Kirana uses 256-bit encryption technology to protect your card
            information while securely transmitting it to the respective banks
            for payment processing.
          </p>
          <p>
            All credit card and debit card payments on Vipin Kirana are processed
            through secure and trusted payment gateways managed by leading
            banks. Banks now use the 3D Secure password service for online
            transactions, providing an additional layer of security through
            identity verification.
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            What steps does Vipin Kirana take to prevent card fraud?
          </p>
          <p>
            Vipin Kirana realizes the importance of a strong fraud detection and
            resolution capability. We and our online payments partners monitor
            transactions continuously for suspicious activity and flag
            potentially fraudulent transactions for manual verification by our
            team.
          </p>
          <p>
            In the rarest of rare cases, when our team is unable to rule out the
            possibility of fraud categorically, the transaction is kept on hold,
            and the customer is requested to provide identity documents. The ID
            documents help us ensure that the purchases were indeed made by a
            genuine card holder. We apologise for any inconvenience that may be
            caused to customers and request them to bear with us in the larger
            interest of ensuring a safe and secure environment for online
            transactions.{" "}
          </p>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            Can I use my bank's Internet Banking feature to make a payment?
          </p>
          <p>
            Yes. Vipin Kirana offers you the convenience of using your bank's
            Internet Banking service to make a payment towards your order. With
            this you can directly transfer funds from your bank account, while
            conducting a highly secure transaction.
          </p>
          <p>
            We accept payment through Internet Banking for the following banks:
          </p>
          <table cellPadding={10} cellSpacing={0} border={1}>
            <tr>
              <th>ABN Amro Bank</th>
              <th>Axis Bank</th>
              <th>Allahabad Bank</th>
              <th>Andhra Bank</th>
            </tr>
            <tr>
              <td>Bank of Rajasthan</td>
              <td>Bank of Baroda</td>
              <td>Bank of India</td>
              <td>Bank of Maharashtra</td>
            </tr>

            <tr>
              <td>Corporation Bank</td>
              <td>HDFC Bank</td>
              <td>ICICI Bank</td>
              <td>IDBI Bank</td>
            </tr>

            <tr>
              <td>Union Bank of India</td>
              <td>United Bank of India</td>
              <td>Punjab National Bank</td>
              <td>Yes Bank</td>
            </tr>

            <tr>
              <td>South Indian Bank</td>
              <td>Oriental Bank of Commerce</td>
              <td>Indian Bank</td>
              <td>IndusInd Bank</td>
            </tr>

            <tr>
              <td>State Bank of Mysore</td>
              <td>Karnataka Bank</td>
              <td>Syndicate Bank</td>
              <td>Kotak Mahindra Bank</td>
            </tr>
          </table>
        </Grid>

        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            Can I make a credit/debit card or Internet Banking payment on
            Vipin Kirana through my mobile?
          </p>
          <p>
            Yes, you can make credit card payments through the Vipin Kirana mobile
            site and application. Vipin Kirana uses 256-bit encryption technology to
            protect your card information while securely transmitting it to the
            secure and trusted payment gateways managed by leading banks.
          </p>
        </Grid>
        <Grid item xs={12}>
          <p style={{ fontSize: 16, fontWeight: 500 }}>
            How do I place a Cash on Delivery (C-o-D) order?
          </p>
          <p>
            All items that have the "Cash on Delivery Available" icon are valid
            for order by Cash on Delivery.
          </p>
          <p>
            Add the item(s) to your cart and proceed to checkout. When prompted
            to choose a payment option, select "Pay By Cash on Delivery". Enter
            the CAPTCHA text as shown, for validation.
          </p>

          <p>
            Once verified and confirmed, your order will be processed for
            shipment in the time specified, from the date of confirmation. You
            will be required to make a cash-only payment to our courier partner
            at the time of delivery of your order to complete the payment.
          </p>
          <p>Terms & Conditions:</p>

          <p>
            <ul>
              <li>The maximum order value for C-o-D is ₹50,000</li>
            </ul>
          </p>

          <p>
            <ul>
              <li>
                Gift Cards or Store Credit cannot be used for C-o-D orders
              </li>
            </ul>
          </p>
          <p>
            <ul>
              <li>Cash-only payment at the time of delivery.</li>
            </ul>
          </p>
        </Grid>
      </Grid>
    </div>
    <Footer/>
    </> );
}
