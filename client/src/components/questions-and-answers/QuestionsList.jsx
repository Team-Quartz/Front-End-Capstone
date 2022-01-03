import React from 'react';
import { dummyData } from './dummyData.js';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: 'test product',
      questions: dummyData.results,
      questionCount: 2,
      searchFilter: this.props.searchFilter,
      writeNewQuestion: false
    }
    //function bindings
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.openQuestionModal = this.openQuestionModal.bind(this);
  }

  componentDidMount() {
    //TODO: create function to GET array of questions
    //TODO: sort array by question_helpfulness
    //TODO: setState for questions
  }

  showMoreQuestions() {
    this.setState((prevState, props) => ({ questionCount: prevState.questionCount + 2 }));
  }

  openQuestionModal(open) {
    this.setState({
      writeNewQuestion: open,
    });
  }

  render() {
    return (
      <div>
        {this.state.questions.slice(0, this.state.questionCount).map((question, idx) => {
          return <QuestionEntry key={idx} question={question} />
        })}
        {this.state.questions.length > this.state.questionCount
        ? <button onClick={this.showMoreQuestions}>MORE ANSWERED QUESTIONS</button>
        : null}
        <QuestionModal
          onClose={() => this.openQuestionModal(false)}
          show={this.state.writeNewQuestion}
          productName={this.state.productName}
        />
        <button onClick={() => this.openQuestionModal(true)}>ADD A QUESTION +</button>
      </div>
    )
  }
}

export default QuestionsList;

