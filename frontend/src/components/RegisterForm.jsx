import React, { useState, useContext } from "react";
import { Paper, TextField, Grid, Button, Box, CircularProgress, FormControlLabel, Checkbox } from "@mui/material";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterForm = (props) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);  // New state for loading indicator
  const [isAdmin, setIsAdmin] = useState(false); // New state for admin designation

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const goToHome = () => {
    navigate("/");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAdminChange = (event) => {
    setIsAdmin(event.target.checked);
  };

  const handleRegister = async () => {
    setError("");
    setLoading(true);  // Start loading
    try {
      const response = await axios.post("http://localhost:5000/api/register", { ...userData, isAdmin });
      if (response.data) {
        authContext.login(
          response.data.token,
          response.data.userId,
          response.data.isAdmin
        );
        if (response.data.isAdmin) {
          navigate("/admin");
        } else {
          goToHome();  // Correctly call the function to navigate
        }
        setLoading(false); // Stop loading
      }
    } catch (e) {
      console.error("Registration error:", e.response || e);
      setError(e.response?.data?.message || "Registration failed. Please try again.");
      setLoading(false); // Stop loading in case of error
    }
  };
  
  

  return (
    <React.Fragment>
      <Paper elevation={5} style={{ width: 600 }}>
        <h1 style={{ 
          textAlign: "center", 
           paddingTop: "20px",
            fontFamily: 'Arial',
            fontSize: '30px',
            fontWeight: 'bold',
            letterSpacing: '0.1rem',
            color: '#3f51b5',
           }}>Register</h1>
        <Grid
          container
          direction="column"
          alignContent="center"
          justifyContent="center"
          gap={5}
          style={{ paddingTop: "20px" }}
        >
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              type="text"
              name="username"
              value={userData.username}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="E-mail"
              variant="outlined"
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          {/* Checkbox for admin designation */}
          <Grid item>
  <FormControlLabel
    label="Register as admin"
    control={ <Checkbox checked={isAdmin} onChange={handleAdminChange} />}
    sx={{
      flexDirection: 'row-reverse',    // Aligns content to the end of the container (right side)
      width: 'fit-content',
      margin: 'auto',
      marginLeft: '50px',
      justifyContent: 'end'
    }}
  />
</Grid>
<Grid item>
  {error && <Box textAlign="center" color="red">{error}</Box>}
  <Box
    textAlign="center"
    justifyContent="center"
    sx={{
      display: "flex",
      flexDirection: "row",
      gap: "10px",  // Space between buttons
      paddingBottom: "20px",  // Padding at the bottom of the Box
      '& button': {
        marginBottom: "10px"  // Adds bottom margin to each button if additional spacing is needed
      }
    }}
  >
    <Button variant="contained" onClick={handleRegister} disabled={loading}>
      {loading ? <CircularProgress size={24} /> : "Register"}
    </Button>
    {props?.showSignup && (
      <Button variant="contained" color="secondary" onClick={props.showSignup}>
        Login
      </Button>
    )}
  </Box>
</Grid>
        </Grid>
      </Paper>
    </React.Fragment>
  );
};

export default RegisterForm;
