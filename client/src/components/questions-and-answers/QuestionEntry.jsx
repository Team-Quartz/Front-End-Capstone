import React from 'react';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: 'product name placeholder',
      answers: this.props.question.answers,
      answerCount: 2,
      writeNewAnswer: false
    }
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.updateQuestionHelpfulCount = this.updateQuestionHelpfulCount.bind(this);
    this.updateAnswerHelpfulCount = this.updateAnswerHelpfulCount.bind(this);
    // this.reportQuestion = this.reportQuestion.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
    this.openAnswerModal = this.openAnswerModal.bind(this);
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

  openAnswerModal(open) {
    this.setState({
      writeNewAnswer: open,
    });
  }

  render() {
    return (
      <div>
        <div>Q: {this.props.question.question_body}</div>
        <div>
          Helpful?
          <u onClick={this.updateQuestionHelpfulCount}>Yes</u>
          ({this.props.question.question_helpfulness})
           | <u onClick={() => this.openAnswerModal(true)}>Add Answer</u>
        </div>
        <AnswerModal
          onClose={() => this.openAnswerModal(false)}
          show={this.state.writeNewAnswer}
          productName={this.state.productName}
          questionBody={this.props.question.question_body}
        />
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
        })}
      </div>
    )
  }
}

export default QuestionEntry;

