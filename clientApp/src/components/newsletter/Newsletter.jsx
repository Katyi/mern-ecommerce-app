import { Send } from "@mui/icons-material"
import { useState } from "react";
import { Container, Title, Desc, InputContainer, Input, Textarea, Button } from './styled';
import { useTranslation } from 'react-i18next';

const Newsletter = () => {
  const { t } = useTranslation();

  return (
    <Container
      target="_blank"
      action="https://formsubmit.co/5d13c2bc82b9e52b4d8ba632e529897c"
      method="POST"
    >
      <Title>{t("newsletterTitle")}</Title>
      <Desc>{t("newsletterSubTitle")}</Desc>
      <input type="hidden" name="_next" value="http://212.113.120.58:5173/thanks"/>
      <InputContainer>
        <Input placeholder={t("newsletterNamePlaceholder")} type="text" name="name" required/>
      </InputContainer>
      <InputContainer>
        <Textarea 
          placeholder={t("newsletterMessagePlaceholder")} 
          type="text" 
          name="message" 
          required/>
      </InputContainer>
      <InputContainer>
        <Input placeholder={t("newsletterEmailPlaceholder")} type="email" name="email" required/>
        <Button type="submit"><Send/></Button>
      </InputContainer>
    </Container>
  )
}

export default Newsletter;