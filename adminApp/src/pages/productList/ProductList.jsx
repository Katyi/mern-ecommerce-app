import "./productList.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { Table, TableHead, TableBody, TableRow, TableCell, Pagination } from '@mui/material';
import { imageUpload, imageDelete } from '../../services/imageUpload';

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

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = Math.floor((window.innerHeight - 130 - 20 - 46 - 57 - 10 - 32)/ 67);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const getPaginatedData = products.slice(startIndex, endIndex);
  
  useEffect(() => {
    getProducts(dispatch);
  },[dispatch]);
  
  const handleDelete = (id) => {
    let ind = products.findIndex(item => item._id === id);
    if (products[ind]?.img) {
      imageDelete(products[ind].img.slice(29));
    }
    deleteProduct(id, dispatch);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
  
  return (
    <div className="productList">
      <div className="product_button_wrapper">
        <div className="productsTitle">Products</div>
        <Link to="/newproduct">
          <button className="productAddButton">Create new product</button>
        </Link>
      </div>
      <Table style={styles.table}>
        <TableHead style={styles.thead}>
          <TableRow>
          <TableCell style={{width:"10%", fontWeight: "700", paddingLeft: "5%"}} >No.</TableCell>
            <TableCell style={{width:"30%", fontWeight: "700"}}>Product</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>InStock</TableCell>
            <TableCell style={{width:"25%", fontWeight: "700"}}>Price</TableCell>
            <TableCell style={{width:"20%", fontWeight: "700"}}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getPaginatedData.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell style={{width:"10%", paddingLeft: "5%"}}>{startIndex + index+1}</TableCell>
                <TableCell style={{width:"30%"}}>
                  <div className="productListItem">
                    <img className="productListImg" src={item.img}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                      }}
                    />
                    {item.title}  
                  </div>
                </TableCell>
                <TableCell style={{width:"20%"}}>{item.inStock ? "In stock" : "Not in stock"}</TableCell>
                <TableCell style={{width:"25%"}}>{item.price}</TableCell>
                <TableCell style={{width:"20"}}>
                <div style={{display:"flex", alignItems:"center"}}>
                  <Link to={"/product/" + item._id}>
                    <button className="productListEdit">Edit</button>
                  </Link>
                  <DeleteOutline
                    className="productListDelete"
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
        count={Math.ceil(products.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </div>
  );
}