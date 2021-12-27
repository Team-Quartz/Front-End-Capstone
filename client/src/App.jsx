import react from 'react';
import reactDOM from 'react-dom';

import ProductDetails from './components/product-details/Index.jsx';
import QuestionsAndAnwsers from './components/questions-and-answers/Index.jsx';
import RatingsAndReviews from './components/ratings-and-reviews/Index.jsx';
import RelatedItemsAndComparisons from './components/related-items-and-comparisons/Index.jsx';
import utils from './Utils.js';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {/** to be determined */}
  };

  render() {
    return (
      <div>
        <div>Hello, world!</div>
        {/* <ProductDetails /> */}
        {/* <RelatedItemsAndComparisons /> */}
        {/* <QuestionsAndAnswers /> */}
        <RatingsAndReviews />
      </div>
    );
  };
}

reactDOM.render(<App />, document.getElementById('app'));
