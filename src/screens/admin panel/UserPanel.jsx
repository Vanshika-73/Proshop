import React, { useEffect } from "react";
import {
  Paper,
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchAllUsers, updateUserAdmin } from "../../slices/UserSlice";
import Switch from '@mui/material/Switch';

const UserPanel = () => {
  const { userInfo, users } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    !userInfo && navigate("/");
    !userInfo?.isAdmin ? navigate("/") : dispatch(fetchAllUsers());
  }, []);
  const handleChange = (e,user) => {
   if(userInfo._id === user._id) {
    alert("your cannot change your role");
    return;
  }
    const check = confirm(`Are you sure that you want to ${user.name} ${user.isAdmin ? "remove" : "make"} as an admin?`)
    check && dispatch(updateUserAdmin({_id:user._id,data:{isAdmin:e.target.checked}}))
  }
  const handleDelete = (user) => {
    if(userInfo._id === user._id){
      alert("You cannot delete youself");
      return;
    }
    dispatch(deleteUser(user._id));
  }
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align={"center"}>Name</TableCell>
              <TableCell align={"center"}>Email</TableCell>
              <TableCell align={"center"}>Admin</TableCell>
              <TableCell align={"center"}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user,index) => (
              <TableRow key={index}>
                <TableCell align={"center"}>{user.name}</TableCell>
                <TableCell align={"center"}>{user.email}</TableCell>
                <TableCell align={"center"}>
                  {user.isAdmin ? <CheckIcon sx={{color:"green"}} /> : <CloseIcon sx={{color:"red"}}/>}
                  <Switch color="green" checked={user.isAdmin} onClick={(e)=>handleChange(e,user)}/>
                </TableCell>
                <TableCell align={"center"}>
                  <DeleteIcon onClick={()=>handleDelete(user )} sx={{cursor:"pointer"}}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserPanel;
