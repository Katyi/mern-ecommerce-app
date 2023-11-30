import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import { Publish } from "@mui/icons-material";
import { updateUser, getUser } from '../redux/apiCalls';

const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2``;

const UserForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const UserImage = styled.div`
  display: flex;
  align-items: center;
  & img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    margin-right: 20px;
    margin-bottom: 10px;
  }
  & label {
    cursor: pointer;
  }
`;

const UserItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  & label {
    color: gray;
    font-weight: 600;
    margin-bottom: 3px;
  }
  & input {
    padding: 10px;
  }
  & select {
    padding: 10px;
  }
  & button {
    height: auto;
    margin-top: 22px;
    padding: 12px 10px;
    background-color: teal;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }
`;

const UpdateUser = ({openModal, setOpenModal}) => {
  const dispatch = useDispatch();
  let currentUser = useSelector((state) => state.user.currentUser);
  let userId = useSelector((state) => state.user.currentUser._id);
  
  const [gender, setGender] = useState(currentUser?.gender);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState(currentUser);
  
  const handleChange = (e) => {
    setUser({ ...user, [e.target?.name]: e.target?.value });
  };

  const handleGenderSelectChange = (e) => {
    setGender(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    let newUser = { ...user, gender: gender }
    await updateUser(userId, newUser, dispatch);
    await getUser(userId, dispatch);
    console.log(newUser)
    setUser(currentUser);
    setOpenModal(false);
  };

  return (
    <Container>
      <Title>{user?.username}'s account:</Title>
      <UserForm onSubmit={handleSubmit}>
        {/* USER IMAGE PART */}
        {/* <UserImage>
          <img src={user?.img}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif";
            }}
          />
          <label htmlFor="file"><Publish/></label>
          <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
        </UserImage> */}
        {/* USER OTHER INFO */}
        <UserItem>
          <label>Username</label>
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={user?.username}
            onChange={handleChange}
          />
        </UserItem>
        <UserItem>
          <label>Fullname</label>
          <input 
            name="fullname" 
            type="text" 
            placeholder="Fullname" 
            value={user?.fullname} 
            onChange={handleChange}/>
        </UserItem>
        <UserItem>
          <label>Occupation</label>
          <input 
            name="occupation"
            type="text" 
            placeholder="Occupation" 
            value={user?.occupation} 
            onChange={handleChange}/>
        </UserItem>
        <UserItem>
          <label>Phone</label>
          <input 
            name="phone"
            type="text" 
            placeholder="Phone" 
            value={user?.phone} 
            onChange={handleChange}/>
        </UserItem>
        <UserItem>
          <label>Email</label>
          <input
            name="email"
            type="text" 
            placeholder="Email" 
            value={user?.email} 
            onChange={handleChange}/>
        </UserItem>
        <UserItem>
          <label>Address</label>
          <input 
            name="address"
            type="text" 
            placeholder="Address" 
            value={user?.address} 
            onChange={handleChange}/>
        </UserItem>
        <UserItem>
          <label>Gender</label>
          <select name="gender" value={gender} onChange={handleGenderSelectChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </UserItem>
        <UserItem>
          <button type="submit">UPDATE</button>
        </UserItem>
      </UserForm>
    </Container>
  )
}

export default UpdateUser