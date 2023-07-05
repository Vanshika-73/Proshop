import { Box, Stack, TextField } from "@mui/material";
import React from "react";

function PersonalInfo({ handleChange, values }) {
  return (
    <Stack
      alignSelf={"center"}
      sx={{ width: "70%", margin: "3rem 0" }}
      spacing={4}
    >
      <Box>
        <TextField
          variant="standard"
          onChange={handleChange}
          name="fname"
          value={values?.fname}
          fullWidth
          required
          label="First Name"
        />
      </Box>
      <Box>
        <TextField
          required
          variant="standard"
          onChange={handleChange}
          name="lname"
          value={values?.lname}
          fullWidth
          label="Last Name"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="email"
          value={values?.email}
          variant="standard"
          fullWidth
          type={"email"}
          label="Email"
        />
      </Box>
      <Box>
        <TextField
          required
          onChange={handleChange}
          name="phone_no"
          value={values?.phone_no}
          variant="standard"
          fullWidth
          type={"number"}
          label="Phone Number"
        />
      </Box>
      <Box>
        <TextField
          onChange={handleChange}
          name="alt_phone_no"
          value={values?.alt_phone_no}
          variant="standard"
          fullWidth
          type={"number"}
          label="Alt Phone Number"
        />
      </Box>
    </Stack>
  );
}

export default PersonalInfo;
