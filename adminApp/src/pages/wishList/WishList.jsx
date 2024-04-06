import { useEffect, useState } from "react";
import './wishList.css';
import { DeleteOutline } from "@mui/icons-material";
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { useGetWishlistsQuery, useDeleteWishlistMutation } from "../../redux/wishlistsApi";
import { useGetUsersQuery } from "../../redux/usersApi";
import dot from "../../assets/dot.svg";

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
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
};

const WishList = () => {
  const {  data: wishlists = [], isLoading, isFetching, isError, error, } = useGetWishlistsQuery();
  const {  data: users = [] } = useGetUsersQuery();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.floor((window.innerHeight - 130 - 20 - 46 - 57 - 10 - 32)/ 59);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const getPaginatedData = wishlists.slice(startIndex, endIndex);
  
  const getUserNamefromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  const handleDelete = (id) => {
    deleteWishlist(id);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  if (isLoading || isFetching) {
    return <div className="loadingPage">
      <img src={dot} alt="dot" className="dot"/>
      <img src={dot} alt="dot" className="dot"/>
      <img src={dot} alt="dot" className="dot"/>
    </div>;
  }

  if (isError) {
    console.log({ error });
    return <div className="loadingPage">
      <h2>{error.status}</h2>
    </div>;
  }
  
  return (
    <div className="wishList">
      <div className="wishList_button_wrapper">
        <div className="WishlistsTitle">Wishlists</div>
      </div>
      <Table style={styles.table}>
        <TableHead style={styles.thead}>
          <TableRow>
            <TableCell style={{width:"10%", fontWeight: "700", paddingLeft: "5%"}} >No.</TableCell>
            <TableCell style={{width:"12%", fontWeight: "700"}}>Order ID</TableCell>
            <TableCell style={{width:"12%", fontWeight: "700"}}>User</TableCell>
            <TableCell style={{width:"22%", fontWeight: "700"}}>Created date</TableCell>
            <TableCell style={{width:"22%", fontWeight: "700"}}>Updated date</TableCell>
            <TableCell style={{width:"10%", fontWeight: "700"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getPaginatedData.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell style={{width:"10%", paddingLeft: "5%"}}>{startIndex + index+1}</TableCell>
            <TableCell style={{width:"12%"}}>{item._id}</TableCell>
            <TableCell style={{width:"12%"}}>{getUserNamefromOrder(item.userId)}</TableCell>
            <TableCell style={{width:"22%"}}>{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
            <TableCell style={{width:"22%"}}>{dayjs(item.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
            <TableCell style={{width:"10"}}>
              <div style={{display:"flex", alignItems:"center"}}>
                <Link to={"/wishlists/" + item._id} state={{currentWishlist: wishlists.find((wishlist) => wishlist?._id === item._id)}}>
                  <button className="productListEdit">View</button>
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
        </TableBody>
      </Table>
      <Pagination
        style={styles.pagination}
        count={Math.ceil(wishlists.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  )
}

export default WishList;