import React from 'react';
import styled from "styled-components";
import QuestionsList from './QuestionsList.jsx';
import SearchBar from './SearchBar.jsx';
import utils from '../../Utils.js';

const Title = styled.div`
  padding-bottom: 10px;
  font-size: 16px;
  font-weight: light;
  color: grey;
  margin-left: 2px;
`;

class QuestionsAndAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFilter: ''
    }
    this.updateSearchFilter = this.updateSearchFilter.bind(this);
  }

  componentDidMount() {
    // console.log('app mounted!');
    // utils
    //   .fetchQuestions(this.state.productId)
    //   .then(questions => {
    //     questions.results.sort((firstQuestion, secondQuestion) => {
    //       return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
    //     })
    //     this.setState({
    //       questions: questions.results,
    //     })
    //   })
    //   .catch(err => {err});
  }

  updateSearchFilter(query) {
    this.setState({ searchFilter: query });
  }

  render() {
    return (
      <div>
        <Title>QUESTIONS &amp; ANSWERS</Title>
        <SearchBar updateSearchFilter={this.updateSearchFilter} />
        <QuestionsList
        productId={this.props.productId}
        productName={this.props.productName}
        searchFilter={this.state.searchFilter}/>
      </div>
    )
  }
}

export default QuestionsAndAnswers;

