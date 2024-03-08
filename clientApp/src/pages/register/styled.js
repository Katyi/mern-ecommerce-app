import styled from "styled-components";
import backGroundphoto from "../../img/backGroundphoto.png";
import { mobile } from "../../responsive";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-size: contain;
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
  width: 40vw;
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
  flex-wrap: wrap;
`;
export const UserImage = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 5px;
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

export const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  &[name='username']::placeholder, &[name='email']::placeholder,
  &[name='password']::placeholder, &[name='confirm password']::placeholder {
  opacity: 0.6;
  color: red;
}
`;

export const Select = styled.select`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;

`;

export const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

export const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export const Link = styled.a`
  margin: 10px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

export const ImgDiv = styled.div`
  min-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

export const NewUserImg = styled.input`
  border: none !important;
`;

export const Label = styled.label`
  font-weight: 700;
`;

export const Error = styled.span`
  margin-top: 10px;
  color: red;
  font-size: 12px;
  width: 100%;
`;

export const UserImageBtn = styled.button`
  border: none;
  background: transparent;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;