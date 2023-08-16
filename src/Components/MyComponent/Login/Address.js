import React from "react";
import { Grid, Box, Typography, Button, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import "../../../Stylesheet.css";
import Dialog from "@mui/material/Dialog";
import Menu from "@mui/material/Menu";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  postData,
  getData,
  putData,
  deleteData,
} from "../../Administrator/Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";

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

export default function Address(props) {
  const [open, setOpen] = useState(false);
  const [openSecond, setOpenSecond] = useState(false);
  const [addressId, setAddressId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [pincode, setPincode] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [landmark, setLandmark] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [addressType, setAddressType] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [buttonStatus, setButtonStatus] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [error, setError] = useState({});
  const [error2, setError2] = useState({});

  const openmenu = Boolean(anchorEl);
  var dispatch = useDispatch();
  var navigate = useNavigate();
  const currentAddress = useSelector((state) => state.address);
  const userDetailList = useSelector((state) => state.userDetails);

  const handleError = (inputs, value) => {
    setError((prev) => ({ ...prev, [inputs]: value }));
  };

  const validation = () => {
    var isValid = true;

    if (name.length < 2 || !name) {
      handleError("name", "Please fill out this name.");
      isValid = false;
    }
    if (mobile.length == 0 || mobile.length > 10 || mobile.length < 10) {
      handleError("mobile", " Enter 10 Digit mobile Number.");
      isValid = false;
    }
    if (pincode.length == 0 || pincode.length > 6 || pincode.length < 6) {
      handleError("pincode", "Please fill correct pincode.");
      isValid = false;
    }
    if (!locality) {
      handleError("locality", "Please fill out this locality.");
      isValid = false;
    }
    if (!address || address.length < 7) {
      handleError("address", "Please fill out this address.");
      isValid = false;
    }
    if (!city) {
      handleError("city", "Please fill out this city.");
      isValid = false;
    }
    if (!state) {
      handleError("state", "Please fill out this state.");
      isValid = false;
    }
    if (!addressType) {
      handleError("addressType", "Please choose any one.");
      isValid = false;
    }

    if (alternatePhone.length) {
      if (
        alternatePhone.length == 0 ||
        alternatePhone.length > 10 ||
        alternatePhone.length < 10
      ) {
        handleError("alternatePhone", "Enter 10 Digit mobile Number.");
        isValid = false;
      }
    } else {
    }
    if (landmark.length) {
      if (!landmark) {
        handleError("landmark", "Please fill out this landmark.");
        isValid = false;
      }
    } else {
    }

    return isValid;
  };

  const handleError2 = (inputs, value) => {
    setError2((prev) => ({ ...prev, [inputs]: value }));
  };
  const validation2 = () => {
    var isValid = true;

    if (name.length < 2 || !name) {
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
    if (!address || address.length < 7) {
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
    if (alternatePhone.length) {
      if (
        alternatePhone.length == 0 ||
        alternatePhone.length > 10 ||
        alternatePhone.length < 10
      ) {
        handleError2("alternatePhone", "Enter 10 Digit mobile Number.");
        isValid = false;
      }
    } else {
    }
    if (landmark.length) {
      if (!landmark) {
        handleError2("landmark", "Please fill out this landmark.");
        isValid = false;
      }
    } else {
    }

    return isValid;
  };

  const handleSave = async () => {
    if (validation()) {
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
      var response = await postData("address/address", body);
      if (response.status) {
        toast("Address Save Sucessfully");
        setOpen(false);
      } else {
        toast("Address Not Save");
      }

      fetchAllAddress();
    }
  };

  const fetchAllAddress = async () => {
    var result = await getData("address/" + userDetailList.userid);
    setAddressData(result.data);
  };

  useEffect(function () {
    fetchAllAddress();
    screen();
  }, []);

  const screen = () => {
    window.scroll(0, 0);
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

      setOpenSecond(false);
      fetchAllAddress();
    }
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

  const handleClick = (event, item) => {
    setAnchorEl(event.currentTarget);
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
  const handleDelete = async () => {
    var body = { addressid: addressId };
    var response = await deleteData("address/" + addressId, body);
    if (response.status) {
      toast("Address Deleted");
      window.location.reload();
      setAnchorEl(false);
    } else {
      toast("Address does not Deleted");
    }

    setOpenSecond(false);
    fetchAllAddress();
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    clearValues();
    setOpen(true);
  };

  const handleClickEdit = (item) => {
    setOpenSecond(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenSecond(false);
    handleError("name", null);
    handleError("mobile", null);
    handleError("pincode", null);
    handleError("locality", null);
    handleError("address", null);
    handleError("city", null);
    handleError("state", null);
    handleError("alternatePhone", null);
    handleError("addressType", null);
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

  const RegexLetter = /^[a-zA-Z\s]*$/;
  const showDialog = () => {
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
                error={!error.name ? false : true}
                helperText={error.name}
                onFocus={() => handleError("name", null)}
                label="Name"
                value={name}
                onKeyDown={(event) => {
                  const RegexLetter = /^[a-zA-Z\s]*$/;
                  if (!RegexLetter.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required
                onChange={(event) => setName(event.target.value.trimStart())}
                fullWidth
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="10-digit
                mobile number"
                error={!error.mobile ? false : true}
                helperText={error.mobile}
                onFocus={() => handleError("mobile", null)}
                value={mobile}
                onChange={(event) => setMobile(event.target.value.trim())}
                fullWidth
                type="number"
                required
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Pincode"
                value={pincode}
                error={!error.pincode ? false : true}
                helperText={error.pincode}
                onFocus={() => handleError("pincode", null)}
                onChange={(event) => setPincode(event.target.value.trim())}
                fullWidth
                required
                type="number"
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                error={!error.locality ? false : true}
                helperText={error.locality}
                onFocus={() => handleError("locality", null)}
                label="Locality"
                value={locality}
                onChange={(event) =>
                  setLocality(event.target.value.trimStart())
                }
                fullWidth
                required
              />
            </Grid>

            <Grid item md={12} xs={12} sm={12}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                error={!error.address ? false : true}
                helperText={error.address}
                onFocus={() => handleError("address", null)}
                id="outlined-multiline-static"
                label="Address (Area and Street)"
                value={address}
                multiline
                rows={4}
                onChange={(event) => setAddress(event.target.value.trimStart())}
                fullWidth
                required
              />
            </Grid>

            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="City/District/Town"
                value={city}
                error={!error.city ? false : true}
                helperText={error.city}
                onFocus={() => handleError("city", null)}
                onChange={(event) => setCity(event.target.value.trimStart())}
                fullWidth
                onKeyDown={(event) => {
                  if (!RegexLetter.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                required
              />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <TextField
                id="outlined-select-currency"
                select
                value={state}
                label="State"
                error={!error.state ? false : true}
                helperText={error.state}
                onFocus={() => handleError("state", null)}
                onChange={(event) => setState(event.target.value.trimStart())}
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                fullWidth
                required
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {states.map((item, index) => (
                  <MenuItem value={item} key={"theger" + index}>
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
                error={!error.landmark ? false : true}
                helperText={error.landmark}
                onFocus={() => handleError("landmark", null)}
                onChange={(event) =>
                  setLandmark(event.target.value.trimStart())
                }
                fullWidth
              />
            </Grid>
            <Grid item md={6} xs={6} sm={6}>
              <TextField
                InputProps={{ style: { borderRadius: 1, background: "#fff" } }}
                id="outlined-multiline-flexible"
                label="Alternate Phone (Optional)"
                value={alternatePhone}
                error={!error.alternatePhone ? false : true}
                helperText={error.alternatePhone}
                onFocus={() => handleError("alternatePhone", null)}
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
                  value={addressType}
                  error={!error.addressType ? false : true}
                  onFocus={() => handleError("addressType", null)}
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
                {error.addressType}
              </div>
            </Grid>
            <Grid item md={12} xs={12} sm={12}>
              <div>
                <span>
                  <Button
                    onClick={handleSave}
                    variant="contained"
                    style={{
                      padding: 10,
                      borderRadius: 1,
                      width: "40%",
                      background: "#2874f0",
                    }}
                  >
                    Save
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

  const EditDialog = () => {
    return (
      <div>
        <Dialog
          open={openSecond}
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

  const handleOpenOrderSummary = (item) => {
    dispatch({ type: "ADD_ADDRESS", payload: item });
    toast("Change Successfully");
    props.handleChangeAddressSummary();
  };

  const handleClickStatus = (id) => {
    setButtonStatus(id);
  };

  const ListAddress = () => {
    return addressData.map((item, index) => {
      return (
        <div key={"address_pageType_1t" + index}>
          <Grid container>
            <Grid
              item
              md={12}
              xs={12}
              sm={12}
              style={{ borderBottom: "2px solid #dcdde1", background: "#fff" }}
            >
              <Box className={"Stylesheet_padd-153"}>
                <Box component="span">
                  <Typography style={{ marginTop: "2%" }}>
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
                        onClick={(event) =>
                          handleClickStatus(event.target.value)
                        }
                      />
                    </span>
                    <Box component="span" className={"Stylesheet_work-2"}>
                      {item.addresstype}
                    </Box>
                  </Typography>
                  <Typography style={{ marginTop: "2%" }}>
                    <span style={{ fontWeight: 600 }}>{item.name}:</span>
                    <span style={{ fontWeight: 600, marginLeft: 10 }}>
                      {item.mobileno}
                    </span>
                  </Typography>
                  <Typography
                    className={"Stylesheet_add-2"}
                    style={{ marginTop: "2%" }}
                  >
                    {item.address}
                    <span style={{ color: "black", fontWeight: 600 }}>
                      -{item.pincode}
                    </span>
                  </Typography>
                  <Typography>
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
                  </Typography>
                </Box>

                <Box style={{ marginTop: "1%" }}>
                  <Box component="span">
                    <MoreVertIcon
                      onClick={(e) => handleClick(e, item)}
                      className={"Stylesheet_cur-point"}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openmenu}
                      onClose={handleCloseMenu}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          handleClickEdit(item);
                        }}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem onClick={handleDelete}>Delete</MenuItem>
                    </Menu>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: "10px 10px 10px 10px" }}>
      <Grid
        container
        rowSpacing={1}
        style={{
          background: "#fff",
          boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Grid
          item
          md={12}
          xs={12}
          style={{ fontSize: 20, fontWeight: 500, padding: 20, marginLeft: 1 }}
        >
          <div>Manage Addresses</div>
        </Grid>

        <Grid item md={12} xs={12} className={"Stylesheet_addr-1"}>
          <Button startIcon={<AddIcon />} onClick={handleClickOpen}>
            Add a new address
          </Button>
        </Grid>

        <Grid item md={12} xs={12} className="Stylesheet_scrollitem">
          {ListAddress()}
        </Grid>
        <Grid item md={12}>
          {showDialog()}
          {EditDialog()}
        </Grid>
      </Grid>
    </div>
  );
}
