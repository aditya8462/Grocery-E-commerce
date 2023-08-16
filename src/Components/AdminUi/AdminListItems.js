import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

export default function AdminListItems() {
    const navigate = useNavigate()
    const handleClick = (v) => {
        navigate("/dashboard/" + v);
    }
    const handleLogOut=()=>{
    
        localStorage.removeItem('ADMIN')
        navigate('/admin')
    }
    return (
        <React.Fragment>
            <ListItemButton onClick={() => handleClick("category")}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Category" />
            </ListItemButton>
           
            <ListItemButton onClick={() => handleClick("product")}>
                <ListItemIcon>
                <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Product" />
            </ListItemButton>
            <ListItemButton onClick={() => handleClick("banner")}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Banner" />
            </ListItemButton>
            

            <ListItemButton onClick={() => handleClick("offers")}>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Offers" />
            </ListItemButton>

            <ListItemButton onClick={() => handleClick("displaymyorder")}>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItemButton>

            <ListItemButton  
          onClick={handleLogOut}
        >
          <ListItemIcon>
            <LogoutIcon/>
          </ListItemIcon>
          <ListItemText   primary={<span style={{fontWeight:600,letterSpacing:1, fontFamily:'Poppins'}}>Logout</span>} />
        </ListItemButton>

        </React.Fragment>
    )
}
