import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCart, updateCart } from "../redux/apiCalls";

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
  width: calc((100vw - 60px - 3vw)/4);
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
  const cartProducts = useSelector((state) => state.carts?.currentCart?.products);

  const handleClick = async(product) => {
    if (!cart) {
      let newProdArr = {productId: product._id, quantity: 1};
      const newCart = { userId: userId, products: newProdArr};
      await addCart(newCart, dispatch).then(
        getCart(userId, dispatch)
      )
    } else {
      if (cartProducts.findIndex((item)=> item.productId === product._id) > -1) {
        let newProdArr = cartProducts?.map((item) => item.productId === product._id ? {...item, quantity: item.quantity + 1} : item);
        const newCart = { userId: cart.userId, products: newProdArr};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      } else {
        let newProdArrAdd = [...cartProducts, {productId: product._id, quantity: 1}];
        const newCart = { userId: cart.userId, products: newProdArrAdd};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
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
        <Icon onClick={()=>handleClick(item)}>
          <ShoppingCartOutlined/>
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined/>
          </Link>
        </Icon>
        <Icon>
           <FavoriteBorderOutlined/>
        </Icon>
      </Info>
    </Container>
  )
}

export default Product
