import React, { useState } from "react";
import styled from "styled-components";
import exampleStyles from "../dummy-data/sampleStyles";
import exampleProducts from "../dummy-data/sampleProducts";
import CompareModal from "./CompareModal";
import comparedProducttest from "../dummy-data/sampleCompareProductFeat";
import currentProduct from "../dummy-data/sampleCurrentProductFeat";
import { FaRegStar } from 'react-icons/fa'

const Container = styled.div`
  display: flex;
  overflow: wrap;
  position: relative;
`;

const Card = styled.div`
  border: 1px solid lightgrey;
  display: flex;
  width: 200px;
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
  height: 35px;
  width: 35px;
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
  padding: 5px;
  bottom: 0px;
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
  border: 1px solid black;
`;
const Stars = styled.div`
  width: 40%;
  height: auto;
`;

const RelatedItem = (props) => {
  const [defaultProductStyle] = useState(exampleStyles.results[0]);
  const [defaultProduct] = useState(exampleProducts);
  const [showCompare, setShowCompare] = useState(false);
  const [defaultProductFeatures] = useState(currentProduct);
  const [compareToProductFeatures] = useState(comparedProducttest);
  const [combinedFeatures, setCombinedFeatures] = useState({});

  const onModalClick = () => {
    setShowCompare((prev) => !prev);
    combineFeatures(defaultProductFeatures, compareToProductFeatures)
  };

  const combineFeatures = (defaultProductFeatures, compareToProductFeatures) => {
    let combinedFeaturesObj = {};

    defaultProductFeatures.forEach((product) => {
      if (!combinedFeaturesObj[product.feature]) {
        if (product.value === null) {
          combinedFeaturesObj[product.feature] = ['✓'];
        } else {
          combinedFeaturesObj[product.feature] = [product.value]
        }
      }
    });

    compareToProductFeatures.forEach((product) => {
      if (!combinedFeaturesObj[product.feature]) {
        if (product.value === null) {
          combinedFeaturesObj[product.feature] = [undefined, '✓'];
        } else {
          combinedFeaturesObj[product.feature] = [undefined, product.value]
        }
      } else if (product.value === null) {
        combinedFeaturesObj[product.feature][1] = ['✓']
      } else {
        combinedFeaturesObj[product.feature][1] = [product.value]
      }
    })

    const features = Object.keys(combinedFeaturesObj);
    const values = Object.values(combinedFeaturesObj);

    const comparisonObject = {
      currentProduct: [],
      feature: [],
      comparisonProduct: []
    }

    for (let i = 0; i < features.length; i++) {
      comparisonObject.currentProduct.push(values[i][0]);
      comparisonObject.feature.push(features[i]);
      comparisonObject.comparisonProduct.push(values[i][1]);
    }
    setCombinedFeatures(comparisonObject);
  }


  return (
    <>
      <Container>
        <Card>
          <Uppercard>
            <ActionButton onClick={onModalClick}>
              <FaRegStar size={40}/>
            </ActionButton>
            <ImgWrapper>
              <Image src={defaultProductStyle.photos[1].thumbnail_url} />
            </ImgWrapper>
          </Uppercard>
          <Lowercard>
            <Catergory>{defaultProduct[0].category}</Catergory>
            <Product>{defaultProduct[0].name}</Product>
            <Price>${defaultProduct[0].default_price}</Price>
            <ReviewWrapper>
              Stars review goes here
            </ReviewWrapper>
          </Lowercard>
      <CompareModal showCompare={showCompare} setShowCompare={setShowCompare} combinedFeatures={combinedFeatures}/>
        </Card>
      </Container>
    </>
  );
}

export default RelatedItem;