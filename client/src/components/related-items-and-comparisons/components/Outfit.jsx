import React, { useState, useEffect } from "react";
import styled from "styled-components";
import exampleStyles from "../dummy-data/sampleStyles";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "axios";
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

const Outfit = ({ outfitProductId, removeFromOutfit, currentProductId }) => {
  const [defaultProductStyle, setDefaultProductStyle] = useState(exampleStyles.results[1])
  const [outfitProduct, setOutfitProduct] = useState([])
  const [metadata, setMetadata] = useState({})

  // FETCH API

  const fetchCurrentProduct = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${currentProductId}/`,
        {
          headers: {
            Authorization: "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",
          },
        }
      )
      .then((currentItemInfo) => {
        setOutfitProduct(currentItemInfo.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const fetchOutfitProductStyles = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${currentProductId}/styles`,
        {
          headers: {
            Authorization: "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",
          },
        }
      )
      .then((outfitStyles) => {
        setDefaultProductStyle(outfitStyles.data.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMetadata = () => {
    axios
      .get(
        `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=${currentProductId}`,
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
    fetchCurrentProduct();
    fetchOutfitProductStyles();
    fetchMetadata();
  }, []);


  // fix this, not working as intended
  const removeOutfit = () => {
    removeFromOutfit(outfitProductId);
  };

  console.log('outfitPro', outfitProductId)
  return (
    <>
      <Container>
        <Card>
          <Uppercard>
            <ActionButton onClick={removeOutfit}>
              <FaRegTimesCircle size={45} />
            </ActionButton>
            <ImgWrapper>
              {defaultProductStyle.photos[0].thumbnail_url === null ? (
                <Image src="./img/imageNotAvailable.png" />
              ) : (
                <Image src={defaultProductStyle.photos[0].thumbnail_url} />
              )}
            </ImgWrapper>
          </Uppercard>
          <Lowercard>
            <Catergory>{outfitProduct.category}</Catergory>
            <Product>{outfitProduct.name}</Product>
            <Price>${outfitProduct.default_price}</Price>
            <ReviewWrapper>
              <Stars reviewsMeta={metadata} />
            </ReviewWrapper>
          </Lowercard>
        </Card>
      </Container>
    </>
  );
};

export default Outfit;
