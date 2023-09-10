
import { AppBar, Box, Button, Drawer, IconButton,  List, ListItem, ListItemButton, ListItemText, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";



const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
  }

  return (
    // Responsive Nav bar with Drawer (Menu Icon and Drawer will be shown in xs screen)
    <div>
      <AppBar position="static" >
        <Toolbar >
          <Box display="flex" alignItems="center" gap={3}>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{display: {sm: "none"}}} onClick={toggleDrawer} >
              <MenuIcon />
            </IconButton>

            <Box display="flex" alignItems="center" className="brand">
              <AvTimerIcon sx={{height: "40px", width:"40px",  display: {xs: "none", sm: "block"}}} onClick={() => { navigate("/")}} />
              <Typography variant="h5" onClick={() => { navigate("/")}}>
                Performance Stopwatch
              </Typography>
            </Box>

          
            <Button sx={{color: "white", display: {xs:"none", sm:"block"}}} onClick={() => { navigate("/measure-performance")}} >Measure Performance</Button>
            <Button sx={{color: "white", display: {xs:"none", sm:"block"}}} onClick={() => { navigate("/show-performance")}}>Show Performance</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/measure-performance" onClick={toggleDrawer}>
              <ListItemText primary="Measure Performance" />
            </ListItemButton>
          </ListItem >
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/show-performance" onClick={toggleDrawer}>
              <ListItemText primary="Show Performance" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </div>
  )
}


export default Navbar;


