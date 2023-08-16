import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,
  Grid,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from 'sweetalert2';
import { useStyles } from "./DisplayAllBannersCss";

export default function DisplayAllBanners(props) {
    var navigate=useNavigate();
  
  const [banners,setBanners] = useState([])
  const [picture, setPicture] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });


  const [productId, setProductId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [status, setStatus] = useState('')
  const [categoryList, setCategoryList] = useState ([])
  const [productList, setProductList] = useState ([])
  const [open, setOpen] = useState(false);
  const [btnStatus, setBtnStatus] = useState(false)
  const [oldPicture, setOldPicture] = useState('')
  const [message, setMessage] = useState("")
  const [bannerId, setBannerId] = useState('')

var classes = useStyles();

  const fetchAllBanners=async() =>{
    var result =await getData('banner/fetch_all_banners')
    setBanners(result.data)
  }
  useEffect(function () {
    fetchAllBanners()

  },[])


  /* TO FETCH ALL PRODUCTS */

  const fetchAllProducts = async (categoryid) => {
    var body = {'categoryid': categoryid}
    var result = await postData('dropdown/fetch_all_products',body)
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

  const handleImage = (event) => {
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true)
  };


  const handleOpenDialog = (rowData) => {
    fetchAllProducts(rowData.categoryid)
    setPicture({
       fileName: `${ServerURL}/images/${rowData.picture}`,
       bytes: "",
     })
     setOldPicture(rowData.picture)
     setProductId(rowData.productid)
     setCategoryId(rowData.categoryid)
     setStatus(rowData.status)
     setBannerId(rowData.bannerid)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setMessage('')
  }


  const handleEditData = async () => {

    var body = {
     'productid': productId,
     'categoryid': categoryId,
     'status': status,
     'bannerid': bannerId,
    };
    var result = await postData('banner/edit_banner', body)
    if (result.status) {
      setOpen(false)
      Swal.fire({
        icon: 'success',
        title: result.message,
      })
    }
    else {
      setOpen(false)
      Swal.fire({
        icon: 'error',
        title: result.message,
      })

    }
    setMessage('')
    fetchAllBanners()
  }


  /* PICTUR UPLOAD BUTTON MANAGEMENT & API FOR PICTURE UPLOAD */

  const handleSaveIcon = async () => {
    var formData = new FormData()
    formData.append('bannerid', bannerId)
    formData.append('picture', picture.bytes)
    var result = await postData('banner/edit_banner_icon', formData)
    if (result.status) {
      setMessage('assets/tick.gif')
    }
    else {
      setMessage('')

    }
    fetchAllBanners()
    setBtnStatus(false)

  }

  /* BUTTON FOR PICTURE UPLOAD */

  const PictureButton = () => {
    return (<div>
      {btnStatus ? <div style={{ display: 'flex', padding: 10 }}>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSaveIcon}>Save</Button>
      </div> : <div style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }} ><img src={`${message}`} width="60"/></div>}

    </div>)

  }

  /* UPLOAD PICTURE CANCEL BUTTON */

  const handleCancel = () => {
    setPicture({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
    setOldPicture('')
    setBtnStatus(false)
    setMessage('')
  }

  /* API FOR DELETION OF BANNER */

  const handleDelete=async(rowData)=>{
    setOpen(false)
     Swal.fire({
       title: 'Do you want to delete this category?',
      
       showCancelButton: true,
       confirmButtonText: 'Delete',
     
     }).then(async(result) => {
     
       if (result.isConfirmed) {
         var res=await postData('banner/delete_banner',{bannerid:rowData.bannerid})

         if(res.status)
         {Swal.fire('Deleted!', '', 'Success')
         fetchAllBanners()
        }
         else
         Swal.fire({
           icon: 'error',
           title: result.message,
          })
        
       } 
     })

  }


  const showBannerDetails = () => {
    return (
      <div>
        <Dialog
        fullWidth
        maxWidth="md"
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between'}}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/logo.png" width="40" />
              Banner Details
            </div>
            <div>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent >

              <Grid item xs={6} style={{padding:10}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categoryId}
                                    label="CategoryId"
                                 onChange={handleCategoryChange}
                                >
                                    <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                                    {fillCategory()}
                                </Select>
                            </FormControl>

                        </Grid>
    
              <Grid item xs={6} style={{padding:10}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={productId}
                                    label="ProductId"
                                 onChange={handleProductChange}
                                >
                                    <MenuItem value={'Choose Product...'}>Choose Product...</MenuItem>
                                    {fillProduct()}
                                </Select>
                            </FormControl>

                        </Grid>
    
    
              <Grid item xs={6} style={{padding:10}}>
                <FormControl>
                  <FormLabel id="status">Status:</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="status"
                    name="status"
                    onChange={(event) => setStatus(event.target.value)}
                  >
                    <FormControlLabel value="1" control={<Radio />} label="Yes" checked={status == '1'} />
                    <FormControlLabel value="0" control={<Radio />} label="No"  checked={status == '0'} />
    
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', padding:10 }} >
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
                <PictureButton />
              </Grid>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditData} >Edit</Button>
            <Button onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }


    function showAllBanners(){
        return (
          <MaterialTable
            title={<span className={classes.headingStyle}>Banner List</span>}
            columns={[

                {
                    title: 'Picture', field: 'picture',
                    render: rowData => <Avatar src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 200 }} variant="rounded" />
                },
    
              {
                title: 'Category', field: 'categoryid',
                render: rowData => <div>{rowData.categoryname}</div>
              },
              
              {
                title: 'Product', field: 'productid',
                render: rowData => <div>{rowData.productname}</div>
              },

              {
                title: 'Status', field: 'status',
                render: rowData => rowData.status==1 ? <div> Available</div> : <div>Not Available</div>
              }     
    
            ]}
            data={banners}
            actions={[
    
              { icon: AddIcon,
                  isFreeAction:true,
                  tooltip:'Add Banner',
                  onClick: (event) =>navigate('/dashboard/banner') 
 
                },
    
              {
                icon: EditIcon,
                tooltip: 'Edit Banner',
                onClick: (event, rowData) =>  handleOpenDialog(rowData)

              },
              {
                icon: DeleteIcon,
                tooltip: 'Delete Banner',
                onClick: (event, rowData) =>  handleDelete(rowData)

              }
            ]}
    
          />
        )
     }
    

    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
          {showAllBanners()}
          {showBannerDetails()}
        </div>
      </div>)
    
}

