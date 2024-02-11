import styled from "styled-components"
import { mobile } from "../../responsive";

export const Container = styled.form`
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 70px;
  line-height: 70px;
  margin: 0;
  margin-top: 40px;
`;

export const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  ${mobile({textAlign:"center"})}
`;

export const InputContainer = styled.div`
  width: 50%;
  /* height: 40px; */
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({width:"80%"})}
`;

export const Input = styled.input`
  height: 40px;
  border: none;
  flex: 8;
  padding-left: 20px;
`;

export const Textarea = styled.textarea`
  height: 140px;
  border: none;
  flex: 8;
  padding: 10px 20px;
`;

export const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;