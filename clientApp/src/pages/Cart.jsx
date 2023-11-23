import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import { addOrder, deleteCart, getCart, updateCart } from "../redux/apiCalls";

const KEY = import.meta.env.VITE_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 300;
  cursor: pointer;
  border: ${props=>props.type === "filled" && "none"};
  background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
  color: ${props=>props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({display:"none"})}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
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

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props=>props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === "total" && "500"};
  font-size: ${props=>props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const Cart = () => {
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
        console.log(res.data)
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
        <Title>YOUR BAG</Title>
        <Top>
          <div style={{display:'flex', gap:'20px'}}>
            <TopButton onClick={()=> navigate('/products/all')}>CONTINUE SHOPPING</TopButton>
            <TopButton onClick={()=> navigate('/home')}>TO HOME PAGE</TopButton>
            <TopButton type="filled" onClick={() => deleteUserCart()}>CLEAR CART</TopButton>
          </div>
          <TopTexts>
            <TopText>Shopping Bag ({cart?.length})</TopText>
            <TopText onClick={()=>navigate('/wishlist')}>Your Wishlist ({wishlist?.length})</TopText>
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
            <TopButton type="filled">CHECKOUT NOW</TopButton>
          </StripeCheckout>
        </Top>
        <Bottom>
          <Info>
            {productsOfCart?.map((product, index)=> (
             <Product key={index}>
              <ProductDetail>
                <Image src={product?.img} 
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                  }}
                />
                <Details>
                  <ProductName><b>Product:</b> {product?.title}</ProductName>
                  <ProductName><b>Description:</b> {product?.desc}</ProductName>
                  <ProductId><b>ID:</b> {product?._id}</ProductId>
                  <ProductColor color={product?.color}/>
                  <ProductSize><b>Size:</b> {product?.size}</ProductSize>
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
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {getTotal()}</SummaryItemPrice>
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
              <Button>CHECKOUT NOW</Button>
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