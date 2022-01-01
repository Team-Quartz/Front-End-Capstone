import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedItems from './components/RelatedItems.jsx'
import OutfitItems from "./components/OutfitItems.jsx";
import exampleRelated from './dummy-data/sampleRelated.js';
import exampleStyles from "./dummy-data/sampleStyles.js";
import exampleProduct from "./dummy-data/sampleProduct.js";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center
  flex-direction: column;
  height: 900px;
  width: 56%;
  padding: 0px 10px;
  margin: auto;
  position: relative;
`;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-direction: column;
`;
const RelatedProducts = styled.div`
  flex: 1;
`;
const Outfit = styled.div`
  flex: 1;
`;

const Title = styled.h5`
  margin: 10px;
  padding:
`;


const Index = ({reviewsMeta, changeCurrentProduct, currentProductId}) => {
  const [defaultStyles] = useState(exampleStyles[0]);
  const [relatedItems, setRelatedItems] = useState(exampleRelated)
  const [currentProduct, setCurrentProduct] = useState(exampleProduct)

  //API FETCH
  const fetchRelatedProductIds = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${currentProductId}/related`,
    {
      headers: {
        'Authorization': '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'
      }
    }).then((relatedIds) => {
      setRelatedItems(relatedIds.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const fetchCurrentProduct = () => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${currentProductId}/`,
    {
      headers: {
        'Authorization': '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'
      }
    }).then((currentProductInfo) => {
      setCurrentProduct(currentProductInfo.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    fetchRelatedProductIds();
    fetchCurrentProduct()
  }, [])

  return (
    <Container>
    <Wrapper>
      <RelatedProducts>
        <Title>RELATED PRODUCTS</Title>
        <RelatedItems
          changeCurrentProduct={changeCurrentProduct}
          currentProductId={currentProductId}
          relatedItems={relatedItems}
          currentProduct={currentProduct}

          defaultStyle={defaultStyles}
          reviewsMeta={reviewsMeta}
        />
      </RelatedProducts>
      <Outfit>
        <Title>YOUR OUTFIT</Title>
        <OutfitItems
          currentItem={currentProduct}
          defaultStyle={defaultStyles}
          reviewsMeta={reviewsMeta}
        />
      </Outfit>
    </Wrapper>
  </Container>
  )
}

export default Index
