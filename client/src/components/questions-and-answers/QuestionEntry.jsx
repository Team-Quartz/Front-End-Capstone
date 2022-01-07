import React from 'react';
import styled from 'styled-components';
import { FlexRow } from '../sharedComponents.jsx';
import dayjs from 'dayjs';
import AnswerEntry from './AnswerEntry.jsx';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';

const QuestionBody = styled.div`
  margin-left: -7px;
  font-size: 17px;
  font-weight: bold;
  color: 424242;
`;

const Feedback = styled.div`
  font-size: 12px;
  font-weight: lighter;
  color: BDBDBD;
`;

const Clickable = styled.div`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

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
        <FlexRow style={{ justifyContent: 'space-between' }}>
          <QuestionBody>Q: {this.props.question.question_body}</QuestionBody>
          <Feedback>
            <b>Helpful?</b>
            {this.state.isHelpful
            ? <u><b>Yes!</b></u>
            : <Clickable onClick={this.updateQuestionHelpfulCount}>Yes</Clickable>
            }
            ({this.props.question.question_helpfulness + this.state.isHelpful})&nbsp;
            &nbsp;|&nbsp;<Clickable onClick={() => this.openAnswerModal(true)}>Add Answer</Clickable>
          </Feedback>
        </FlexRow>
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
          return idx === 0 ? <AnswerEntry key={idx} a={'A:'} color={{ color: '424242' }} answer={this.state.answers[answerKey]}/>
          : <AnswerEntry key={idx} a={'A:'} color={{ color: 'white' }} answer={this.state.answers[answerKey]}/>
        })}
        {Object.keys(this.state.answers).length > this.state.answerCount
        ? <MoreAnswers onClick={this.showMoreAnswers}>LOAD MORE ANSWERS</MoreAnswers>
        : null
        }
      </div>
    )
  }
}

export default QuestionEntry;

