import { useEffect, useMemo, useState } from "react";
import './order.css';
import { DeleteOutline } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from "react-router-dom";
import Select from '../../UI/select/Select';
import ProductsSelect from '../../UI/productsSelect/ProductsSelect';
import { useUpdateOrderMutation } from '../../redux/ordersApi';
import { useGetUsersQuery } from "../../redux/usersApi";
import { useGetProductsQuery } from "../../redux/productsApi";

const Order = () => {
  const location = useLocation();
  const {currentOrder} = location.state;
  const orderId = currentOrder._id;
  const navigate = useNavigate();
  const {  data: users = [], isLoading, isFetching, isError, error, } = useGetUsersQuery();
  const {  data: products = [] } = useGetProductsQuery();
  const [updateOrder] = useUpdateOrderMutation();
  const [order, setOrder] = useState(currentOrder);
  const [openInStatus, setOpenInStatus] = useState(false);
  const [openOrderProducts, setOpenOrderProducts] = useState(Array(order.products.length).fill(false));
  const statusOptions  = [
    { value: 'pending'},
    { value: 'ordered'},
    { value: 'sent to address'},
  ];
  const [orderProducts, setOrderProducts] = useState([]);

  const getOrderProducts = () => {
    let newArr = products.map(item => ({value: item.title, productId: item._id }));
    setOrderProducts(newArr);
  };
  
  const getUserNameFromOrder = (userId) => {
    return users?.find(elem => elem._id === userId)?.username;
  };

  const getProductTitleFromOrder = (ProductId) => {
    return products?.find(elem => elem._id === ProductId)?.title;
  };

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  };

  const handleProductQuantityChange = (e, id) => {
    let newArr = order.products.map((item) => item.productId === id ? {...item, [e.target.name]: e.target.value} : item);
    setOrder({ ...order, products: newArr});
  };

  const handleSelectChange = (value) => {
    setOrder({ ...order, 'status': value});
    setOpenInStatus(false);
  };

  const handleProductSelectChange = (index, value) => {
    let id = openOrderProducts.findIndex(item => item === true);
    let newProd = orderProducts.find(item => item.value === value);
    let newArr = order.products.map((item, i) => i === index ? {...item, productId: newProd.productId } : item);
    setOrder({ ...order, products: newArr});
    setOpenOrderProducts(Array(order.products.length).fill(false));
  };

  const handleOpenOrderProducts = (index) => {
    let newArr = openOrderProducts.map((item, i) => i === index ? !item : false);
    setOpenOrderProducts(newArr);
  };

  const handleClick = async(e) => {
    e.preventDefault();
    let newArr = { ...order, "amount": getTotal()};
    setOrder(newArr);
    await updateOrder({id: orderId, body: newArr});
    navigate('/orders');
  };

  // TOTAL ORDER AMOUNT
  const getTotal = () => {
    return order.products?.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const handleProductDelete = (id) => {
    if (order.products.length !== 1) {
      let newArr = order.products.filter(item => item._id !== id);
      setOrder({ ...order, products: newArr});
    }
  };

  useEffect(() => {
    getOrderProducts();
  }, []);


  return (
    <div className="order">
      <div className="orderTitleContainer">
        <div className="orderTitle">Order edit</div>
      </div>
      <div className="orderContainer">
        <div className="orderTop">
          <div className="orderInfoItem">
            <span className="orderInfoKey">ID:</span>
            <span className="orderInfoValue">{order._id}</span>
          </div>
          <div className="orderInfoItem">
            <span className="orderInfoKey">User:</span>
            <span className="orderInfoValue">{getUserNameFromOrder(order.userId)}</span>
          </div>
          <div className="orderInfoItem">
            <span className="orderInfoKey">Amount:</span>
            <span className="orderInfoValue">{getTotal()}</span>
          </div>
          <div className="orderInfoItem">
            <span className="orderInfoKey">Created date:</span>
            <span className="orderInfoValue">{dayjs(order.createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          </div>
          <div className="orderInfoItem">
            <span className="orderInfoKey">Updated date:</span>
            <span className="orderInfoValue">{dayjs(order.updatedAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          </div>
        </div>
        
        
        <form className="orderUpdateForm" onSubmit={handleClick}>
          <div className="OrderUpdateFormTopPart">  
            <div className="orderUpdateItem">
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="Address"
                className="orderUpdateInput"
                value={order.address || ''}
                onChange={e => handleChange(e)}
              />
            </div>
            <div className="orderUpdateItem">
              <label>Status</label>
              <Select 
                options={statusOptions}
                selected={order.status}
                onChange={handleSelectChange}
                open={openInStatus}  
                setOpen={setOpenInStatus}
              />
            </div>
          </div>
          <div className="OrderProductsPartTitle">Products</div>
          <div className="OrderProductsPart">  
          {order?.products?.map((product, index) => (
            <div className="OrderProductPart" key={product._id}>
              <div className="orderUpdateItem">
                <label>Product title</label>
                <ProductsSelect 
                  options={orderProducts}
                  selected={getProductTitleFromOrder(product.productId) || ''}
                  onChange={handleProductSelectChange}
                  open={openOrderProducts}
                  setOpen={handleOpenOrderProducts}
                  index={index} 
                />
              </div>
              <div className="orderUpdateSecondItem">
                <label>Product quantity</label>
                <input
                  name="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="orderUpdateInput"
                  style={{width:"117px"}}
                  value={product.quantity}
                  onChange={e => handleProductQuantityChange(e, product.productId)}
                />
              </div>
              <div className="orderUpdateSecondItem">
                <label>Product price</label>
                <input
                  name="price"
                  type="number"
                  placeholder="Price"
                  className="orderUpdateInput"
                  style={{width:"117px"}}
                  value={product.price}
                  onChange={e => handleProductQuantityChange(e, product.productId)}
                />
              </div>
              <div className="orderUpdateSecondItem">
                <label>Product color</label>
                <input
                  name="color"
                  type="text"
                  placeholder="Color"
                  className="orderUpdateInput"
                  style={{width:"117px"}}
                  value={product.color}
                  onChange={e => handleProductQuantityChange(e, product.productId)}
                />
              </div>
              <div className="orderUpdateSecondItem">
                <label>Product size</label>
                <input
                  name="size"
                  type="text"
                  placeholder="Size"
                  className="orderUpdateInput"
                  style={{width:"117px"}}
                  value={product.size}
                  onChange={e => handleProductQuantityChange(e, product.productId)}
                />  
              </div>
              <div style={{display: "flex", justifyContent:"end"}}>
              <Tooltip title={order.products.length === 1 ? "You can't delete all products in order" : "" }>
                <DeleteOutline
                  className="orderProductDelete"
                  onClick={() => handleProductDelete(product._id)}
                />
              </Tooltip>
              </div>
            </div>
          ))}
          </div>
          <div className="orderButtonPart">
            <button type="submit" className="orderUpdateButton">Update</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};

export default Order;