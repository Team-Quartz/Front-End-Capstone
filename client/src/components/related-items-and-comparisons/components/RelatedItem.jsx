import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import exampleStyles from "../dummy-data/sampleStyles";
import CompareModal from "./CompareModal";
import { FaRegStar } from "react-icons/fa";
import { Stars } from "../../sharedComponents.jsx"
import utils from '../../../Utils.js'

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

const ButtonWrapper = styled.div`
  z-index: 1000;
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 50px;
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

const ReviewWrapper = styled.div`
  padding-top: 10px;
`;

const RelatedItem = ({
  changeCurrentProduct,
  currentProductId,
  relatedItemId,
  currentProduct,
}) => {
  const [defaultProductStyle, setDefaultProductStyle] = useState(
    exampleStyles.results[0]
  );
  const [defaultProduct, setDefaultProduct] = useState(currentProductId || 38328);
  const [defaultProductFeatures] = useState([]);
  const [compareToProductFeatures] = useState([]);

  const [showCompare, setShowCompare] = useState(false);
  const [combinedFeatures, setCombinedFeatures] = useState({});
  const [metadata, setMetadata] = useState({})

  // FETCH API
  const fetchRelatedProduct = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${relatedItemId}/`,
        {
          headers: {
            Authorization: "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",
          },
        }
      )
      .then((relatedItemInfo) => {
        setDefaultProduct(relatedItemInfo.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRelatedProductStyles = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${relatedItemId}/styles`,
        {
          headers: {
            Authorization: "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",
          },
        }
      )
      .then((relatedItemStyles) => {
        setDefaultProductStyle(relatedItemStyles.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMetadata = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${relatedItemId}`,
        {
          headers: {
            Authorization: "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",
          },
        }
      )
      .then((metadataInfo) => {
        setMetadata(utils.parseReviewsMeta(metadataInfo.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchRelatedProduct();
    fetchRelatedProductStyles();
    fetchMetadata();
  }, []);

  const changeCurrentItem = (itemId) => {
    changeCurrentProduct(itemId);
  };

  const onModalClick = () => {
    setShowCompare((prev) => !prev);
    combineFeatures(currentProduct.features, defaultProduct.features);
  };

  const combineFeatures = (currentProduct, defaultProduct) => {
    let combinedFeaturesObj = {};

    currentProduct.forEach((product) => {
      if (!combinedFeaturesObj[product.feature]) {
        if (product.value === null) {
          combinedFeaturesObj[product.feature] = ["✓"];
        } else {
          combinedFeaturesObj[product.feature] = [product.value];
        }
      }
    });

    defaultProduct.forEach((product) => {
      if (!combinedFeaturesObj[product.feature]) {
        if (product.value === null) {
          combinedFeaturesObj[product.feature] = [undefined, "✓"];
        } else {
          combinedFeaturesObj[product.feature] = [undefined, product.value];
        }
      } else if (product.value === null) {
        combinedFeaturesObj[product.feature][1] = ["✓"];
      } else {
        combinedFeaturesObj[product.feature][1] = [product.value];
      }
    });

    const features = Object.keys(combinedFeaturesObj);
    const values = Object.values(combinedFeaturesObj);

    const comparisonObject = {
      currentProduct: [],
      feature: [],
      comparisonProduct: [],
    };

    for (let i = 0; i < features.length; i++) {
      comparisonObject.currentProduct.push(values[i][0]);
      comparisonObject.feature.push(features[i]);
      comparisonObject.comparisonProduct.push(values[i][1]);
    }
    setCombinedFeatures(comparisonObject);
  };

  return (
    <>
      <Container>
        <Card>
          <Uppercard>
            <ButtonWrapper>
              <ActionButton onClick={onModalClick}>
                <FaRegStar size={40} />
              </ActionButton>
            </ButtonWrapper>
            <ImgWrapper onClick={() => changeCurrentItem(defaultProduct.id)}>
              {defaultProductStyle.photos[0].thumbnail_url === null ? (
                <Image src="./img/imageNotAvailable.png" />
              ) : (
                <Image src={defaultProductStyle.photos[0].thumbnail_url} />
              )}
            </ImgWrapper>
          </Uppercard>
          <Lowercard>
            <Catergory>{defaultProduct.category}</Catergory>
            <Product>{defaultProduct.name}</Product>
            <Price>${defaultProduct.default_price}</Price>
            <ReviewWrapper>
              <Stars reviewsMeta={metadata} />
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
};

export default RelatedItem;
