import { useEffect, useState } from 'react'
import MaterialTable from "@material-table/core";
import { getData, postData, ServerURL } from '../Administrator/Services/FetchNodeServices';

import {
    Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select,
    Grid,
    FormControl, InputLabel, Button
} from '@mui/material';
import moment from "moment/moment";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from "@mui/icons-material/Search"
import InputAdornment from '@mui/material/InputAdornment';
import PreviewIcon from '@mui/icons-material/Preview';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from "./DisplayAllOrdersCss";

export default function DisplayAllOrders(props) {
    var classes = useStyles();
    const [myOrders, setMyOrders] = useState([])
    const [orderDetails, setOrderDetails] = useState([])
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState('')
    const [openBill, setOpenBill] = useState(false)
    const [bill, setBill] = useState({});




    /* API FOR FETCH ORDER DETAILS */

    const fetchAllOrders = async () => {
        var result = await getData('bill/fetch_all_orders')
        setMyOrders(result.data)
    }
    useEffect(function () {
        fetchAllOrders()

    }, [])

    const fetchOrderDetails = async (rowData) => {
        var result = await getData('bill/myorderproductsbybill/' + rowData.billid)
        if (result.status) {
            setOrderDetails(result.data);
        }
    }

    const fetchOrderByBill = async (rowData) => {
        var result = await getData("bill/myorderbybill/" + rowData.billid);
        if (result.status) {
            setBill(result.data);
        }
    };



    const handleOpenDialog = (rowData) => {
        setOpen(true)
        fetchOrderDetails(rowData)

    }

    const handleBillDialog = (rowData) => {
       
        setOpenBill(true)
        fetchOrderByBill(rowData)
    }

    const handleClose = () => {
        setOpen(false)
        setOpenBill(false)
    }

    const handleStatus = async (event, rowData) => {

        setStatus(event.target.value)

        var body = {
            'status': event.target.value
        }


        var result = await postData('bill/update_status/' + rowData.billid, body)
        fetchAllOrders()

    }




    function ShowBillDetails() {
        return (
            <div>
                <Dialog
                    open={openBill}
                    
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/assets/logo.png" width="40" />
                            Bill Details
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>
                    </DialogTitle>

                    <DialogContent >

                        <Grid style={{ padding: 10 }} container spacing={2}>
                            <Grid item xs={12}>
                                <center style={{ fontSize: 20, fontWeight: "bold" }}>
                                    {" "}
                                    Tax Invoice
                                </center>
                            </Grid>
                            <Grid item xs={9}>
                                <div style={{ fontSize: 18, fontWeight: "bold" }}>
                                    {" "}
                                    Sold By:Vipin Kirana Store,
                                </div>
                                <div style={{ paddingTop: 5 }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16 }}>
                                        Ship-from Address:
                                        <span style={{ fontWeight: 500, fontSize: 14 }}>
                                            Subhash Nagar A B Road Bahodapur Gwalior
                                        </span>
                                    </div>

                                    <div style={{ fontWeight: "bold", fontSize: 16 }}>
                                        Payment Mode:
                                        <span style={{ fontWeight: 500, fontSize: 14 }}>
                                            {bill?.paymentmethod}
                                        </span>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={3}>
                                <div
                                    style={{
                                        borderStyle: "dotted",
                                        textAlign: "center",
                                        fontSize: 18,
                                        fontWeight: "bold",
                                        padding: 5,
                                    }}
                                >
                                    Invoice Number
                                    <span style={{ fontWeight: 400 }}> #VKS-{bill?.billid}</span>
                                    <div>Invoice Date:19-02-2021</div>
                                </div>
                            </Grid>
                            <hr style={{ background: "#000", height: 1, width: "100%" }} />
                            <Grid style={{ fontSize: 16, fontWeight: "bold" }} item xs={2}>
                                <div>Order ID: {bill?.billid}</div>
                                <div>Order Date: {moment(bill?.created_at).format("D/M/YYYY ")} </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}> Bill To:-</div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>{bill?.cname}</div>
                                <div>{bill?.cname},{bill?.caddress}</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}> Ship To:-</div>
                                <div style={{ fontSize: 16, fontWeight: "bold" }}>{bill?.cname}</div>
                                <div>{bill?.cname},{bill?.caddress}</div>
                            </Grid>
                            <hr style={{ background: "#000", height: 0.5, width: "100%" }} />

                            <Grid item xs={12}>
                                <font size={2}>
                                    <table
                                        style={{ width: "100%", borderCollapse: "collapse" }}
                                        cellPadding={5}
                                        cellSpacing={10}
                                    >
                                        <tr style={{ borderBottom: "1px solid #000", padding: 10 }}>
                                            <th>Product</th>
                                            <th>Title</th>
                                            <th>qty</th>
                                            <th>Gross Amount₹</th>
                                            <th>Discount₹</th>
                                            {/* <th>IGST₹</th> */}
                                            <th>Total₹</th>
                                        </tr>
                                        {bill?.products?.map((item, index) => {
                                            return (
                                                <tr style={{ borderBottom: "1px solid #000", padding: 10 }}>

                                                    <th>{index + 1}</th>
                                                    <th>{item.productname}</th>
                                                    <th>{item.qty}</th>
                                                    <th>{(item.price) * (item.qty)} </th>
                                                    <th>{(parseInt(item.price) - parseInt(item.offerprice)) * (item.qty)}</th>
                                                    {/* <th>20</th> */}
                                                    <th>{(item.offerprice) * (item.qty)}</th>
                                                </tr>)
                                        })
                                        }
                                        <tr>
                                            <th></th>
                                            <th>Total</th>
                                            <th>{bill?.productcount}</th>
                                            <th>₹{bill?.mrp}</th>
                                            <th>₹{bill?.discount}</th>

                                            <th>₹{bill?.total}</th>
                                        </tr>
                                    </table>
                                </font>
                            </Grid>
                            <hr style={{ background: "#000", height: 0.5, width: "100%" }} />

                            <Grid item xs={12}>
                                <div
                                    style={{
                                        fontSize: 20,
                                        textAlign: "right",
                                        fontWeight: "600",
                                        padding: 10,
                                    }}
                                >
                                    Grand Total &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <span style={{ fontWeight: "bold" }}>₹&nbsp;{bill?.total}</span>
                                    <div style={{ fontSize: 20, paddingTop: "5%" }}>
                                        Vipin kirana private limited
                                    </div>
                                    <div style={{ fontSize: 16 }}>Authorized Signatory</div>
                                </div>
                                <hr style={{ background: "#000", height: 0.5, width: "100%" }} />
                                <button onClick={window.print}>Print this page</button>
                            </Grid>
                        </Grid>

                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }



    function ShowOrderDetails() {
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
                            Order Details
                        </div>
                        <div>
                            <CloseIcon style={{ cursor: 'pointer' }} onClick={handleClose} />
                        </div>
                    </DialogTitle>
                    <DialogContent >
                        <MaterialTable
                            title={<span className={classes.headingStyle}>MY ORDERS</span>}
                            columns={[

                                {
                                    title: 'BILL ID', field: 'billid',
                                    render: rowData => <div>{rowData.billid}</div>

                                },

                                {
                                    title: 'CATEGORY ID', field: 'categoryid',
                                    render: rowData => rowData.categoryid
                                },

                                {
                                    title: 'PRODUCT ID', field: 'productid',
                                    render: rowData => rowData.productid
                                },

                                {
                                    title: 'PRODUCT NAME', field: 'productname',
                                    render: rowData => rowData.productname
                                },
                                {
                                    title: 'PRICE', field: 'price',
                                    render: rowData => rowData.price
                                },
                                {
                                    title: 'OFFER PRICE', field: 'offerprice',
                                    render: rowData => rowData.offerprice
                                },

                                {
                                    title: 'QUANTITY', field: 'qty',
                                    render: rowData => rowData.qty
                                },

                                {
                                    title: 'IMAGE', field: 'picture',
                                    render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} width="100" height={100} />
                                },

                            ]}

                            data={orderDetails}

                            actions={[


                            ]}


                        />

                    </DialogContent>
                    <DialogActions>

                    </DialogActions>
                </Dialog>
            </div>
        );

    }

    const handleSearchOrder = (event) => {
        setStatus(event.target.value)
    }

    const search = async () => {
        var body = {
            'status': status
        }


        var result = await postData('bill/fetch_orders_by_status', body)
        if (result.status) {
            setMyOrders(result.data)
        }

    }

    function searchOrders() {
        return (
            <div >
                <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Grid item xs={10}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Search Order</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Age"
                                onChange={(event) => handleSearchOrder(event)}
                            >
                                <MenuItem value="Placed">Placed</MenuItem>
                                <MenuItem value="In-transit">In-transit</MenuItem>
                                <MenuItem value='Out for Delivery'>Out for Delivery</MenuItem>
                                <MenuItem value='Delivered on'>Delivered on</MenuItem>
                                <MenuItem value='Cancelled by Admin'>Cancelled by Admin</MenuItem>
                                <MenuItem value='Cancelled by User'>Cancelled by User</MenuItem>
                            </Select>

                        </FormControl>

                    </Grid>

                    <Grid item xs={2}>
                        <Button variant="contained" component="label" onClick={search} >
                            Search
                        </Button>

                    </Grid>

                </Grid>

            </div>
        )
    }

    /* TABLE OF ORDER DETAILS */

    function showAllOrders() {
        return (
            <MaterialTable
                title={<span className={classes.headingStyle}>MY ORDERS</span>}
                columns={[

                    {
                        title: 'STATUS', field: 'status',
                        render: rowData => (<Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={rowData.status}
                            label="Age"
                            onChange={(event) => handleStatus(event, rowData)}
                        >
                            <MenuItem value="Placed">Placed</MenuItem>
                            <MenuItem value="In-transit">In-transit</MenuItem>
                            <MenuItem value='Out for Delivery'>Out for Delivery</MenuItem>
                            <MenuItem value='Delivered on'>Delivered on</MenuItem>
                            <MenuItem value='Cancelled by Admin'>Cancelled by Admin</MenuItem>
                            <MenuItem value='Cancelled by User'>Cancelled by User</MenuItem>
                        </Select>)

                    },


                    {
                        title: 'MOBILE', field: 'cmobile',
                        
                        render: rowData => <div>{rowData.cmobile}</div>

                    },

                    {
                        title: 'EMAIL ADDRESS', field: 'cemail',
                        render: rowData => rowData.cemail
                    },

                    {
                        title: 'ADDRESS', field: 'caddress',
                        render: rowData => rowData.caddress
                    },

                    {
                        title: 'NAME', field: 'cname',
                        render: rowData => rowData.cname
                    },
                    {
                        title: 'PAYMENT METHOD', field: 'paymentmethod',
                        render: rowData => rowData.paymentmethod
                    },
                    {
                        title: 'TRANSACTION ID', field: 'transactionid',
                        render: rowData => rowData.transactionid
                    },

                    {
                        title: 'GST NO.', field: 'cgst',
                        render: rowData => rowData.cgst
                    },

                    {
                        title: 'DELIVARY CHARGE', field: 'delivarycharges',
                        render: rowData => rowData.delivarycharges
                    },

                    {
                        title: 'USER ID', field: 'userid',
                        render: rowData => rowData.userid
                    },

                    {
                        title: 'MRP', field: 'mrp',
                        render: rowData => rowData.mrp
                    },


                    {
                        title: 'DISCOUNT', field: 'discount',
                        render: rowData => rowData.discount
                    },

                    {
                        title: 'TOTAL', field: 'total',
                        render: rowData => rowData.total
                    },


                ]}

                data={myOrders}

                actions={[

                    {
                        icon: PreviewIcon,
                        tooltip: 'Order List',
                        onClick: (event, rowData) => handleOpenDialog(rowData)
                    },

                    {
                        icon: ReceiptLongIcon,
                        tooltip: 'Bill Receipt',
                        onClick: (event, rowData) => handleBillDialog(rowData)
                    }


                ]}


            />
        )
    }


    return (<div className={classes.mainContainer}>
        <div className={classes.box}>
            <div style={{ padding: 10 }}>
                {searchOrders()}
            </div>
            {showAllOrders()}
            {ShowOrderDetails()}
            {ShowBillDetails()}

        </div>
    </div>)

}
