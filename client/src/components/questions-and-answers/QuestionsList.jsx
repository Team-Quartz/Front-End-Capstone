import React from 'react';
import { dummyData } from './dummyData.js';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';
// import { Modal } from '../sharedComponents.jsx';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: 'test product',
      questions: dummyData.results,
      questionCount: 2,
      searchFilter: this.props.searchFilter,
      isQuestionModal: false,
      writeNewQuestion: false
    }
    //function bindings
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    // this.showQuestionModal = this.showQuestionModal.bind(this);
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

  // showQuestionModal() {
  //   console.log('should pop up modal', this.state.isQuestionModal);
  //   this.setState((prevState, props) => ({ isQuestionModal: !prevState.isQuestionModal }));
  // }

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
          // return <p key={idx}>Q: {question.question_body}</p>
        })}
        {this.state.questions.length > this.state.questionCount
        ? <button onClick={this.showMoreQuestions}>MORE ANSWERED QUESTIONS</button>
        : null}
        {this.state.writeNewQuestion
          //TODO: create AddQuestionModal (use Liam's from shared components)
        ? <QuestionModal
            onClose={() => this.openQuestionModal(false)}
            show={this.state.writeNewQuestion}
            productName={this.state.productName}
          />
        : null
        }
        <button onClick={() => this.openQuestionModal(true)}>ADD A QUESTION +</button>
      </div>
    )
  }
}

export default QuestionsList;

