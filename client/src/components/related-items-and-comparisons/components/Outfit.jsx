import React, { useState } from "react";
import styled from "styled-components";
import exampleStyles from "../dummy-data/sampleStyles";
import { FaRegTimesCircle } from 'react-icons/fa'


const Container = styled.div`
  display: flex;
  overflow: wrap;
  position: relative;
`;

const Card = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  width: 200px;
  height: 100%;
  margin: 10px;
  flex-direction: column;
  position: relative;
  &:hover {
    box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    bottom-border: 0px;
    cursor: pointer;
`;
const Uppercard = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled.button`
  height: 40px;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Lowercard = styled.div`
  flex: 1;
  background: lightgrey;
  display: flex;
  flex-direction: column;
  padding: 5px 5px 0px;

`;

const Catergory = styled.div`
  font-size: 14px;
`;
const Product = styled.div`
  font-weight: 900;
`;
const Price = styled.div`
  font-size: 13px;
  bottom-padding: 10px;
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
//temp
const ReviewWrapper = styled.div`
  padding-top: 10px;
`;

const Stars = styled.img`
  width: 40%;
  height: auto;
`;


const Outfit = ({item, removeFromOutfit}) => {
   const [defaultProductStyle] = useState(exampleStyles.results[3]);

  const removeOutfit = () => {
    removeFromOutfit(item)
  }

  return (
    <>
      <Container>
        <Card>
          <Uppercard>
            <ActionButton onClick={removeOutfit}>
              <FaRegTimesCircle size={45}/>
            </ActionButton>
            <ImgWrapper>
              <Image src={defaultProductStyle.photos[0].thumbnail_url} />
            </ImgWrapper>
          </Uppercard>
          <Lowercard>
            <Catergory>{item.category}</Catergory>
            <Product>{item.name}</Product>
            <Price>${item.default_price}</Price>
            <ReviewWrapper>
              Stars review goes here
            </ReviewWrapper>
          </Lowercard>
        </Card>
      </Container>
    </>
  );
}

export default Outfit
