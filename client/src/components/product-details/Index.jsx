import React from 'react';
import {stylesData, productData} from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import {Stars} from '../sharedComponents.jsx';
import styled from 'styled-components';

const StyledPlaceHolder = styled.img`
width: 400px;
height: 400px
`
const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Arial", "Helvetica Neue", sans-serif;
  font-size: 1em;
`;
const TextButton = styled.button`
  border: none;
  text-decoration: underline;
  background: none;
  font-size: 1em;
  padding: 0;
  margin: 0;
`;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylesData: stylesData.results,
      productData: productData,
      selectedStyle: stylesData.results[0],
      highlightStyle: '0',
    }
    this.StyleSelectorHandler = this.StyleSelectorHandler.bind(this);
  }
  StyleSelectorHandler (targetKey) {
    const matchedStyle = this.state.stylesData.find((styleObject) => {
      return styleObject.style_id + '' === targetKey
    })
    this.setState({selectedStyle: matchedStyle, highlightStyle: targetKey});
  }
  componentDidUpdate (prevProps) {
    console.log(this.props)
    const isStylesData = this.props.stylesData !== undefined;
    const isProductData = this.props.productData !== undefined && this.props.productData !== null;
    if (prevProps !== this.props && isProductData && isStylesData && this.props.stylesData.length !== 0) {
      const {stylesData, productData, reviewsMeta} = this.props;
      const defaultStyle = stylesData.find((styleObject) => styleObject["default?"] );
      this.setState({
        selectedStyle: defaultStyle || stylesData[0],
        stylesData,
        productData,
        highlightStyle: defaultStyle.style_id,
        reviewsMeta,
      });
    }
  }

  render() {
    const starProp = <Stars reviewsMeta={this.props.reviewsMeta}/>;
    const isRendered = this.state.stylesData[0];
    return (
      <StyledDiv>
        { isRendered === null ?
          <StyledPlaceHolder src="https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif"/>
          :
          <div>
            <ImageGallery photos={this.state.selectedStyle.photos}/>
            <ProductInformation productData={this.state.productData} starsData={starProp} selectedStyle={this.state.selectedStyle}/>
            <StyleSelector stylesData={this.state.stylesData} handler={this.StyleSelectorHandler} />
            <AddToCart />
          </div>
      }
      </StyledDiv>
    );
  }
}

export default ProductDetail;
