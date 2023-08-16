import React from "react";
import { Grid } from "@mui/material";
import MyProfile from "./MyProfile";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";
import { useState } from "react";
import Address from "./Login/Address";
import MyOrder from "./MyOrder";
import Footer from "./Header/Footer";

export default function MyProfileDetails(props) {
  const [showAddress, setShowAdress] = useState(false);
  const [myprofile, setMyProfile] = useState(true);
  const [myOrder, setMyOrder] = useState(false);

  const handleAdress = () => {
    setShowAdress(true);
    setMyProfile(false);
  };
  const handleProfile = () => {
    setShowAdress(false);
    setMyProfile(true);
  };

  // const handleMyOrder = () => {
  //   setShowAdress(false);
  //   setMyProfile(false);
  //   setMyOrder(true);
  // };

  return (
    <>
      <Header />
      <Grid container   style={{marginTop:70}} >
        <Grid item md={3} 
       
        >
          <SideBar
            handleAdress={handleAdress}
            handleProfile={handleProfile}
           // handleMyOrder={handleMyOrder}
          />
        </Grid>
        <Grid item md={9}
       
         >
          {showAddress ? <Address /> : myprofile ? <MyProfile /> : 
          // <MyOrder />
          <></>
          }
        </Grid>
      </Grid>
      <Footer/>

    </>
  );
}
