import react from 'react';

import ProductDetails from './components/product-details/Index.jsx';
import QuestionsAndAnwsers from './components/questions-and-answers/Index.jsx';
import RatingsAndReviews from './components/ratings-and-reviews/Index.jsx';
import RelatedItemsAndComparisons from './components/shared-components/Index.jsx';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {/** to be determined */},
  };

  render() {
    return (
      <ProductDetails />
      <QuestionsAndAnswers />
      <RatingsAndReviews />
      <RelatedItemsAndComparisons />
    );
  };
}