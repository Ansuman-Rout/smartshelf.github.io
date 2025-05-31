import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import emailjs from '@emailjs/browser';
import {  collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase"; // Make sure this path matches your Firebase config file

function InviteFriend() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  

  const sendInvite = async (e) => {
    e.preventDefault();

    const templateParams = {
      to_email: email,
      message,
    };

    try {
      // Send email via EmailJS
      await emailjs.send(
        "service_p97x1cm",     // ✅ Your Service ID
        "template_n5j2crr",    // ✅ Your Template ID
        templateParams,
        "-RF9efTjh5rE9zxom"    // ✅ Your Public Key
      );

      // Store invite info in Firestore
      await addDoc(collection(db, "invites"), {
        email,
        message,
        timestamp: new Date(),
      });

      alert("Invitation sent and stored successfully!");
      setEmail("");
      setMessage("");
    } catch (error) {
      alert("Failed to send invite: " + error.message);
    }
  };

  return (
    <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>
          Invite a Friend
        </Typography>
        <form onSubmit={sendInvite}>
          <TextField
            fullWidth
            margin="normal"
            label="Friend's Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            multiline
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth>
            Send Invite
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default InviteFriend;
