import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.currentUser);
  let { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async(e) => {
    e.preventDefault();
    await login(dispatch, { username: username, password: password });
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }

  },[handleClick, user]);

  return (
    <form style={{
      height: '100vh',
      width: '100vw',
      display: "flex", 
      flexDirection: 'column',
      alignItems: "center", 
      justifyContent: 'center'
    }} onSubmit={handleClick}>
      <input 
        style={{ padding: 10, marginBottom: 20 }}
        type='text' 
        placeholder='username' 
        onChange={e => setUsername(e.target.value)}
      />
      <input 
        style={{ padding: 10, marginBottom: 20 }}
        type='password' 
        placeholder='password' 
        onChange={e => setPassword(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" style={{ padding: 10, width:100 }}>
        Login
      </button>
      {error && <span className='loginError'>{error}</span>}
    </form>
  )
};

export default Login;