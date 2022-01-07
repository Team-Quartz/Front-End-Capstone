import React from 'react';
import dayjs from 'dayjs';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';

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
    this.openAnswerModal = this.openAnswerModal.bind(this);
  }

  componentDidMount() {
    utils.fetchAnswers(this.props.question.question_id)
      .then((answers) => {
        this.setState({
          answers: answers,
        })
      })
      .catch(() => {console.log('APP: THERE WAS AN ERROR RETRIEVING THE ANSWERS')})
  }

  showMoreAnswers() {
    this.setState((prevState, props) => ({ answerCount: prevState.answerCount + 2 }));
  }

  updateQuestionHelpfulCount() {
    utils.markQuestionHelpful(this.props.question.question_id)
      .then(() => {
        this.setState({
          isHelpful: 1
        })
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
          Helpful?&nbsp;
          {this.state.isHelpful
          ? <u>Yes!</u>
          : <u onClick={this.updateQuestionHelpfulCount}>Yes</u>
          }
          ({this.props.question.question_helpfulness + this.state.isHelpful})&nbsp;
          &nbsp;|&nbsp;<u onClick={() => this.openAnswerModal(true)}>Add Answer</u>
        </div>
        <AnswerModal
          onClose={() => this.openAnswerModal(false)}
          show={this.state.writeNewAnswer}
          success={this.props.success}
          productName={this.props.productName}
          questionBody={this.props.question.question_body}
          questionId={this.props.question.question_id}
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

