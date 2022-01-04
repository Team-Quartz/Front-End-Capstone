import React from 'react';
import {stylesData, productData} from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import {Stars} from '../sharedComponents.jsx';

import styled from 'styled-components';

const StyledGif = styled.img`
height: 400px;
width: 400px;
`
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylesData: [null],
      productData: {data: null},
      selectedStyle: {data: null},
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
  componentDidMount () {
    this.setState({selectedStyle: stylesData.results[0], stylesData: stylesData.results, productData: productData});
  }
  render() {
    const starProp = <Stars reviewsMeta={this.props.reviewsMeta}/>;

    return (
    <div>
        {this.state.stylesData[0] === null ?
        <StyledGif src='https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif' /> :
        <div>
        <ImageGallery data={this.state.selectedStyle}/>
        <ProductInformation productData={this.state.productData} starsData={starProp} selectedStyle={this.state.selectedStyle}/>
        <StyleSelector stylesData={this.state.stylesData} handler={this.StyleSelectorHandler} />
        <AddToCart />
        </div>}
    </div>
    );
  }
}


export default ProductDetail;
