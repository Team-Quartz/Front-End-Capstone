import styled from 'styled-components';
import { AppStyle, BodyText, Feedback, ResponseText } from '../sharedComponents.jsx';

const ProductInfoDiv = styled(AppStyle)`
  flex-direction: column;
`;

const Descriptors = styled(ResponseText)``;
const CategoryStyle = styled(BodyText)`
  font-size: 2em;
`;
const OriginalPriceStyled = styled(Feedback)`
  text-decoration-line: line-through;
`;
const DiscountedPriceStyled = styled(Descriptors)`
  color: red;
`;

const ProductInformation = ({ productData, starsData, selectedStyle }) => {
  const { category, name, description, default_price } = productData;
  let SalePriceStyle = <Descriptors>${default_price}</Descriptors>;
  if (selectedStyle !== null && selectedStyle['sale_price'] !== null) {
    const { sale_price, original_price } = selectedStyle;
    SalePriceStyle = (
      <Descriptors>
        <OriginalPriceStyled>${original_price}</OriginalPriceStyled>
        <DiscountedPriceStyled> ${sale_price}</DiscountedPriceStyled>
      </Descriptors>
    );
  }
  return (
    <ProductInfoDiv>
      {starsData}
      <CategoryStyle>{category}</CategoryStyle>
      {SalePriceStyle}
      <Descriptors>{description}</Descriptors>
      <Descriptors>Social Media placeholder</Descriptors>
    </ProductInfoDiv>
  );
};
export default ProductInformation;
