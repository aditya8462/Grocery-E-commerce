import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, Avatar,
    TextField,
    Grid,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormLabel,
    MenuItem,
    Badge
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Swal from 'sweetalert2';
import { useStyles } from "./DisplayAllProductCss";

export default function DisplayAllProducts(props) {
    var navigate = useNavigate()
    var classes = useStyles()
    const [products, setProducts] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [productName, setProductName] = useState('')
    const [productId, setProductId] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [trending, setTrending] = useState('')
    const [deals, setDeals] = useState('')
    const [priceType, setPriceType] = useState('')
    const [priceTypes, setPriceTypes] = useState([])
    const [categoryIds, setCategoryIds] = useState([])
    const [open, setOpen] = useState(false);
    const [btnStatus, setBtnStatus] = useState(false)
    const [oldPicture, setOldPicture] = useState('')
    const [message, setMessage] = useState("")
    const [inputFields, setInputFields] = useState("")
    const [inputBtnStatus, setInputBtnStatus] = useState(false)
    const [openPrice, setOpenPrice] = useState(false);
    const [Productsprices, setProductsprices] = useState([]);

    const [priceId, setPriceId] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [pstatus, setPstatus] = useState('')
    const [openEditPrice, setOpenEditPrice] = useState(false)
    const [pictures, setPictures] = useState([])
    const [newImages, setNewImages] = useState([])
    const [openAddMore, setOpenAddMore] = useState(false)


    const [picture, setPicture] = useState({
        fileName: "/assets/watermark.png",
        bytes: "",
    });

    /* API FOR FETCH ALL PRODUCTS */

    const fetchAllProducts = async () => {
        var result = await getData('product/fetch_all_products')
        setProducts(result.data)
    }
    useEffect(function () {
        fetchAllProducts()
    }, [])

    /* TO FETCH PRICE LIST OF PRODUCT */

    const fetchProductPrice = async (rowData) => {
        setProductId(rowData.productid)
        setPriceId(rowData.priceid)
        var result = await postData('product/fetch_product_price', { productid: rowData.productid })
        setProductsprices(result.data)
        setOpenPrice(true)

    }

    /* API FOR FETCH ALL CATEGORY */

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
            return (
                <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>)
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

    /* FOR FILL PRICETYPES IN DROPDOWN */

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
        setBtnStatus(true)
    };

    /* OPEN UPDATION FORM FOR SELECTED PRODUCT */

    const handleOpenDialog = (rowData) => {
        setProductId(rowData.productid)
        setCategoryId(rowData.categoryid)
        setProductName(rowData.productname)
        setDescription(rowData.description)
        setStatus(rowData.status)
        setTrending(rowData.trending)
        setDeals(rowData.deals)
        setPriceType(rowData.pricetype)
        setPicture({
            fileName: `${ServerURL}/images/${rowData.picture}`,
            bytes: "",
        })
        setOldPicture(rowData.picture)
        setPriceId(rowData.priceId)
        setOpen(true)

    }
    /* CANCEL BUTTON OF UPDATION FORM */

    const handleClose = () => {
        setOpen(false)
        setMessage('')
        setOpenPrice(false)


    }

    /* API FOR SUBMIT UPDATED PRODUCT */

    const handleEditData = async () => {

        var body = {
            'productid': productId,
            'categoryid': categoryId,
            'productname': productName,
            'description': description,
            'status': status,
            'trending': trending,
            'deals': deals,
            'pricetype': priceType,


        }

        var result = await postData('product/edit_product', body)
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
        fetchAllProducts();

    }

    /* CANCEL BUTTON OF PICTURE UPLOAD */

    const handleCancel = () => {
        setPicture({ fileName: `${ServerURL}/images/${oldPicture}`, bytes: '' })
        setOldPicture('')
        setBtnStatus(false)
        setMessage('')
    }


    /* API FOR DELETION OF PRODUCT */

    const handleDelete = async (rowData) => {

        setOpen(false)
        Swal.fire({
            title: 'Do you want to delete the product?',

            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(async (result) => {

            if (result.isConfirmed) {
                var res = await postData('product/delete_product', { productid: rowData.productid })

                if (res.status) {
                    Swal.fire('Deleted!', '', 'Success')
                    fetchAllProducts()
                }
                else
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                    })

            }
        })
    }


    /* API FOR SUBMIT UPDATED PICTURE */

    const handleSaveImage = async () => {
        var formData = new FormData()
        formData.append('productid', productId)
        formData.append('picture', picture.bytes)
        var result = await postData('product/edit_product_image', formData)
        if (result.status) {
            setMessage("/assets/tick.gif")
        }
        else {
            setMessage('')
        }
        fetchAllProducts()
        setBtnStatus(false)

    }

    /* BUTTONS FOR NEW PICTURE UPLOAD */

    const PictureButton = () => {
        return (<div>
            {btnStatus ? <div style={{ display: 'flex', padding: 10 }}>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleSaveImage}>Save</Button>
            </div> : <div style={{ fontSize: 20, color: 'green', fontWeight: 'bold' }} ><img src={`${message}`} width="60" /></div>}
        </div>)

    }

    const handleRemoveImage = (index) => {
        const data = [...pictures];
        data.splice(index, 1);
        setPictures(data)
    }

    const handleRemoveImageNewImages = (index) => {
        const data = [...newImages];
        data.splice(index, 1);
        setNewImages(data)
    }


    const handleOpenPrice = (rowData) => {
        setPriceId(rowData.priceid)
        setPictures(rowData.pictures.split("#"))
        setProductId(rowData.productid)
        setQty(rowData.qty)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setPstatus(rowData.status)
        setOpenEditPrice(true)

    }

    const handleEditPrice = async () => {
        const formData = new FormData()
        formData.append('priceid', priceId)
        formData.append('qty', qty)
        formData.append('price', price)
        formData.append('offerprice', offerPrice)
        formData.append('status', pstatus)
        formData.append('pictures', JSON.stringify(pictures))
        newImages.map((item) => {
            formData.append("icon", item)
        })

       

        var result = await postData('product/edit_product_price', formData)

        if (result.status) {
            setOpenPrice(false)
            setOpenEditPrice(false)
            setNewImages([])
            Swal.fire({
                icon: 'success',
                title: result.message,
            })     

        }

        else {
            setOpenEditPrice(false)
            Swal.fire({
                icon: 'error',
                title: result.message,
            })
        }

    }

    const handleAddMore = () => {
        setOpenAddMore(true)


    }

    const handleAddMorePrice = async (rowData) => {
        var formData = new FormData()
        formData.append("productid", productId)
        formData.append("qty", qty)
        formData.append("price", price)
        formData.append("offerprice", offerPrice)
        formData.append("pstatus", pstatus)
        newImages.map((item) => {
            formData.append("icon", item)
        })

        var result = await postData('product/add_product_price', formData)

        if (result.status) {
            setOpenAddMore(false)
            setNewImages([])
            fetchProductPrice({ productid: productId })
        }
        else {
            setOpenAddMore(false)
            Swal.fire({
                icon: 'error',

                title: result.message,
            })
        }
    }

    const closeAddMore = () => {
        setOpenAddMore(false)
    }



    const showAddMorePrice = () => {
        return (
            <div>
                <Dialog open={openAddMore}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" width="40" />
                            List
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={closeAddMore} />
                        </div>

                    </DialogTitle>

                    <DialogContent style={{ padding: 10 }}>

                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Quantity" name="qty" fullWidth onChange={(event) => setQty(event.target.value)} />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Price" fullWidth name="price" onChange={(event) => setPrice(event.target.value)} />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Offer Price" fullWidth name="offerprice"
                                onChange={(event) => setOfferPrice(event.target.value)} />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl>
                                <FormLabel id="status">Status:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="status"
                                    name="status"
                                    onChange={(event) => setPstatus(event.target.value)}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="0" control={<Radio />} label="No" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} >
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
                                    multiple
                                    onChange={handleImages}
                                />
                                <PhotoCamera />
                            </IconButton>
                            <div style={{ display: 'flex' }}>
                                {pictures.map((item, index) => (
                                    <Badge badgeContent={'X'} color="secondary" style={{ cursor: "pointer" }}>
                                        <Avatar
                                            alt="Img"
                                            variant="rounded"
                                            src={`${ServerURL}/images/${item}`}
                                            sx={{ width: 56, height: 56, p: 1 }}
                                        />
                                    </Badge>

                                ))}
                                {newImages.map((item, index) => (
                                    <Badge badgeContent={'X'} color="secondary" style={{ cursor: "pointer" }} onClick={() => handleRemoveImageNewImages(index)}>
                                        <Avatar
                                            alt="Img"
                                            variant="rounded"
                                            src={URL.createObjectURL(item)}
                                            sx={{ width: 56, height: 56, p: 1 }}
                                        />
                                    </Badge>

                                ))}
                            </div>
                            <PictureButton />
                        </Grid>


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleAddMorePrice} >Add</Button>
                        <Button onClick={closeAddMore}>Cancel</Button>
                    </DialogActions>


                </Dialog>
            </div>
        )

    }


    const closePriceList = () => {
        setOpenEditPrice(false)
        setNewImages([])

    }

    const handleImages = (event) => {
        const newImagesTemp = Object.values(event.target.files)
        setNewImages([...newImages, ...newImagesTemp])
    }


    const openPriceList = () => {
        return (
            <div>
                <Dialog open={openEditPrice}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" width="40" />
                            Price List
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={closePriceList} />
                        </div>

                    </DialogTitle>

                    <DialogContent style={{ padding: 10 }}>

                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Quantity" name="qty" fullWidth value={qty} onChange={(event) => setQty(event.target.value)} />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Price" fullWidth name="price" value={price} onChange={(event) => setPrice(event.target.value)} />
                        </Grid>
                        <Grid item xs={6} style={{ padding: 10 }}>
                            <TextField label="Offer Price" fullWidth name="offerprice" value={offerPrice}
                                onChange={(event) => setOfferPrice(event.target.value)} />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl>
                                <FormLabel id="status">Status:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="status"
                                    name="status"
                                    value={pstatus}
                                    onChange={(event) => setPstatus(event.target.value)}
                                >
                                    <FormControlLabel value="1" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="0" control={<Radio />} label="No" />

                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6} >
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
                                    multiple
                                    onChange={handleImages}
                                />
                                <PhotoCamera />
                            </IconButton>
                            <div style={{ display: 'flex' }}>
                                {pictures.map((item, index) => (
                                    <Badge badgeContent={'X'} color="secondary" style={{ cursor: "pointer" }} onClick={() => handleRemoveImage(index)}>
                                        <Avatar
                                            alt="Img"
                                            variant="rounded"
                                            src={`${ServerURL}/images/${item}`}
                                            sx={{ width: 56, height: 56, p: 1 }}
                                        />
                                    </Badge>

                                ))}
                                {newImages.map((item, index) => (
                                    <Badge badgeContent={'X'} color="secondary" style={{ cursor: "pointer" }} onClick={() => handleRemoveImageNewImages(index)}>
                                        <Avatar
                                            alt="Img"
                                            variant="rounded"
                                            src={URL.createObjectURL(item)}
                                            sx={{ width: 56, height: 56, p: 1 }}
                                        />
                                    </Badge>

                                ))}
                            </div>
                            <PictureButton />
                        </Grid>


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleEditPrice} >Edit</Button>
                        <Button onClick={closePriceList}> Cancel</Button>
                    </DialogActions>


                </Dialog>
            </div>
        )
    }



    const handlePriceDelete = async(rowData) => {
        setOpenAddMore(false)
        setOpenPrice(false)
        Swal.fire({
            title: 'Do you want to delete this item?',

            showCancelButton: true,
            confirmButtonText: 'Delete',

        }).then(async (result) => {

            if (result.isConfirmed) {
                var res = await postData('product/delete_product_price',{ priceid: rowData.priceid })
                if (res.status) {
            fetchProductPrice({ productid: productId })       
                }
                else
                    Swal.fire({
                        icon: 'error',
                        title: result.message,
                    })

            }else{
            fetchProductPrice({ productid: productId })       
            }
        })

    }


    const showProductDetails = () => {
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
                            Product Details
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>
                    </DialogTitle>
                    <DialogContent >
                        <Grid container spacing={2} style={{ marginTop: 5 }}>

                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={categoryId}
                                        label="CategoryId"
                                        onChange={(event) => setCategoryId(event.target.value)}
                                   
                                    >
                                        <MenuItem value={''}></MenuItem>
                                        {fillCategory()}
                                    </Select>
                                </FormControl>

                            </Grid>


                            <Grid item xs={6}>
                                <TextField value={productName} fullWidth onChange={(event) => setProductName(event.target.value)} label="Product Name" variant="outlined" />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField value={description} fullWidth onChange={(event) => setDescription(event.target.value)} label="Description" variant="outlined" />
                            </Grid>


                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="pType">Price Type</InputLabel>
                                    <Select
                                        labelId="pType"
                                        id="select_ptype"
                                        value={priceType}
                                        label="PriceType"
                                        onChange={(event) => setPriceType(event.target.value)}
                                    
                                    >
                                        <MenuItem value={''}></MenuItem>
                                        {fillPrTypes()}
                                    </Select>
                                </FormControl>

                            </Grid>



                            <Grid item xs={6}>

                                <FormControl>
                                    <FormLabel id="trending">Trending:</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="trending"
                                        name="trending"
                                        onChange={(event) => setTrending(event.target.value)}

                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Yes" checked={trending === '1'} />
                                        <FormControlLabel value="0" control={<Radio />} label="No" checked={trending === '0'} />

                                    </RadioGroup>

                                </FormControl>

                            </Grid>

                            <Grid item xs={6}>

                                <FormControl>
                                    <FormLabel id="deals">Deals:</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="deals"
                                        name="deals"
                                        onChange={(event) => setDeals(event.target.value)}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Yes" checked={deals === '1'} />
                                        <FormControlLabel value="0" control={<Radio />} label="No" checked={deals === '0'} />

                                    </RadioGroup>
                                </FormControl>

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
                                        <FormControlLabel value="1" control={<Radio />} label="Available" checked={status === '1'} />
                                        <FormControlLabel value="0" control={<Radio />} label="Not Available" checked={status === '0'} />

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
                                    alt="Img"
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
                        <Button onClick={handleClose}> Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }



    const showPriceList = () => {

        return (
            <div>
                <Dialog open={openPrice}
                    fullWidth
                    maxWidth="md"
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" width="40" />
                            Product
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>

                    </DialogTitle>

                    <DialogContent>

                        <MaterialTable
                            title={<span className={classes.headingStyle}>Price List</span>}
                            columns={[


                                {
                                    title: 'Quantity ', field: 'qty',
                                    render: rowData => <div>{rowData.qty}</div>
                                },

                                {
                                    title: 'Price', field: 'price',
                                    render: rowData => <div>{rowData.price}</div>
                                },

                                {
                                    title: 'Offer Price', field: 'offerprice',
                                    render: rowData => <div>{rowData.offerprice}</div>
                                },

                                {
                                    title: 'Status', field: 'status',
                                    render: rowData => rowData.status == 1 ? <div> Available</div> : <div>Not Available</div>
                                },

                                {
                                    title: 'Pictures', field: 'pictures',
                                    render: rowData => <div style={{ display: "flex" }}> {rowData.pictures.split("#").map(item => <img src={`${ServerURL}/images/${item}`} width='50' height='50' style={{ padding: 4 }} />)}</div>

                                }


                            ]}

                            data={Productsprices}

                            actions={[

                                {
                                    icon: EditIcon,
                                    tooltip: 'Edit PriceList',
                                    onClick: (event, rowData) => handleOpenPrice(rowData)
                                },

                                {
                                    icon: AddIcon,
                                    tooltip: 'Add More',
                                    isFreeAction: true,
                                    onClick: (event, rowData) => handleAddMore(rowData)
                                },

                                {
                                    icon: DeleteIcon,
                                    tooltip: 'Delete PriceList',
                                    onClick: (event, rowData) => handlePriceDelete(rowData)
                                }

                            ]}
                        />

                    </DialogContent>
                </Dialog>
            </div>
        )

    }



    function showAllProducts() {
        return (
            <MaterialTable
                title={<span className={classes.headingStyle}>Product List</span>}
                columns={[


                    {
                        title: 'Category ', field: 'categoryname',
                        render: rowData => <div>{rowData.categoryname}</div>
                    },

                    {
                        title: 'Product Name',field: 'productname',
                        render: rowData => <div>{rowData.productname}</div>
                    },

                    {
                        title: 'Description',
                        render: rowData => <div>{rowData.description}</div>
                    },

                    {
                        title: 'Price Type',
                        render: rowData => <div>{rowData.pricetypeid}</div>
                    },

                    {
                        title: 'Trending',
                        render: rowData => rowData.status == 1 ? <div> Yes</div> : <div>No</div>
                    },

                    {
                        title: 'Deals',
                        render: rowData => rowData.status == 1 ? <div> Yes</div> : <div>No</div>
                    },




                    {
                        title: 'Status',
                        render: rowData => rowData.status == 1 ? <div> Available</div> : <div>Not Available</div>
                    },


                    {
                        title: 'Picture',
                        render: rowData => <Avatar src={`${ServerURL}/images/${rowData.picture}`} style={{ width: 70, height: 70 }} variant="rounded" />
                    },


                ]}
                data={products}
                actions={[


                    {
                        icon: AddIcon,
                        isFreeAction: true,
                        tooltip: 'Add Product',
                        onClick: (event) => navigate('/dashboard/product')
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
                    },

                    {
                        icon: CurrencyRupeeIcon,
                        tooltip: 'Price List',
                        onClick: (event, rowData) => fetchProductPrice(rowData)
                    }
                ]}

            />
        )
    }





    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            {showAllProducts()}
            {showProductDetails()}
            {showPriceList()}
            {openPriceList()}
            {showAddMorePrice()}
        </div>
    </div>)

}