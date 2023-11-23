import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/apiCalls";

export default function UserList() {
  const [data, setData] = useState(userRows);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.users);
  // const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  console.log(users);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteUser(id, dispatch);
  };

  const columns = [
    { field: "No.", headerName: "No.", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
              }}
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: {"isAdmin": "Admin"}, headerName: "Role", width: 150,
      renderCell: (params) => {
        return (params.row.isAdmin ? "Admin" : "User");
      },
  
    },
    { field: "email", headerName: "Email", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];
  const rows = users?.map((p, i)=> ({ 'No.': i + 1, ...p }))

  return (
    <div className="userList">
      <div className="button_wrapper">
        <Link to="/newUser">
          <button className="userAddButton">Create new user</button>
        </Link>
      </div>
      <div className="userListGrid">
        <DataGrid
          rows={rows}
          disableSelectionOnClick
          columns={columns}
          getRowId={(row) => row._id}
          pageSize={15}
          checkboxSelection
        />
      </div>
    </div>
  );
}