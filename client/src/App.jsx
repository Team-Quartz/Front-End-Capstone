import react from 'react';
import reactDOM from 'react-dom';

//  note: it's important that sharedComponents be imported early in App,
//  so its styles get added before any other modules (for consistent overriding behavior)
import { AppContainer, AppStyle } from './components/sharedComponents.jsx';
import AxiosMetrics from './components/AxiosMetrics.jsx';

import ProductDetails from './components/product-details/Index.jsx';
import QuestionsAndAnswers from './components/questions-and-answers/Index.jsx';
import RatingsAndReviews from './components/ratings-and-reviews/Index.jsx';
import RelatedItemsAndComparisons from './components/related-items-and-comparisons/Index.jsx';
import Header from './components/header/Index.jsx';
import utils from './Utils.js';
import { reviewsMeta } from './placeholderData.js';


class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 38322,
      reviewsMeta: { averageRating: 0 },
      currentProduct: null,
      debugDisplay: false,
      selectedStyle: {},
      currentStylesArray: [],
    };
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
    this.StyleSelectorHandler = this.StyleSelectorHandler.bind(this);
  }

  componentDidMount() {
    this.changeCurrentProduct();
  }

  changeCurrentProduct(productId = 38322) {
    this.setState({ currentProductId: productId });
    utils
      .fetchProduct(productId)
      .then((currentProduct) => this.setState({ currentProduct }))
      .catch((err) => console.error(err));
    utils
      .fetchReviewsMeta(productId)
      .then((reviewsMeta) => this.setState({ reviewsMeta }))
      .catch((err) => console.error(err));
    utils
      .fetchStyles(productId)
      .then(({ data: { results } }) => {
        this.setState({ currentStylesArray: results , selectedStyle: results[0]});
      })
      .catch((err) => console.error(err));
  }
  StyleSelectorHandler (targetKey) {
    const matchedStyle = this.state.currentStylesArray.find((styleObject) => {
      return styleObject.style_id + '' === targetKey
    })
    this.setState({selectedStyle: matchedStyle});
  }

  render() {
    return (
      <AppContainer>
        <AppStyle>
          <Header changeCurrentProduct={this.changeCurrentProduct} />
          <AxiosMetrics/>
          <ProductDetails
            reviewsMeta={this.state.reviewsMeta}
            stylesData={this.state.currentStylesArray}
            productData={this.state.currentProduct}
            selectedStyle={this.state.selectedStyle}
            handler={this.StyleSelectorHandler}
          />
        </AppStyle>
        <RelatedItemsAndComparisons
          currentProductId={this.state.currentProductId}
          changeCurrentProduct={this.changeCurrentProduct}
          currentStyleId={this.state.currentStyleId}
        />
        <AppStyle>
          <QuestionsAndAnswers
            productId={this.state.currentProductId}
            productName={this.state.currentProduct}
          />
          <RatingsAndReviews
            reviewsMeta={this.state.reviewsMeta}
            currentProduct={this.state.currentProduct}
          />
        </AppStyle>
      </AppContainer>
    );
  }
}
reactDOM.render(<App />, document.getElementById('app'));
