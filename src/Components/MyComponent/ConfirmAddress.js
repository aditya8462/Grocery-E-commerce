import { Grid, TextField, Button,DialogContent, Skeleton,Typography,Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import Radio from "@mui/material/Radio";
import Dialog from "@mui/material/Dialog";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { getData, putData } from "../Administrator/Services/FetchNodeServices";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Address from "./Login/Address";
const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];
export default function ConfirmAddress(props) {
  const [addressData, setAddressData] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
const[refresh,setRefresh]=useState(false)
  const [open, setOpen] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [locality, setLocality] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState("");
  const [address, setAddress] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error2, setError2] = useState({});
  const currentAddress = useSelector((state) => state.address);
  const userDetailList = useSelector((state) => state.userDetails);
  const listAddress = useSelector((state) => state.address);

  var dispatch = useDispatch();
  var navigate = useNavigate();
  const fetchAllAddress = async () => {
    setLoading(true);
    var result = await getData("address/" + userDetailList.userid);
    if (result.status) {
      setAddressData(result.data);
      setButtonStatus(
        currentAddress?.addressid || result?.data?.[0]?.addressid
      );
    }
    setLoading(false);
  };
  
  useEffect(function () {
    fetchAllAddress();
  }, []);

  const handleOpenOrderSummary = (item) => {
    dispatch({ type: "ADD_ADDRESS", payload: item });
    props.handleOrderSummary();
  };

  const handleClick = (id) => {
    setButtonStatus(id);
  };

  const handleClose = () => {
    setOpen(false);
    handleError2("name", null);
    handleError2("mobile", null);
    handleError2("pincode", null);
    handleError2("locality", null);
    handleError2("address", null);
    handleError2("city", null);
    handleError2("state", null);
    handleError2("alternatePhone", null);
    handleError2("addressType", null);
  };
  const clearValues = () => {
    setAddressId("");
    setName("");
    setMobile("");
    setPincode("");
    setCity("");
    setState("");
    setLocality("");
    setAddress("");
    setLandmark("");
    setAlternatePhone("");
    setAddressType("");
  };
 
  const RegexLetter = /^[a-zA-Z\s]*$/;
  const EditDialog = () => {
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon onClick={clearValues} />
          </IconButton>

          <Grid
            container
            style={{ padding: 20, background: "#f5faff" }}
            spacing={2}
          >
            <Grid item md={12} xs={12}>
              <div className={"Stylesheet_addr-2"}>ADD A NEW ADDRESS</div>
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Name"
                value={name}
                error={!error2.name ? false : true}
                helperText={error2.name}
                onFocus={() => handleError2("name", null)}
                onChange={(event) => setName(event.target.value.trimStart())}
                required
                fullWidth
                onKeyDown={(event) => {
                  if (!RegexLetter.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="10-digit
                mobile number"
                value={mobile}
                error={!error2.mobile ? false : true}
                helperText={error2.mobile}
                onFocus={() => handleError2("mobile", null)}
                onChange={(event) => setMobile(event.target.value.trim())}
                required
                type="number"
                fullWidth
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Pincode"
                value={pincode}
                error={!error2.pincode ? false : true}
                helperText={error2.pincode}
                onFocus={() => handleError2("pincode", null)}
                onChange={(event) => setPincode(event.target.value.trim())}
                required
                fullWidth
                type="number"
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Locality"
                error={!error2.locality ? false : true}
                helperText={error2.locality}
                onFocus={() => handleError2("locality", null)}
                value={locality}
                onChange={(event) =>
                  setLocality(event.target.value.trimStart())
                }
                required
                fullWidth
              />
            </Grid>

            <Grid item md={12} xs={12} sm={12}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-static"
                label="Address (Area and Street)"
                value={address}
                error={!error2.address ? false : true}
                helperText={error2.address}
                onFocus={() => handleError2("address", null)}
                onChange={(event) => setAddress(event.target.value.trimStart())}
                required
                multiline
                rows={4}
                fullWidth
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="City/District/Town"
                value={city}
                error={!error2.city ? false : true}
                helperText={error2.city}
                onFocus={() => handleError2("city", null)}
                onChange={(event) => setCity(event.target.value.trimStart())}
                required
                onKeyDown={(event) => {
                  if (!RegexLetter.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <TextField
                id="outlined-select-currency"
                select
                value={state}
                label="State"
                error={!error2.state ? false : true}
                helperText={error2.state}
                onFocus={() => handleError2("state", null)}
                onChange={(event) => setState(event.target.value.trimStart())}
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {states.map((item, index) => (
                  <MenuItem value={item} key={"state_page_3t" + index}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Landmark (Optional)"
                value={landmark}
                onChange={(event) =>
                  setLandmark(event.target.value.trimStart())
                }
                multiline
                maxRows={4}
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Alternate Phone(Optional)"
                error={!error2.alternatePhone ? false : true}
                helperText={error2.alternatePhone}
                onFocus={() => handleError2("alternatePhone", null)}
                value={alternatePhone}
                onChange={(event) =>
                  setAlternatePhone(event.target.value.trim())
                }
                fullWidth
                type="number"
              />
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  addresstype
                </FormLabel>
                <RadioGroup
                  error={!error2.addressType ? false : true}
                  helperText={error2.addressType}
                  onFocus={() => handleError2("addressType", null)}
                  value={addressType}
                  onChange={(event) => setAddressType(event.target.value)}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="home"
                    control={<Radio />}
                    label="Home"
                  />
                  <FormControlLabel
                    value="work"
                    control={<Radio />}
                    label="Work"
                  />
                </RadioGroup>
              </FormControl>
              <div style={{ color: "#FF0000", fontSize: 12 }}>
                {error2.addressType}
              </div>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
              <div>
                <span>
                  <Button
                    onClick={handleEditData}
                    variant="contained"
                    style={{
                      padding: 10,
                      borderRadius: 1,
                      width: "40%",
                      background: "#2874f0",
                    }}
                  >
                    Edit Data
                  </Button>
                </span>
                <span>
                  <Button
                    onClick={handleClose}
                    style={{ padding: 15, borderRadius: 1, width: "40%" }}
                  >
                    Cancel
                  </Button>
                </span>
              </div>
            </Grid>
          </Grid>
        </Dialog>
      </div>
    );
  };

  const handleClickSetData = (event, item) => {
    setOpen(true);
    setAddressId(item.addressid);
    setName(item.name);
    setMobile(item.mobileno);
    setPincode(item.pincode);
    setCity(item.city);
    setState(item.state);
    setLocality(item.locality);
    setAddress(item.address);
    setLandmark(item.landmark);
    setAlternatePhone(item.alternatephone);
    setAddressType(item.addresstype);
  };

  const handleEditData = async () => {
    if (validation2()) {
    var body = {
      name: name,
      mobileno: mobile,
      pincode: pincode,
      address: address,
      locality: locality,
      city: city,
      state: state,
      landmark: landmark,
      alternatephone: alternatePhone,
      addresstype: addressType,
      userid: userDetailList.userid,
    };

    var response = await putData("address/" + addressId, body);
    if (response.status) {
     
      toast("Address updated");
      clearValues();
    } else {
      toast("Address Not Updated");
    }

    setOpen(false);
    fetchAllAddress();
  }
  };
 
  const handleClickOpenTwo = () => {
    setOpenTwo(true);
  };
  const handleClickCloseTwo = () => {
    setOpenTwo(false);
  };
  const handleChangeAddressSummary = () => {
    setOpenTwo(false);
  window.location.reload();
};




const handleError2 = (inputs, value) => {
  setError2((prev) => ({ ...prev, [inputs]: value }));
};

const validation2 = () => {
  var isValid = true;

  if (name.length < 2 || !name ) {
    handleError2("name", "Please fill out this name.");
    isValid = false;
  }
  if (mobile.length == 0 || mobile.length > 10 || mobile.length < 10) {
    handleError2("mobile", " Enter 10 Digit mobile Number.");
    isValid = false;
  }
  if (pincode.length == 0 || pincode.length > 6 || pincode.length < 6) {
    handleError2("pincode", "Please fill correct pincode.");
    isValid = false;
  }
  if (!locality) {
    handleError2("locality", "Please fill out this locality.");
    isValid = false;
  }
  if (!address|| address.length <7) {
    handleError2("address", "Please fill out this address.");
    isValid = false;
  }
  if (!city) {
    handleError2("city", "Please fill out this city.");
    isValid = false;
  }
  if (!state) {
    handleError2("state", "Please fill out this state.");
    isValid = false;
  }
  if (!addressType) {
    handleError2("addressType", "Please choose any one.");
    isValid = false;
  }
 if(alternatePhone.length)
  {
    if (
      alternatePhone.length == 0 ||
      alternatePhone.length > 10 ||
      alternatePhone.length < 10
    ) {
      handleError2("alternatePhone", "Enter 10 Digit mobile Number.");
      isValid = false;
    }  
}else{

  }
  if(landmark.length){
  if (!landmark) {
    handleError2("landmark", "Please fill out this landmark.");
    isValid = false;
  }
}else{
  
}

  return isValid;
};


const showDialog = () => {
    return (
      <div>
        <Dialog
          open={openTwo}
          onClose={handleClickCloseTwo}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
         
          PaperProps={{
            style: {
              backgroundColor: 'transparent',
              boxShadow: 'none',
              overflowY:'hidden'
            },
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClickCloseTwo}
            sx={{
              position: "absolute",
              right: 20,
              top: 15,
             
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
         
            {
              <Address
                handleChangeAddressSummary={handleChangeAddressSummary}
              />
            }
       
        </Dialog>
      </div>
    );
  };
 
  return (
    <div>
      <Grid style={{ padding: "25px 12px 0px 20px" }} container spacing={2}>
        <Grid item className="project__osbox" xs={12}>
          <div className="project__paymentheader">
            <span class="project__paymentno4">2</span>
            <span class="project__pymntoption">Delivery Address</span>
          </div>
          <div style={{paddingTop:10,paddingLeft:5}}>
          <Button   style={{textTransform:'none',color:'#183871',background:'none'}} startIcon={<AddIcon />} onClick={handleClickOpenTwo}>
            Add A New Address
          </Button>
        </div>
        {addressData.map((item,index) => (
            <div  key={"address_confirm" + index} >
              
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={300} />
              ) : (
                <>
                  <div 
                    className="project__cnfmaddressdetail"
                    style={{paddingBottom:10,}}
                    onClick={() => handleClick(item.addressid)}
                   
                  >
                       <Divider/>
                    <div className="project__persondetail">
                      <span>
                        <Radio
                          value={item.addressid}
                          size="small"
                          checked={
                            item.addressid ==
                            (buttonStatus
                              ? buttonStatus
                              : currentAddress?.addressid)
                          }
                          onClick={(event) => handleClick(event.target.value)}
                        />
                      </span>

                      <span style={{ fontWeight: 500 }}>{item.name}</span>

                      <span 
                      className="project__caplaced"
                      >{item.addresstype}</span>

                      <span
                        style={{ fontWeight: 500 }}
                        class="project__ca-mobileno"
                      >
                        {item.mobileno}
                      </span>

                      <div className="project__caeditbtn">
                        <button
                          type="button"
                          class="project__cabtn"
                          onClick={(e) => handleClickSetData(e, item)}
                        >
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="project__caadress">
                      <span>{item.address}</span>
                      <span class="project__capincode">-{item.pincode}</span>
                    </div>

                    {buttonStatus == item.addressid ? (
                      <button
                        onClick={() => handleOpenOrderSummary(item)}
                        class="project__cabtnhere"
                      >
                        DELIVER HERE
                      </button>
                    ) : (
                      <></>
                    )}
             
                  </div>
                
                </>
                 
              )}
            
            </div>
          ))}
         
        
          
       
        </Grid>
        
        {EditDialog()}
        {showDialog()}
      </Grid>
    </div>
  );

  
}
