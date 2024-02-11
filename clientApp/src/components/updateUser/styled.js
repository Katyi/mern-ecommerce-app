import styled from "styled-components";

export const Container = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & span {
    font-size: 14px;
    color: gray;
  }
`;

export const Title = styled.h2``;

export const UserForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const UserImage = styled.div`
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

export const CloseModalIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  & img {
    width: 24px;
    height: 24px;
    cursor: pointer;
  }
`;

export const UserItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  & label {
    color: gray;
    font-weight: 600;
    margin-bottom: 3px;
  }
  & input {
    padding: 10px;
    border: 2px solid teal;
    cursor: pointer;
  }
  & input:focus {
    outline: none;
  }
  & span {
    height: 12px;
    font-size: 12px;
    color: red;
  }
  & select {
    padding: 10px;
  }
  & button {
    height: auto;
    padding: 12px 10px;
    background-color: teal;
    border: none;
    color: white;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
  }
`;