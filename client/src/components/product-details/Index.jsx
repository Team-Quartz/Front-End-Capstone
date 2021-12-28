import React from 'react';
import data from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...data
    }
  }

  render() {

    return (
    <div>
        <ImageGallery data={{}}/>
        <ProductInformation productData={this.state.productData} starsData={{}}/>
        <StyleSelector stylesData={this.state.stylesData.results}/>
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