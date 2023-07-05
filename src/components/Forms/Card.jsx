import { Box, Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { mastercard, rupay,visa } from "../../assets";
function Card({handleChange,values}){
    const {getCardNumberProps, getExpiryDateProps, getCVCProps} = usePaymentInputs();
    return(
        <Stack margin={"2rem 0"} spacing={3}>
            <Box>
            <label>Card Type:</label>
               <Select sx={{ml:2}}  onChange={handleChange} name="card_type" value={values?.card_type}>
                    <MenuItem value="mastercard" >Master Card</MenuItem>
                    <MenuItem value="visa">Visa</MenuItem>
                    <MenuItem value="rupay">Rupay</MenuItem>
                </Select>
            </Box>
            <Box>
                <label>Card holder Name:</label>
                <TextField sx={{ml:2}}  onChange={handleChange} name="holder_name" value={values?.holder_name} variant="standard" placeholder="Card holer Name"/>
            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <label>Card Number:</label>
                <TextField sx={{ml:2}} name="cardNumber" value={values?.cardNumber} inputProps={getCardNumberProps({onChange: handleChange})} variant="standard"/>
                <img src={values?.card_type==="mastercard" ? mastercard : (values?.card_type==="visa" ? visa : rupay)} style={{height:40,marginLeft:2}} alt="" />
            </Box>
            <Box>
                <label>CVV:</label>
                <TextField sx={{ml:2}} name="cvc" value={values?.cvc} inputProps={getCVCProps({onChange: handleChange})} variant="standard"/>
            </Box>
            <Box>
                <label>Expiry Date:</label>
                <TextField sx={{ml:2}}  name="expiryDate" value={values?.expiryDate} inputProps={getExpiryDateProps({onChange: handleChange})} variant="standard"/>
            </Box>
        </Stack>
    )
}

export default Card;