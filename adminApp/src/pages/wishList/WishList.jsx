import React, { useEffect } from 'react';
import './wishList.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, getWishlists } from '../../redux/apiCalls';
// import { DataGrid } from "@material-ui/data-grid";
import { DataGrid } from "@mui/x-data-grid";
// import { DeleteOutline } from "@material-ui/icons";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import dayjs from 'dayjs';

const WishList = () => {
  const dispatch = useDispatch();
  const wishlists = useSelector((state) => state.wishlist?.wishlists);
  const users = useSelector((state) => state.user?.users);

  const getUserNamefromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  useEffect(() => {
    getWishlists(dispatch);
  },[dispatch]);

  useEffect(() => {
    if(!users) getUsers(dispatch);
  }, [dispatch]);

  const columns = [
    { field: "No.", headerName: "No.", width: 50 },
    { field: "_id", headerName: "Wishlist ID.", width: 250 },
    { 
      field: "userId", 
      headerName: "User", 
      width: 150,
      renderCell: (params) => {
        return (
          <div className="wishlistListItem">
            {getUserNamefromOrder(params.row.userId)}
          </div>
        );
      },
    },
    { 
      field: "createdAt", 
      headerName: "Created date", 
      width: 200,
      renderCell: (params) => {
        return (
          <div className="wishlistListItem">
            {dayjs(params.row.createdAt).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        );
      },
    },
    { 
      field: "updatedAt", 
      headerName: "Updated date", 
      width: 200,
      renderCell: (params) => {
        return (
          <div className="wishlistListItem">
            {dayjs(params.row.updatedAt).format('DD.MM.YYYY HH:mm:ss')}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="wishListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="wishListDelete"
              // onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = wishlists?.map((p, i)=> ({ 'No.': i + 1, ...p }));

  return (
    <div className="wishList">
      <div className="wishList_button_wrapper">
        <h2 className="WishlistsTitle">Wishlists</h2>
        <Link to="/newproduct">
          <button className="wishlistAddButton">Create new wishlist</button>
        </Link>
      </div>
      <div className="wishListGrid">
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

export default WishList;