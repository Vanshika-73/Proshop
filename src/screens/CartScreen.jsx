import { Alert, Button, Divider, Grid, Link, List, ListItem, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router';
import CartItem from '../components/CartItem';
import Loading from '../components/Loading';
import {  fetchCartItems } from '../slices/CartSlice';

function CartScreen() {
    const {userInfo} = useSelector(state => state.user);
    const {items,loading,amount,subQty} = useSelector(state=>state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
      userInfo && dispatch(fetchCartItems(userInfo._id));
    }, [userInfo]);    
    return (
      <Stack>
      {loading && <Loading/>}
      {(!loading) &&(!userInfo)&& (<Alert severity='info'>You are not logged in, Please <Link underline='always' sx={{cursor:"pointer"}} onClick={()=>navigate('/login')}>Login here</Link></Alert>)}
      {
       userInfo && (items?.length==0 ? (<Alert severity='info'>Your cart is Empty, <Link underline='always' sx={{cursor:"pointer"}} onClick={()=>navigate('/')}>Continue Shopping</Link></Alert>) : 
       (
       <Grid container>
        <Grid item md={8}>
        <List>
        {items?.map((item)=><CartItem key={item._id} item={item}/>)}
       </List>
        </Grid>
        <Grid item md={4} sx={{padding:4}}>
          <Paper elevation={4} sx={{padding:2}}>
            <List>
              <ListItem>
                <Typography variant='h6'>
                  Total Items: {subQty} <br/>
                  Total Amount:$ {amount && amount.toFixed(2)}
                </Typography>
              </ListItem>
              <Divider/>
              <ListItem>
                <Button sx={{padding:"1rem 0",mt:2}} variant='contained' fullWidth onClick={()=>navigate('/checkout')}>
                  Proceed to Checkout
                </Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
       </Grid>
       ))
      }

    </Stack>
  )
}

export default CartScreen;
