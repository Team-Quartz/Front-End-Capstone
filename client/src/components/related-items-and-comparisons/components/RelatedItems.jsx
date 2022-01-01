import React from 'react'
import RelatedItem from './RelatedItem.jsx'
import styled from 'styled-components'
import { useState } from 'react'

const Container = styled.div`
  display: flex;
  height: 90%;
  overflow: hidden;
  position: relative;
`

// change top position on final product
const Arrow = styled.div`
  width: 5%;
  height: 13%;
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
  border: 3px solid black;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.0s ease;
  transform: translateX(${(props) => props.slideIndex * -16}vw);
`
const LeftArrow = styled.div`
  width: 100%;
  height: auto;
  display: ${(props) => props.position === "none" && "none"};
  border: 3px solid red;

`
const RightArrow = styled.div`
  width: 100%;
  height: auto;
  display: ${(props) => props.position === "none" && "none"};
  border: 3px solid red;

`


const RelatedItems = (props) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const index = props.relatedItems.length - 3;
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  }
  return (
    <Container>
      <Arrow direction="left" onClick={() => handleClick("left")}>
        <LeftArrow position={slideIndex <= 0 ? "none" : "unset"}/>
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
      {props.relatedItems.map((item, index) => {
        return (
          <RelatedItem
            changeCurrentProduct={props.changeCurrentProduct}
            item={item}
            key={index}
            currentItem={props.currentItem}
            defaultStyle={props.defaultStyle}
            reviewsMeta={props.reviewsMeta}
          />
        )
      })}
      </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
        <RightArrow position={slideIndex >= index ? "none" : "unset"}/>
      </Arrow>
    </Container>
  )
}

export default RelatedItems
