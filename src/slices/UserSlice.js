import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getUser= localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
const URL = import.meta.env.VITE_APP_URL;

const initialState = {
    userInfo: getUser,
    error : false
}

export const fetchAllUsers = createAsyncThunk("user/fetchAllUsers",()=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.get(`${URL}/user/`,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

 

export const registerUser = createAsyncThunk("user/registerUser",(data)=>{
    console.log(data);
    return axios.post(`${URL}/user/register`,data).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

export const loginUser= createAsyncThunk("user/loginUser", (data)=>{
    return axios.post(`${URL}/user/login`,data).then((res) =>res.data).catch((err)=>{
        throw new Error(err.response.data.message);
});
});

export const updateUser = createAsyncThunk("user/updateUser", (data)=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.put(`${URL}/user`,data,{headers:{Authorization: `Bearer ${token}`}}).then((res) =>res.data).catch((err)=>{
        throw new Error(err.response.data.message);
});
});

export const updateUserAdmin = createAsyncThunk("user/updateUserAdmin",({_id,data})=>{
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.put(`${URL}/user/admin/${_id}`,data,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})

export const deleteUser = createAsyncThunk("user/deleteUser",(_id)=>{
    console.log("od",_id);
    let token = JSON.parse(localStorage.getItem("userInfo")).token;
    return axios.delete(`${URL}/user/${_id}`,{headers:{Authorization: `Bearer ${token}`}}).then(res=>res.data).catch(err=>{
        throw new Error(err.response.data.message)
    })
})



const userSlice= createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state)=>{ 
            state.userInfo = null;
            state.error = false;
            state=>state.cart=null;
            localStorage.removeItem("userInfo");
        }
    },
    extraReducers:{
        [fetchAllUsers.pending]:(state)=>{
            state.users=null;
        },
        [fetchAllUsers.fulfilled]:(state,action)=>{
            state.users=action.payload;
            state.error=false;
        },
        [fetchAllUsers.rejected]:(state,action)=>{
            state.error=action.error.message;
        },
        [registerUser.pending]:(state)=>{
            state.userInfo=null;
            state.error=true;
        },
        [registerUser.fulfilled]:(state,action)=>{
            state.userInfo=action.payload;
            state.error=false;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        [registerUser.rejected]:(state,action)=>{
            state.error=action.error.message;
        },
        [loginUser.pending]:(state)=>{
            state.userInfo=null;
            
        },
        [loginUser.fulfilled]:(state,action)=>{
            state.userInfo=action.payload;
            state.error= false;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        [loginUser.rejected]:(state,action)=>{
            state.error=action.error.message;
            
        },
        [updateUser.pending]:(state)=>{
            state.userInfo=null;
            
        },
        [updateUser.fulfilled]:(state,action)=>{
            state.userInfo=action.payload;
            state.error= false;
            localStorage.setItem("userInfo",JSON.stringify(action.payload));
        },
        [updateUser.rejected]:(state,action)=>{
            state.error=action.error.message;
            
        },
        // [updateUserAdmin.pending]:(state,action)=>{
        //     state.users=null;
        //1.11.37
        // },
        [updateUserAdmin.fulfilled]:(state,action)=>{
            let {_id} = action.payload;
            let index = state.users.findIndex(user=>user._id===_id);
            state.users[index]=action.payload;
            state.error= false;
        },
        [updateUserAdmin.rejected]:(state,action)=>{
            state.error=action.error.message;           
        },
        [deleteUser.pending]:(state)=>{
            // state.users=null;
        },
        [deleteUser.fulfilled]:(state,action)=>{
            state.loading = false;
            state.error=false;
            const { _id } = action.payload;
            let index = state.users.findIndex(
              (user) => user._id === _id
            );
            state.users.splice(index, 1);
        },
        [deleteUser.rejected]:(state,action)=>{
            state.error=action.error.message;
        },
    }
});
export const {logout}= userSlice.actions;
export default userSlice.reducer