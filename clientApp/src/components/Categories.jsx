import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  /* width: calc(100vw - 40px); */
  display: flex;
  padding: 5px 20px 0px 20px;
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
