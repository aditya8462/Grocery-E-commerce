import React, { useState, useEffect } from 'react'
import Paper from '@mui/material/Paper';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Button, Grid} from '@mui/material';
import '../../../Stylesheet.css'
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { getData, ServerURL } from '../../Administrator/Services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import {  toast } from "react-toastify";

export default function Product() {
    const [product, setProduct] = useState([])
    const navigate = useNavigate()


    const fetchAllProducts = async () => {
        const result = await getData('userinterface/products')
       
        if (result.status) {
            setProduct(result.data)
 }

        else {
            toast("Error");
        }
    }

    useEffect(function () {
        fetchAllProducts()
    }, [])

    const ListTarget = () => {
        return (product.map((item) => {
            return (
                <Grid item xs={12} sm={6} md={4} className='Stylesheet_col-3' style={{ padding: 10 }} onClick={() => navigate('/productdetails/' + item.productid)}>
                    <Paper className='Stylesheet_conta1iner  Stylesheet_padding'>
                        <div>
                            <img src={`${ServerURL}/images/${item.picture}`} alt="products" className='Stylesheet_productimgmain' />
                        </div>
                        <div className={'Stylesheet_cardimgtxt'}>
                            <span>{item.productname}</span>
                            <span><FavoriteBorderIcon /></span>
                        </div>
                        <div style={{ margin: '5%' }}>
                            <div>
                                <div 
                                 className={'Stylesheet_red'}
                                 >
                                    {item.description}
                                    
                                </div>
                                When purchased online
                            </div>
                            <div>
                                <span className={'Stylesheet_green'}>Free shipping*</span><br />
                                <span className={'Stylesheet_underline'}>*Exclusions Apply.</span>
                            </div>
                            <div >
                                <span className={'Stylesheet_green'}>In stock </span>at Portage<br />
                                <span className={'Stylesheet_green'}>Ready within 2 hours</span> with pickup
                            </div>

                        </div>
                        <Button
                            style={{
                                backgroundColor: "rgb(204, 0, 0)",
                                 textTransform: "none",
                                color: '#fff',
                                marginLeft: '5%'
                            }}>
                            Add to cart
                        </Button>
                    </Paper>
                </Grid>


            )
        }))
     }

    
    
return (<div>

        <div className={'Stylesheet_maincontainered'}>
            <Grid container spacing={0}>
                <Grid item xs={12} md={3}  >
                    <div className={'Stylesheet_offerbox'}>
                        <Grid container spacing={2} className='Stylesheet_padding'>
                            <Grid item xs={12} md={12}>
                                <Grid item xs={12} md={12}>
                                    <div className={'Stylesheet_offerheading'}>
                                        How are you shopping today?
                                    </div>
                                </Grid>
                                <Paper className='Stylesheet_container  Stylesheet_padding'>
                                    <div>
                                        <div className={'Stylesheet_sub-container'} >
                                            <AddBusinessIcon className='Stylesheet_red' /> <div className='Stylesheet_pl-10 Stylesheet_bold'> PickUp</div>
                                        </div>
                                    </div>

                                    <div className={'Stylesheet_secondtext'}>
                                        In store pickup ready with in 2 hours
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Paper className='Stylesheet_container  Stylesheet_padding'>
                                    <div>
                                        <div className={'Stylesheet_text Stylesheet_sub-container'} >
                                            <ShoppingBagIcon className='Stylesheet_red' /> <div className='Stylesheet_pl-10 Stylesheet_bold'> Same Day Delivery</div>
                                        </div>
                                    </div>

                                    <div className={'Stylesheet_secondtext'}>
                                        Schedules contactless delivery as soon as today
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} md={12}>

                                <Paper className='Stylesheet_container  Stylesheet_padding'>
                                    <div>
                                        <div className={'Stylesheet_sub-container'}>
                                            <LocalShippingIcon className='Stylesheet_red' /> <div className='Stylesheet_pl-10 Stylesheet_bold'> Shipping</div>
                                        </div>
                                    </div>

                                    <div className={'Stylesheet_secondtext'}>
                                        Free with RedCard or $35 orders
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                   
                    </div>
                </Grid>

                <Grid item xs={12} md={9} >

                    <div className={'Stylesheet_cardbox'}>
                        <div className={'Stylesheet_displayfilter'} >

                            <div className={'Stylesheet_filter'}>
                             <SyncAltIcon className='Stylesheet_trend_4'/><span className='Stylesheet_trend_4' style={{ fontSize: 18 }}>Filter</span>
                            </div>
                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Category</span>
                            </div>
                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Type</span>
                            </div>
                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Brand</span>
                            </div>

                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Price</span>
                            </div>

                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Color</span>
                            </div>

                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Ratings</span>
                            </div>

                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Material</span>
                            </div>

                            <div className={'Stylesheet_filter'}>
                                <span style={{ fontSize: 18 }} className='Stylesheet_trend_4'>Finish</span>
                            </div>

                        </div>


                        <Grid container>
                            {ListTarget()}
                        </Grid>

                    </div>

                </Grid>


            </Grid >
        </div >




    </div >)

}