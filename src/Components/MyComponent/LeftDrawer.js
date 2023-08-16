import React, { useState, useEffect } from "react";
import { Drawer, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../Administrator/Services/FetchNodeServices";
import "../../Stylesheet.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector, useDispatch } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArticleIcon from "@mui/icons-material/Article";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ForwardIcon from "@mui/icons-material/Forward";
import Divider from "@mui/material/Divider";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Login from "./Login";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
export default function Leftdrawer(props) {
  var dispatch = useDispatch();
  const userDetailList = useSelector((state) => state.userDetails);

  const [category, setCategory] = useState([]);

  const navigate = useNavigate();

  const fetchAllCategory = async () => {
    const result = await getData("userinterface/category");
    if (result.status) {
      setCategory(result.data.slice(0, 6));
    } else {
      toast("Error");
    }
  };

  useEffect(function () {
    fetchAllCategory();
  }, []);

  const handleLogOut = () => {
    dispatch({ type: "DELETE_USER" });
    dispatch({ type: "DELETE_PRODUCT"});
    dispatch({ type: "DELETE_COUPON"});
    dispatch({ type: "DELETE_ADDRESS"});
    window.location.reload();
   
  };

  const [state, setState] = React.useState({
    left: false,
  });

  React.useEffect(
    function () {
      setState({ ...state, ["left"]: props.status });
    },
    [props]
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.handleStatusDrawerClose();
    setState({ ...state, [anchor]: open });
  };
  
  
 
 
 
  const handleClickDialogue=()=>{
 
    props.handleOpenLoginDialogue()
  }
  
 
  const list = (item) => (
    <div
      style={{ padding: 10, background: "rgb(247, 247, 247)", height: "100%" }}
    >
      <Grid container>
       
        <Grid item xs={12}>
          <div onClick={toggleDrawer("left", false)}
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
              cursor:'pointer'
            }}
          >
            <span
             
             style={{cursor:'pointer'}}>
              <KeyboardArrowLeftIcon
                style={{ fontSize: 30, fontWeight: "bold" }}
              />
            </span>

            <span style={{ fontSize: 20, fontWeight: "bold",marginRight:'10%' }}>Profile </span>
            <span>
            </span>
          </div>
        </Grid>
        <Grid item xs={12} >
          <div style={{ display: "flex", justifyContent: "center",paddingTop:20 }}>
            {" "}
            <img
              style={{ width: 100, height: 100, padding: 10,border:'5px dashed blue',borderRadius:80,}}
              src="/profile-pic-male_4811a1.svg"
              alt="icon"
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: 20,
              cursor: "pointer",
              fontWeight: "bold",
              
            }}
          >
            {userDetailList.firstname} {userDetailList.lastname}
          </div>
        </Grid>

        <div style={{padding:10,}}>
          <Grid container  style={{
          background: "#fff",
          width: "100%",
          borderRadius: 20,
          padding: 10,
        }}>
          <Grid item xs={12}>
            <div
              onClick={() => navigate("/showallcategory")}
              style={{
                display: "flex",
           
                alignItems:'center',
                paddingTop:10,
                paddingBottom: 10,
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                cursor:'pointer'
              }}
            >
              <div style={{ display: "flex",alignItems:'center',
            }}>
                <span style={{ display:'flex',
                      alignItems:'center',}}>
                  <LocalMallIcon
                    style={{
                      background: "#dcdde1",
                      borderRadius: 8,
                      padding: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                     
                      
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: "15%",
                    display:'flex',
                    alignItems:'center',
                    
                  }}
                >
                  Category
                </span>
              </div>
              <div>
                <span style={{display:'flex',alignItems:'center',}}>
                  <KeyboardArrowRightIcon
                    style={{ 
                       fontSize: 26, fontWeight: "bolder" }}
                  />
                </span>
              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              onClick={() => navigate("/myprofiledetails")}
              style={{
                display: "flex",
                alignItems:'center',
                paddingBottom: 10,
                paddingTop:10,
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                cursor:'pointer'
              }}
            >
              <div style={{ display: "flex",alignItems:'center', }}>
                <span style={{ display: "flex",alignItems:'center',
            }}>
                  <PersonPinIcon
                    style={{
                      background: "#dcdde1",
                      borderRadius: 8,
                      padding: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                      
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: "18%",
                    display: "flex",alignItems:'center'
                  }}
                >
                  Profile
                </span>
              </div>

              <span style={{ display: "flex",alignItems:'center',
            }}>
                <KeyboardArrowRightIcon
                  style={{ fontSize: 25, fontWeight: "bolder" }}
                />
              </span>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div
              onClick={() => navigate("/myorder")}
              style={{
                display: "flex",
                alignItems:'center',
                paddingBottom: 10,
                paddingTop:10,
                justifyContent: "space-between",
                borderBottom: "1px solid #f0f0f0",
                cursor:'pointer'

              }}
            >
              <div style={{ display: "flex",alignItems:'center', }}>
                <span style={{ display: "flex",alignItems:'center', }}>
                  <ArticleIcon
                    style={{
                      background: "#dcdde1",
                      borderRadius: 8,
                      padding: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                </span>
                <span
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    marginLeft: "18%",
                    display: "flex",alignItems:'center',
                  }}
                >
                  Order
                </span>
              </div>

              <span style={{ display: "flex",alignItems:'center', }} >
                <KeyboardArrowRightIcon
                  style={{ fontSize: 25, fontWeight: "bolder" }}
                />
              </span>
            </div>
          </Grid>

          {Object.keys(userDetailList).length ? (
            <Grid item xs={12}>
              <div
                onClick={handleLogOut}
                style={{
                  display: "flex",
                  alignItems:'center',
                  paddingTop:10,
                  paddingBottom:10,
                  alignItems:'center',
                  cursor:'pointer'
                
                }}
              >
                <span style={{ display: "flex",alignItems:'center', }}>
                  <ForwardIcon
                    style={{
                      background: "#dcdde1",
                      borderRadius: 8,
                      padding: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                </span>
                <span
                  style={{ fontSize: 16, fontWeight: "bold", marginLeft: "5%",display: "flex",alignItems:'center' }}
                >
                  LogOut
                </span>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div
              onClick={handleClickDialogue}
                
                style={{
                  display: "flex",
                  alignItems:'center',
                  paddingTop:10,
                  paddingBottom:10,
                  alignItems:'center',
                  cursor:'pointer'
                }}
              >
                <span style={{ display: "flex",alignItems:'center', }}>
                  <AccountCircleOutlinedIcon
                    style={{
                      background: "#dcdde1",
                      borderRadius: 8,
                      padding: 5,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  />
                </span>
                <span 
                  style={{ fontSize: 16, fontWeight: "bold", marginLeft: "5%",display: "flex",alignItems:'center' }}
                >
                  Sign up/Log in
                </span>
              </div>
            </Grid>
          )}
          </Grid>
        </div>

   
      </Grid>
      
    </div>
  );

  const drawerWidth = 295;
  

  return (
    <>
      <div>
        <React.Fragment key={"left"}>
          <Drawer
            sx={{
              display: { sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            anchor={"left"}
            open={state.left}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
           
          </Drawer>
        </React.Fragment>
      </div>
    </>
  );
}
