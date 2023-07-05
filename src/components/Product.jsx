import { Card, CardContent, CardMedia, Divider, Grid, Rating, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import React from 'react';
import { Link } from 'react-router-dom';

function Product({product}) {
  const navi = useNavigate();
  return (
    <Grid item md={3} xs={12} >
        <Card sx={{minHeight:450}} elevation={4}>
        <CardMedia 
      onClick={()=>(navi(`/Product/${product._id}`))}
        component="img"
        height="220"
        image={product.image}
        alt={product.name}
      />
      <CardContent>
        <Link  style={{textDecoration:"none"}} to={`/Product/${product._id}`} >
        <Typography color={'text.primary'}  id='productNameLink' gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        </Link>
        <Rating value={product?.ratings} precision={0.5} readOnly sx={{mt:1}}/>
        <Divider/>
        <Typography variant="h5" fontSize={'1.5rem'} color="text.secondary" sx={{mt:2}}>
          $ {product.price}
        </Typography>
      </CardContent>
    </Card>
    </Grid>
  )
}

export default Product