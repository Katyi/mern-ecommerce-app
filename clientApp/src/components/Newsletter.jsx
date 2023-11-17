import { Send } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive";
import { useState } from "react";

const Container = styled.form`
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 70px;
  line-height: 70px;
  margin: 0;
  margin-top: 40px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  ${mobile({textAlign:"center"})}
`;

const InputContainer = styled.div`
  width: 50%;
  /* height: 40px; */
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({width:"80%"})}
`;

const Input = styled.input`
  height: 40px;
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Textarea = styled.textarea`
  height: 140px;
  border: none;
  flex: 8;
  padding: 10px 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
`;

const Newsletter = () => {

  return (
    <Container
      target="_blank"
      action="https://formsubmit.co/5d13c2bc82b9e52b4d8ba632e529897c"
      method="POST"
    >
      <Title>Contact Us</Title>
      <Desc>Send us an email and we'll get back to you soon.</Desc>
      <input type="hidden" name="_next" value="http://localhost:5173/thanks"/>
      <InputContainer>
        <Input placeholder="Name" type="text" name="name" required/>
      </InputContainer>
      <InputContainer>
        <Textarea 
          placeholder="Message" 
          type="text" 
          name="message" 
          required/>
      </InputContainer>
      <InputContainer>
        <Input placeholder="Your email" type="email" name="email" required/>
        <Button type="submit"><Send/></Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter
