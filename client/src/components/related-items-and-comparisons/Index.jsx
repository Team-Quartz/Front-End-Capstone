import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RelatedItems from './components/RelatedItems.jsx'
import OutfitItems from "./components/OutfitItems.jsx";
import cardLoader from "./card-loader/cardLoader";


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
  position: relative;
`;

const Index = ({changeCurrentProduct, currentProductId}) => {
  const [defaultStyles] = useState(cardLoader[0]);
  const [relatedItems, setRelatedItems] = useState(0)
  const [currentProduct, setCurrentProduct] = useState({})

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
  }, [currentProductId])

  return (
    <Container>
    <Wrapper>
      <RelatedProducts>
        <Title>RELATED PRODUCTS</Title>
        <RelatedItems
          changeCurrentProduct={changeCurrentProduct}
          relatedItems={relatedItems}
          currentProduct={currentProduct}
          setRelatedItems={setRelatedItems}
        />
      </RelatedProducts>
      <Outfit>
        <Title>YOUR OUTFIT</Title>
        <OutfitItems
          currentItem={currentProduct}
          defaultStyle={defaultStyles}
          currentProductId={currentProductId}
        />
      </Outfit>
    </Wrapper>
  </Container>
  )
}

export default Index
