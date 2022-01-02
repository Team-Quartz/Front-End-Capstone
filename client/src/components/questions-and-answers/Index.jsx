import react from 'react';

class QuestionsAndAnswers extends react.Component {
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
    //load current product
  }

  updateSearchFilter(query) {
    this.setState({ productId: filter })
    //need to pass new filter to QuestionsList - might be done after automatic re-render
  }

  render() {
    return(
      <div>
        <div>Questions &amp; Answers</div>
        {/* <SearchBar updateSearchFilter={this.updateSearchFilter} /> */}
        {/* <QuestionsList productId={this.state.productId} searchFilter={this.state.searchFilter}/> */}
      </div>
    )
  }
}

export default QuestionsAndAnswers;