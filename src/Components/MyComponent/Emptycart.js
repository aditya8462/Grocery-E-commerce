import { Button, Grid } from "@mui/material";
import React from "react";
import "../../Stylesheet.css";
import { useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
export default function Emptycart() {
    var navigate=useNavigate()
  return (
    <Grid container style={{ padding: 20, textAlign: "center",background:'#fff',
       }}>
      <Grid item xs={12}>
        <img style={{ height: 162 }} src="/emptycart.jpg" />
      </Grid>
      <Grid style={{marginTop:24}} item xs={12}>
        <div style={{fontSize:18}}>Your cart is empty!</div>
      </Grid>
      <Grid style={{marginTop:10}} item xs={12}>
        <div style={{fontSize:12}}>Add items to it now. </div>
      </Grid>
      <Grid style={{marginTop:20}} item xs={12}>
        <Button onClick={()=>navigate('/')} style={{borderRadius:2,fontSize:14,fontWeight:400,background:'#183871',boxShadow:'0 2px 4px 0 rgba(0,0,0,.2)',width:230,height:40,textTransform:'unset'}} variant="contained">Shop now</Button>
      </Grid>
    </Grid>
  );
}