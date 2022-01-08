import React from 'react';
import styled from 'styled-components';
import { FlexRow, BodyText, Feedback, Clickable } from '../sharedComponents.jsx';
import dayjs from 'dayjs';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';

const MoreAnswers = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 25px;
  font-size: 12px;
  font-weight: bold;
  color: 424242;
  cursor: pointer;
`;

class QuestionEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: this.props.question.answers,
      answerCount: 2,
      writeNewAnswer: false,
      isHelpful: false,
      isReported: false,
    };
    this.showMoreAnswers = this.showMoreAnswers.bind(this);
    this.updateQuestionHelpfulCount = this.updateQuestionHelpfulCount.bind(this);
    this.openAnswerModal = this.openAnswerModal.bind(this);
    this.fetchAnswersAfterSubmit = this.fetchAnswersAfterSubmit.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.answers !== this.state.answers) {
    }
  }

  componentDidMount() {
    utils
      .fetchAnswers(this.props.question.question_id)
      .then((answers) => {
        this.setState({
          answers: answers,
        });
      })
      .catch((err) => {
        err;
      });
  }

  showMoreAnswers() {
    this.setState((prevState, props) => ({ answerCount: prevState.answerCount + 2 }));
  }

  updateQuestionHelpfulCount() {
    utils.markQuestionHelpful(this.props.question.question_id).then(() => {
      this.setState({
        isHelpful: 1,
      });
    });
  }

  openAnswerModal(open) {
    this.setState({
      writeNewAnswer: open,
    });
  }

  fetchAnswersAfterSubmit() {
    this.openAnswerModal(false);
    utils.fetchAnswers(this.props.question.question_id).then((answers) => {
      this.setState({
        answers: answers,
      });
      this.renderAnswers();
    });
  }

  renderAnswers() {
    return Object.keys(this.state.answers)
      .slice(0, this.state.answerCount)
      .map((answerKey, idx) => {
        return idx === 0 ? (
          <AnswerEntry
            key={answerKey}
            a={'A:'}
            color={{ color: '424242' }}
            answer={this.state.answers[answerKey]}
          />
        ) : (
          <AnswerEntry
            key={answerKey}
            a={'A:'}
            color={{ color: 'white' }}
            answer={this.state.answers[answerKey]}
          />
        );
      });
  }

  render() {
    return (
      <div>
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <BodyText>Q: {this.props.question.question_body}</BodyText>
          <Feedback>
            <b>Helpful?</b>
            {this.state.isHelpful ? (
              <u>
                <b>Yes!</b>
              </u>
            ) : (
              <Clickable onClick={this.updateQuestionHelpfulCount}>Yes</Clickable>
            )}
            ({this.props.question.question_helpfulness + this.state.isHelpful})&nbsp; &nbsp;|&nbsp;
            <Clickable onClick={() => this.openAnswerModal(true)}>Add Answer</Clickable>
          </Feedback>
        </FlexRow>
        <AnswerModal
          onClose={this.fetchAnswersAfterSubmit}
          show={this.state.writeNewAnswer}
          success={this.props.success}
          productName={this.props.productName}
          questionBody={this.props.question.question_body}
          questionId={this.props.question.question_id}
        />
        {/* TODO: optimize using Object.entries */}
        {this.renderAnswers()}
        {Object.keys(this.state.answers).length > this.state.answerCount ? (
          <MoreAnswers onClick={this.showMoreAnswers}>LOAD MORE ANSWERS</MoreAnswers>
        ) : null}
      </div>
    );
  }
}

export default QuestionEntry;
