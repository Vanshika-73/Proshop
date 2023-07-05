import { Box, Button, MenuItem, Select, Stack } from "@mui/material";
import React, { useState } from "react";
import Card from "./Card";
import Upi from "./Upi";

function Payment({ handleChange, values }) {
  // const [type, setType] = useState("cod");
  // const handleChange = (e) => {
  //   setType(e.target.value)
  // }
  return (
    <Stack
      alignSelf={"center"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ width: "100%", margin: "4rem 0" }}
    >
      <Box>
        <label>Payment Method:</label>
        <Select
          onChange={handleChange}
          name="payment_type"
          value={values?.payment_type}
        >
          <MenuItem value="card">Card</MenuItem>
          <MenuItem value="upi">UPI</MenuItem>
          <MenuItem value="cod">COD</MenuItem>
        </Select>
      </Box>
      {values?.payment_type === "card" ? (
        <Card handleChange={handleChange} values={values} />
      ) : values?.payment_type === "upi" ? (
        <Upi />
      ) : (
        ""
      )}
    </Stack>
  );
}

export default Payment;
