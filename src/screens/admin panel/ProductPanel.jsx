import {Box, Button, Modal, Paper,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow, TextField,} from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cell from "../../components/Cell";
import { useDispatch } from "react-redux";
import { createProduct } from "../../slices/ProductSlice";

const ProductPanel = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { all_products } = useSelector((state) => state.products);
  const navigate = useNavigate();
  useEffect(() => {
    !userInfo && navigate("/");
    !userInfo?.isAdmin && navigate("/");
  }, []);

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setStock] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const handleCreate = () => {
    let data = {
      name,
      brand,
      image,
      description,
      category,
      price: parseInt(price),
      countInStock: parseInt(countInStock),
    };
    console.log("dfa",data); 
    dispatch(createProduct(data));
    handleClose();
    setName("");
    setBrand("");
    setCategory("");
    setDescription("");
    setImage("");
    setPrice("");
    setStock("");
  };
  return (
    <>
      <Stack alignItems={"end"}>
        <Button
          sx={{ width: 100, margin: "1rem 0" }}
          onClick={handleOpen}
          variant="contained"
        >
          Create
        </Button>
      </Stack>
      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>Image</TableCell>
                <TableCell align={"center"}>Name</TableCell>
                <TableCell align={"center"}>Brand</TableCell>
                <TableCell align={"center"}>Category</TableCell>
                <TableCell align={"center"}>Price</TableCell>
                <TableCell align={"center"}>CountInStock</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {all_products?.map((product) => (
                <Cell key={product._id} product={product} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper sx={style}>
          <Stack spacing={2}>
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
              <label>Image: </label>
              <TextField
                fullWidth
                value={image}
                variant="standard"
                onChange={(e) => setImage(e.target.value)}
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
              <label>Description: </label>
              <TextField
                // inputProps={{ type: "textarea" }}
                // sx={{ overflowY: "scroll" }}
                fullWidth
                multiline
                value={description}
                variant="standard"
                onChange={(e) => setDescription(e.target.value)}
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
            <Button onClick={handleCreate} variant="contained">
              Create
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  );
};

export default ProductPanel;