import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';
import cardLoader from '../card-loader/cardLoader';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 107.5%;
  top: 0px;
  z-index: 5;
`;

const NewCard = styled.div`
  border: 0.5px #696969 solid;
  background: white;
`;

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PreviewWrapper = styled.div`
  position: absolute;
  bottom: -5px;
  left: 0;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.5);
`;

const SmallerImgWrapper = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  padding: 9px;
`;

const SmallImg = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
`;

const ArrowWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  position: absolute;
  left: ${(props) => props.direction === 'left' && '2px'};
  right: ${(props) => props.direction === 'right' && '2px'};
  top: 0px;
  bottom: 0px;
  margin: auto;
  cursor: pointer;
  padding: 2px;
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -90}px);
`;

const Arrow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(218, 223, 225, 0.8);
  border-radius: 50%;
`;

const PopupRelated = ({
  productStyles,
  changeCurrentProduct,
  defaultProduct,
  changePreviewItem,
  previewImage
}) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const index = productStyles.length - 4;

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(slideIndex - 1);
    } else {
      setSlideIndex(slideIndex + 1);
    }
  };

  const changeCurrentItem = (itemId) => {
    changeCurrentProduct(itemId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changePreviewImage = (index) => {
    changePreviewItem(index);
  };

  return (
    <Container>
      <NewCard>
        <ImgWrapper onClick={() => changeCurrentItem(defaultProduct.id)}>
          {productStyles[0].thumbnail_url === null ? (
            <Image src='./img/imageNotAvailable.png' />
          ) : (
            <Image src={previewImage} />
          )}
        </ImgWrapper>
        {productStyles.length > 1 ? (
          <PreviewWrapper>
            {slideIndex <= 0 ? null : (
              <ArrowWrapper direction='left' onClick={() => handleClick('left')}>
                <Arrow>
                  <FaAngleLeft size={20} />
                </Arrow>
              </ArrowWrapper>
            )}
            <Wrapper slideIndex={slideIndex}>
              {productStyles.map((photo, index) => {
                return (
                  <SmallerImgWrapper key={index}>
                    <SmallImg src={photo.thumbnail_url} onClick={() => changePreviewImage(index)} />
                  </SmallerImgWrapper>
                );
              })}
            </Wrapper>
            {slideIndex >= index ? null : (
              <ArrowWrapper direction='right' onClick={() => handleClick('right')}>
                <Arrow>
                  <FaAngleRight size={20} />
                </Arrow>
              </ArrowWrapper>
            )}
          </PreviewWrapper>
        ) : null}
      </NewCard>
    </Container>
  );
};

export default PopupRelated;
