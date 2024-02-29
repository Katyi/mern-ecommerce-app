
import { getUser, login } from "../../redux/apiCalls";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { publicRequest } from '../../requestMethods';
import { Container, Wrapper, Title, Form, Input, Button, Link, Error } from './styled';

const Login = () => {
  const [username, setUsername] =  useState("");
  const [password, setPassword] =  useState("");
  const [err, setErr] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { isFetching, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.currentUser);

  const handleClick = async(e) => {
    e.preventDefault();
    await login(dispatch, { username, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  },[handleClick, user]);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input 
            type="text"
            placeholder="username" 
            required
            onChange={(e) =>setUsername(e.target.value)}
            autocomplete="on"
          />
          <Input 
            type="password"
            placeholder="password"
            required
            onChange={(e) =>setPassword(e.target.value)}
            autocomplete="off"
          />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
            {error && <Error>{error}</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link onClick={()=>navigate("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login;