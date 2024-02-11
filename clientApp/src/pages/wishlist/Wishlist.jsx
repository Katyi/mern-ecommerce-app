import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import Announcement from "../../components/announcement/Announcement";
import Footer from "../../components/footer/Footer";
import { useState, useEffect } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import {Link, useNavigate} from 'react-router-dom';
import { addCart, deleteCart, deleteWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../../redux/apiCalls";
import { Container, Wrapper, Title, Top, TopButton, TopTexts, TopText, Bottom, Info, Product, ProductDetail, ImagePart, 
  Image, Details, ProductName, ProductId, ProductColor, ProductSize, PriceDetail, ProductAmountContainer, 
  ProductAmount, ProductPrice, Hr, ButtonsPart, Button } from './styled';

const KEY = import.meta.env.VITE_STRIPE;

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
    if (newProdArr.length>0) {
      const newWishlist = { userId: userId, products: newProdArr};
      await updateWishlist(wishlistId, newWishlist, dispatch);
      await getWishlist(userId, dispatch);
    } else {
      deleteUserWishList();
    }
  };

  const addToCart = async(id, color, size) => {
    if (!cart) {
      let newProdArr = {productId: id, quantity: 1, color: color, size: size};
      const newCart = { userId: userId, products: newProdArr};
      await addCart(newCart, dispatch)
      await getCart(userId, dispatch)
    } else {
      if (cartProducts?.findIndex((item)=> item.productId === id && item.color === color && item.size === size) > -1) {
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
            {productsOfWishlist?.map((product)=> (
             <Product key={product._id}>
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