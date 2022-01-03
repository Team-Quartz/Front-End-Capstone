import React from 'react';
import QuestionsList from './QuestionsList.jsx';
import SearchBar from './SearchBar.jsx';

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
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
        <h2>Questions &amp; Answers</h2>
        <SearchBar updateSearchFilter={this.updateSearchFilter} />
        <QuestionsList productId={this.state.productId} searchFilter={this.state.searchFilter}/>
      </div>
    )
  }
}

export default QuestionsAndAnswers;

