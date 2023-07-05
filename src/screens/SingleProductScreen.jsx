import { Alert, Box, Button, Divider, Grid, List, ListItem, Paper, Rating, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import Loading from '../components/Loading';
import { updateUserCart } from '../slices/CartSlice';
import { createReveiw, fetchSingleProduct } from '../slices/SingleProductSlice';
function SingleProductScreen() {
  const [num,setNum]=(useState(1));
  const [rating,setRating] = useState(0);
  const [comment,setComment] = useState("");
  const {userInfo} = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const {product,loading,error} = useSelector((state)=>state.singleProduct)
    const {_id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(fetchSingleProduct(_id));
    }, [])
    const handleCart = ()=>{
      if(!userInfo){
        navigate('/cart')
      return;
      };
      let addCartItem = {
        _id: product._id,
        name:product.name,
        image:product.image,
        qty:num,
        price:product.price,
        product
      }
      dispatch(updateUserCart({user:userInfo._id,item:{product:addCartItem}}));
      setTimeout(() => {
        navigate('/cart');
      }, 400);
    }
    const handleComment = () => {
      const data = {
        user:userInfo?._id,
        name:userInfo?.name,
        rating,
        comment
      }
      dispatch(createReveiw({id:product._id,data}));
      setComment(" ");
      setRating(0);
    }
  return (
    
    <Stack>
      <Button sx={{width:'10vw',mt:2,mb:3}} variant='contained' onClick={()=>navigate(-1)} >Go Back</Button>
      {(loading)  && (<Loading/>)}
      {(error) && (<Alert severity="error">{error}</Alert>)} 
      {
        (product) && 
        <>
      <Grid container sx={{mt:4}}>
        <Grid item xs={12} md={4}>
          <img style={{width:"100%",height:"60vh"}} src={product.image} alt={product?.price} />
        </Grid>
        <Grid item xs={12} md={4} sx={{ml:3}}>
          <List>
            <ListItem>
              <Typography variant='h4' sx={{fonstWeight:800}}>{product.name}</Typography>
            </ListItem>
            <Divider/>
            <ListItem>
            <Rating name="read-only" value={product.ratings} precision={0.5} />
            <Typography sx={{mt:0,ml:1}} variant='subtitle1'>{`${product.numReviews} reviews`} </Typography>
            </ListItem>
            <Divider/>
            <ListItem>
              <Typography variant='h6' sx={{fonstWeight:800}}>{product.description}</Typography>
            </ListItem>
            <Divider/>
            {userInfo &&  (
              <>
              <ListItem>
              <Box sx={{mt:1}}>
              <Rating onChange={(e,v)=>{setRating(v)}} precision={0.5} value={rating}/>
              <Stack direction={'row'}>
              <TextField size='small' placeholder='Please enter you review!' value={comment} onChange={(e)=>setComment(e.target.value)}/>
              <Button sx={{ml:2}} onClick={handleComment} variant='contained' size='small '>POST</Button>
              </Stack>
              </Box>
              </ListItem>
              {product.reviews.length!==0 && <>
                <Typography variant='h6'>Comments</Typography>
                <Divider/>
              </>}
              {
                product?.reviews.map(review=>(
                  review.comment !=="" && 
                <ListItem key={review._id}>
                    <Box>
                   <Stack direction={'row'} gap={2}>
                   <Typography variant='body1'>{review.name}</Typography>
                    <Rating size='small' value={review.rating} precision={0.5} /> 
                   </Stack>
                    <Typography variant='body1'>{review.comment}</Typography>
                  </Box>
                </ListItem>
                ))
              }
              </>
            )}
          </List>
        </Grid>
        <Grid item xs={12}md={3} sx={{ml:4}}>
          <Paper elevation={3}>
            <List>
              <ListItem>
              <Typography variant='h5'>Price:</Typography>
                <Typography variant='h6' sx={{ml:1}}>$ {product.price}</Typography>
              </ListItem>
              <Divider/>
              <ListItem sx={{mt:1}}>
                <Typography variant='h5'>Qty: </Typography> <Box sx={{ml:2,display:"flex"}}>
                  <button variant='outlined'  style={{width:"2.4vw",fontSize:"30px"}} sx={{height:10}} onClick={()=>num<product.countInStock && setNum(num+1)}>+</button>
                  <Typography variant='h5' style={{margin:"5px 10px"}}>{num}</Typography>
                  <button variant='outlined' onClick={()=>num>0 && setNum(num-1)} style={{width:"2.4vw",fontSize:"30px"}}>-</button> </Box>
              </ListItem>
              <Divider/>
              <ListItem>
                <Button variant='contained' fullWidth sx={{mt:2, mb:1 }} 
                onClick={handleCart}>Add to Cart</Button>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>
        </>
      }
    </Stack>
  )
}

export default SingleProductScreen;
