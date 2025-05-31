import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Container,
  Link,
} from "@mui/material";
import {
  FaUtensils,
  FaBoxes,
  FaMapMarkedAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaClipboardList,
  FaTachometerAlt,
  FaUserPlus
} from "react-icons/fa";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../services/firebase";

const glassStyle = {
  background: "rgba(255, 255, 255, 0.05)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  backdropFilter: "blur(8px)",
  WebkitBackdropFilter: "blur(8px)",
  color: "#fff",
};

function Home() {
  const [foodItems, setFoodItems] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snapshot) => {
      const items = [];
      const contributorsData = [];
      const locationsData = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        items.push(...data.foodItems);
        contributorsData.push(data.fullName);
        locationsData.push(data.location);
      });
      setFoodItems(items);
      setContributors(contributorsData);
      setLocations(locationsData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 6,
        px: 2,
      }}
    >
      <Container>
        <Box sx={{ ...glassStyle, p: 5, textAlign: "center", mb: 6 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Welcome to SmartShelf
          </Typography>
          <Typography variant="h6" gutterBottom>
            Bridging the gap between surplus food and hungry mouths.
          </Typography>
        </Box>

        <Typography variant="h5" color="#fff" gutterBottom mb={2}>
          What We Do
        </Typography>
        <Grid container spacing={4} mb={6}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ ...glassStyle, p: 3, textAlign: "center" }}>
              <Box fontSize={36} color="primary.main" mb={1}>
                <FaUtensils />
              </Box>
              <Typography variant="h6">Food Items</Typography>
              <Typography variant="body2">{foodItems.length} items</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ ...glassStyle, p: 3, textAlign: "center" }}>
              <Box fontSize={36} color="primary.main" mb={1}>
                <FaBoxes />
              </Box>
              <Typography variant="h6">Contributors</Typography>
              <Typography variant="body2">{contributors.length} people</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ ...glassStyle, p: 3, textAlign: "center" }}>
              <Box fontSize={36} color="primary.main" mb={1}>
                <FaMapMarkedAlt />
              </Box>
              <Typography variant="h6">Locations</Typography>
              <Typography variant="body2">{[...new Set(locations)].length} unique</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ ...glassStyle, p: 3, textAlign: "center" }}>
              <Box fontSize={36} color="primary.main" mb={1}>
                <FaUsers />
              </Box>
              <Typography variant="h6">Latest Contributor</Typography>
              <Typography variant="body2">{contributors[5] || "--"}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h5" color="#fff" gutterBottom mb={2}>
          Quick Links
        </Typography>
        <Grid container spacing={4} mb={6}>
          {[
            { icon: <FaHandHoldingHeart />, title: "Food Collection Form", to: "/form" },
            { icon: <FaClipboardList />, title: "Request Form", to: "/reqform" },
            { icon: <FaTachometerAlt />, title: "Dashboard", to: "/dash" },
            { icon: <FaMapMarkedAlt />, title: "Map View", to: "/geomap" },
            { icon: <FaUserPlus />, title: "Invite a Friend", to: "/invitefriend" },

          ].map((item, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Link href={item.to} underline="none">
                <Paper sx={{ ...glassStyle, p: 3, textAlign: "center", color: "#fff" }}>
                  <Box fontSize={36} color="primary.main" mb={1}>
                    {item.icon}
                  </Box>
                  <Typography variant="h6">{item.title}</Typography>
                </Paper>
              </Link>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ ...glassStyle, p: 4, textAlign: "center", mb: 6 }}>
          <Typography variant="h6" gutterBottom>
            "SmartShelf made it easy for our restaurant to give back. It's a beautiful system."
          </Typography>
          <Typography variant="body2">– A Grateful Donor</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Home;
