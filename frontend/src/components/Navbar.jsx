import React, {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { IoHome, IoSettings, IoPeople, IoStatsChart, IoLogOut } from 'react-icons/io5'; // Import the necessary icons
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'; // Import necessary components from MUI
import { ExpandLess, ExpandMore } from '@mui/icons-material'; // Import the ExpandLess and ExpandMore icons
import { BsTable } from "react-icons/bs";
import Drawer from '@mui/material/Drawer';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { GiAirplaneDeparture } from "react-icons/gi";
const drawerWidth = 205;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),  backgroundColor: '#fff',
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}));
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth) || {};


  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/")
  };
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [maintenanceOpen, setMaintenanceOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const handleMaintenanceToggle = () => {
    setMaintenanceOpen(!maintenanceOpen);
  };

  const handleUsersToggle = () => {
    setUsersOpen(!usersOpen);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <div className="AppBar" >
          <Toolbar>
            <IconButton
              color="black" aria-label="open drawer" onClick={handleDrawerOpen}
              edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="black" >
              <IconButton><GiAirplaneDeparture/></IconButton>
              Avia Flights
            </Typography>
          </Toolbar>
        </div>
      </AppBar>

      <Drawer sx={{
        width: drawerWidth, flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }} variant="persistent" anchor="left" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
      <ListItemButton
        sx={{ textTransform: "none" }}
        component={NavLink}
        to="/dashboard"
        style={({ isActive }) => {
          return { backgroundColor: isActive ? "#b2c8dc" : "" };
        }}
      >
        <ListItemIcon>
          <IoHome />
        </ListItemIcon>
        <ListItemText component={NavLink} to="/dashboard" primary="Home" />
      </ListItemButton>
      <ListItemButton
        sx={{ textTransform: "none" }}
        onClick={handleMaintenanceToggle}
      >
        <ListItemIcon>
          <IoSettings />
        </ListItemIcon>
        <ListItemText primary="Maintenance" />
        {maintenanceOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={maintenanceOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        <ListItemButton sx={{ textTransform: "none" }}
            component={NavLink}
            to="/maintenances" style={({ isActive }) => {
              return { backgroundColor: isActive ? "#b2c8dc" : "" };
            }} >
            <ListItemIcon>
              <BsTable />
            </ListItemIcon>
            <ListItemText component={NavLink} to="/maintenances" >Table</ListItemText>
          </ListItemButton>
          <ListItemButton
            sx={{ textTransform: "none" }}
            component={NavLink}
            to="/maintenance-statistics"
            style={({ isActive }) => {
              return { backgroundColor: isActive ? "#b2c8dc" : "" };
            }}
          >
            <ListItemIcon>
              <IoStatsChart />
            </ListItemIcon>
            <ListItemText primary="Statistics" />
          </ListItemButton>
          
        </List>
      </Collapse>

      {/* Users Dropdown */}

          <ListItemButton
            sx={{ textTransform: "none" }}
            onClick={handleUsersToggle}
          >
            <ListItemIcon>
              <IoPeople />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {usersOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={usersOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {user && user.post === "admin" && (
            <ListItemButton sx={{ textTransform: "none" }}
              component={NavLink}
              to="/users" style={({ isActive }) => {
                return { backgroundColor: isActive ? "#b2c8dc" : "" };
              }} >
              <ListItemIcon>
                <BsTable />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
          )}
              <ListItemButton
                sx={{ textTransform: "none" }}
                component={NavLink}
                to="/users-statistics"
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? "#b2c8dc" : "" };
                }}
              >
                <ListItemIcon>
                  <IoStatsChart />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
              {user && user.post === "admin" && (
              <ListItemButton
                sx={{ textTransform: 'none' }}
                component={NavLink}
                to={`/user/${user.uuid}`} // Use 'userData.uuid' instead of 'user.uuid'
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? '#b2c8dc' : '' };
                }}
              >
                <ListItemIcon>
                  <IoStatsChart />
                </ListItemIcon>
                <ListItemText primary="Admin Page" />
              </ListItemButton>
            )}
            {user && user.post !== "admin" && (
              <ListItemButton
                sx={{ textTransform: 'none' }}
                component={NavLink}
                to={`/user/${user.uuid}`} // Use 'userData.uuid' instead of 'user.uuid'
                style={({ isActive }) => {
                  return { backgroundColor: isActive ? '#b2c8dc' : '' };
                }}
              >
                <ListItemIcon>
                  <IoStatsChart />
                </ListItemIcon>
                <ListItemText primary="User Page" />
              </ListItemButton>
            )}
            </List>
          </Collapse>
      <ListItemButton onClick={logout}>
        <ListItemIcon>
          <IoLogOut />
        </ListItemIcon>
        <ListItemText primary="Log Out" />
      </ListItemButton>
    </List>
      </Drawer><Main open={open}><DrawerHeader />
      </Main>
    </Box>
  );
}
export default Navbar