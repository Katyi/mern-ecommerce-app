import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper, Arrow, Slide, ImgContainer, Image, InfoContainer, Title, Desc, Button } from './styled';
import { useTranslation } from 'react-i18next';

const Slider = () => {
  const { t } = useTranslation();
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();
  const sliderItems = t('sliderItems', { returnObjects: true });
  
  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2) 
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0)
    }
  };

  return (
    <Container>
      <Arrow direction='left' onClick={()=>handleClick("left")}>
        <ArrowLeftOutlined/>
      </Arrow>
      <Wrapper $slideindex={slideIndex}>
        {sliderItems.map((item) => (
          <Slide $bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} $imgid={item.id}/>
              </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button onClick={()=> navigate(`/products/all`)}>{t("ShopNowButton")}</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction='right' onClick={()=>handleClick("right")}>
        <ArrowRightOutlined/>
      </Arrow>
    </Container>
  )
}

export default Slider;