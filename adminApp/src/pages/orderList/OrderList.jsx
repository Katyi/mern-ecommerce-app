import { useEffect, useState } from "react";
import './orderList.css';
import { DeleteOutline } from "@mui/icons-material";
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';
import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import { useGetOrdersQuery, useDeleteOrderMutation } from "../../redux/ordersApi";
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

const OrderList = () => {
  const {  data: orders = [], isLoading, isFetching, isError, error, } = useGetOrdersQuery();
  const {  data: users = [] } = useGetUsersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.floor((window.innerHeight - 130 - 20 - 46 - 57 - 10 - 32)/ 60);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const getPaginatedData = orders.slice(startIndex, endIndex);

  const getUserNamefromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  const handleDelete = (id) => {
    deleteOrder(id);
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
    <div className="orderList">
      <div className="order_button_wrapper">
        <div className="OrdersTitle">Orders</div>
        {/* <Link to="/newOrder">
          <button className="orderAddButton">Create new order</button>
        </Link> */}
      </div>
      <Table style={styles.table}>
        <TableHead style={styles.thead}>
          <TableRow>
            <TableCell style={{width:"10%", fontWeight: "700", paddingLeft: "5%"}} >No.</TableCell>
            <TableCell style={{width:"10%", fontWeight: "700"}}>Order ID</TableCell>
            <TableCell style={{width:"10%", fontWeight: "700"}}>User</TableCell>
            <TableCell style={{width:"10%", fontWeight: "700"}}>Amount</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Created date</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Updated date</TableCell>
            <TableCell style={{width:"5%", fontWeight: "700"}}>Status</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {getPaginatedData.map((item, index) => (
          <TableRow key={item._id}>
            <TableCell style={{width:"10%", paddingLeft: "5%"}}>{startIndex + index+1}</TableCell>
            <TableCell style={{width:"10%"}}>{item._id}</TableCell>
            <TableCell style={{width:"10%"}}>{getUserNamefromOrder(item.userId)}</TableCell>
            <TableCell style={{width:"10%"}}>{item.amount}</TableCell>
            <TableCell style={{width:"20%"}}>{dayjs(item.createdAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
            <TableCell style={{width:"20%"}}>{dayjs(item.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</TableCell>
            <TableCell style={{width:"5%"}}>{item.status}</TableCell>
            <TableCell style={{width:"20"}}>
              <div style={{display:"flex", alignItems:"center"}}>
                <Link to={"/orders/" + item._id} state={{currentOrder: orders.find((order) => order?._id === item._id)}}>
                  <button className="productListEdit">Edit</button>
                </Link>
                <DeleteOutline
                  className="orderListDelete"
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
        count={Math.ceil(orders.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  )
}

export default OrderList;