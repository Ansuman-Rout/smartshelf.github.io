import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import Lottie from "lottie-react";
import foodAnimation from "../animation/signupanimation.json";

// Material UI Imports
import {
  Container,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";

// Framer Motion
import { motion, AnimatePresence } from "framer-motion";

// Background image URL
const backgroundImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80";

function AuthPage() {
  const [tab, setTab] = useState(0); // 0 = login, 1 = signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (tab === 1) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/"); // Redirect to homepage
    } catch (error) {
      alert(error.message); // Show error message
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(12px)",
          borderRadius: 4,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          color: "white",
        }}
      >
        {/* Lottie Animation */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Box width={180}> {/* Increased width to make animation bigger */}
            <Lottie animationData={foodAnimation} loop />
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={tab}
          onChange={(e, newValue) => setTab(newValue)}
          variant="fullWidth"
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Signup" />
        </Tabs>

        {/* Animated Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, x: tab === 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: tab === 0 ? -100 : 100 }}
            transition={{ duration: 0.4 }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              {tab === 0 ? "Login" : "Signup"}
            </Typography>

            {/* Form */}
            <Box component="form" noValidate autoComplete="off">
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{ mt: 2, backgroundColor: "#6a1b9a" }}
                onClick={handleAuth}
              >
                {tab === 0 ? "Login" : "Sign Up"}
              </Button>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Paper>
    </Box>
  );
}

export default AuthPage;
