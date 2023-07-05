//1.07.58 clear cart function not work
import {
  Alert,
  Box,
  Button,
  Paper,
  Snackbar,
  Stack,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import React, { useState } from "react";
import PersonalInfo from "../components/Forms/PersonalInfo";
import Address from "../components/Forms/Address";
import Payment from "../components/Forms/Payment";
import { Form, useFormik } from "formik";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../slices/CartSlice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function CheckoutScreeen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { items, amount } = useSelector((state) => state.cart);
  const initialValues = {
    fname: "",
    lname: "",
    email: "",
    phone_no: 0,
    alt_phone_no: 0,
    house_no: "",
    street_name: "",
    city: "",
    state: "",
    country: "",
    pincode: 0,
    payment_type: "cod",
    card_type: "mastercard",
    holder_name: "",
    cardNumber: "",
    cvc: "",
    expiryDate: "",
  };
  const { handleChange, values, errors, handleSubmit } = useFormik({
    initialValues,
    onSubmit: (values) => {
      let {
        fname,
        lname,
        email,
        phone_no,
        alt_phone_no,
        house_no,
        street_name,
        city,
        state,
        pincode,
        country,
        payment_type,
      } = values;
      let data = {
        user: {
          _id: userInfo._id,
          fname,
          lname,
          email,
          phone_no,
          alt_phone_no,
        },
        orderItems: [
          ...items.map((item) => {
            return {
              name: item.name,
              qty: item.qty,
              price: item.price,
              image: item.image,
              _id: item._id,
              ...item,
            };
          }),
        ],
        shippingAddress: {
          house_no: parseInt(house_no),
          street: street_name,
          city,
          state,
          pincode: parseInt(pincode),
          country,
        },
        paymentMethod: payment_type,
        shippingPrice: amount > 1000 ? 100 : 10,
        totalPrice: amount + (amount > 1000 ? 100 : 10),
        isPaid: payment_type === "cod" ? false : true,
        deleiveryDate:false
      };
      axios
        .post(`${import.meta.env.VITE_APP_URL}/order`, data)
        .then((res) => {
          Swal.fire("Your Order is Placed!!", "success");
          dispatch(clearCart(userInfo._id));
          navigate("/");
        })
        .catch((err) => {
          console.log("eer", err);
        }   );
    },
  });
  const [count, setCount] = useState(0);
  const [step, setStep] = useState([
    { label: "Personal Info", completed: false },
    { label: "Address", completed: false },
    { label: "Payment", completed: false },
  ]);
  const forms = [
    <PersonalInfo handleChange={handleChange} values={values} />,
    <Address handleChange={handleChange} values={values} />,
    <Payment handleChange={handleChange} values={values} />,
  ];
  //for snackbar
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //next form
  const nextForm = () => {
    let {
      fname,
      lname,
      email,
      phone_no,
      house_no,
      street_name,
      city,
      state,
      country,
      pincode,
    } = values;
    if (
      count === 0 &&
      fname != "" &&
      lname != "" &&
      phone_no != 0 &&
      email.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)
    ) {
      let newStep = step;
      newStep[count].completed = true;
      setStep([...newStep]);
      count < 2 && setCount(count + 1);
    } else if (
      count === 1 &&
      house_no != "" &&
      street_name != "" &&
      city != "" &&
      state != "" &&
      country != "" &&
      pincode != 0
    ) {
      let newStep = step;
      newStep[count].completed = true;
      setStep([...newStep]);
      count < 2 && setCount(count + 1);
    } else {
      handleClick();
    }
  };
  //back form
  const backForm = () => {
    count > 0 && setCount(count - 1);
    let newStep = step;
    newStep[count].completed = false;
    setStep([...newStep]);
  };
//2.30.38
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
    <Box sx={{width:{md:"50%",xs:"90%"}} }>
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <Paper
          sx={{
            width: "100%",
            height: "fit-content",
            padding: {md:4,sx:2},
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
          elevation={4}
        >
          <Stepper activeStep={count} sx={{pt:3}}>
            {step.map((step) => (
              <Step key={step.label} completed={step.completed}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            sx={{ mt: 14 }}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              All fields are mandatory!
            </Alert>
          </Snackbar>
          {/* <form></form> */}
          {forms[count]}

          <Box sx={{ position: "relative", height: 50 }}>
            {count != 0 && (
              <Button
                sx={{ position: "absolute", leftt: 0 }}
                variant="outlined"
                onClick={backForm}
              >
                Back
              </Button>
            )}
           {count===2 ? <Button   type={"button"}
              sx={{ position: "absolute", right: 0 }}
              variant="contained"
              onClick={()=>handleSubmit}>
                Submit
           </Button> :
            <Button
              type={"button"}
              sx={{ position: "absolute", right: 0 }}
              variant="contained"
              onClick={ nextForm}
            >
              Next
            </Button>}
          </Box>
        </Paper>
      </form>
    </Box>
    </Stack>
  );
}

export default CheckoutScreeen;
