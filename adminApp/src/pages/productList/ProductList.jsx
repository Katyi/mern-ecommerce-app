import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product?.products);
  
  useEffect(() => {
    getProducts(dispatch);
  },[dispatch]);
  
  const handleDelete = (id) => {
    deleteProduct(id, dispatch);
  };

  const columns = [
    { field: "No.", headerName: "No.", width: 90 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params?.row.img}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
              }}
            />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "InStock", width: 150 },
    {
      field: "price",
      headerName: "Price",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  const rows = products?.map((p, i)=> ({ 'No.': i + 1, ...p }));
  
  return (
    <div className="productList">
      <div className="button_wrapper">
        <Link to="/newproduct">
          <button className="productAddButton">Create new product</button>
        </Link>
      </div>
      <div className="productListGrid">
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
  );
}