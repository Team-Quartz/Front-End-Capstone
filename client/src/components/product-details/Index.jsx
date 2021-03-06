import React from 'react';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import { Stars } from '../sharedComponents.jsx';
import styled from 'styled-components';
import { AppContainer, TextButton, AppStyle } from '../sharedComponents.jsx';

const StyledPlaceHolder = styled.img``;
const StyledDiv = styled(AppStyle)``;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylesData: [null],
      productData: {},
      selectedStyle: {},
      highlightStyle: '0',
    };
  }
  componentDidUpdate(prevProps) {
    const isStylesData = this.props.stylesData !== undefined;
    const isProductData = this.props.productData !== undefined && this.props.productData !== null;
    if (
      prevProps !== this.props &&
      isProductData &&
      isStylesData &&
      this.props.stylesData.length !== 0
    ) {
      const { stylesData, productData, reviewsMeta, selectedStyle } = this.props;
      const defaultStyle = stylesData.find((styleObject) => styleObject['default?']);
      this.setState({
        selectedStyle,
        stylesData,
        productData,
        reviewsMeta,
      });
    }
  }

  render() {
    const starProp = <Stars reviewsMeta={this.props.reviewsMeta} />;
    const isStylesInProps = !this.state.stylesData[0];
    const isProductInProps = !this.state.productData.data;
    return (
      <StyledDiv>
        {isStylesInProps && isProductInProps ? (
          <StyledPlaceHolder src='https://i.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.webp' />
        ) : (
          <div>
            <div>
              <ImageGallery
                photos={this.props.selectedStyle}
                highlightStyle={this.state.highlightStyle}
              />
              <StyleSelector
                stylesData={this.state.stylesData}
                handler={this.props.handler}
                selectedStyle={this.state.selectedStyle}
              />
            </div>
            <div>
              <ProductInformation
                productData={this.state.productData}
                starsData={starProp}
                selectedStyle={this.state.selectedStyle}
              />
              <AddToCart selectedStyle={this.state.selectedStyle} />
            </div>
          </div>
        )}
      </StyledDiv>
    );
  }
}

export default ProductDetail;
