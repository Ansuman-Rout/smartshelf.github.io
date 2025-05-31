import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, IconButton, Divider, Box } from "@mui/material";
import { FaHome, FaUtensils, FaUsers, FaBoxes, FaClipboardList, FaTachometerAlt, FaBars } from "react-icons/fa";

const drawerWidth = 240;

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => setOpen(!open);

  const menuItems = [
    { text: "Home", icon: <FaHome />, path: "/" },
    { text: "Food Collection", icon: <FaUtensils />, path: "/form" },
    { text: "Users List", icon: <FaUsers />, path: "/users" },
    { text: "Food Inventory", icon: <FaBoxes />, path: "/inventory" },
    { text: "Request Form", icon: <FaClipboardList />, path: "/reqform" },
    { text: "Dashboard", icon: <FaTachometerAlt />, path: "/dash" },
    { text: "Distribution Map", icon: <FaTachometerAlt />, path: "/geomap" },
  ];

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 60,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 60,
          boxSizing: 'border-box',
          backgroundColor: "#1E1E2F", // dark navy
          color: "#fff",
          transition: "width 0.3s",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          px: 2,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap>
            SmartShelf
          </Typography>
        )}
        <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
          <FaBars />
        </IconButton>
      </Toolbar>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      <List>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.text}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              sx={{
                px: 2.5,
                py: 1.5,
                '&:hover': {
                  backgroundColor: "#33334d",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#00e676", minWidth: 0, mr: open ? 2 : "auto", justifyContent: "center" }}>
                {item.icon}
              </ListItemIcon>
              {open && <ListItemText primary={item.text} />}
            </ListItemButton>
          </NavLink>
        ))}
      </List>
    </Drawer>
  );
}
