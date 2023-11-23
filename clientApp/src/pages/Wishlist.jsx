import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import { addCart, deleteCart, deleteWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../redux/apiCalls";

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
  width: ${props=>props.type === "filled" && "132px"};
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
  /* height: 20vw; */
  ${mobile({flexDirection:"column"})}
`;
const Info = styled.div`
  /* flex: 3; */
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
  /* flex: 2; */
  display: flex;
`;

const ImagePart = styled.div`
  width: 20vw;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  width: 50vw;
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

const ButtonsPart = styled.div`
  width: calc(20vw);
  /* width: auto; */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  /* justify-content: space-between; */

`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;


const Wishlist = () => {
  const dispatch = useDispatch();
  const [productsOfWishlist, setProductsOfWishlist] = useState([]);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.currentUser?._id);
  // const cartId = useSelector((state) => state.carts.currentCart?._id); 
  const cartProducts = useSelector((state) => state.carts?.currentCart?.products);
  const wishlistId = useSelector((state) => state.wishlists.currentWishlist?._id);
  const wishlist = useSelector((state) => state.wishlists.currentWishlist?.products);
  const cart = useSelector((state) => state.carts.currentCart);

  const getProducts = async () => {
    await getWishlist(userId, dispatch);
    let indArr = wishlist?.map(item => item.productId);
    const res = await publicRequest.get(`/products?_id=${indArr}`)
    let newArr = wishlist.map(item => ({ ...item, 
      title: res.data.find(elem => elem._id === item.productId)?.title, 
      desc: res.data.find(elem => elem._id === item?.productId)?.desc,
      img: res.data.find(elem => elem._id === item.productId)?.img,
      price: res.data.find(elem => elem._id === item.productId)?.price,
    }));
    setProductsOfWishlist(newArr);
  };

  const deleteUserWishList = async() => {
    await deleteWishlist(wishlistId, dispatch).then(() => {
      getWishlist(userId, dispatch);
    })
  };

  const deleteProduct = async(id) => {
    let newProdArr = wishlist.filter(item => item._id !== id);
    const newWishlist = { userId: userId, products: newProdArr};
    await updateWishlist(wishlistId, newWishlist, dispatch);
    await getWishlist(userId, dispatch);
  };

  const addToCart = async(id, color, size) => {
    if (!cart) {
      let newProdArr = {productId: id, quantity: 1, color: color, size: size};
      const newCart = { userId: userId, products: newProdArr};
      await addCart(newCart, dispatch)
      await getCart(userId, dispatch)
    } else {
      if (cartProducts.findIndex((item)=> item.productId === id && item.color === color && item.size === size) > -1) {
        let newProdArr = cartProducts?.map((item) => item.productId === id && item.color === color && item.size === size 
          ? {...item, quantity: item.quantity + 1} : item);
        const newCart = { userId: cart.userId, products: newProdArr};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      } else {
        let newProdArrAdd = [...cartProducts, {productId: id, quantity: 1, color: color, size: size}];
        const newCart = { userId: cart.userId, products: newProdArrAdd};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      }
    }
  };
  
  // fetching products for wishlist
  useEffect(() => {
    if (wishlist) {
      getProducts();
    } else {
      setProductsOfWishlist([])
    }
  }, [dispatch, wishlist?.length, productsOfWishlist?.length]);

  return (
    <Container>
      <Navbar/>
      <Announcement />
      <Wrapper>
        <Title>YOUR WISHLIST</Title>
        <Top>
          <div style={{display:'flex', gap:'20px'}}>
            <TopButton onClick={()=> navigate('/products/all')}>CONTINUE SHOPPING</TopButton>
            <TopButton onClick={()=> navigate('/home')}>TO HOME PAGE</TopButton>
            <TopButton type="filled" onClick={() => deleteUserWishList()}>CLEAR WISHLIST</TopButton>
          </div>
          <TopTexts>
            <TopText onClick={()=>navigate('/cart')}>Shopping Bag ({cartProducts?.length})</TopText>
            <TopText>Your Wishlist ({wishlist?.length})</TopText>
          </TopTexts>
        </Top>
        <Bottom>
          <Info>
            {productsOfWishlist.length<1 &&
              <Title>Your wishlist is empty</Title>
            }
            {productsOfWishlist?.map((product, index)=> (
             <Product key={index}>
              <ProductDetail>
                <ImagePart>
                  <Image src={product?.img} 
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
                    }}
                  />
                </ImagePart>
                <Details>
                  <ProductName><b>Product:</b> {product?.title}</ProductName>
                  <ProductName><b>Description:</b> {product?.desc}</ProductName>
                  <ProductId><b>ID:</b> {product?._id}</ProductId>
                  <ProductColor color={product?.color}/>
                  <ProductSize><b>Size:</b> {product?.size}</ProductSize>
                </Details>
                <ButtonsPart>
                  <TopButton onClick={()=>addToCart(product.productId, product.color, product.size)} type="filled">ADD TO CART</TopButton>
                  <TopButton type="filled" onClick={()=>deleteProduct(product._id)}>DELETE</TopButton>
                </ButtonsPart>
              </ProductDetail>
            </Product>
            
          ))}
            <Hr/>
          </Info>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Wishlist;