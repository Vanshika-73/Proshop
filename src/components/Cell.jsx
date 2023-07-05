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
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteProduct, updateProduct } from "../slices/ProductSlice";
import { useNavigate } from "react-router-dom";

const Cell = ({ product }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category);
  const [price, setPrice] = useState(product.price);
  const [countInStock, setStock] = useState(product.countInStock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleUpdate = () => {
    let data = {
      _id: product._id,
      data: {
        name,
        brand,
        category,
        price: parseInt(price),
        countInStock: parseInt(countInStock),
      },
    };
    dispatch(updateProduct(data));
    handleClose();
  };
  return (
    <>
      <TableRow>
        <TableCell align={"center"}>
          <Box sx={{ height: "10vh" }}>
            <img
              style={{ height: "100%" }}
              src={product.image}
              alt={product.name}
            />
          </Box>
        </TableCell>
        <TableCell onClick={()=>(navigate(`/Product/${product._id}`))} sx={{cursor:"pointer"}} align={"center"}>{product.name}</TableCell>
        <TableCell align={"center"}>{product.brand}</TableCell>
        <TableCell align={"center"}>{product.category}</TableCell>
        <TableCell align={"center"}>{product.price}</TableCell>
        <TableCell align={"center"}>{product.countInStock}</TableCell>
        <TableCell align={"center"}>
          <ButtonGroup>
            <Button onClick={handleOpen} size="small">
              <EditIcon />
            </Button>
            <Button
              onClick={() => dispatch(deleteProduct(product._id))}
              size="small"
            >
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
              <label>Name: </label>
              <TextField
                fullWidth
                value={name}
                variant="standard"
                onChange={(e) => setName(e.target.value)}
              />
            </Box>
            <Box>
              <label>Brand: </label>
              <TextField
                fullWidth
                value={brand}
                variant="standard"
                onChange={(e) => setBrand(e.target.value)}
              />
            </Box>
            <Box>
              <label>Category: </label>
              <TextField
                fullWidth
                value={category}
                variant="standard"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Box>
            <Box>
              <label>Price: </label>
              <TextField
                fullWidth
                value={price}
                variant="standard"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Box>
            <Box>
              <label>Count in stock: </label>
              <TextField
                fullWidth
                value={countInStock}
                variant="standard"
                onChange={(e) => setStock(e.target.value)}
              />
            </Box>
            <Button onClick={handleUpdate} variant="contained">
              UPDATE
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default Cell;