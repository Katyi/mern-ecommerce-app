import styled from "styled-components";
import {mobile} from "../../responsive";
import backGroundphoto from "../../img/backGroundphoto1.jpg";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  /* background-size: contain; */
  background: linear-gradient(
    rgba(255, 255, 255, 0.4),
    rgba(255,255,255, 0.4)
    ),
    url('${backGroundphoto}') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({background:"rgba(180,130,238,0.4)"})}
`;

export const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

export const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
`;