import { Add, Remove, Favorite } from "@mui/icons-material";
import styled from "styled-components"
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../requestMethods";
import { addCart, addWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({padding:"10px", flexDirection: "column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({height:"45vh"})}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding:"10px"})}
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${mobile({width:"100%"})}
`;

const Title = styled.h1`
  font-weight: 200;
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

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({width:"100%"})}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
  margin-right: 15px;
`;

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

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  ${mobile({width:"100%"})}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.carts.currentCart);
  const wishlist = useSelector((state) => state.wishlists.currentWishlist);
  const cartProducts = useSelector((state) => state.carts?.currentCart?.products);
  const wishlistProducts = useSelector((state) => state.wishlists?.currentWishlist?.products);
  const userId = useSelector((state) => state.user.currentUser?._id);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const addToCart = async() => {
    if (!cart) {
      let newProdArr = {productId: product._id, quantity: quantity, color: color, size: size};
      const newCart = { userId: userId, products: newProdArr};
      await addCart(newCart, dispatch)
      await getCart(userId, dispatch)
    } else {
      if (cartProducts?.findIndex((item)=> item.productId === product._id && item.color === color && item.size === size) > -1) {
        let newProdArr = cartProducts?.map((item) => item.productId === product._id && item.color === color && item.size === size 
          ? {...item, quantity: item.quantity + quantity} : item);
        const newCart = { userId: cart.userId, products: newProdArr};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      } else {
        let newProdArrAdd = [...cartProducts, {productId: product._id, quantity: quantity, color: color, size: size}];
        const newCart = { userId: cart.userId, products: newProdArrAdd};
        await updateCart(cart._id, newCart, dispatch)
        await getCart(cart.userId, dispatch)
      }
    }
  };

  const addToWishlist = async() => {
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

  const handleQuantity = (type) => {
    if (type === 'dec') {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>  
        <ImgContainer>
          <Image src={product.img} 
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src="https://image.uniqlo.com/UQ/ST3/WesternCommon/imagesgoods/462666/item/goods_69_462666.jpg";
            }}
          />
        </ImgContainer>
        <InfoContainer>
          <Button onClick={()=> navigate('/home')}>TO HOME PAGE</Button>
          <Button onClick={()=> navigate('/products/all')} style={{marginLeft:"10px"}}>CONTINUE SHOPPING</Button>
          <TitleContainer>
            <Title>{product.title}</Title>
            {wishlistProducts?.findIndex((elem) => elem.productId === product._id && elem.color === color && elem.size === size) > -1 &&
            <Icon>
              <Favorite style={{fill: "red"}}/>
            </Icon>
            }
          </TitleContainer>
          <Desc>{product.desc}</Desc>
          <Price>$ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => {
                  setColor(c);
                }}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize
                value={size}
                onChange={(e)=>setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption size={s} value={s} key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("dec")} style={{cursor:'pointer'}}/>
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("inc")} style={{cursor:'pointer'}}/>
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
            {wishlistProducts?.findIndex((elem) => elem.productId === product._id && elem.color === color && elem.size === size) === -1 &&
              <Button onClick={addToWishlist}>ADD TO WISHLIST</Button>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer/>
    </Container>
  )
}

export default Product