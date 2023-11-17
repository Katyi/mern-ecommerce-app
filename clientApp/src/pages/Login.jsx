import styled from "styled-components";
import backGroundphoto from "../img/backGroundphoto1.jpg";
import {mobile} from "../responsive";
import { login } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
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

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({width:"75%"})}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;

`;

const Button = styled.button`
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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
  /* font-size: 10px; */
`;

const Login = () => {
  const [username, setUsername] =  useState("");
  const [password, setPassword] =  useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    navigate('/home');
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
            placeholder="username" 
            onChange={(e) =>setUsername(e.target.value)}
          />
          <Input 
            placeholder="password"
            type="password"
            onChange={(e) =>setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={()=>navigate("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login
