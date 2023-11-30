import React, { useEffect } from 'react';
import './orderList.css';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, getUsers } from '../../redux/apiCalls';
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
// import {format} from "timeago.js"
import dayjs from 'dayjs';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order?.orders);
  const users = useSelector((state) => state.user?.users);

  const getUserNamefromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  useEffect(() => {
    getOrders(dispatch);
  },[dispatch]);

  useEffect(() => {
    if(!users) getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "No.", headerName: "No.", width: 50 },
    { field: "_id", headerName: "Order ID.", width: 250 },
    { 
      field: "userId", 
      headerName: "User", 
      width: 100,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {getUserNamefromOrder(params.row.userId)}
          </div>
        );
      },
    },
    { field: "amount", headerName: "Amount", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { 
      field: "createdAt", 
      headerName: "Created date", 
      width: 250,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {dayjs(params.row.createdAt).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        );
      },
    },
    { 
      field: "updatedAt", 
      headerName: "Updated date", 
      width: 250,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {dayjs(params.row.updatedAt).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              // onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = orders?.map((p, i)=> ({ 'No.': i + 1, ...p }));

  return (
    <div className="orderList">
      <div className="order_button_wrapper">
        <h2 className="OrdersTitle">Orderlists</h2>
        <Link to="/newproduct">
          <button className="orderAddButton">Create new order</button>
        </Link>
      </div>
      <div className="orderGrid">
        <DataGrid
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={10}
          checkboxSelection
        />
      </div>
    </div>
  )
}

export default OrderList;