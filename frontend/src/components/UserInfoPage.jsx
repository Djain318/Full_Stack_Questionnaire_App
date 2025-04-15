import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserInfoPage = () => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (username.trim() && userId.trim()) {
      navigate(`/questions?user_id=${userId}`);
    }
  };
  
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f0f2f5",
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>
          Enter Your Details
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="User ID"
          fullWidth
          margin="normal"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default UserInfoPage;
