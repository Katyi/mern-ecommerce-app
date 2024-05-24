import { Add, Remove, Favorite } from "@mui/icons-material";
import Announcement from "../../components/announcement/Announcement";
import Navbar from "../../components/navbar/Navbar";
import Newsletter from "../../components/newsletter/Newsletter";
import Footer from "../../components/footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest, userRequest } from "../../requestMethods";
import { addCart, addWishlist, getCart, getWishlist, updateCart, updateWishlist } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Container, Wrapper, ImgContainer, Image, InfoContainer, TitleContainer, Title, Icon, Desc, 
  Price, FilterContainer, Filter, FilterTitle, FilterColor, FilterSize, FilterSizeOption, AddContainer, 
  AmountContainer, Amount, Button } from './styled';
import { useTranslation } from 'react-i18next';

const Product = () => {
  const { i18n, t } = useTranslation();
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
          <Button onClick={()=> navigate('/home')}>{t("toHomePage")} </Button>
          <Button onClick={()=> navigate('/products/all')} style={{marginLeft:"10px"}}>{t("toContinueShoppingLink")} </Button>
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
              <FilterTitle>{t("color")}</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => {
                  setColor(c);
                }}/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>{t("size")}</FilterTitle>
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
            <Button onClick={addToCart}>{t("ProductAddToCart")}</Button>
            {wishlistProducts?.findIndex((elem) => elem.productId === product._id && elem.color === color && elem.size === size) === -1 &&
              <Button onClick={addToWishlist}>{t("ProductAddToWishList")}</Button>
            }
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer/>
    </Container>
  )
}

export default Product;