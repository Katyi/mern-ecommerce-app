import "./userList.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';
import { imageDelete } from '../../services/imageUpload';
import { useGetUsersQuery, useDeleteUserMutation } from "../../redux/usersApi";

const styles = {
  table: {
    border: '0.1px solid #ddd',
    borderCollapse: 'collapse',
    width: '100%',
    boxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)",
    WebkitBoxShadow: "0px 0px 15px -10px rgba(0, 0, 0, 0.75)"
  },
  thead: {
    backgroundColor: '#f1f1f1',
  },
  tableRow: {
    height: "40px",
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
};

export default function UserList() {
  const {  data: users = [], isLoading,
    isFetching,
    isError,
    error, } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.floor((window.innerHeight - 130 - 20 - 46 - 57 - 10 - 32)/ 67);

  const handleDelete = (id) => {
    let ind = users.findIndex(item => item._id === id);
    if (users[ind]?.img) {
      imageDelete(users[ind].img.slice(29));
    }
    deleteUser(id);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const getPaginatedData = users.slice(startIndex, endIndex);
  
  return (
    <div className="userList">
      <div className="user_button_wrapper">
        <div className="usersTitle">Users</div>
        <Link to="/newUser">
          <button className="userAddButton">Create new user</button>
        </Link>
      </div>
      <Table style={styles.table}>
        <TableHead style={styles.thead}>
          <TableRow>
            <TableCell style={{width:"10%", fontWeight: "700", paddingLeft: "5%"}} >No.</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>user</TableCell>
            <TableCell style={{width:"10%", fontWeight: "700"}}>Role</TableCell>
            <TableCell style={{width:"30%", fontWeight: "700"}}>Email</TableCell>
            <TableCell style={{width:"15%", fontWeight: "700"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {getPaginatedData.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell style={{width:"10%", paddingLeft: "5%"}}>{startIndex + index+1}</TableCell>
                <TableCell style={{width:"20%"}}>
                  <div className="userListUser">
                    <img className="userListImg" src={item.img} 
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
                      }}
                    />
                    {item.username}  
                  </div>
                </TableCell>
                <TableCell style={{width:"10%"}}>{item.isAdmin ? "Admin" : "User"}</TableCell>
                <TableCell style={{width:"30%"}}>{item.email}</TableCell>
                <TableCell style={{width:"15%"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                  <Link to={"/user/" + item._id} state={{currentUser: users.find((user) => user?._id === item._id)}}>
                    <button className="userListEdit">Edit</button>
                  </Link>
                  <DeleteOutline
                    className="userListDelete"
                    onClick={() => handleDelete(item._id)}
                  />
                </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
      </Table>
      <Pagination
        style={styles.pagination}
        count={Math.ceil(users.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
};