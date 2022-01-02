import react from 'react';
import reactDOM from 'react-dom';

import ProductDetails from './components/product-details/Index.jsx';
import QuestionsAndAnwsers from './components/questions-and-answers/Index.jsx';
import RatingsAndReviews from './components/ratings-and-reviews/Index.jsx';
import RelatedItemsAndComparisons from './components/related-items-and-comparisons/Index.jsx';
import utils from './Utils.js';
import { reviewsMeta } from './placeholderData.js';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 39241,
      reviewsMeta: reviewsMeta,
    };
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  componentDidMount() {
    this.changeCurrentProduct()
  }


  changeCurrentProduct(productId) {
    this.setState({currentProductId: productId})
  }


  render() {
    return (
      <div>
        <div>Hello, world!</div>
        <ProductDetails />
        <RelatedItemsAndComparisons
          currentProductId={this.state.currentProductId}
          changeCurrentProduct={this.changeCurrentProduct}
          />
        {/* <QuestionsAndAnswers /> */}
        <RatingsAndReviews reviewsMeta={this.state.reviewsMeta}/>
      </div>
    );
  }
}
reactDOM.render(<App />, document.getElementById('app'));
