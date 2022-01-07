import React from 'react';
import styled from 'styled-components';
import { FlexRow } from '../sharedComponents.jsx';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';


const AnswerStart = styled.div`
  margin-left: -10px;
  margin-top: 8px;
  padding-top: 5px;
  font-size: 17px;
  font-weight: bold;
  color: 424242;
`;

const AnswerBody = styled.div`
  text-align: left;
  font-size: 14px;
  margin-left: 5px;
  margin-top: 10px;
  padding-top: 5px;
  color: 696969;
`;

const Details = styled.div`
  margin-left: 22px;
  padding-top: 5px;
  font-size: 11px;
  font-weight: lighter;
  color: 909090;
`;

const Clickable = styled.div`
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
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
    utils.markAnswerHelpful(this.props.answer.id)
  }

  reportAnswer() {
    this.setState({ isReported: true })
    utils.reportAnswer(this.props.answer.id)
  }

  render() {
    return (
      <div>
        <FlexRow>
          <AnswerStart style={this.props.color}>{this.props.a}</AnswerStart><AnswerBody>{this.props.answer.body}</AnswerBody>
        </FlexRow>
        <Details>
          by {this.props.answer.answerer_name === 'Seller'
          ? <b> Seller</b>
          : this.props.answer.answerer_name},&nbsp;
          {' ' + dayjs(this.props.answer.date).format('MMMM DD, YYYY')}&nbsp;|&nbsp;
           Helpful?&nbsp;
          {this.state.isHelpful
          ? <u>Yes!</u>
          : <Clickable onClick={this.updateAnswerHelpfulCount}>Yes</Clickable>
          }
          ({this.props.answer.helpfulness + this.state.isHelpful})&nbsp;|&nbsp;
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

