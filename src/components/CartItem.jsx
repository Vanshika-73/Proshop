import {Button, Divider, Grid, Link, ListItem, MenuItem, Select, Stack, Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router';
import { deleteCartItem, updateQty } from '../slices/CartSlice';
function CartItem({item}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state=>state.user)
    const {_id,name,image,qty,price}= item; 
    const { all_products } = useSelector((state) => state.products);
    const product = all_products?.find((v) => v._id === _id);
    const handleRemove = ()=>{
        let data = {
            user:userInfo._id,
            _id
        }
        console.log("dta",data);
        dispatch(deleteCartItem(data));
    }
    const handleQty=(value)=>{
        let data={
            user:userInfo._id,
            item:{
                _id,
                qty: Number(value),
            },
        }
        dispatch(updateQty(data))
      }
  return (
    <>
     <ListItem>
    <Grid container>
        <Grid item md={2} xs={5}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <img style={{width:"100%",borderRadius:6}} src={image} alt={name} />
            </Stack>
        </Grid>
        <Grid item md={5} xs={7}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Link underline='hover' sx={{cursor:"pointer"}} onClick={()=>navigate(`/Product/${_id}`)}>
            <Typography variant='h6'>
                {name}
            </Typography>
            </Link>
            </Stack>
        </Grid>
        <Grid item md={2}>
        <Box sx={{height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
            Qty:
            <Select value={qty} onChange={(e) => handleQty(e.target.value)}>
              {[...Array(product?.countInStock).keys()].map((i) => (
                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
              ))}
            </Select>
            </Box>
        </Grid>
        <Grid item md={2}>
        <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Typography>Price per Pc: ${price}</Typography>
            <Divider/>
            <Typography>Total Price: ${(price*qty).toFixed(2)}</Typography>
            </Stack>
        </Grid>
        <Grid item md={1}>
            <Stack sx={{height:"100%"}}
            justifyContent={"center"}
            alignItems={"center"}>
            <Button onClick={handleRemove}><DeleteIcon/></Button>
            </Stack>
        </Grid>
    </Grid>
   </ListItem>
    <Divider/>
    </>
  )
}

export default CartItem;