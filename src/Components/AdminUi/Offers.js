import React, { useState, useEffect } from "react";
import {
    Avatar,
    TextField,
    IconButton,
    Button,
    Grid,
    FormControl,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,Tooltip,

} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

import { useNavigate } from "react-router-dom";
import { useStyles } from "./CategoryCss";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import Swal from "sweetalert2"
export default function Category(props) {
    var navigate = useNavigate()

    const [status, setStatus] = useState('')
    const [couponCode, setCouponCode] = useState('')
    const [description, setDescription] = useState('')
    const [minimumPrice, setMinimumPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [picture, setPicture] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
      });

    const [startDate, setStartDate] = React.useState(dayjs(new Date()));

    const handleStartDate= (newStartDate) => {
        setStartDate(newStartDate);
    };

    const [endDate, setEndDate] = React.useState(dayjs(new Date()));

    const handleEndDate = (newEndDate) => {
        setEndDate(newEndDate);
    };

    const [error, setError] = useState({})

    var classes = useStyles();

    const handleImage = (event) => {
        setPicture({
          fileName: URL.createObjectURL(event.target.files[0]),
          bytes: event.target.files[0],
        });
      };


    const handleError = (inputs, value) => {
        setError(prev => ({ ...prev, [inputs]: value }))
    }
    const validation = () => {
        var isValid = true

        if (!couponCode) {
            handleError('couponCode', "Pls Input Coupon Code")
            isValid = false
        }

        if (!description) {
            handleError('description', "Pls Input Description")
            isValid = false
        }

        if (!minimumPrice) {
            handleError('minimumPrice', "Pls Input Minimum Price")
            isValid = false
        }

        if (!discount) {
            handleError('discount', "Pls Input Discount")
            isValid = false
        }


        if (!startDate) {
            handleError('startDate', "Pls Input Start Date")
            isValid = false
        }

        if (!endDate) {
            handleError('endDate', "Pls Input End Date")
            isValid = false
        }

        if (!status) {
            handleError('status', "Pls Select Status")
            isValid = false
        }

        return isValid
    }



    const clearValue = () => {
        setCouponCode('')
        setStatus('')
        setDescription('')
        setMinimumPrice('')
        setDiscount('')
        setStartDate('')
        setEndDate('')
        setPicture({
            fileName: "/assets/watermark.png",
            bytes: "",
          })
    }

    const handleClick = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('status', status)
            formData.append('couponcode', couponCode)
            formData.append('description', description)
            formData.append('minimumprice', minimumPrice)
           formData.append ('discount' , discount)
            formData.append('picture', picture.bytes)
            formData.append('startdate', startDate)
            formData.append('enddate',  endDate)
            
            var result = await postData('offers/coupons', formData)
            if (result.status) {
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                })

            }
            clearValue()
        }

    }

    return (

        <div className={classes.mainContainer}>
            <div className={classes.box}>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.rowStyle}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <div>
                                <img src="/assets/logo.png" width="40" />
                            </div>
                            <div className={classes.headingStyle}>Offers</div>
                        </div>

                        <div style={{ cursor: 'pointer' }}>
                        <Tooltip title="Offer List">
              <FormatListBulletedIcon onClick={() => navigate('/dashboard/displayalloffers')} />
              </Tooltip>
                        </div>

                    </Grid>

                    <Grid item xs={6}>
                        <TextField error={!error.couponCode ? false : true} helperText={error.couponCode} onFocus={() => handleError("couponCode", null)} value={couponCode} onChange={(event) => setCouponCode(event.target.value)} fullWidth label="Coupon Code" variant="outlined" />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField error={!error.discount ? false : true} helperText={error.discount} onFocus={() => handleError("minimumPrice", null)} value={discount} onChange={(event) => setDiscount(event.target.value)} fullWidth label="Discount" variant="outlined" />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError("description", null)} value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                    </Grid>

                    <Grid item xs={4}>
                        <TextField error={!error.minimumPrice ? false : true} helperText={error.minimumPrice} onFocus={() => handleError("minimumPrice", null)} value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} fullWidth label="Minimum Price" variant="outlined" />
                    </Grid>

                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <MobileDatePicker
                                label="Start Date"
                                inputFormat="MM/DD/YYYY"
                                value={startDate}
                                error={!error.startDate ? false : true}
                                onFocus={() => handleError("startDate", null)}
                                onChange={handleStartDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
              <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.startDate}</div>

                    </Grid>

                    <Grid item xs={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <MobileDatePicker
                                label="End Date"
                                inputFormat="MM/DD/YYYY"
                                value={endDate}
                                error={!error.endDate ? false : true}
                                onFocus={() => handleError("endDate", null)}
                                onChange={handleEndDate}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
              <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.endDate}</div>

                    </Grid>


                    <Grid item xs={6}>
                        <FormControl error={!error.status ? false : true}>
                            <FormLabel id="status">Status:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="status"
                                name="status"
                                onFocus={() => handleError("status", null)}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Available" checked={status == '1'} />
                                <FormControlLabel value="0" control={<Radio />} label="Not Available" checked={status == '0'} />

                            </RadioGroup>
                            <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.status}</div>

                        </FormControl>
                    </Grid>

                    
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', }}>
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
              alt="Picture"
              variant="rounded"
              src={picture.fileName}
              sx={{ width: 56, height: 56 }}
            />
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
