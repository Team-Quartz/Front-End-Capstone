import React from "react";
import RelatedItem from "./RelatedItem.jsx";
import styled from "styled-components";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

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
  transform: translateX(${(props) => props.slideIndex * -16}vw);
`;
const LeftArrow = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.position === "none" ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 223, 225, 0.8);
  border-radius: 50%;
`;
const RightArrow = styled.div`
  width: 100%;
  height: 100%;
  display: ${(props) => (props.position === "none" ? "none" : "flex")};
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 223, 225, 0.8);
  border-radius: 50%;
`;

const RelatedItems = ({
  setRelatedItems,
  relatedItems,
  changeCurrentProduct,
  currentProduct,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const index = relatedItems.length - 3;

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <LeftArrow position={slideIndex <= 0 ? "none" : "unset"}>
          <FaAngleLeft size={30} />
        </LeftArrow>
      </Arrow>
      {relatedItems.length > 0 ? (
        <Wrapper slideIndex={slideIndex}>
          {relatedItems.map((itemId, index) => {
            return (
              <RelatedItem
                changeCurrentProduct={changeCurrentProduct}
                relatedItemId={itemId}
                setRelatedItems={setRelatedItems}
                key={index}
                currentProduct={currentProduct}
              />
            );
          })}
        </Wrapper>
      ) : null}
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <RightArrow position={slideIndex >= index ? "none" : "unset"}>
          <FaAngleRight size={30} />
        </RightArrow>
      </Arrow>
    </Container>
  );
};

export default RelatedItems;
