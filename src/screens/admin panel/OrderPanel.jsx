import {
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderCell from "../../components/OrderCell";
const OrderPanel = () => {
  const URL = import.meta.env.VITE_APP_URL;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get(`${URL}/order`).then((res) => {
      setOrders(res.data);
   });
  }, [orders]);
  
  return (
    <>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align={"center"}>OrderId</TableCell>
                <TableCell align={"center"}>UserId</TableCell>
                <TableCell align={"center"}>UserName</TableCell>
                <TableCell align={"center"}>Payment Method</TableCell>
                <TableCell align={"center"}>isPaid</TableCell>
                <TableCell align={"center"}>ShippingDate</TableCell>
                <TableCell align={"center"}>Total Price</TableCell>
                <TableCell align={"center"}>isDelivered</TableCell>
                <TableCell align={"center"}>DeliveryDate</TableCell>
                <TableCell align={"center"}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order,index) => (
                <OrderCell item={order} key={index}/>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default OrderPanel;
