import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from 'axios';
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
  object-fit: contain;
`;
//temp
const ReviewWrapper = styled.div`
  padding-top: 10px;
`;
const Stars = styled.div`
  width: 40%;
  height: auto;
`;

const RelatedItem = ({changeCurrentProduct, currentProductId, relatedItemId, currentProduct}) => {
  const [defaultProductStyle, setDefaultProductStyle] = useState(exampleStyles.results[0]);
  const [defaultProduct, setDefaultProduct] = useState(exampleProducts);
  const [defaultProductFeatures] = useState(currentProduct);
  const [compareToProductFeatures] = useState(comparedProducttest);

  const [showCompare, setShowCompare] = useState(false);
  const [combinedFeatures, setCombinedFeatures] = useState({});

  console.log('def', defaultProduct)
  console.log('current',currentProduct)

  // FETCH API
  const fetchRelatedProduct = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${relatedItemId}/`,
    {
      headers: {
        'Authorization': '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'
      }
    }).then((relatedItemInfo) => {
      setDefaultProduct(relatedItemInfo.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const fetchRelatedProductStyles = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${relatedItemId}/styles`,
    {
      headers: {
        'Authorization': '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'
      }
    }).then((relatedItemStyles) => {
      setDefaultProductStyle(relatedItemStyles.data.results[0])
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchRelatedProduct();
    fetchRelatedProductStyles();
  }, [])

  const changeCurrentItem = (defaultItem) => {
    changeCurrentProduct(defaultItem)
  }

  const onModalClick = () => {
    setShowCompare((prev) => !prev);
    combineFeatures(currentProduct.features, defaultProduct.features)
  };

  const combineFeatures = (currentProduct, defaultProduct) => {
    let combinedFeaturesObj = {};

    currentProduct.forEach((product) => {
      if (!combinedFeaturesObj[product.feature]) {
        if (product.value === null) {
          combinedFeaturesObj[product.feature] = ['✓'];
        } else {
          combinedFeaturesObj[product.feature] = [product.value]
        }
      }
    });

    defaultProduct.forEach((product) => {
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
    console.log(comparisonObject)
  }


  return (
    <>
      <Container>
        <Card onClick={()=>changeCurrentItem(defaultProduct.id)}>
          <Uppercard>
            <ActionButton onClick={onModalClick}>
              <FaRegStar size={40}/>
            </ActionButton>
            <ImgWrapper>
            { defaultProductStyle.photos[0].thumbnail_url === null ?
              (<Image src='./img/imageNotAvailable.png' />) :
              (<Image src={defaultProductStyle.photos[0].thumbnail_url} />)
            }
            </ImgWrapper>
          </Uppercard>
          <Lowercard>
            <Catergory>{defaultProduct.category}</Catergory>
            <Product>{defaultProduct.name}</Product>
            <Price>${defaultProduct.default_price}</Price>
            <ReviewWrapper>
              Stars review goes here
            </ReviewWrapper>
          </Lowercard>
      <CompareModal
        showCompare={showCompare}
        setShowCompare={setShowCompare}
        combinedFeatures={combinedFeatures}
        currentItem={currentProduct}
        defaultProduct={defaultProduct}
        />
        </Card>
      </Container>
    </>
  );
}

export default RelatedItem;