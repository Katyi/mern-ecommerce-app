import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Announcement from '../../components/announcement/Announcement';
import { getOrder, getUser } from '../../redux/apiCalls';
import dayjs from 'dayjs';
import { publicRequest } from '../../requestMethods';
import Footer from '../../components/footer/Footer';
import ModalTemplate from '../../UI/modal/ModalTemplate';
import UpdateUser from '../../components/updateUser/UpdateUser';
import { Container, Wrapper, Header, LeftPart, Title, SubTitle, TopText, InfoPart, Row, Field1, Field2, 
  RightPart, UserImage, Orders, Button, Info, OrderInfoPart, OrderRow, OrderField, Order, OrderDetail, Image, Details, 
  ProductField, FilterColor, Summary, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice } from './styled.js';
import { useTranslation } from 'react-i18next';

const UserPage = () => {
  const { i18n, t } = useTranslation();
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
        <TopText onClick={()=>navigate('/cart')}>{t("shoppingBag")} ({cart?.length})</TopText>
        <TopText onClick={()=>navigate('/wishlist')}>{t("yourWishlist")} ({wishlist?.length})</TopText>
        <Button onClick={()=> navigate('/products/all')}>{t("toContinueShoppingLink")}</Button>
        <Button onClick={()=> navigate('/home')}>{t("toHomePage")}</Button>
        <Button onClick={handleModal}>{t("userPageUpdateAccount")}</Button>
        {/* HEADER */}
        <Header>
          {/* USERNAME INFO */}
          <LeftPart>
            <Title>{user?.username}</Title>
            <InfoPart>
            <Row>
              <Field1>{t("userPageFullName")}:</Field1>
              <Field2>{user?.fullname}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPageGender")}:</Field1>
              <Field2>{user?.gender}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPageBirthday")}:</Field1>
              <Field2>{user?.birthday}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPageOccupation")}:</Field1>
              <Field2>{user?.occupation}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPageAddress")}:</Field1>
              <Field2>{user?.address}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPagePhone")}:</Field1>
              <Field2>{user?.phone}</Field2>
            </Row>
            <Row>
              <Field1>{t("userPageEmail")}:</Field1>
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
            <SubTitle>{t("userPageMyOrdersHistory")}</SubTitle>
          <br/>
          {/* ORDER INFO */}
          {orders?.map((order)=>
            <Info key={order._id}>
              <OrderInfoPart>
                <OrderField><b>{dayjs(order.createdAt).format('DD.MM.YYYY HH:mm:ss')}</b></OrderField>
                <OrderField><b>{t("userPageMyOrderID")}:</b> {order._id}</OrderField>
                <OrderField><b>{t("userPageMyOrderAmount")}:</b> ${order.amount}</OrderField>
                <OrderField><b>{t("userPageMyOrderAddress")}:</b> {order.address}</OrderField>
                <OrderField><b>{t("userPageMyOrderStatus")}:</b> {order.status}</OrderField>
              </OrderInfoPart>
              <div style={{display:'flex', width:'100%', alignItems:'start'}}>
              <Order >
                {/* PRODUCT INFO */}
                {userOrders.filter(item => item.orderId === order._id)
                .map((product)=>
                  <OrderDetail key={product?._id}>
                    <Image src={product?.img} 
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                      }}
                    />
                    <Details>
                      <ProductField><b>ID:</b> {product?.productId}</ProductField>
                      <ProductField><b>{t("product")}:</b> {product?.title}</ProductField>
                      <ProductField><b>{t("description")}:</b> {product?.desc}</ProductField>
                       <FilterColor color={product?.color}/> 
                      <ProductField><b>{t("size")}:</b> {product?.size}</ProductField>
                      <ProductField><b>{t("userPagePrice")} :</b> {product?.price}</ProductField>
                      <ProductField><b>{t("userPageQuantity")}:</b> {product?.quantity}</ProductField>
                    </Details>
                    
                  </OrderDetail>
                )}
              </Order>
              <Summary>
                <SummaryTitle>{t("orderSummary")}</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>{t("subtotal")}</SummaryItemText>
                  <SummaryItemPrice>$ {getTotal(userOrders.filter(item => item.orderId === order._id))}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>{t("estimatedShipping")}</SummaryItemText>
                  <SummaryItemPrice>$ 5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>{t("shippingDiscount")}</SummaryItemText>
                  <SummaryItemPrice>$ -5.90</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>{t("total")}</SummaryItemText>
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