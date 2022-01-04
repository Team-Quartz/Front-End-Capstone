import react from "react";
import reactDOM from "react-dom";

//  note: it's important that sharedComponents be imported early in App,
//  so its styles get added before any other modules (for consistent overriding behavior)
import { AppContainer, AppStyle } from "./components/sharedComponents.jsx";

import ProductDetails from "./components/product-details/Index.jsx";
import QuestionsAndAnswers from "./components/questions-and-answers/Index.jsx";
import RatingsAndReviews from "./components/ratings-and-reviews/Index.jsx";
import RelatedItemsAndComparisons from "./components/related-items-and-comparisons/Index.jsx";
import utils from "./Utils.js";
import { reviewsMeta } from "./placeholderData.js";

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProductId: 38322,
      reviewsMeta: reviewsMeta,
    };
    this.changeCurrentProduct = this.changeCurrentProduct.bind(this);
  }

  componentDidMount() {
    this.changeCurrentProduct();
  }

  changeCurrentProduct(productId) {
    this.setState({ currentProductId: productId || 38322 });
  }

  render() {
    return (
      <AppContainer>
        <AppStyle>
          <ProductDetails reviewsMeta={this.state.reviewsMeta} />
        </AppStyle>
          <RelatedItemsAndComparisons
            currentProductId={this.state.currentProductId}
            changeCurrentProduct={this.changeCurrentProduct}
          />
        <AppStyle>
          <QuestionsAndAnswers />
          <RatingsAndReviews reviewsMeta={this.state.reviewsMeta} />
        </AppStyle>
      </AppContainer>
    );
  }
}
reactDOM.render(<App />, document.getElementById("app"));
