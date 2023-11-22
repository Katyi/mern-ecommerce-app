import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../redux/apiCalls";
import { useState } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  min-width: 200px;
  width: calc((100% - 3vw)/4);
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
  ${mobile({width:"100vw"})}
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover{
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({item}) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const cart = useSelector((state) => state.carts.currentCart);
  const wishlist = useSelector((state) => state.wishlists.currentWishlist);
  const cartProducts = useSelector((state) => state.carts?.currentCart?.products);
  const wishlistProducts = useSelector((state) => state.wishlists?.currentWishlist?.products);
  const [color, setColor] = useState(item.color[0]);
  const [size, setSize] = useState(item.size[0]);



  const addToCart = async(product) => {
    if (!cart) {
      let newProdArr = {productId: product._id, quantity: 1, color: color, size: size};
      const newCart = { userId: userId, products: newProdArr};
      await addCart(newCart, dispatch).then(
        getCart(userId, dispatch)
      )
    } else {
      if (cartProducts.findIndex((item) => item.productId === product._id && item.color === color && item.size === size) > -1) {
        let newProdArr = cartProducts?.map((item) => item.productId === product._id && item.color === color && item.size === size 
          ? {...item, quantity: item.quantity + 1} : item);
        const newCart = { userId: cart.userId, products: newProdArr};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      } else {
        let newProdArrAdd = [...cartProducts, {productId: product._id, quantity: 1, color: color, size: size}];
        const newCart = { userId: cart.userId, products: newProdArrAdd};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      }
    }
  };

  const addToWishlist = async(product) => {
    if (!wishlist) {
      let newProdArr = {productId: product._id, color: color, size: size};
      const newWishlist = { userId: userId, products: newProdArr};
      await addWishlist(newWishlist, dispatch).then(
        getWishlist(userId, dispatch)
      )
    } else {
      if (wishlistProducts.findIndex((item) => item.productId === product._id && item.color === color && item.size === size) < 0) {
        let newProdArrAdd = [...wishlistProducts, {productId: product._id, color: color, size: size}];
        const newWishlist = { userId: wishlist.userId, products: newProdArrAdd};
        await updateWishlist(wishlist._id, newWishlist, dispatch);
        await getWishlist(wishlist.userId, dispatch);
      } else {
        console.log('уже есть в листе');
      }
    }
  };

  return (
    <Container>
      <Circle />
      <Image src={item.img} 
        onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
        }}
      />
      <Info>
        <Icon onClick={()=>addToCart(item)}>
          <ShoppingCartOutlined/>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined/>
          </Link>
        </Icon>
        <Icon onClick={()=>addToWishlist(item)} color="red">
           <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  )
}

export default Product
