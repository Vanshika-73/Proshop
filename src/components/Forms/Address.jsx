import { Box, Stack, TextField } from "@mui/material";
import React from "react";

function Address({ handleChange, values }) {
  return (
    <Stack
      alignSelf={"center"}
      sx={{ width: "70%", margin: "3rem 0" }}
      spacing={4}
    >
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="house_no"
          value={values?.house_no}
          variant="standard"
          fullWidth
          label="House Number"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="street_name"
          value={values?.street_name}
          variant="standard"
          fullWidth
          label="Street Name"
        />
      </Box>
      <Box>
        <TextField
              required
          onChange={handleChange}
          name="city"
          value={values?.city}
          variant="standard"
          fullWidth
          label="City"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="state"
          value={values?.state}
          variant="standard"
          fullWidth
          label="State"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="country"
          value={values?.country}
          variant="standard"
          fullWidth
          label="Country"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="pincode"
          value={values?.pincode}
          variant="standard"
          fullWidth
          type={"number"}
          label="Pincode"
        />
      </Box>
    </Stack>
  );
}

export default Address;
