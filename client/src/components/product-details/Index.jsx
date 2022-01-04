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
    targetKey = targetKey.substring(0, targetKey.length - 1);
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
    const isRendered = this.state.stylesData[0];
    return (
      <div>
        { isRendered === null ?
          <StyledPlaceHolder src="https://media.giphy.com/media/xitrfnahXHFZi5giQs/giphy.gif"/>
          :
          <div>
            <ImageGallery data={this.state.selectedStyle}/>
            <ProductInformation productData={this.state.productData} starsData={starProp} selectedStyle={this.state.selectedStyle}/>
            <StyleSelector stylesData={this.state.stylesData} handler={this.StyleSelectorHandler} />
            <AddToCart />
          </div>
      }
      </div>
    );
  }
}

//<ImageGallery data={{}/* current style selection data */}/>
//<ProductInformation productData={this.productData} starsData={{}}/> {/* need to pass in data for markdown price and number of stars data*/}
//<StyleSelector stylesData={this.stylesData}/> {/* need to pass in event handler */}
//<AddToCart /> {/* need to pass in event handler and current styles data */}
export default ProductDetail;
