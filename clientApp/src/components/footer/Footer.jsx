import { Facebook, Instagram, MailOutlined, Phone, Pinterest, Room, Telegram, Twitter } from "@mui/icons-material";
import creditCards from "../../img/creditCards.png";
import { useNavigate } from "react-router-dom";
import { Container, Left, Logo, Desc, SocialContainer, SocialIcon, Center, Title, List, ListItem, Right, ContactItem, Payment } from './styled';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  return (
    <Container>
      <Left>
        <Logo>{t("shopTitle")}</Logo>
        <Desc>
          {t("footerDescFirst")}
          <br />
          {t("footerDescSecond")}
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999">
            <Facebook/>
          </SocialIcon>
          <SocialIcon color="#E4405F">
            <Instagram/>
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <Twitter/>
          </SocialIcon>
          <SocialIcon color="#E60023">
            <Pinterest/>
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <Telegram/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>{t("footerUsefulLinks")}</Title>
        <List>
          <ListItem onClick={()=>navigate("/home")}>{t("footerHomeLink")}</ListItem>
          <ListItem onClick={()=>navigate("/cart")}>{t("footerCartLink")}</ListItem>
          <ListItem onClick={()=>navigate("/products/men")}>{t("footerMenFashionLink")}</ListItem>
          <ListItem onClick={()=>navigate("/products/women")}>{t("footerWomenFashionLink")}</ListItem>
          <ListItem onClick={()=>navigate("/products/kids")}>{t("footerKidFashionLink")}</ListItem>
          <ListItem onClick={()=>navigate("/products/accessories")}>{t("footerAccessoriesLink")}</ListItem>
          <ListItem onClick={()=>navigate("/account")}>{t("footerAccountLink")}</ListItem>
          {/* <ListItem>Order Tracking</ListItem> */}
          <ListItem onClick={()=>navigate("/wishlist")}>{t("footerWishlistLink")}</ListItem>
          {/* <ListItem>Terms</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>{t("footerContactLink")}</Title>
        <ContactItem><Room style={{marginRight:"10px"}}/>{t("footerAddressLink")}</ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/>{t("footerPhoneLink")}</ContactItem>
        <ContactItem><MailOutlined style={{marginRight:"10px"}}/> admin@shop.com</ContactItem>
        <Payment src={creditCards} />
      </Right>
    </Container>
  )
}

export default Footer;