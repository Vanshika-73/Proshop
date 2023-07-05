import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const URL = import.meta.env.VITE_APP_URL;

const initialState = {
    items:null,
    loading:true,
    error:false,
    amount:0,
    subQty:0
}

const totalQty = (arr)=>{
    let result = arr?.reduce((acc,v)=>acc + v.qty,0)
    return result;
}

const totalAmount= (arr)=>{
    let result = arr?.reduce((acc,v)=>
        acc + v.qty*v.price,0)
    return result;
}

export const fetchCartItems = createAsyncThunk('cart/fetchCartItems',(user)=>{
    return axios(`${URL}/cart/${user}`).then((res)=>res.data).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const createUserCart = createAsyncThunk("cart/createUserCart",(user)=>{
    return axios.post(`${URL}/cart/${user}`).then((res)=>res.data).catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const updateUserCart = createAsyncThunk("cart/updateUserCart",({user,item})=>{
    return axios.put(`${URL}/cart/${user}`,item).then((res)=>{console.log(res.data);
    res.data})
    .catch((err)=>{
        throw new Error(err.response.data.message)
    })
})

export const deleteCartItem = createAsyncThunk("cart/removeCartItem",({user,_id})=>{
    return axios.delete(`${URL}/cart/${user}/${_id}`).then((res)=>res.data)
    .catch((err)=>{
        throw new Error(err.response.data.message)
    })
})


  export const updateQty= createAsyncThunk("cart/updateItemQty",(data)=>{
    console.log("carrrrr",data);
    return axios
    .put(`${URL}/cart/qty/${data.user}`, data.item)
    .then((res) => 
        res.data?.items)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  }
  );

  export const clearCart= createAsyncThunk("cart/clearCart",(user)=>{
    return axios
    .put(`${URL}/cart/clear/${user}`)
    .then((res) => 
        res.data)
    .catch((err) => {
      throw new Error(err.response.data.message);
    });
  }
  );

const CartSlice = createSlice({
    name: "cart",
    initialState,
    extraReducers:{
        [fetchCartItems.pending]: (state)=>{
            state.loading = false;
            state.items = null;
            state.error = false;
            state.amount=0;
            state.subQty=0;
        },
        [fetchCartItems.fulfilled]: (state,action)=>{
            state.loading = false;
            state.items = action.payload.items;
            state.error = false;
            state.amount =action.payload && totalAmount(action.payload.items);
            state.subQty =action.payload && totalQty(action.payload.items);
        },
        [fetchCartItems.rejected]: (state,action)=>{
            state.loading = false;
            state.items = null;
            state.amount=0;
            state.subQty=0;
            state.error = action.error.message;
        },
        [createUserCart.pending]: (state)=>{
            state.loading = true;
        },
        [createUserCart.fulfilled]: (state,action)=>{
            state.loading = false;
        },
        [createUserCart.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        },
        [updateUserCart.pending]: (state)=>{
            state.loading = true;
            state.amount=0;
            state.subQty=0;
        },
        [updateUserCart.fulfilled]: (state,action)=>{
            console.log(action.payload);
            state.loading = false;            
        },
        [updateUserCart.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        },
        [deleteCartItem.pending]: (state)=>{
            state.loading = true;
            state.items = null;
            state.error = false;
        },
        [deleteCartItem.fulfilled]: (state,action)=>{
            state.loading = false;      
            state.items = action.payload.items;
            state.amount =action.payload && totalAmount(action.payload.items);
            state.subQty =action.payload && totalQty(action.payload.items);
        },
        [deleteCartItem.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        },
        [updateQty.pending]: (state)=>{
            state.loading = true;
            state.items = null;
            state.error = false;
        },
        [updateQty.fulfilled]: (state,action)=>{
            state.loading = false;
            state.items = action.payload;     
            state.amount = action.payload && totalAmount(action.payload);
            state.subQty =action.payload && totalQty(action.payload);   
        },
        [updateQty.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        },
        [clearCart.pending]: (state)=>{
            state.loading = true;
            state.items = null;
            state.error = false;
        },
        [clearCart.fulfilled]: (state,action)=>{     
            state.items = [];
            state.loading = false;
            state.amount = 0;
            state.subQty = 0;
        },
        [clearCart.rejected]: (state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        },
    }
});
export default CartSlice.reducer;