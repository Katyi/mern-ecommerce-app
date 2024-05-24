import styled from "styled-components";
import { mobile } from "../../responsive";

export const SuccessContainer = styled.div`
  height: 98vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SuccessImg = styled.img`
  border-radius: 50%;
`;

export const SuccessButton = styled.button`
  border: none;
  margin-top: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 20px;
  background-color: teal;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 18px;
  text-align: center;
`;

export const SuccessText = styled.p`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 16;
  font-weight: 500;
`;