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

function RequestForm() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [neededItems, setNeededItems] = useState("");
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !location || !neededItems) {
      setSnackbar({ open: true, message: "Please fill all the fields.", severity: "error" });
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "distribution_requests"), {
        name,
        location,
        neededItems: neededItems.split(",").map((item) => item.trim()),
        status: "pending",
        createdAt: new Date(),
      });

      setSnackbar({ open: true, message: "Request submitted successfully!", severity: "success" });

      // Clear form
      setName("");
      setLocation("");
      setNeededItems("");
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
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Request Food Help
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2 }}
        >
          <TextField
            label="Your Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Your Location"
            variant="outlined"
            fullWidth
            margin="normal"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Needed Items (comma separated)"
            variant="outlined"
            fullWidth
            margin="normal"
            value={neededItems}
            onChange={(e) => setNeededItems(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? "Submitting..." : "Submit Request"}
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

export default RequestForm;
