import { Send } from "@mui/icons-material"
import { useState } from "react";
import { Container, Title, Desc, InputContainer, Input, Textarea, Button } from './styled';

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

export default Newsletter;