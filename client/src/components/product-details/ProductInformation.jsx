import styled from 'styled-components';


const ProductInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const Descriptors = styled.div`
  font-family: "Arial", "Helvetica Neue", sans-serif;
  font-size: 12px;
`
const CategoryStyle = styled(Descriptors)`
  font-size: 24px;
`;
const ProductInformation = ({ productData }) => {
  const { category, name, default_price, description } = productData;
  /*
  TODO: create conditional rendering for price and style accordingly. Create links for social media
  Note: currently do not have access to number of stars and need to look into that. Also needs a way to make links for social media
  */
  return (
    <ProductInfoDiv>
      <div className="review-stars"></div>
      <CategoryStyle>{category}</CategoryStyle>
      <Descriptors>${default_price}</Descriptors>
      <Descriptors>{description}</Descriptors>
      <Descriptors>Social Media placeholder</Descriptors>
    </ProductInfoDiv>
  )
}
export default ProductInformation;
