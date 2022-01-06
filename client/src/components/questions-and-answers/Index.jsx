import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import SearchBar from './SearchBar.jsx';
import utils from '../../Utils.js';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      searchFilter: ''
    }
    this.updateSearchFilter = this.updateSearchFilter.bind(this);
  }

  updateSearchFilter(query) {
    this.setState({ searchFilter: query });
  }

  render() {
    return (
      <div>
        <h2>Questions &amp; Answers</h2>
        <SearchBar updateSearchFilter={this.updateSearchFilter} />
        <QuestionsList
        productId={this.state.productId}
        productName={this.props.productName}
        searchFilter={this.state.searchFilter}/>
      </div>
    )
  }
}

export default QuestionsAndAnswers;

