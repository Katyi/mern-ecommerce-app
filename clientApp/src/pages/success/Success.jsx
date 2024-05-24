import React from 'react';
import { useNavigate } from 'react-router';
import thanksImg from "../../assets/paid-thank-you.png";
import { useTranslation } from 'react-i18next';
import { SuccessContainer, SuccessImg, SuccessButton, SuccessText } from './styled';

const Success = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  return (
    <SuccessContainer>
      <h1 style={{color:'teal', }}>{t("successTitle")}</h1>
      <SuccessImg src={thanksImg} alt="thanksImg"/>
      <SuccessButton onClick={()=> navigate("/home")}>
        {t("toHomePage")}
      </SuccessButton>
      <SuccessText>
        {t("successText1")}
      </SuccessText>
      <SuccessText>
        {t("successText2")}
      </SuccessText>
    </SuccessContainer>
  );
};

export default Success;