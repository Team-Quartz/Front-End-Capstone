import react from 'react';
import reactDOM from 'react-dom';

import ProductDetails from './components/product-details/Index.jsx';
import QuestionsAndAnwsers from './components/questions-and-answers/Index.jsx';
import RatingsAndReviews from './components/ratings-and-reviews/Index.jsx';
import RelatedItemsAndComparisons from './components/related-items-and-comparisons/Index.jsx';
import utils from './Utils.js';
import { reviewsMeta } from './placeholderData.js';
import { AppStyle } from './components/sharedComponents.jsx';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewsMeta: reviewsMeta,
    };
  }

  render() {
    return (
      <AppStyle>
        <ProductDetails />
        {/* <RelatedItemsAndComparisons /> */}
        {/* <QuestionsAndAnswers /> */}
        <RatingsAndReviews reviewsMeta={this.state.reviewsMeta} />
      </AppStyle>
    );
  }
}
reactDOM.render(<App />, document.getElementById('app'));
