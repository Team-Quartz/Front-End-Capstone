import styled from 'styled-components';


const ProductInfoDiv = styled.div`
  flex-direction: column;
`;

const Descriptors = styled.div`
`
const CategoryStyle = styled(Descriptors)`
  font-size: 2em;
`;
const OriginalPriceStyled = styled(Descriptors)`
text-decoration-line: line-through;
`
const DiscountedPriceStyled = styled(Descriptors)`
color: red;
`

const ProductInformation = ({productData, starsData, selectedStyle}) => {

  const { category, name, description, default_price} = productData;
  let SalePriceStyle = <Descriptors>${default_price}</Descriptors>
  /*
  TODO: create conditional rendering for price and style accordingly. Create links for social media
  */

 if (selectedStyle !== null && selectedStyle["sale_price"] !== null) {
   console.log(selectedStyle)
    const {sale_price, original_price} = selectedStyle;
    SalePriceStyle = <Descriptors><OriginalPriceStyled>${original_price}</OriginalPriceStyled><DiscountedPriceStyled> ${sale_price}</DiscountedPriceStyled></Descriptors>;
  }
  return (
    <ProductInfoDiv>
      {starsData}
      <CategoryStyle>{category}</CategoryStyle>
      {SalePriceStyle}
      <Descriptors>{description}</Descriptors>
      <Descriptors>Social Media placeholder</Descriptors>
    </ProductInfoDiv>
  )
}
export default ProductInformation;
