import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import './login.css';
import { useLoginMutation } from '../../redux/usersApi';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { isLoading, data, error }] = useLoginMutation();

  const handleClick = async(e) => {
    e.preventDefault();
    login({username, password})
  };

  useEffect(() => {
    if (data) {
      navigate("/home");
    }
  },[handleClick, data]);

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
      <button type="submit" className="loginButton" disabled={isLoading}>
        Login
      </button>
      <div style={{height: 20}}>
        {error && <span className='loginError'>{error.data}</span>}
      </div>
    </form>
  )
};

export default Login;