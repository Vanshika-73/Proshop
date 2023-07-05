import React, { useEffect } from "react";
import { Alert, Grid } from "@mui/material";
import Product from "../components/Product";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../slices/ProductSlice";
import { useNavigate } from "react-router";
function HomeScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {userInfo} = useSelector(state=>state.user);
  const { all_products,loading,error } = useSelector((state) => state.products);
  useEffect(() => {
    let user = localStorage.getItem("userInfo")
    if(!user){navigate('/login')}
    dispatch(fetchAllProducts())
  }, []);
  return (
    <>
      {loading && <Loading />}
      {(error) && <Alert severity="error">{error}</Alert>} 
      <Grid container justifyContent={"space-around"} spacing={3}>
        {all_products?.map((item) => (
          <Product product={item} key={item._id}/>
        ))}
        {/* {all_products?.map((item) => (
          <Product product={item} key={item._id}/>
        ))} */}
      </Grid>
    </>
  );
}

export default HomeScreen;
