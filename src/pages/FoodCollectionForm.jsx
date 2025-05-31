import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

// Material UI imports
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

function FoodCollectionForm() {
  const [fullName, setFullName] = useState("");
  const [location, setLocation] = useState("");
  const [foodItems, setFoodItems] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !location || !foodItems || !email) {
      setSnackbar({ open: true, message: "Please fill all fields.", severity: "error" });
      return;
    }

    if (!validateEmail(email)) {
      setSnackbar({ open: true, message: "Invalid email address.", severity: "error" });
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "users"), {
        fullName,
        location,
        foodItems: foodItems.split(",").map((item) => item.trim()),
        email,
        createdAt: new Date(),
      });

      setSnackbar({ open: true, message: "User data submitted successfully!", severity: "success" });

      // Clear form
      setFullName("");
      setLocation("");
      setFoodItems("");
      setEmail("");
    } catch (error) {
      setSnackbar({ open: true, message: "Error: " + error.message, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: "100%",
          backgroundColor: "background.paper",
          borderRadius: 4,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Food Storage Form
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Food Items (comma-separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={foodItems}
            onChange={(e) => setFoodItems(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default FoodCollectionForm;
