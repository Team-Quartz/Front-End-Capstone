import React from 'react';
import SearchBar from './SearchBar.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: null,
      searchFilter: ''
    }
    //function bindings
    this.updateSearchFilter = this.updateSearchFilter.bind(this);
  }

  componentDidMount() {
    //TODO: load current product
  }

  updateSearchFilter(query) {
    this.setState({ searchFilter: query });
    //TODO: make sure new filter is passed to QuestionsList - might be done after automatic re-render
  }

  render() {
    return (
      <div>
        <div>Questions &amp; Answers</div>
        <SearchBar updateSearchFilter={this.updateSearchFilter} />
        <div>SearchBar placeholder</div>
        {/* <QuestionsList productId={this.state.productId} searchFilter={this.state.searchFilter}/> */}
        <div>QuestionsList placeholder</div>
      </div>
    )
  }
}

export default QuestionsAndAnswers;

