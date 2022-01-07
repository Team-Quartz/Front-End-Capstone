import React from 'react';
import styled from 'styled-components';
import { FlexRow, ResponseText, Details, Clickable } from '../sharedComponents.jsx';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';

const AnswerStart = styled.div`
  margin-left: -10px;
  margin-top: 3px;
  padding-top: 0px;
  font-size: 17px;
  font-weight: bold;
  color: 424242;
`;

class AnswerEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHelpful: false,
      isReported: false
    }
    this.updateAnswerHelpfulCount = this.updateAnswerHelpfulCount.bind(this);
    this.reportAnswer = this.reportAnswer.bind(this);
  }

  updateAnswerHelpfulCount() {
    this.setState({ isHelpful: 1 });
    utils.markAnswerHelpful(this.props.answer.answer_id)
  }

  reportAnswer() {
    this.setState({ isReported: true })
    utils.reportAnswer(this.props.answer.answer_id)
  }

  render() {
    return (
      <div>
        <FlexRow>
          <AnswerStart style={this.props.color}>{this.props.a}</AnswerStart><ResponseText>{this.props.answer.body}</ResponseText>
        </FlexRow>
        <Details>
          by {this.props.answer.answerer_name === 'Seller'
          ? <b> Seller</b>
          : this.props.answer.answerer_name}
          {' ' + dayjs(this.props.answer.date).format('MMMM DD, YYYY')}
          &nbsp;|&nbsp;Helpful?&nbsp;
          {this.state.isHelpful
          ? <u>Yes!</u>
          : <Clickable onClick={this.updateAnswerHelpfulCount}>Yes</Clickable>
          }
          ({this.props.answer.helpfulness + this.state.isHelpful})
          &nbsp;|&nbsp;&nbsp;
          {this.state.isReported
          ? <u>Reported!</u>
          : <Clickable onClick={this.reportAnswer}>Report</Clickable>
          }
        </Details>
      </div>
    )
  }
}

export default AnswerEntry;

