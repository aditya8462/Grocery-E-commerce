import React, { useState, useEffect } from "react";
import {
  Avatar,
  TextField,
  Button,
  Grid,
  IconButton,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,Tooltip

} from "@mui/material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from "./CategoryCss";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import Swal from "sweetalert2"
export default function Category(props) {
  var navigate = useNavigate()
  const [status, setStatus] = useState('')
  const [categoryName, setCategoryName] = useState('')

  const [picture, setPicture] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });

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

    if (!categoryName) {
      handleError('categoryName', "Pls Select Category")
      isValid = false
    }
    if (!status) {
      handleError('status', "Pls Select Status")
      isValid = false
    }

    return isValid
  }



  const clearValue = () => {
    setCategoryName('')
    setStatus('')
    setPicture({
      fileName: "/assets/watermark.png",
      bytes: "",
    })

  }

  const handleClick = async () => {
    if (validation()) {
      var formData = new FormData()
      formData.append('status', status)
      formData.append('categoryname', categoryName)
      formData.append('picture', picture.bytes)
      var result = await postData('category/add_company_category', formData)
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
              <div className={classes.headingStyle}>Category</div>
            </div>

            <div style={{ cursor: 'pointer' }}>
            <Tooltip title="Category List">
              <FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallcategories')} />
              </Tooltip>
            </div>
          </Grid>

          <Grid item xs={12}>
            <TextField error={!error.categoryName ? false : true} helperText={error.categoryName} onFocus={() => handleError("categoryName", null)} value={categoryName} onChange={(event) => setCategoryName(event.target.value)} fullWidth label="Category" variant="outlined" />
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
