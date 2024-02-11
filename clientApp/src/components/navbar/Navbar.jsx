import { Search, ShoppingCartOutlined, FavoriteBorderOutlined, ExitToAppOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getCart, getUser, getWishlist, logout } from '../../redux/apiCalls.js';
import { Container, Wrapper, Left, Language, UserName, SearchContainer, Input, Center, Logo, Right, MenuItem, Avatar } from './styled';

const Navbar = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.currentUser?._id);
  const user = useSelector((state) => state.user.currentUser);
  
  const quantity = useSelector((state) => state.carts?.currentCart?.products?.length);
  const quantityWishlist = useSelector((state) => state.wishlists?.currentWishlist?.products?.length);
  const userName = useSelector((state) => state.user?.currentUser?.username);
  const navigate = useNavigate();
  
  useEffect(() => {
    getCart(userId, dispatch);
  },[userId, quantity]);

  useEffect(() => {
    getWishlist(userId, dispatch);
  },[userId, quantityWishlist]);

  const handleClick = async(e) => {
    e.preventDefault();
    // navigate('/');
    await logout(dispatch, user);
    localStorage.removeItem("persist:root");
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder='Search'/>
            <Search style={{color:"gray", fontSize:16}}/>
          </SearchContainer>
        </Left>
        <Center><Logo>SHOP</Logo></Center>
        <Right>
          {/* <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem> */}
          <Tooltip title={`Open ${userName}'s account`}>
            <Avatar src={user?.img} alt="" onClick={()=>navigate("/account")}/>
          </Tooltip>
          {/* <UserName>{userName}</UserName> */}
          {/* <MenuItem onClick={handleClick}>OUT</MenuItem> */}
          <MenuItem >
            <Tooltip title="Out">
              <Badge style={{marginRight:"20px"}} onClick={handleClick}>
                <ExitToAppOutlined color="action"/>
              </Badge>
            </Tooltip>
            <Link to={'/wishlist'}>
              <Tooltip title="Open wislist">
                <Badge badgeContent={quantityWishlist} color="primary" style={{marginRight:"20px"}}>
                  <FavoriteBorderOutlined color='action'/>
                </Badge>
              </Tooltip>
            </Link>
            <Link to={'/cart'}>
              <Tooltip title="Open Cart">
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