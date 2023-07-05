import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    product:null,
    loading :true,
    error:false
}
const URL = import.meta.env.VITE_APP_URL;

export const fetchSingleProduct = createAsyncThunk("singleProduct/fetchSingleProduct",(id)=>{
    return axios.get(`${URL}/products/${id}`).then((res)=>{
      return res.data;
    }).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const createReveiw =  createAsyncThunk("singleProduct/createReview",({id,data})=>{
    return axios.post(`${URL}/products/reviews/${id}`,data).then((res)=>{
      return res.data;
    }).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

const SingleProductSlice = createSlice({
    name:"singleProduct",
    initialState,
    extraReducers:{
        [fetchSingleProduct.pending]:(state)=>{
            state.loading = true;
            state.product = null;
            state.error=false;
        },
        [fetchSingleProduct.fulfilled]:(state,action)=>{
            state.loading = false;
            state.product = action.payload;
            state.error=false;
        },
        [fetchSingleProduct.rejected]:(state,action)=>{
            state.loading = false;
            state.product = null; 
            state.error = action.error.message;
        },
        [createReveiw.pending]:(state)=>{
            state.loading = true;
            // state.product = null;
            state.error=false;
        },
        [createReveiw.fulfilled]:(state,action)=>{
            state.loading = false;
            state.product = action.payload;
            state.error=false;
        },
        [createReveiw.rejected]:(state,action)=>{
            state.loading = false;
            // state.product = null; 
            state.error = action.error.message;
        },
    }
})

export default SingleProductSlice.reducer;