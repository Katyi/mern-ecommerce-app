import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined, Favorite } from "@mui/icons-material";
import Tooltip from '@mui/material/Tooltip';
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../../redux/apiCalls";
import { useState } from "react";
import { Info, Container, Circle, Image, Icon } from './styled';

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
      if (cartProducts?.findIndex((item) => item.productId === product._id && item.color === color && item.size === size) > -1) {
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
      if (wishlistProducts?.findIndex((item) => item.productId === product._id && item.color === color && item.size === size) < 0) {
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
        <Tooltip title="Add to Cart">
          <Icon onClick={()=>addToCart(item)}>
            <ShoppingCartOutlined/>
          </Icon>
        </Tooltip>
        <Tooltip title="Open product page">
          <Icon>
            <Link to={`/product/${item._id}`}>
              <SearchOutlined/>
            </Link>
        </Icon>
        </Tooltip>
        
        {!wishlist &&
        <Tooltip title="Add to wishlist">
          <Icon onClick={()=>addToWishlist(item)}>
            <FavoriteBorderOutlined />
          </Icon>
        </Tooltip>
        }

        {wishlistProducts?.findIndex((elem) => elem.productId === item._id && elem.color === color && elem.size === size) === -1 &&
        <Tooltip title="Add to wishlist">
          <Icon onClick={()=>addToWishlist(item)}>
            <FavoriteBorderOutlined />
          </Icon>
        </Tooltip>
        }
        {wishlistProducts?.findIndex((elem) => elem.productId === item._id && elem.color === color && elem.size === size) > -1 &&
        <Tooltip title="Already in wishlist">
          <Icon>
            <Favorite style={{fill: "red"}}/>
          </Icon>
        </Tooltip>
        }
      </Info>
    </Container>
  )
}

export default Product;