import { Facebook, Instagram, MailOutlined, Phone, Pinterest, Room, Telegram, Twitter } from "@mui/icons-material";
import creditCards from "../../img/creditCards.png";
import { useNavigate } from "react-router-dom";
import { Container, Left, Logo, Desc, SocialContainer, SocialIcon, Center, Title, List, ListItem, Right, ContactItem, Payment } from './styled';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Left>
        <Logo>SHOP</Logo>
        <Desc>
          This is my portfolio online-shop.
          <br/>
          Full-Stack shopping app using React, Node.js, 
          MongoDB, JWT, Redux Toolkit, Stripe.
          <br/>
          <br/>
          {/* Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Tempore aliquid rerum praesentium animi omnis tempora perferendis?
          Cum repellendus obcaecati perferendis ullam totam id architecto. */}
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
        <Title>Useful Links</Title>
        <List>
          <ListItem onClick={()=>navigate("/home")}>Home</ListItem>
          <ListItem onClick={()=>navigate("/cart")}>Cart</ListItem>
          <ListItem onClick={()=>navigate("/products/men")}>Man Fashion</ListItem>
          <ListItem onClick={()=>navigate("/products/women")}>Woman Fashion</ListItem>
          <ListItem onClick={()=>navigate("/products/kids")}>Kids Fashion</ListItem>
          <ListItem onClick={()=>navigate("/products/accessories")}>Accessories</ListItem>
          <ListItem onClick={()=>navigate("/account")}>My Account</ListItem>
          {/* <ListItem>Order Tracking</ListItem> */}
          <ListItem onClick={()=>navigate("/wishlist")}>Wishlist</ListItem>
          {/* <ListItem>Terms</ListItem> */}
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><Room style={{marginRight:"10px"}}/>151 W 34th St., New York, NY 10001</ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/>+7 495 999 77 66 </ContactItem>
        <ContactItem><MailOutlined style={{marginRight:"10px"}}/> admin@shop.com</ContactItem>
        <Payment src={creditCards} />
      </Right>
    </Container>
  )
}

export default Footer
