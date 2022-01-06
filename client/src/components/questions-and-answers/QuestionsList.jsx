import React from 'react';
import { dummyData } from './dummyData.js';
import QuestionEntry from './QuestionEntry.jsx';
import QuestionModal from './QuestionModal.jsx';
import SuccessModal from './SuccessModal.jsx';
import utils from '../../Utils.js';

class QuestionsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.productId,
      productName: this.props.productName,
      questions: dummyData.results,
      questionCount: 2,
      searchFilter: this.props.searchFilter,
      writeNewQuestion: false,
      showSuccess: false
    }
    this.showMoreQuestions = this.showMoreQuestions.bind(this);
    this.openQuestionModal = this.openQuestionModal.bind(this);
    this.openSuccessModal = this.openSuccessModal.bind(this);
    this.closeQuestionModal = this.closeQuestionModal.bind(this);
  }

  componentDidMount() {
    utils
      .fetchQuestions(this.props.productId)
      .then(questions => {
        questions.results.sort((firstQuestion, secondQuestion) => {
          return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
        })
        this.setState({
          questions: questions.results,
        })
      })
      .catch(err => {err});
  }

  //TODO: make this function update productId when it changes and also get the new questions
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.productId !== this.props.productId) {
      utils
      .fetchQuestions(this.props.productId)
      .then(questions => {
        questions.results.sort((firstQuestion, secondQuestion) => {
          return secondQuestion.question_helpfulness - firstQuestion.question_helpfulness;
        })
        this.setState({
          questions: questions.results,
          productId: this.props.productId
        })
      })
      .catch(err => {err});
    }
  }

  showMoreQuestions() {
    this.setState((prevState, props) => ({ questionCount: prevState.questionCount + 2 }));
  }

  openQuestionModal(open) {
    this.setState({
      writeNewQuestion: open,
    });
  }

  openSuccessModal(open) {
    this.setState({
      showSuccess: open,
    });
  }

  closeQuestionModal() {
    this.openQuestionModal(false);
    this.openSuccessModal(true);
  }

  render() {
    return (
      <div>
        {this.state.questions.filter(question =>
          question.question_body.toLowerCase()
          .includes(this.props.searchFilter.toLowerCase())
        ).slice(0, this.state.questionCount)
        .map((question, idx) => {
          return <QuestionEntry
          key={idx}
          productName={this.props.productName}
          question={question}
          success={() => this.openSuccessModal(true)}
          />
        })}
        {this.state.questions.length > this.state.questionCount
        ? <button onClick={this.showMoreQuestions}>MORE ANSWERED QUESTIONS</button>
        : null}
        <QuestionModal
          onClose={() => this.openQuestionModal(false)}
          success={() => this.openSuccessModal(true)}
          show={this.state.writeNewQuestion}
          productName={this.state.productName}
        />
        <SuccessModal
          onClose={() => this.openSuccessModal(false)}
          show={this.state.showSuccess}
        />
        <button onClick={() => this.openQuestionModal(true)}>ADD A QUESTION +</button>
      </div>
    )
  }
}

export default QuestionsList;

