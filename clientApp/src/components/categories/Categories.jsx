import styled from "styled-components";
import { mobile } from "../../responsive";
import CategoryItem from "../categoryItem/CategoryItem";
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0px 0px 0px;
  gap: 3px;
  justify-content: space-between;
  ${mobile({padding:"0px",flexDirection:"column" })}
`;

const Categories = () => {
  const { t } = useTranslation();
  const categories = t('categories', { returnObjects: true });

  return <Container>
    {categories.map(item => (
      <CategoryItem item={item} key={item.id}/>
    ))}
  </Container>;
};

export default Categories;
