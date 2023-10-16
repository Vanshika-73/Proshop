import { Alert, Box, Button, Link, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../slices/UserSlice";
import { useNavigate } from "react-router";
import { login } from "../assets";


function Login() {
  const { userInfo, error } = useSelector((state) => state.user);

  useEffect(() => {
    userInfo && navigate("/");
  }, [userInfo]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_err, setPasswordErr] = useState(null);
  const [show, setShow] = useState(false);
  // const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <Stack justifyContent={"center"} alignItems={"center"}>
      <form onSubmit={handleSubmit}>
        <Paper
          elevation={4}
          sx={{
            width: isSmallScreen ? "90vw" : "60vw",
            height: "70vh",
            margin: 2,
            padding: 7,
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ height: "100%", width: isSmallScreen ? "100%" : "60%" }}>
            <img src={login} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
          </Box>
          <Box
            sx={{
              height: "100%",
              width: isSmallScreen ? "100%" : "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Typography sx={{ textAlign: "center" }} variant="h5">
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
            <Box sx={{ position: "relative" }}>
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
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  onClick={() => setShow(!show)}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "5px",
                    top: "50%",
                    transform: "translateY(-50%)",
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
