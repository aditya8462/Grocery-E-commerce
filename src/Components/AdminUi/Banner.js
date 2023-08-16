import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  Tooltip,
  FormLabel,

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from "./BannerCss";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import Swal from "sweetalert2"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


export default function Banner(props) {
  var navigate = useNavigate()

  const [picture, setPicture] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });


  const [productId, setProductId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])
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

    if (!categoryId || categoryId == "Choose Category...") {
      handleError('categoryId', "Pls Select Category")
      isValid = false
    }
    if (!productId || productId=="Choose Product...") {
      handleError('productId', "Pls Select Product")
      isValid = false
    }
    if (!status) {
      handleError('status', "Pls Select Status")
      isValid = false
    }

    return isValid
  }



  /* API FOR FETCH ALL PRODUCTLIST */

  const fetchAllProducts = async (categoryid) => {
    var body = { 'categoryid': categoryid }
    var result = await postData('banner/fetch_all_products', body)
    setProductList(result.data)
  }

  /* FOR FILL PRODUCTS IN DROPDOWN */

  const fillProduct = () => {
    return productList.map((item) => {
      return (<MenuItem value={item.productid}>{item.productname}</MenuItem>)

    })
  }



  /* API FOR FETCH ALL CATEGORIES */

  const fetchAllCategory = async () => {
    var result = await getData('dropdown/fetch_all_category')
    setCategoryList(result.data)
  }

  useEffect(function () {
    fetchAllCategory()

  }, [])

  /* FOR FILL CATEGORIES IN DROPDOWN */

  const fillCategory = () => {
    return categoryList.map((item) => {
      return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)

    })
  };



  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value)
    fetchAllProducts(event.target.value)

  }
  const handleProductChange = (event) => {
    setProductId(event.target.value)
  }


  const handleClick = async () => {
    if (validation()) {
    var formData = new FormData()

    formData.append('categoryid', categoryId)
    formData.append('productid', productId)
    formData.append('status', status)
    formData.append('picture', picture.bytes)

    var result = await postData('banner/add_new_banner', formData)

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


  const clearValue = () => {
    setPicture({
      fileName: "/assets/watermark.png",
      bytes: "",
    })
    setCategoryId('')
    setProductId('')
    setStatus('')

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
              <div className={classes.headingStyle}>Banners</div>
            </div>
            <div style={{ cursor: 'pointer' }}>
            <Tooltip title="Banner List">
              <FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallbanners')} />
              </Tooltip>
            </div>

          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!error.categoryId ? false : true}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId}
                onFocus={() => handleError("categoryId", null)}
                label="CategoryId"
                onChange={handleCategoryChange}
              >
                <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                {fillCategory()}
              </Select>
              <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.categoryId}</div>
            </FormControl>

          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth error={!error.productId ? false : true}>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productId}
                onFocus={() => handleError("productId", null)}
                label="ProductId"
                onChange={handleProductChange}
              >
                <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
                {fillProduct()}
              </Select>
              <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.productId}</div>

            </FormControl>

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
                <FormControlLabel value="1" control={<Radio />} label="Yes" checked={status == '1'} />
                <FormControlLabel value="0" control={<Radio />} label="No" checked={status == '0'} />

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
              sx={{ width: 100, height: 100 }}
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