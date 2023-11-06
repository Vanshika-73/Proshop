import {Alert,Box,Button,Link,Paper,Stack,TextField,Typography}from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/UserSlice";
import { useNavigate } from "react-router";
import { login } from "../assets";

function Login() {
  const { userInfo,error } = useSelector((state) => state.user);

  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_err, setPasswordErr] = useState(null);
  const [show, setShow] = useState(false);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={4}
          sx={{
            width: "60vw",
            height: "70vh",
            margin: 2,
            padding: 7,
            display: "flex",
            justifyContent: "space-between",

            // Media queries for responsiveness
            '@media (max-width: 768px)': {
              width: "85vw", // Adjust the width for tablet screens
              height: "60vh", // Adjust the height for tablet screens
              padding: 3,    // Adjust the padding for tablet screens
            },
            '@media (max-width: 480px)': {
              width: "90vw", // Further adjust the width for mobile screens
              height: "auto", // Further adjust the height for mobile screens
              padding: 2,    // Further adjust the padding for mobile screens
              flexDirection: "column",
              justifyContent: "center",
            },

          }}
        >
          <Box 
            sx={{ 
              height: "100%", 
              width: "100%",

              // Media query for responsiveness
              '@media (max-width: 480px)': {
                height: "15rem", // Adjust the height for mobile screens
                width: "100%",    // Adjust the width for mobile screens
              },
            }}>
            <img src={login} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold" }} variant="h5">
              Sign In
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type={"email"}
              variant="standard"
              fullWidth
            />
            <Box sx={{ display: "flex", position: "relative" }}>
              <TextField
                error={password_err}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                type={show ? "text" : "password"}
                variant="standard"
                helperText={password_err && password_err}
                fullWidth
              />
              {show ? (
                <VisibilityOffIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "0%",
                    bottom: "40%",
                  }}
                  onClick={() => setShow(!show)}
                />
              )}
            </Box>
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <Typography>
              Don't have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
                underline="always"
                sx={{ cursor: "pointer" }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </form>
    </Stack>
  );
}

export default Login;
