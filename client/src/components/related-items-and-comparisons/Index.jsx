import { useState } from 'react';
import styled from 'styled-components';
import RelatedItems from './components/RelatedItems.jsx'
import OutfitItems from "./components/OutfitItems.jsx";
import exampleRelated from './dummydata/sampleRelated.js';
import exampleStyles from "./dummydata/sampleStyles.js";
import exampleProduct from "./dummydata/sampleProduct.js";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center
  flex-direction: column;
  height: 100vh;
  width: 56%;
  padding: 0px 10px;
  margin: auto;
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


const Index = () => {
  const [defaultStyles] = useState(exampleStyles[0]);
  const [relatedItems] = useState(exampleRelated)
  const [currentProduct] = useState(exampleProduct)

  return (
    <Container>
    <Wrapper>
      <RelatedProducts>
        <Title>RELATED PRODUCTS</Title>
        <RelatedItems
          currentItemId={currentProduct}
          defaultStyle={defaultStyles}
          relatedItems={relatedItems}
        />
      </RelatedProducts>
      <Outfit>
        <Title>YOUR OUTFIT</Title>
        <OutfitItems
          currentItem={currentProduct}
          defaultStyle={defaultStyles}
        />
      </Outfit>
    </Wrapper>
  </Container>
  )
}

export default Index
