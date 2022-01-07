import React from 'react';
// import {stylesData, productData} from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import {Stars} from '../sharedComponents.jsx';
import styled from 'styled-components';

const StyledPlaceHolder = styled.img`
width: 400px;
height: 400px;
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
      stylesData: [null],
      productData: {},
      selectedStyle: {},
      highlightStyle: '0',
    }
    // this.StyleSelectorHandler = this.StyleSelectorHandler.bind(this);
  }
  // StyleSelectorHandler (targetKey) {
  //   const matchedStyle = this.state.stylesData.find((styleObject) => {
  //     return styleObject.style_id + '' === targetKey
  //   })
  //   this.setState({selectedStyle: matchedStyle, highlightStyle: targetKey});
  //   console.log(matchedStyle, targetKey)
  // }
  componentDidUpdate (prevProps) {
    const isStylesData = this.props.stylesData !== undefined;
    const isProductData = this.props.productData !== undefined && this.props.productData !== null;
    if (prevProps !== this.props && isProductData && isStylesData && this.props.stylesData.length !== 0) {
      const {stylesData, productData, reviewsMeta, selectedStyle} = this.props;
      console.log(this.props, '........', stylesData)
      const defaultStyle = stylesData.find((styleObject) => styleObject["default?"] );
      this.setState({
        selectedStyle,
        stylesData,
        productData,
        // highlightStyle: defaultStyle ? defaultStyle.style_id : stylesData[0],
        reviewsMeta,
      });
    }
  }

  render() {
    const starProp = <Stars reviewsMeta={this.props.reviewsMeta}/>;
    const isStylesInProps = !this.state.stylesData[0];
    const isProductInProps = !this.state.productData.data
    return (
      <StyledDiv>
        { isStylesInProps && isProductInProps ?
          <StyledPlaceHolder src="https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif"/>
          :
          <div>
            <ImageGallery photos={this.props.selectedStyle} highlightStyle={this.state.highlightStyle}/>
            <ProductInformation productData={this.state.productData} starsData={starProp} selectedStyle={this.state.selectedStyle}/>
            <StyleSelector stylesData={this.state.stylesData} handler={this.props.handler} selectedStyle={this.state.selectedStyle}/>
            <AddToCart selectedStyle={this.state.selectedStyle}/>
          </div>
      }
      </StyledDiv>
    );
  }
}

export default ProductDetail;
