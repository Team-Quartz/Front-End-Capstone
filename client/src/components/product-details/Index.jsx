import React from 'react';
import {stylesData, productData} from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stylesData,
      productData,
      selectedStyle: null,
      highlightStyle: null,
    }
    this.StyleSelectorHandler = this.StyleSelectorHandler.bind(this);
  }
  StyleSelectorHandler (targetKey) {
    const matchedStyle = this.state.stylesData.results.find((styleObject) => styleObject.style_id === targetKey)
    this.setState({selectedStyle: matchedStyle, highlightStyle: targetKey});
  }

  render() {

    return (
    <div>
        <ImageGallery data={{}}/>
        <ProductInformation productData={this.state.productData} starsData={{}}/>
        <StyleSelector stylesData={this.state.stylesData.results} handler={this.StyleSelectorHandler}/>
        <AddToCart />
    </div>
    );
  }
}

//<ImageGallery data={{}/* current style selection data */}/>
//<ProductInformation productData={this.productData} starsData={{}}/> {/* need to pass in data for markdown price and number of stars data*/}
//<StyleSelector stylesData={this.stylesData}/> {/* need to pass in event handler */}
//<AddToCart /> {/* need to pass in event handler and current styles data */}
export default ProductDetail;
