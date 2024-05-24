import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import { addOrder, deleteCart, getCart, updateCart } from "../../redux/apiCalls";
import { Container, Wrapper, Title, Top, TopButton, TopTexts, TopText, Bottom, Info, Product, ProductDetail, Image, 
  Details, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer, 
  ProductAmount, ProductPrice, Hr, Summary, SummaryTitle, SummaryItem, SummaryItemText, SummaryItemPrice, Button } from './styled';
import { useTranslation } from 'react-i18next';

const KEY = import.meta.env.VITE_STRIPE;

const Cart = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const [productIdArr, setProductIdArr] = useState([]);
  const [productsOfCart, setProductsOfCart] = useState([]);
  const [stripeToken, setStripeToken ] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  const userId = useSelector((state) => state.user.currentUser?._id);
  const cartId = useSelector((state) => state.carts.currentCart?._id); 
  const cart = useSelector((state) => state.carts.currentCart?.products);
  const wishlist = useSelector((state) => state.wishlists.currentWishlist?.products);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const deleteUserCart = async() => {
    await deleteCart(cartId, dispatch)
    .then(() => {
      getCart(userId, dispatch);
    })
    
  };

  // TOTAL PRICE FOR CART
  const getTotal = () => {
    return productsOfCart?.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  // FETCHING PRODUCTS FOR CART
  const getProducts = async () => {
    await getCart(userId, dispatch);
    let indArr = cart.map(item => item.productId);
    const res = await publicRequest.get(`/products?_id=${indArr}`);
    let newArr = cart.map(item => ({ ...item, 
      title: res.data.find(elem => elem._id === item.productId)?.title, 
      desc: res.data.find(elem => elem._id === item?.productId)?.desc,
      img: res.data.find(elem => elem._id === item.productId)?.img,
      price: res.data.find(elem => elem._id === item.productId)?.price,
    }));
    setProductsOfCart(newArr);
  };

  // DELETE CART AND ADD TO ORDER AFTER PAY
  const handleCheckout = async() => {
    let newArr = productsOfCart.map(item => ({productId: item.productId, quantity: item.quantity, color: item.color, size: item.size, price: item.price}));
    const newOrder = { userId: userId, amount: getTotal(), address: user.address, status: "pending", products: newArr};
    await addOrder(newOrder, dispatch);
    await deleteUserCart();
  };
  
  useEffect(() => {
    if (cart) {
      getProducts();
    } else {
      setProductsOfCart([])
    }
    
  }, [dispatch, cart?.length, productsOfCart?.quantity]);

  // FOR CHECKOUT
  useEffect(() => {
    const makeRequest = async() =>{
      try {
        const res = await userRequest.post('/checkout/payment', {
          tokenId: stripeToken.id,
          amount: getTotal()*100,
        });
        handleCheckout();
        navigate('/success', { state: {data: res.data}});
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  

  // HANDLE QUANTITY OF PRODUCT IN CART
  const handleQuantity = async(type, id) => {
    // DECREASING QUANTITY
    if (type === 'dec') {
      let newArr = productsOfCart.map(item => item._id === id ? ({...item, quantity: item.quantity - 1}) : item).filter(item => item.quantity > 0);
      setProductsOfCart(newArr);
      if (newArr.length>0) {
        let newArr1 = newArr.map(item => ({productId: item.productId, quantity: item.quantity, color: item.color, size: item.size}));
        const newCart = { userId: userId, products: newArr1};
        await updateCart(cartId, newCart, dispatch);
        
      } else {
        await deleteUserCart();
      }
    } else if(type === 'inc') {
      // INCREASING QUANTITY
      let newArr = productsOfCart.map(item => item._id === id ? ({ ...item, quantity: item.quantity + 1}) : item);
      setProductsOfCart(newArr);
      let newArr1 = newArr.map(item => ({productId: item.productId, quantity: item.quantity, color: item.color, size: item.size}));
      const newCart = { userId: userId, products: newArr1};
      await updateCart(cartId, newCart, dispatch);
    }
    
  };

  return (
    <Container>
      <Navbar/>
      <Announcement />
      <Wrapper>
        <Title>{t("cartTitle")}</Title>
        <Top>
          <div style={{display:'flex', gap:'20px'}}>
            <TopButton onClick={()=> navigate('/products/all')}>{t("toContinueShoppingLink")}</TopButton>
            <TopButton onClick={()=> navigate('/home')}>{t("toHomePage")}</TopButton>
            <TopButton type="filled" onClick={() => deleteUserCart()}>{t("cartClearCart")}</TopButton>
          </div>
          <TopTexts>
            <TopText>{t("shoppingBag")} ({cart?.length})</TopText>
            <TopText onClick={()=>navigate('/wishlist')}>{t("yourWishlist")} ({wishlist?.length})</TopText>
          </TopTexts>
          <StripeCheckout
            name="clientapp"
            // image={avatar}
            billingAddress
            shippingAddress
            description={`Your total is $${getTotal()}`}
            amount={getTotal() * 100}
            token={onToken}
            stripeKey={KEY}
          >
            <TopButton type="filled">{t("cartCheckOutNow")}</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {productsOfCart?.map((product)=> (
             <Product key={product._id}>
              <ProductDetail>
                <Image src={product?.img} 
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                  }}
                />
                <Details>
                  <ProductName><b>{t("product")}:</b> {product?.title}</ProductName>
                  <ProductName><b>{t("description")}:</b> {product?.desc}</ProductName>
                  <ProductId><b>ID:</b> {product?._id}</ProductId>
                  <ProductColor color={product?.color}/>
                  <ProductSize><b>{t("size")}:</b> {product?.size}</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add onClick={() => handleQuantity("inc", product._id)} style={{cursor:'pointer'}}/>
                  <ProductAmount>{product?.quantity}</ProductAmount>
                  <Remove onClick={() => handleQuantity("dec", product._id)} style={{cursor:'pointer'}}/>
                </ProductAmountContainer>
                <ProductPrice>$ {product?.price * product?.quantity}</ProductPrice>
              </PriceDetail>
            </Product>
          ))}
          </Info>
          <Summary>
            <SummaryTitle>{t("orderSummary")}</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>{t("subtotal")}</SummaryItemText>
              <SummaryItemPrice>$ {getTotal()}</SummaryItemPrice>
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
              <SummaryItemPrice>$ {getTotal()}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="clientapp"
              // image={avatar}
              billingAddress
              shippingAddress
              description={`Your total is $${getTotal()}`}
              amount={getTotal() * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>{t("cartCheckOutNow")}</Button>
            </StripeCheckout>
          </Summary>
        </Bottom>
        <Hr/>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart;