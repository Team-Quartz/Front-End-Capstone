import React from 'react';
import data from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
console.log(data);
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {

    return (
    <div>
        <div>
          Happy X-mas!
        </div>
    </div>
    );
  }
}

export default ProductDetail;