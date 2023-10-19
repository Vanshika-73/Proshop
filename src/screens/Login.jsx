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
            minWidth: "60vw",
            minHeight: "70vh",
            margin: 2,
            padding: {
              xs: 4,
              sm: 8,
            },
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              lg: "row",
            },
            gap: 5,
          }}
        >
          <Box
            sx={{
              height: {
                xs: "300px",
                md: "490px",
                lg: "450px",
              },
              width: {
                xs: "100%",
                lg: "50%",
              },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
          <img src={login} alt="" style={{ height: "100%" }} />
         </Box>
         <Box  sx={{
              height: "100%",
              width: {
                xs: "100%",
                lg: "50%",
              },
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 3,
            }}>
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