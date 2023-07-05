import {Alert,Box,Button,Checkbox,Grid,Paper,Stack,TextField,Typography} from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../slices/UserSlice";

function ProfileScreen() {
  const [checked, setChecked] = useState(true);
  const { name, email } = useSelector((state) => state.user.userInfo);
  const [username, setUsername] = useState(name);
  const [userPassword, setUserpassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = ()=>{
    dispatch(updateUser({name}))
  }
  return (
    // 13th dec 13.22
    <div>
      <Grid container>
        <Grid item md={8} alignContent={"center"}>
          <Box sx={{ display: "flex" }}>
            <Stack width={"60%"} spacing={5}>
              <Typography variant="h4" color={"grey"}>
                Profile
              </Typography>
              <TextField
                label="Name"
                value={username}
                onChange={(e) => !checked && setUsername(e.target.value)}
                variant="standard"
                readOnly={checked}
              />
              <TextField
                label="Email"
                value={email}
                readOnly={checked}
                variant="standard"
              />
              <TextField label="Password"  variant="standard" onChange={(e)=>setUserpassword(e.target.value)} />
              <Box>
                <Checkbox onChange={() => setChecked(!checked)} />
                Check here to Update!
              </Box>
              <Button
                variant="contained"
                disabled={checked}
                onClick={handleSubmit}
                sx={{ padding: "0.5rem p" }}
              >
                UPDATE
              </Button>
            </Stack>
          </Box>
        </Grid>
        <Grid item md={4}>
          <Paper elevation={3} sx={{ padding: 4, mt: 4 }}>
            <Typography variant="h5" color={"grey"} fontSize={"1.8"}>
              Order History
            </Typography>
            <Alert sx={{ mt: 2 }} severity="info">
              No Order
            </Alert>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProfileScreen;
