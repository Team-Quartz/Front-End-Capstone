import React from 'react';
import {stylesData, productData} from './sample.js';
import AddToCart from './AddToCart.jsx';
import ImageGallery from './ImageGallery.jsx';
import ProductInformation from './ProductInformation.jsx';
import StyleSelector from './StyleSelector.jsx';
import {Stars} from '../sharedComponents.jsx';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
      stylesData: [null],
      productData: {data: null},
      selectedStyle: {data: null},
=======
      stylesData: [],
      productData: {},
      selectedStyle: {},
>>>>>>> parent of f2f806b (Added conditional rendering for placeholder data.)
      highlightStyle: '0',
=======
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
      stylesData,
      productData,
      selectedStyle: null,
      highlightStyle: null,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
    }
    this.StyleSelectorHandler = this.StyleSelectorHandler.bind(this);
  }
  StyleSelectorHandler (targetKey) {
    targetKey = targetKey.substring(0, targetKey.length - 1);
    const matchedStyle = this.state.stylesData.results.find((styleObject) => {
      return styleObject.style_id + '' === targetKey
    })
    this.setState({selectedStyle: matchedStyle, highlightStyle: targetKey});
  }
  componentDidMount () {
    this.setState({selectedStyle: stylesData.results[0]});
  }
  render() {
    const starProp = <Stars reviewsMeta={this.props.reviewsMeta}/>;

    return (
    <div>
        <ImageGallery data={this.state.selectedStyle}/>
        <ProductInformation productData={this.state.productData} starsData={starProp} selectedStyle={this.state.selectedStyle}/>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        <StyleSelector stylesData={this.state.stylesData} handler={this.StyleSelectorHandler} />
=======
        <StyleSelector stylesData={this.state.stylesData.results} handler={this.StyleSelectorHandler}/>
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
        <StyleSelector stylesData={this.state.stylesData.results} handler={this.StyleSelectorHandler}/>
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
        <StyleSelector stylesData={this.state.stylesData.results} handler={this.StyleSelectorHandler}/>
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
        <StyleSelector stylesData={this.state.stylesData.results} handler={this.StyleSelectorHandler}/>
>>>>>>> parent of 45c9220 (Adjusting code to account for lack of preloaded data.)
=======
        <StyleSelector stylesData={this.state.stylesData} handler={this.StyleSelectorHandler}/>
>>>>>>> parent of f2f806b (Added conditional rendering for placeholder data.)
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
