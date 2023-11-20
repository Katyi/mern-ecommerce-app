import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 5px 0px 0px 0px;
  gap: 3px;
  justify-content: space-between;
  ${mobile({padding:"0px",flexDirection:"column" })}
`;

const Categories = () => {
  return <Container>
    {categories.map(item => (
      <CategoryItem item={item} key={item.id}/>
    ))}
  </Container>;
};

export default Categories;
