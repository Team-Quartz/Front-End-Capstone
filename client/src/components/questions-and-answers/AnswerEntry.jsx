import React from 'react';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';
import utils from '../../Utils.js';

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
        <p>A: {this.props.answer.body}</p>
        <p>
          by {this.props.answer.answerer_name === 'Seller'
          ? <b> Seller</b>
          : this.props.answer.answerer_name},&nbsp;
          {' ' + dayjs(this.props.answer.date).format('MMMM DD, YYYY')}&nbsp;|&nbsp;
           Helpful?&nbsp;
          {this.state.isHelpful
          ? <u>Yes!</u>
          : <u onClick={this.updateAnswerHelpfulCount}>Yes</u>
          }
          ({this.props.answer.helpfulness + this.state.isHelpful})&nbsp;|&nbsp;
          {this.state.isReported
          ? <u>Reported!</u>
          : <u onClick={this.reportAnswer}>Report</u>
          }
        </p>
      </div>
    )
  }
}

export default AnswerEntry;

