import React, { useState, useEffect } from "react";
import {
    Avatar,
    TextField,
    Button,
    Grid,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Radio,
    Tooltip,
    RadioGroup,
    FormControlLabel,
    FormLabel, Dialog, DialogTitle, DialogContent

} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { DropzoneDialog, DropzoneArea } from 'material-ui-dropzone'
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { useStyles } from "./ProductCss";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import Swal from "sweetalert2"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

export default function Product(props) {
    var navigate = useNavigate()
    const [categoryId, setCategoryId] = useState('')
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [trending, setTrending] = useState('')
    const [deals, setDeals] = useState('')
    const [priceType, setPriceType] = useState('')
    const [priceTypes, setPriceTypes] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [inputFields, setInputFields] = useState([])
    const [inputBtnStatus, setInputBtnStatus] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [open, setOpen] = useState(false)
    const [picture, setPicture] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
    });
    const [error, setError] = useState({})

    var classes = useStyles();

    /* API FOR FETCH ALL CATEGORIES */

    const fetchAllCategory = async () => {
        var result = await getData('product/fetch_all_category')
        setCategoryIds(result.data)
    }

    useEffect(function () {
        fetchAllCategory()

    }, [])

    /* FOR FILL CATEGORIES IN DROPDOWN */

    const fillCategory = () => {
        return categoryIds.map((item) => {
            return (<MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)

        })
    }

    /* API FOR FETCH ALL PRICETYPES */

    const fetchAllPriceTypes = async () => {
        var result = await getData('product/fetch_all_pricetype')
        setPriceTypes(result.data)
    }

    useEffect(function () {
        fetchAllPriceTypes()

    }, [])

    /* FOR FILL ALL PRICETYPES IN DROPDOWN */

    const fillPrTypes = () => {
        return priceTypes.map((item) => {
            return (<MenuItem value={item.pricetypid}>{item.prtype}</MenuItem>)

        })
    }


    /* FOR UPLOAD PICTURE */

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
        if (!productName) {
            handleError('productName', "Pls Input Product Name")
            isValid = false
        }
        if (!priceType || priceType == "Choose PriceType...") {
            handleError('priceType', "Pls Select PriceType")
            isValid = false
        }
        if (!description) {
            handleError('description', "Pls Input Description")
            isValid = false
        }
        if (!deals) {
            handleError('deals', "Pls Select Deals")
            isValid = false
        }
        if (!trending) {
            handleError('trending', "Pls Select Trending")
            isValid = false
        }
        if (!status) {
            handleError('status', "Pls Select Status")
            isValid = false
        }

        return isValid
    }

    /* FOR CLEAR VALUE OF FORM AFTER SUBMIT */

    const clearValue = () => {
        setCategoryId('Choose Category...')
        setProductName('')
        setDescription('')
        setStatus('')
        setTrending('')
        setDeals('')
        setPriceType('Choose PriceType...')
        setPicture({
            fileName: "/assets/watermark.png",
            bytes: "",
        })

    }

    /* API FOR ADD NEW PRODUCT */

    const handleClick = async () => {
        if (validation()) {
            var formData = new FormData()
            formData.append('categoryid', categoryId)
            formData.append('productname', productName)
            formData.append('description', description)
            formData.append('picture', picture.bytes)
            formData.append('status', status)
            formData.append('trending', trending)
            formData.append('deals', deals)
            formData.append('pricetype', priceType)
            var qty = []
            var price = []
            var offerprice = []
            var icon = []
            var pstatus = []
            inputFields.map((item, index) => {
                qty.push(item.qty)
                price.push(item.price)
                offerprice.push(item.offerprice)
                item.pictures.map((it) => {
                    formData.append("icon" + index, it)
                })
                pstatus.push(item.status)
            })
            formData.append("qty", JSON.stringify(qty))
            formData.append("price", JSON.stringify(price))
            formData.append("offerprice", JSON.stringify(offerprice))
            formData.append("pstatus", JSON.stringify(pstatus))



            var result = await postData('product/add_new_product', formData)
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

    const handlePriceTypeChange = (event) => {
        setPriceType(event.target.value);
        setInputBtnStatus(true);
        setInputFields([{ qty: '', price: '', offerprice: "", pictures: [], status: "" }]);

    }
    const InputButton = () => {
        return (
            <div style={{ display: 'flex', padding: 10 }}>
                <Button onClick={addMore}>Add More</Button>

            </div>)
    }

    const handleFormChange = (index, event) => {
        const data = [...inputFields]
        data[index][event.target.name] = event.target.value
        setInputFields(data)
    }

    const handleFormSetOpen = (index) => {
        setCurrentIndex(index)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)

    }

    const handleImages = (files) => {
        const data = [...inputFields]
        data[currentIndex].pictures = [...data[currentIndex].pictures, ...files]
        setInputFields(data)
      
    }

    const handleFormImage = (index, event) => {

        return (
            <div>
                <Dialog open={open}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" width="40" />
                            Upload Picture
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>

                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={2} style={{ marginTop: 5 }}>
                            <Grid item xs={12}>
                                <DropzoneArea
                                    filesLimit={5}
                                    onChange={(files) => files.length && handleImages(files)}
                                />
                                <div style={{ width: '100%', display: "flex", flexWrap: "wrap" }}>
                                    {inputFields[currentIndex] ? inputFields[currentIndex].pictures.map((item) => {
                                        return (<img src={URL.createObjectURL(item)} width="100" height="100" style={{ padding: 20 }} />)
                                    }) : null}
                                </div>
                            </Grid>

                            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                <Button variant="contained" onClick={handleClose} >Done</Button>
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        )

    }

    const HandleInput = () => {
        return (<div>
            {inputFields.map((item, index) => (
                <Grid container spacing={2} style={{ marginTop: 5 }}>
                    <Grid item xs={2}>
                        <TextField label="Quantity" name="qty" fullWidth value={item.qty} onChange={(event) => handleFormChange(index, event)} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField label="Price" fullWidth name="price" value={item.price} onChange={(event) => handleFormChange(index, event)} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField label="Offer Price" fullWidth name="offerprice" value={item.offerprice} onChange={(event) => handleFormChange(index, event)} />
                    </Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" component="label" onClick={() => handleFormSetOpen(index)}>
                            Upload Picture
                        </Button>

                    </Grid>
                    <Grid item xs={3}>
                        <FormControl>
                            <FormLabel id="status">Status:</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="status"
                                name="status"
                                value={item.status}
                                onChange={(e) => handleFormChange(index, e)}
                            >
                                <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                <FormControlLabel value="0" control={<Radio />} label="No" />

                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            ))}

        </div>)


    }

    const addMore = () => {
        let newfield = { qty: '', price: '', offerprice: "", pictures: [], status: "" }
        setInputFields([...inputFields, newfield])

    }

    const formPage = () => {
        return (
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid item xs={12} className={classes.rowStyle}>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <div>
                            <img src="/assets/logo.png" width="40" />
                        </div>
                        <div className={classes.headingStyle}>Product Entry</div>
                    </div>

                    <div style={{ cursor: 'pointer' }} >
            <Tooltip title="Product List">
                        <FormatListBulletedIcon onClick={() => navigate('/dashboard/displayallproducts')} />
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
                            label="CategoryId"
                            onFocus={() => handleError("categoryId", null)}
                            onChange={(event) => setCategoryId(event.target.value)}
                       
                        >
                            <MenuItem value={'Choose Category...'}>Choose Category...</MenuItem>
                            {fillCategory()}
                        </Select>
                        <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.categoryId}</div>

                    </FormControl>

                </Grid>


                <Grid item xs={6}>
                    <TextField error={!error.productName ? false : true}
                     helperText={error.productName} onFocus={() => handleError("productName", null)} value={productName} fullWidth onChange={(event) => setProductName(event.target.value)} label="Product Name" variant="outlined" />
                </Grid>

                <Grid item xs={12}>
                    <TextField error={!error.description ? false : true} helperText={error.description} onFocus={() => handleError("description", null)} value={description} fullWidth onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" multiline rows={4} />
                </Grid>


                <Grid item xs={12}>
                    <FormControl fullWidth error={!error.priceType ? false : true}>
                        <InputLabel id="pType">Price Type</InputLabel>
                        <Select
                            labelId="pType"
                            id="select_ptype"
                            value={priceType}
                            onFocus={() => handleError("priceType", null)}
                            label="PriceType"
                            onChange={handlePriceTypeChange}
                        >
                            <MenuItem value={'Choose PriceType...'}>Choose PriceType...</MenuItem>
                            {fillPrTypes()}
                        </Select>
                        {inputBtnStatus ? <div style={{ marginTop: 10 }}>
                            {HandleInput()}
                            <InputButton /></div> : null}
                        <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.priceType}</div>

                    </FormControl>

                </Grid>
                <Grid item xs={6}>

                    <FormControl error={!error.trending ? false : true}>
                        <FormLabel id="trending">Trending:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="trending"
                            name="trending"
                            onFocus={() => handleError("trending", null)}
                            onChange={(event) => setTrending(event.target.value)}

                        >
                            <FormControlLabel value="1" control={<Radio />} label="Yes" checked={trending === '1'} />
                            <FormControlLabel value="0" control={<Radio />} label="No" checked={trending === '0'} />

                        </RadioGroup>
                        <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.trending}</div>


                    </FormControl>

                </Grid>

                <Grid item xs={6}>

                    <FormControl error={!error.deals ? false : true}>
                        <FormLabel id="deals">Deals:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="deals"
                            name="deals"
                            onFocus={() => handleError("deals", null)}

                            onChange={(event) => setDeals(event.target.value)}
                        >
                            <FormControlLabel value="1" control={<Radio />} label="Yes" checked={deals === '1'} />
                            <FormControlLabel value="0" control={<Radio />} label="No" checked={deals === '0'} />

                        </RadioGroup>
                        <div style={{ padding: 5, fontSize: 12, marginLeft: '10px', color: '#d32f2f', fontFamily: "Roboto, Helvetica, Arial, sans-serif" }}>{error.deals}</div>

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
                            <FormControlLabel value="1" control={<Radio />} label="Available" checked={status === '1'} />
                            <FormControlLabel value="0" control={<Radio />} label="Not Available" checked={status === '0'} />

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
                        alt="Img"
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
        );
    }
    return (
        <div className={classes.mainContainer}>
            <div className={classes.box}>
                {formPage()}
                {handleFormImage()}
            </div>
        </div>
    )
}
