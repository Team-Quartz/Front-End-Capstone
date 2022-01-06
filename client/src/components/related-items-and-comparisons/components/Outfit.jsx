import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cardLoader from "../card-loader/cardLoader";
import { FaRegTimesCircle } from "react-icons/fa";
import axios from "../../../haxios";
import { Stars } from "../../sharedComponents.jsx";
import utils from "../../../Utils.js";

const Container = styled.div`
  display: flex;
  overflow: wrap;
  position: relative;
`;

const Card = styled.div`
  border: 1px solid #dcdcdc;
  display: flex;
  width: 320px;
  height: 300px;
  margin: 10px;
  padding: 0;
  flex-direction: column;
  position: relative;
  cursor: pointer;
`;

const Uppercard = styled.div`
  height: 220px;
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
  height: 80px;
  background: lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 5px;
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

const ReviewWrapper = styled.div`
  padding-top: 0px;
`;

const Outfit = ({
  outfits,
  outfitProductId,
  removeFromOutfit,
  currentStyleId,
}) => {
  const [defaultProductStyle, setDefaultProductStyle] = useState(
    cardLoader.photos
  );
  const [outfitProduct, setOutfitProduct] = useState([]);
  const [metadata, setMetadata] = useState({});

  // FETCH API

  const fetchCurrentProduct = () => {
    axios
      .get(`/API/products/${outfitProductId}/`)
      .then((currentItemInfo) => {
        setOutfitProduct(currentItemInfo.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchOutfitProductStyles = () => {
    axios
      .get(`/API/products/${outfitProductId}/styles`)
      .then((outfitStyles) => {
        setDefaultProductStyle(outfitStyles.data.results[0].photos);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchMetadata = () => {
    axios
      .get(`/API/reviews/meta?product_id=${outfitProductId}`)
      .then((metadataInfo) => {
        setMetadata(utils.parseReviewsMeta(metadataInfo.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCurrentProduct();
    fetchOutfitProductStyles();
    fetchMetadata();
  }, [outfits]);

  const removeOutfit = () => {
    removeFromOutfit(outfitProductId);
  };

  return (
    <>
      <Container>
        <Card>
          <Uppercard>
            <ActionButton onClick={removeOutfit}>
              <FaRegTimesCircle size={45} />
            </ActionButton>
            <ImgWrapper>
              {defaultProductStyle[0].thumbnail_url === null ? (
                <Image src="./img/imageNotAvailable.png" />
              ) : (
                <Image src={defaultProductStyle[0].thumbnail_url} />
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
