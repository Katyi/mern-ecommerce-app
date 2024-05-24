import { Search, ShoppingCartOutlined, FavoriteBorderOutlined, ExitToAppOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getCart, getUser, getWishlist, logout } from '../../redux/apiCalls.js';
import { Container, Wrapper, Left, Language, UserName, SearchContainer, Input, Center, Logo, Right, MenuItem, Avatar } from './styled';
import { LANGUAGES } from '../../constants/languages';
import Select from '../../UI/selectLang/SelectLang';
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const user = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  
  const quantity = useSelector((state) => state.carts?.currentCart?.products?.length);
  const quantityWishlist = useSelector((state) => state.wishlists?.currentWishlist?.products?.length);
  const userName = useSelector((state) => state.user?.currentUser?.username);
  const [open, setOpen] = useState(false);

  const onChangeLang = (value) => {
    const lang_code = value;
    i18n.changeLanguage(lang_code);
    console.log(i18n.language);
    setOpen(false);
  };

  const handleClick = async(e) => {
    e.preventDefault();
    await logout(dispatch, user);
    localStorage.removeItem("persist:root");
    navigate('/');
  };
  
  useEffect(() => {
    getCart(userId, dispatch);
  },[userId, quantity]);

  useEffect(() => {
    getWishlist(userId, dispatch);
  },[userId, quantityWishlist]);

  return (
    <Container>
      <Wrapper>
        <Left>
          {/* LANGUAGE SELECT */}
          <Select
            options={LANGUAGES}
            selected={i18n.language}
            onChange={onChangeLang}
            open={open}
            setOpen={setOpen}
          />

          <SearchContainer>
            <Input placeholder={t("navbarSearchPlaceholder")}/>
            <Search style={{color:"gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center><Logo>{t("shopTitle")}</Logo></Center>
        <Right>
          <Tooltip title={t("navbarAccount")}>
            <Avatar src={user?.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="" onClick={()=>navigate("/account")}/>
          </Tooltip>
          <MenuItem >
            <Tooltip title={t("navbarOut")}>
              <Badge style={{marginRight:"20px"}} onClick={handleClick}>
                <ExitToAppOutlined color="action"/>
              </Badge>
            </Tooltip>
            <Link to={'/wishlist'}>
              <Tooltip title={t("navbarOpenWishList")}>
                <Badge badgeContent={quantityWishlist} color="primary" style={{marginRight:"20px"}}>
                  <FavoriteBorderOutlined color='action'/>
                </Badge>
              </Tooltip>
            </Link>
            <Link to={'/cart'}>
              <Tooltip title={t("navbarOpenCart")}>
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlined color="action" />
                </Badge>
              </Tooltip>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;