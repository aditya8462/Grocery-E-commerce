import React, { useEffect, useState } from 'react'
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
import moment from "moment/moment";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import dayjs from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { useStyles } from "./DisplayAllOffersCss";

export default function DisplayAllOffers(props) {
    var navigate = useNavigate();
    const [status, setStatus] = useState('')
    const [couponCode, setCouponCode] = useState('')
    const [couponId, setCouponId] = useState('')
    const [open, setOpen] = useState('')
    const [offers, setOffers] = useState([])
    const [minimumPrice, setMinimumPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture, setOldPicture] = useState('')
    const [message, setMessage] = useState("")

    const [description, setDescription] = useState('')
    const [picture, setPicture] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
    });

    const [startDate, setStartDate] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleStartDate = (newStartDate) => {
        setStartDate(newStartDate);
    };

    const [endDate, setEndDate] = React.useState(dayjs('2014-08-18T21:11:54'));

    const handleEndDate = (newEndDate) => {
        setEndDate(newEndDate);
    };

    var classes = useStyles();

    /* FOR PICTURE UPLOAD */

    const handleImage = (event) => {
        setPicture({
            fileName: URL.createObjectURL(event.target.files[0]),
            bytes: event.target.files[0],
        });
        setBtnStatus(true)
    };



    /* API FOR FETCH OFFER DETAILS */

    const fetchAllOffers = async () => {
        var result = await getData('offers/fetch_all_coupons')
        setOffers(result.data)
    }
    useEffect(function () {
        fetchAllOffers()

    }, [])



    /* SET DATA FOR OFFERS UPDATION */

    const handleOpenDialog = (rowData) => {
        setCouponId(rowData.couponid)
        setCouponCode(rowData.couponcode)
        setDescription(rowData.description)
        setStartDate(rowData.startdate)
        setEndDate(rowData.enddate)
        setMinimumPrice(rowData.minimumprice)
        setDiscount(rowData.discount)
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
        setBtnStatus(false)
    }

    /* UPLOAD PICTURE CANCEL BUTTON */

    const handleCancel = () => {
        setPicture({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
        setOldPicture('')
        setBtnStatus(false)
        setMessage('')
    }

    /* PICTUR UPLOAD BUTTON MANAGEMENT & API FOR PICTURE UPLOAD */

    const handleSaveIcon = async () => {
        var formData = new FormData()
        formData.append('couponid', couponId)
        formData.append('picture', picture.bytes)
        var result = await postData('offers/edit_coupon_icon', formData)
        if (result.status) {
            setMessage('assets/tick.gif')
        }
        else {
            setMessage('')

        }
        fetchAllOffers()
        setBtnStatus(false)

    }

    /* BUTTON FOR PICTURE UPLOAD */

    const PictureButton = () => {
        return (<div>
            {btnStatus ? <div style={{ display: 'flex', padding: 10 }}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSaveIcon}>Save</Button>
            </div> : <div style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }} ><img src={`${message}`} width="60" /></div>}

        </div>)

    }


    /* API FOR SUBMIT OFFERS UPDATION */

    const handleEditData = async () => {

        var body = {
            'couponid': couponId,
            'couponcode': couponCode,
            'description': description,
            'startdate': startDate,
            'enddate': endDate,
            'status': status,
            'minimumprice': minimumPrice,
            'discount': discount,

        };

        var result = await postData('offers/edit_coupons', body)
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
        setBtnStatus(false)
        fetchAllOffers()
        setMessage('')
    }


    /* API FOR DELETION OF OFFER */

    const handleDelete = async (rowData) => {
        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete this offer?',

            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(async (result) => {

            if (result.isConfirmed) {
                var res = await postData('offers/delete_coupon', { couponid: rowData.couponid })

                if (res.status) {
                    Swal.fire('Deleted!', '', 'Success')
                    fetchAllOffers()
                }
                else
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                    })

            }
        })

    }


    /* FORM DETAILS OF SELECTED OFFER */

    const showOfferDetails = () => {
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
                            Offer Details
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>
                    </DialogTitle>
                    <DialogContent >
                        <Grid container spacing={2} style={{ marginTop: 5 }}>
                            <Grid item xs={6}>
                                <TextField value={couponCode} onChange={(event) => setCouponCode(event.target.value)} fullWidth label="Coupon Code" variant="outlined" />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField value={discount} onChange={(event) => setDiscount(event.target.value)} fullWidth label="Discount" variant="outlined" />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField value={description} onChange={(event) => setDescription(event.target.value)} fullWidth label="Description" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <TextField value={minimumPrice} onChange={(event) => setMinimumPrice(event.target.value)} fullWidth label="Minimum Price" variant="outlined" />
                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <MobileDatePicker
                                        label="Start Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={startDate}
                                        onChange={handleStartDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                            </Grid>

                            <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>

                                    <MobileDatePicker
                                        label="End Date"
                                        inputFormat="MM/DD/YYYY"
                                        value={endDate}
                                        onChange={handleEndDate}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>


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



    /* TABLE OF OFFER DETAILS */

    function showAllOffers() {
        return (
            <MaterialTable
                title={<span className={classes.headingStyle}>OFFERE LIST</span>}
                columns={[

                    {
                        title: 'COUPON CODE', field: 'couponcode',
                        render: rowData => rowData.couponcode
                    },

                    {
                        title: 'DISCOUNT', field: 'discount',
                        render: rowData => rowData.discount
                    },

                    {
                        title: 'DESCRIPTION', field: 'description',
                        render: rowData => rowData.description
                    },

                    {
                        title: 'START DATE', field: 'startdate',
                        render: rowData => rowData.startdate
                    },

                    {
                        title: 'END DATE', field: 'enddate',
                        render: rowData => rowData.enddate
                    },

                    {
                        title: 'STATUS', field: 'status',
                        render: rowData => rowData.status == 1 ? <div> Available</div> : <div>Not Available</div>
                    },

                    {
                        title: 'MINIMUM PRICE', field: 'minimumprice',
                        render: rowData => rowData.minimumprice
                    },

                    {
                        title: 'Picture',
                        render: rowData => <Avatar src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 70, height: 70 }} variant="rounded" />
                    },


                ]}
                data={offers}
                actions={[

                    {
                        icon: AddIcon,
                        isFreeAction: true,
                        tooltip: 'Add Offers',
                        onClick: (event) => navigate('/offers')
                    },

                    {
                        icon: EditIcon,
                        tooltip: 'Edit Offer',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete Offer',
                        onClick: (event, rowData) => handleDelete(rowData)
                    }
                ]}

            />
        )
    }


    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            {showAllOffers()}
            {showOfferDetails()}
        </div>
    </div>)

}
