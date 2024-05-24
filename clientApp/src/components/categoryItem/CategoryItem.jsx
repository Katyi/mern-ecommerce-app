import { Link } from "react-router-dom";
import { Container, Image, Info, Title, Button } from './styled';
import { useTranslation } from 'react-i18next';

const CategoryItem = ({item}) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Link to={`/products/${item.cat}`}>
        <Image src={item.img}/>
        <Info>
          <Title>{item.title}</Title>
          <Button>{t("ShopNowButton")}</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem;