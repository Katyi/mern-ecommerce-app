import styled from "styled-components";
import { mobile } from "../../responsive";

export const Container = styled.div`
`;

export const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

export const Header = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  border-bottom: 0.5px solid lightgray;
  padding: 20px 0px 0px 0px;
`;

export const LeftPart = styled.div`
  width: auto;
  height: 15vw;
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  width: auto;
  margin: 0 0 0 40vw;
`;

export const SubTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  width: auto;
  margin: 0 0 0 40vw;
`;

export const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

export const InfoPart = styled.div`
  padding-top: 15px;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Row = styled.div`
  width: 50%;
  display: flex;
  gap: 10%;
`;

export const Field1 = styled.div`
  width: 40%;
  font-size: 16px;
  font-weight: 700;
`;

export const Field2 = styled.div`
  width: auto;
  font-size: 16px;
  font-weight: 700;
`;

export const RightPart = styled.div`
  width: 25%;
  height: 15vw;
  display: flex;
  justify-content: center;
  align-items: start;
`;

export const UserImage = styled.img`
  width: 14vw;
  height: 14vw;
  border-radius: 50%;
`;

export const Orders = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  /* width: 15vw; */
  /* height: 40px; */
  padding: 5px 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  margin: 0 10px;
  &:hover {
    background-color: #f8f4f4;
  }
`;

export const Info = styled.div`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  border-top: 0.6px solid lightgray;
  &:last-child {
    border-bottom: 0.5px solid lightgray;
  }
`;

export const OrderInfoPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const OrderRow = styled.div`
  display: flex;
  gap: 10%;
`;

export const OrderField = styled.span``;

export const Order = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;
  ${mobile({flexDirection:"column"})}
`;

export const OrderDetail = styled.div`
  display: flex;
  // flex-direction: column;
  gap: 10px;
`;

export const Image = styled.img`
  width: 200px;
`;

export const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProductField = styled.span``;

export const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
  margin: 0px 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  /* height: 50vh; */
  width: 30%;
`;

export const SummaryTitle = styled.h4`
  font-weight: 700;
  margin: 0;
`;

export const SummaryItem = styled.div`
  margin: 10px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${props=>props.type === "total" && "700"};
  font-size: 16px;
`;

export const SummaryItemText = styled.span``;

export const SummaryItemPrice = styled.span``;