import React from 'react';
import dayjs from 'dayjs';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.question.answers,
      answerCount: 2,
      writeNewAnswer: false,
      isHelpful: false,
      isReported: false
    }
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.updateQuestionHelpfulCount = this.updateQuestionHelpfulCount.bind(this);
    //TODO: find out if this function is needed
    // this.reportQuestion = this.reportQuestion.bind(this);
    this.openAnswerModal = this.openAnswerModal.bind(this);
  }

  showMoreAnswers() {
    this.setState((prevState, props) => ({ answerCount: prevState.answerCount + 2 }));
  }

  updateQuestionHelpfulCount() {
    //TODO: create PUT request to increment helpful count
    this.setState({
      isHelpful: true
    })
  }

  reportQuestion() {
    //TODO: create PUT request to report question
    this.setState({
      isReported: true
    })
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
          {this.state.isHelpful
          ? <u>Yes</u>
          : <u onClick={this.updateQuestionHelpfulCount}>Yes</u>
          }
          ({this.props.question.question_helpfulness})
           | <u onClick={() => this.openAnswerModal(true)}>Add Answer</u>
        </div>
        <AnswerModal
          onClose={() => this.openAnswerModal(false)}
          show={this.state.writeNewAnswer}
          success={this.props.success}
          productName={this.props.productName}
          questionBody={this.props.question.question_body}
        />
        {/* TODO: optimize using Object.entries */}
        {Object.keys(this.state.answers).slice(0, this.state.answerCount).map((answerKey, idx) => {
          return <AnswerEntry key={idx} answer={this.state.answers[answerKey]}/>
        })}
        {Object.keys(this.state.answers).length > this.state.answerCount
        ? <p onClick={this.showMoreAnswers}>SHOW MORE ANSWERS</p>
        : null
        }
      </div>
    )
  }
}

export default QuestionEntry;

