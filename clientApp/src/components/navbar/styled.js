import styled from 'styled-components';
import {mobile} from '../../responsive.js';

export const Container = styled.div`
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${mobile({height:"50px"})}
`;

export const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({padding:"10px 0px"})}
`;

export const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const Language = styled.span`
  font-size: 14px;
  /* cursor: pointer; */
  ${mobile({display:"none"})}
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
  /* cursor: pointer; */
  ${mobile({display:"none"})}
`;

export const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

export const Input = styled.input`
  border: none;
  &:focus {
    outline: none;
  }
  ${mobile({width:"50px"})}
`;

export const Center = styled.div`
  flex: 1;
  text-align: center;
`;

export const Logo = styled.h1`
  font-weight: bold;
  ${mobile({fontSize:"16px"})}
`

export const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
  ${mobile({ flex:2, justifyContent:"center"})}
`;

export const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({fontSize:"12px", marginLeft:"10px"})}
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  /* border: 2px solid darkblue; */
`;