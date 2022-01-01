import React from "react";
import Outfit from "./Outfit";
import styled from "styled-components";
import { useState } from "react";
import sampleOutfitList from "../dummy-data/sampleOutfitlist";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  height: 90%;
  overflow: hidden;
  position: relative;
`;

// change top position on final product
const Arrow = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  position: absolute;
  left: ${(props) => props.direction === "left" && "2px"};
  right: ${(props) => props.direction === "right" && "2px"};
  top: 0px;
  bottom: 0px;
  margin: auto;
  cursor: pointer;
  padding: 2px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1s ease;
  transform: translateX(${(props) => props.slideIndex * -14}vw);
`;

const AddToOutfitCard = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  width: 200px;
  margin: 10px;
  flex-direction: column;
  position: relative;
  justify-content:center;
  align-items: center;
  background: lightgray;
  &:hover {
    box-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    bottom-border: 0px;
    cursor: pointer;
`;

const AddToOutfitButton = styled.button`
  border: none;
  background: inherit;
  cursor: pointer;
  height: 100%;
  width: 100%;

`;

const InnerWrapper = styled.div`
  display: flex;
`
//fix
const LeftArrow = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => props.position === "none" ? "none" : "flex"};
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 223, 225, 0.8);
  border-radius: 50%;
`;

const RightArrow = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => props.position === "none" ? "none" : "flex"};
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 223, 225, 0.8);
  border-radius: 50%;
`

const OutfitItems = ({currentItem, defaultStyle}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [outfits,setOutfits] = useState(sampleOutfitList);
  const index = outfits.length - 2;

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const addToOutfit = (currentItem) => {
    if (!outfits.includes(currentItem)) {
      const newOutfit = [currentItem, ...outfits];
      setOutfits(newOutfit)
    } else {
      alert('Item already exists in your outfits')
    }
  }

  const removeFromOutfit = (product) => {
    setOutfits(outfits.filter((x) => x !== product))
  }

  return (
    <Container >
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <LeftArrow position={slideIndex <= 0 ? "none" : ""}>
          <FaAngleLeft size={30} />
        </LeftArrow>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        <AddToOutfitCard>
          <AddToOutfitButton onClick={() => addToOutfit(currentItem)}>+ ADD TO YOUR OUTFIT</AddToOutfitButton>
        </AddToOutfitCard>
        {outfits.length > 0 ? (
          <InnerWrapper>
            {outfits.map((item, index) => {
              return <Outfit item={item} key={index} removeFromOutfit={removeFromOutfit}/>;
            })}
          </InnerWrapper>
        ) : null}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
      <RightArrow position={slideIndex >= index ? "none" : "unset"}>
          <FaAngleRight size={30}/>
        </RightArrow>
      </Arrow>
    </Container>
  );
};

export default OutfitItems;
