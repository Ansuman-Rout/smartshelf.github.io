import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Material UI components
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';

// Fix Leaflet icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapClickHandler({ users, setClickedUser }) {
  useMapEvent("click", (e) => {
    const { lat, lng } = e.latlng;
    const nearestUser = users.find((user) => {
      if (!user.location) return false;
      const [userLat, userLng] = user.location;
      const distance = Math.sqrt(Math.pow(lat - userLat, 2) + Math.pow(lng - userLng, 2));
      return distance < 0.05;
    });
    setClickedUser(nearestUser || null);
  });
  return null;
}

function DistributionMap() {
  const [userPosition, setUserPosition] = useState(null);
  const [users, setUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPosition([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const userList = snapshot.docs.map((doc) => {
        const data = doc.data();
        let location = null;
        if (Array.isArray(data.location)) {
          location = data.location;
        } else if (data.location?._lat !== undefined) {
          location = [data.location._lat, data.location._long];
        }
        return {
          id: doc.id,
          fullName: data.fullName || "No Name",
          email: data.email || "No Email",
          foodItems: data.foodItems || [],
          location,
        };
      });
      setUsers(userList);
    };
    fetchData();
  }, []);

  if (!userPosition) return <p>Loading map...</p>;

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', height: '100vh' }}>
      {/* Map Section - takes full width on mobile, 70% on desktop */}
      <Box sx={{ width: isMobile ? '100%' : '70%', height: isMobile ? '50vh' : '100%' }}>
        <MapContainer center={userPosition} zoom={13} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userPosition}>
            <Popup>You are here! 📍</Popup>
          </Marker>
          {users.filter(user => user.location).map((user) => (
            <Marker key={user.id} position={user.location}>
              <Popup>
                <strong>{user.fullName}</strong><br />
                Email: {user.email}<br />
                Food: {user.foodItems.join(", ")}
              </Popup>
            </Marker>
          ))}
          {clickedUser && clickedUser.location && (
            <Marker position={clickedUser.location}>
              <Popup>
                <strong>Selected:</strong><br />
                {clickedUser.fullName}<br />
                Food: {clickedUser.foodItems.join(", ")}
              </Popup>
            </Marker>
          )}
          <MapClickHandler users={users} setClickedUser={setClickedUser} />
        </MapContainer>
      </Box>

      {/* Table Section - takes full width on mobile, 30% on desktop */}
      <Box sx={{ 
        width: isMobile ? '100%' : '30%', 
        height: isMobile ? '50vh' : '100%',
        p: 2,
        overflow: 'auto',
        borderLeft: isMobile ? 'none' : `1px solid ${theme.palette.divider}`
      }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          Food Distributors
        </Typography>
        
        <TableContainer component={Paper} sx={{ maxHeight: 'calc(100% - 48px)' }}>
          <Table stickyHeader size="small" aria-label="distributors table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Food Items</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.filter(user => user.location).map((user) => (
                <TableRow 
                  key={user.id}
                  hover
                  selected={clickedUser?.id === user.id}
                  onClick={() => setClickedUser(user)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.foodItems.join(", ")}</TableCell>
                  <TableCell>
                    {user.location ? `${user.location[0].toFixed(4)}, ${user.location[1].toFixed(4)}` : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default DistributionMap;