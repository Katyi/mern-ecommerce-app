import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div``;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  margin: 0px;
`;

export const TopButton = styled.button`
  padding: 10px;
  font-weight: 300;
  cursor: pointer;
  border: ${props=>props.type === "filled" && "none"};
  background-color: ${props=>props.type === "filled" ? "black" : "transparent"};
  color: ${props=>props.type === "filled" && "white"};
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Filter = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  ${mobile({margin:"0px 20px", display: "flex", flexDirection:"column"})}
`;

export const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  ${mobile({marginRight: "0px"})}
`;