import { Facebook, Instagram, MailOutlined, Phone, Pinterest, Room, Telegram, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import creditCards from "../img/creditCards.png";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  padding-left: 3%;
  ${mobile({flexDirection:"column", paddingLeft: 0})}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display:"none"})}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor:"#fff8f8"})}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 70%;
`;

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
        {/* <List> */}
          <ListItem onClick={()=>navigate("/home")}>Home</ListItem>
          <ListItem onClick={()=>navigate("/cart")}>Cart</ListItem>
          <ListItem onClick={()=>navigate("/products/men")}>Man Fashion</ListItem>
          <ListItem onClick={()=>navigate("/products/women")}>Woman Fashion</ListItem>
          <ListItem onClick={()=>navigate("/products/accessories")}>Accessories</ListItem>
          {/* <ListItem>My Account</ListItem> */}
          {/* <ListItem>Order Tracking</ListItem> */}
          {/* <ListItem>Wishlist</ListItem> */}
          {/* <ListItem>Terms</ListItem> */}
        {/* </List> */}
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
