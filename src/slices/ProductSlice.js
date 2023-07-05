import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = import.meta.env.VITE_APP_URL;

const initialState = {
  all_products: null,
  loading: true,
  error: false,
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchProducts",
  () => {
    return axios(`${URL}/products`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);
export const createProduct = createAsyncThunk(
  "products/createProduct",
  (data) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    console.log("dara",data,token);
    return axios
      .post(`${URL}/products`,data,{headers:{Authorization: `Bearer ${token}`}})
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  ({ _id, data }) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
      .put(`${URL}/products/${_id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  (_id) => {
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios
      .delete(`${URL}/products/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new Error(err.response.data.message);
      });
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [fetchAllProducts.pending]: (state) => {
      state.loading = true;
      state.all_products = null;
      state.error = false;
    },
    [fetchAllProducts.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_products = action.payload;
    },
    [fetchAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createProduct.pending]: (state) => {
      // state.loading = true;
      // state.all_products = null;
      // state.error = false;
    },
    [createProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.all_products.push(action.payload);
    },
    [createProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [updateProduct.pending]: (state) => {
      console.log("worked");
      // state.loading = true;
      // state.all_products = null;
      // state.error = false;
    },
    [updateProduct.fulfilled]: (state, action) => {
      let { _id } = action.payload;
      let index = state.all_products.findIndex(
        (product) => product._id === _id
      );
      // console.log("index", index);
      state.loading = false;
      state.all_products[index] = action.payload;
    },
    [updateProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [deleteProduct.pending]: (state) => {
      // state.loading = true;
      // state.all_products = null;
      // state.error = false;
    },
    [deleteProduct.fulfilled]: (state, action) => {
      state.loading = false;
      const { _id } = action.payload;
      let index = state.all_products.findIndex(
        (product) => product._id === _id
      );
      state.all_products.splice(index, 1);
    },
    [deleteProduct.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export default ProductSlice.reducer;