import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,

  TextField,
  Grid,
  IconButton,
  FormControl,
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
import { useStyles } from "./DisplayAllCategoriesCss";

export default function DisplayAllCategories(props) {
  var navigate=useNavigate();
  var classes = useStyles();
  const [categories, setCategories] = useState([])
  const [categoryName, setCategoryName] = useState('')
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState('')
  const [btnStatus, setBtnStatus] = useState(false)
  const [oldPicture, setOldPicture] = useState('')
  const [message, setMessage] = useState("")
  const [status,setStatus]=useState('')

  const [picture, setPicture] = useState({
    fileName: "/assets/watermark.png",
    bytes: "",
  });

  /* FOR PICTURE UPLOAD */

  const handleImage = (event) => {
    setPicture({
      fileName: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
    setBtnStatus(true)
  };


  /* OPEN FORM OF CATEGORY UPDATION */

  const handleOpenDialog = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setStatus(rowData.status)
    setPicture({
      fileName: `${ServerURL}/images/${rowData.picture}`,
      bytes: "",
    })
    setOldPicture(rowData.picture)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setMessage('')
  }
  
  /* API FOR SUBMIT CATEGORY UPDATION */

  const handleEditData = async () => {

    var body = {
      'categoryid': categoryId,
      'categoryname': categoryName,
      'status': status,
      
    };
    var result = await postData('category/edit_category', body)
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
    fetchAllCategories()
  }

  /* UPLOAD PICTURE CANCEL BUTTON */

  const handleCancel = () => {
    setPicture({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
    setOldPicture('')
    setBtnStatus(false)
    setMessage('')
  }

  /* API FOR DELETION OF CATEGORY */

  const handleDelete=async(rowData)=>{
    setOpen(false)
     Swal.fire({
       title: 'Do you want to delete this category?',
      
       showCancelButton: true,
       confirmButtonText: 'Delete',
     
     }).then(async(result) => {
     
       if (result.isConfirmed) {
         var res=await postData('category/delete_category',{categoryid:rowData.categoryid})

         if(res.status)
         {Swal.fire('Deleted!', '', 'Success')
         fetchAllCategories()
        }
         else
         Swal.fire({
           icon: 'error',
           title: result.message,
          })
        
       } 
     })

  }

  /* PICTUR UPLOAD BUTTON MANAGEMENT & API FOR PICTURE UPLOAD */

  const handleSaveIcon = async () => {
    var formData = new FormData()
    formData.append('categoryid', categoryId)
    formData.append('picture', picture.bytes)
    var result = await postData('category/edit_category_icon', formData)
    if (result.status) {
      setMessage('assets/tick.gif')
    }
    else {
      setMessage('')

    }
    fetchAllCategories()
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

  /* FORM DETAILS OF SELECTED CATEGORY */

  const showCategoryDetails = () => {
    return (
      <div>
        <Dialog
          open={open}
         
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/assets/logo.png" width="40" />
              Category Details
            </div>
            <div>
              <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
            </div>
          </DialogTitle>
          <DialogContent >
            <Grid container spacing={2} style={{ marginTop: 5 }}>
            <Grid item xs={12}>
            <TextField value={categoryName}  onChange={(event)=>setCategoryName(event.target.value)} fullWidth label="Category" variant="outlined" />
          </Grid>
          

          <Grid item xs={6}>
          <FormControl>
                            <FormLabel id="status">Status:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="status"
                                name="status"
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Available" checked={status == '1'} />
                                <FormControlLabel value="0" control={<Radio />} label="Not Available" checked={status == '0'} />

                            </RadioGroup>
                        </FormControl>
          </Grid>
          
          <Grid item xs={6} style={{display:'flex',flexDirection:'row',}}>
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

  /* API FOR FETCH CATEGORY DETAILS */

  const fetchAllCategories = async () => {
    var result = await getData('category/fetch_all_category')
    setCategories(result.data)
  }
  useEffect(function () {
    fetchAllCategories()

  }, [])

   /* TABLE OF CATEGORY DETAILS */

  function showAllCategory() {
    return (
      <MaterialTable
        title={<span className={classes.headingStyle}>Category List</span>}
        columns={[

          {
            title: 'Category', field: 'categoryname',
            render: rowData => rowData.categoryname
          },
          
          {
            title: 'status', field: 'status',
            render: rowData => rowData.status==1 ? <div> Available</div> : <div>Not Available</div>
          },
          {
            title: 'Picture',
            render: rowData => <Avatar src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 70, height: 70 }} variant="rounded" />
          },


        ]}
        data={categories}
        actions={[

          { icon: AddIcon,
              isFreeAction:true,
              tooltip:'Add Category',
              onClick: (event) =>navigate('/dashboard/category') 
            },

          {
            icon: EditIcon,
            tooltip: 'Edit User',
            onClick: (event, rowData) => handleOpenDialog(rowData)
          },
          {
            icon: DeleteIcon,
            tooltip: 'Delete User',
            onClick: (event, rowData) => handleDelete(rowData)
          }
        ]}

      />
    )
  }


  return (<div className={classes.mainContainer}>
    <div className={classes.box}>
      {showAllCategory()}
      {showCategoryDetails()}
    </div>
  </div>)

}
