import React from 'react';
import { Modal } from '../sharedComponents.jsx';
// import AnswerEntry from './AnswerEntry.jsx';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.question.answers, //this is an object
      answerCount: 2,
      isAnswerModal: false
    }
    //function bindings
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.updateQuestionHelpfulCount = this.updateQuestionHelpfulCount.bind(this);
    this.updateAnswerHelpfulCount = this.updateAnswerHelpfulCount.bind(this);
    // this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.showAnswerModal = this.showAnswerModal.bind(this);
  }

  showMoreAnswers() {
    this.setState((prevState, props) => ({ answerCount: prevState.answerCount + 2 }));
  }

  updateQuestionHelpfulCount() {
    //TODO: create PUT request to increment helpful count
  }

  updateAnswerHelpfulCount() {
    //TODO: create PUT request to increment helpful count
  }

  reportQuestion() {
    //TODO: create PUT request to report question
  }

  reportAnswer() {
    //TODO: create PUT request to report question
  }

  showAnswerModal() {
    console.log('should pop up modal', this.state.isAnswerModal);
    this.setState((prevState, props) => ({ isAnswerModal: !prevState.isAnswerModal }));
  }

  render() {
    return (
      <div>
        <div>Q: {this.props.question.question_body}</div>
        <div>
          Helpful?
          <u onClick={this.updateQuestionHelpfulCount}>Yes</u>
          ({this.props.question.question_helpfulness})
           | <u onClick={this.showAnswerModal}>Add Answer</u>
        </div>
        {/* TODO: optimize using Object.entries */}
        {Object.keys(this.state.answers).map((answerKey, idx) => {
          return (
            <div key={idx}>
              <p>A: {this.state.answers[answerKey].body}</p>
              <p>
                by {this.state.answers[answerKey].answerer_name === 'Seller'
                ? <b> Seller</b>
                : this.state.answers[answerKey].answerer_name},
                {' ' + dayjs(this.state.answers[answerKey].date).format('MMMM DD, YYYY')} |
                 Helpful?
                <u onClick={this.updateAnswerHelpfulCount}>Yes</u>
                ({this.state.answers[answerKey].helpfulness}) |
                <u onClick={this.reportAnswer}>Report</u>
              </p>
            </div>
          )
          {/* <AnswerEntry key={idx} /> */}
        })}
        {this.state.isAnswerModal
        ? <Modal />
        : null
        }
      </div>
    )
  }
}

export default QuestionEntry;

