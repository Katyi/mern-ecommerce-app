import { Search, ShoppingCartOutlined, FavoriteBorderOutlined, ExitToAppOutlined } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
import { Badge } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {mobile} from '../responsive.js';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { getCart, getUser, getWishlist, logout } from '../redux/apiCalls.js';

const Container = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({height:"50px"})}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding:"10px 0px"})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  /* cursor: pointer; */
  ${mobile({display:"none"})}
`;
const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
  /* cursor: pointer; */
  ${mobile({display:"none"})}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({width:"50px"})}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize:"16px"})}
`

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  ${mobile({ flex:2, justifyContent:"center"})}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize:"12px", marginLeft:"10px"})}
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  /* border: 2px solid darkblue; */
`;

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