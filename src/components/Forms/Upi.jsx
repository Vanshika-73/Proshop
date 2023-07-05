import { Button, Stack, TextField } from "@mui/material";
import React from "react";
function Upi(){
    return(
        <Stack sx={{width:"100%",margin:"3rem 0"}} justifyContent={"space-around"} flexDirection={"row"} alignItems={"center"}>
            <label>UPI ID:</label>
            <TextField variant="outlined" label=""/>
            <Button sx={{padding:"1rem "}} variant="contained">Pay Now</Button>
        </Stack>
    )
}

export default Upi;