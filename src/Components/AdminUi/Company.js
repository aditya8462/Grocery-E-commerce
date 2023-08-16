import React, { useState, useEffect } from "react";
import {
  Avatar,
  InputAdornment,
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem

} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useStyles } from "./CompanyCss";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import Swal from "sweetalert2"
export default function Company(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [ownerName, setOwnerName] = useState('')
  const [emailAddress, setEmailAddress] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [address, setAddress] = useState('')
  const [password, setPassword] = useState('')
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [companyLogo, setCompanyLogo] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });
  var classes = useStyles();
  const fetchAllStates = async () => {
    var result = await getData('dropdown/fetch_all_states')
    setStates(result.data)
  }

  useEffect(function () {
    fetchAllStates()

  }, [])



  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleImage = (event) => {
    setCompanyLogo({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const fillStates = () => {
    return states.map((item) => {
      return (<MenuItem value={item.stateid}>{item.statename}</MenuItem>)

    })
  }


  const fetch_all_cities = async (stateid) => {
    var body = { 'stateid': stateid }
    var result = await postData('dropdown/fetch_all_cities', body)
    setCities(result.data)

  }
  const fillCities = () => {
    return cities.map((item) => {
      return (<MenuItem value={item.cityid}>{item.cityname}</MenuItem>)

    })
  }

  const handleStateChange = (event) => {
    setState(event.target.value)
    fetch_all_cities(event.target.value)

  }
  const handleCityChange = (event) => {
    setCity(event.target.value)
  }
  const clearValue = () => {
    setCompanyName('')
    setOwnerName('')
    setEmailAddress('')
    setMobileNumber('')
    setAddress('')
    setPassword('')
    setState('Choose State...')
    setCity('Choose City...')
    setCompanyLogo({
      fileName: "/assets/watermark.png",
      bytes: "",
    })

  }

  const handleClick = async () => {
    var cd = new Date()
    var dd = cd.getFullYear() + "/" + (cd.getMonth() + 1) + "/" + cd.getDate() + " " + cd.getHours() + ":" + cd.getMinutes() + ":" + cd.getSeconds()
    var formData = new FormData()
    formData.append('companyname', companyName)
    formData.append('ownername', ownerName)
    formData.append('emailaddress', emailAddress)
    formData.append('mobilenumber', mobileNumber)
    formData.append('address', address)
    formData.append('state', state)
    formData.append('city', city)
    formData.append('password', password)
    formData.append('logo', companyLogo.bytes)
    formData.append('createdat', dd)
    formData.append('updateat', dd)
    formData.append('createdby', 'ADMIN')
    formData.append('status', 'pending')
    
    var result = await postData('company/add_new_company', formData)
    
    if (result.status) {
      Swal.fire({
        icon: 'success',
        title: result.message,
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: result.message,
      })

    }
  
    clearValue()
    
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.box}>
        <Grid container spacing={2}>
          <Grid item xs={12} className={classes.rowStyle}>
            <div>
              <img src="/assets/logo.png" width="40" />
            </div>
            <div className={classes.headingStyle}>Company Registration</div>
          </Grid>
          <Grid item xs={6}>
            <TextField value={companyName} onChange={(event) => setCompanyName(event.target.value)} fullWidth label="Company Name" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={ownerName} fullWidth onChange={(event) => setOwnerName(event.target.value)} label="Owner Name" variant="outlined" />
          </Grid>

          <Grid item xs={6}>
            <TextField value={emailAddress} fullWidth onChange={(event) => setEmailAddress(event.target.value)} label="Email Address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <TextField value={mobileNumber} fullWidth onChange={(event) => setMobileNumber(event.target.value)} label="Mobile Number" variant="outlined" />
          </Grid>

          <Grid item xs={12}>
            <TextField value={address} fullWidth onChange={(event) => setAddress(event.target.value)} label="Address" variant="outlined" />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={state}
                label="State"
                onChange={handleStateChange}
              >
                <MenuItem value={'Choose State...'}>Choose State...</MenuItem>
                {fillStates()}
              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={city}
                label="City"
                onChange={handleCityChange}
              >
                <MenuItem value={'Choose City...'}>Choose City...</MenuItem>
                {fillCities()}
              </Select>
            </FormControl>



          </Grid>
          <Grid item xs={6} className={classes.rowStyle}>
            <IconButton
              fullWidth
              color="primary"
              aria-label="upload picture"
              component="label"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImage}
              />
              <PhotoCamera />
            </IconButton>

            <Avatar
              alt="Remy Sharp"
              variant="rounded"
              src={companyLogo.fileName}
              sx={{ width: 56, height: 56 }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                value={password}
                type={showPassword ? "text" : "password"}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClick} fullWidth variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={clearValue} fullWidth variant="contained">Reset</Button>
          </Grid>

        </Grid>
      </div>
    </div>
  );
}
