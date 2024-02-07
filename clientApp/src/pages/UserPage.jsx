import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { getOrder, getUser } from '../redux/apiCalls';
import { mobile } from "../responsive";
import dayjs from 'dayjs';
import { publicRequest } from '../requestMethods';
import Footer from '../components/Footer';
import ModalTemplate from '../UI/modal/ModalTemplate';
import UpdateUser from '../components/UpdateUser';

const Container = styled.div`
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  border-bottom: 0.5px solid lightgray;
  padding: 20px 0px 0px 0px;
`;

const LeftPart = styled.div`
  width: 70%;
  height: 15vw;
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  width: auto;
  margin: 0 0 0 40vw;
`;

const SubTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  width: auto;
  margin: 0 0 0 40vw;
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const InfoPart = styled.div`
  padding-top: 15px;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Row = styled.div`
  width: 40%;
  display: flex;
  gap: 10%;
`;

const Field1 = styled.div`
  width: 30%;
  font-size: 16px;
  font-weight: 700;
`;

const Field2 = styled.div`
  width: auto;
  font-size: 16px;
  font-weight: 700;
`;

const RightPart = styled.div`
  width: 25%;
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: start;
`;

const UserImage = styled.img`
  width: 14vw;
  height: 14vw;
  border-radius: 50%;
`;

const Orders = styled.div`
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  /* width: 15vw; */
  /* height: 40px; */
  padding: 5px 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 0 10px;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Info = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-top: 0.6px solid lightgray;
  &:last-child {
    border-bottom: 0.5px solid lightgray;
  }
`;

const OrderInfoPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const OrderRow = styled.div`
  display: flex;
  gap: 10%;
`;

const OrderField = styled.span``;

const Order = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({flexDirection:"column"})}
`;

const OrderDetail = styled.div`
  display: flex;
  // flex-direction: column;
  gap: 10px;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductField = styled.span``;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  /* height: 50vh; */
  width: 30%;
`;

const SummaryTitle = styled.h4`
  font-weight: 700;
  margin: 0;
`;

const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === "total" && "700"};
  font-size: 16px;
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const UserPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const orders = useSelector((state) => state.orders.currentCart);
  const ordersProducts = useSelector((state) => state.orders.currentCart?.products);
  const cart = useSelector((state) => state.carts.currentCart?.products);
  const wishlist = useSelector((state) => state.wishlists.currentWishlist?.products);
  const [userOrders, setUserOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  // GET TOTAL PRICE OF CART
  const getTotal = (order) => {
    return order?.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  const handleModal = () => {
    setOpenModal(true);
  };

  // useEffect(() => {
  //   getUser(userId, dispatch);
  // },[dispatch]); 


  useEffect(() => {
    getOrder(userId, dispatch);
    let indArr;
    let indArr1 = [];
    if (orders) {
      indArr = orders?.map(item => item.products).flat().map(elem => elem.productId);
      for (let i = 0; i < orders.length; i++) {
        for (let j = 0; j < orders[i].products.length; j++) {
          indArr1.push({
            orderId: orders[i]._id,
            productId: orders[i].products[j].productId,
            _id: orders[i].products[j]._id,
            quantity: orders[i].products[j].quantity,
            price: orders[i].products[j].price,
            color: orders[i].products[j].color,
            size: orders[i].products[j].size,
          })
        }
      }
      const getProducts = async () => {
        const res = await publicRequest.get(`/products?_id=${indArr}`).then((res)=>{
          let newArr = indArr1.map(item => ({ ...item, 
            title: res.data.find(elem => elem._id === item.productId)?.title, 
            desc: res.data.find(elem => elem._id === item?.productId)?.desc,
            img: res.data.find(elem => elem._id === item.productId)?.img,
          }));
          setUserOrders(newArr);
        })
        .catch (err => {})
      };
      getProducts();
    } else {
      indArr = [];
      setUserOrders([])
    }
  },[user, orders?.length])

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        {/* BUTTON AND LINKS */}
        <TopText onClick={()=>navigate('/cart')}>Shopping Bag ({cart?.length})</TopText>
        <TopText onClick={()=>navigate('/wishlist')}>Your Wishlist ({wishlist?.length})</TopText>
        <Button onClick={()=> navigate('/products/all')}>CONTINUE SHOPPING</Button>
        <Button onClick={()=> navigate('/home')}>TO HOME PAGE</Button>
        <Button onClick={handleModal}>UPDATE ACCOUNT</Button>
        {/* HEADER */}
        <Header>
          {/* USERNAME INFO */}
          <LeftPart>
            <Title>{user?.username}</Title>
            <InfoPart>
            <Row>
              <Field1>Full name:</Field1>
              <Field2>{user?.fullname}</Field2>
            </Row>
            <Row>
              <Field1>Gender:</Field1>
              <Field2>{user?.gender}</Field2>
            </Row>
            <Row>
              <Field1>Birthday:</Field1>
              <Field2>{user?.birthday}</Field2>
            </Row>
            <Row>
              <Field1>Occupation:</Field1>
              <Field2>{user?.occupation}</Field2>
            </Row>
            <Row>
              <Field1>Address:</Field1>
              <Field2>{user?.address}</Field2>
            </Row>
            <Row>
              <Field1>Phone:</Field1>
              <Field2>{user?.phone}</Field2>
            </Row>
            <Row>
              <Field1>Email:</Field1>
              <Field2>{user?.email}</Field2>
            </Row>
          </InfoPart>
          </LeftPart>
          {/* USERNAME PHOTO */}
          <RightPart>
            <UserImage src={user?.img}/>
          </RightPart>
        </Header>
        {/* ORDER HISTORY */}
        <Orders>
          <br/>
            <SubTitle>My orders history</SubTitle>
          <br/>
          {/* ORDER INFO */}
          {orders?.map((order, index)=>
            <Info key={index}>
              <OrderInfoPart>
                <OrderField><b>{dayjs(order.createdAt).format('DD.MM.YYYY HH:mm:ss')}</b></OrderField>
                <OrderField><b>Order ID:</b> {order._id}</OrderField>
                <OrderField><b>Order amount:</b> ${order.amount}</OrderField>
                <OrderField><b>Order address:</b> {order.address}</OrderField>
                <OrderField><b>Order status:</b> {order.status}</OrderField>
              </OrderInfoPart>
              <div style={{display:'flex', width:'100%', alignItems:'start'}}>
              <Order >
                {/* PRODUCT INFO */}
                {userOrders.filter(item => item.orderId === order._id)
                .map((product, idx)=>
                  <OrderDetail key={idx}>
                    <Image src={product?.img} 
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                      }}
                    />
                    <Details>
                      <ProductField><b>Product ID:</b> {product?.productId}</ProductField>
                      <ProductField><b>Product:</b> {product?.title}</ProductField>
                      <ProductField><b>Description:</b> {product?.desc}</ProductField>
                       <FilterColor color={product?.color}/> 
                      <ProductField><b>Size:</b> {product?.size}</ProductField>
                      <ProductField><b>Price:</b> {product?.price}</ProductField>
                      <ProductField><b>Quantity:</b> {product?.quantity}</ProductField>
                    </Details>
                    
                  </OrderDetail>
                )}
              </Order>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {getTotal(userOrders.filter(item => item.orderId === order._id))}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>$ {getTotal(userOrders.filter(item => item.orderId === order._id))}</SummaryItemPrice>
                </SummaryItem>
              </Summary>
              </div>
            </Info>
            )}
        </Orders>
      </Wrapper>

      {openModal &&
       <ModalTemplate active={openModal} setActive={setOpenModal}>
        <UpdateUser openModal={openModal} setOpenModal={setOpenModal}/>
       </ModalTemplate>
      }

      <Footer/>
    </Container>
  )
}

export default UserPage;