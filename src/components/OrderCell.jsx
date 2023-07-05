import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import axios from "axios";

const OrderCell = ({ item }) => {
  const URL = import.meta.env.VITE_APP_URL;
  const [shippingDate, setShippingDate] = useState();
  const [deleiveryDate, setDeleiveryDate] = useState();
  const [isDeleivered, setIsDeleivered] = useState();
  const [isPaid, setIsPaid] = useState(item.isPaid);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleUpdate = (_id) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    let data = {
        shippingDate:shippingDate,
        deliveryDate:deleiveryDate,
        isPaid:isPaid,
      isDelivered:isDeleivered,
    };
    console.log("tokrn", token);
    console.log("fdsadaf", _id, data);
    console.log("fdsadaf", URL);
    axios
      .put(`${URL}/order/${_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Order Updated");
      })
      .catch((err) => alert(err));
    handleClose();
  };
  const handleDelete = (_id) => {
    let check = confirm("Are you Sure?");
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    console.log("dsf", _id);
    axios
      .delete(`${URL}/order/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("order deleted");
      })
      .catch((err) => alert(err));
  };
  return (
    <>
      <TableRow>
        <TableCell align={"center"}>{item._id}</TableCell>
        <TableCell align={"center"}>{item.user._id}</TableCell>
        <TableCell align={"center"}>{item.user.fname}</TableCell>
        <TableCell align={"center"}> {item.paymentMethod}</TableCell>
        <TableCell align={"center"}>{JSON.stringify(item.isPaid)}</TableCell>
        <TableCell align={"center"}>
          {item.shippingDate ? item.shippingDate : "pending"}
        </TableCell>
        <TableCell align={"center"}>{item.totalPrice}</TableCell>
        <TableCell align={"center"}>
          {JSON.stringify(item.isDelivered)}
        </TableCell>
        <TableCell align={"center"}>
          {item.deliveryDate ? item.deliveryDate : "pending"}
        </TableCell>
        <TableCell align={"center"}>
          <ButtonGroup>
            <Button onClick={handleOpen} size="small">
              <EditIcon />
            </Button>
            <Button onClick={() => handleDelete(item._id)} size="small">
              <DeleteIcon />
            </Button>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={3}>
            <Box>
              <label>Shipping Date: </label>
              <TextField
                type="date"
                fullWidth
                value={shippingDate}
                variant="standard"
                onChange={(e) => setShippingDate(e.target.value)}
              />
            </Box>
            <Box>
              <label>isDeleivered: </label>
              <TextField
                fullWidth
                value={isDeleivered}
                variant="standard"
                onChange={(e) => setIsDeleivered(e.target.value)}
              />
            </Box>
            <Box>
              <label>Deleivery Date: </label>
              <TextField
                type="date"
                fullWidth
                value={deleiveryDate}
                variant="standard"
                onChange={(e) => setDeleiveryDate(e.target.value)}
              />
            </Box>
            <Box>
              <label>isPaid: (false/true)</label>
              <TextField
                type="text"
                fullWidth
                value={isPaid}
                variant="standard"
                onChange={(e) => setIsPaid(e.target.value)}
              />
            </Box>
            <Button onClick={() => handleUpdate(item._id)} variant="contained">
              UPDATE
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default OrderCell;
