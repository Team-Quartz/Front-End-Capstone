import React from 'react';
import dayjs from 'dayjs';
import AnswerModal from './AnswerModal.jsx';

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
    //TODO: create PUT request to increment helpful count
    this.setState({
      isHelpful: true
    })
  }

  reportAnswer() {
    //TODO: create PUT request to report question
    this.setState({
      isReported: true
    })
  }

  render() {
    return (
      <div>
        <p>A: {this.props.answer.body}</p>
        <p>
          by {this.props.answer.answerer_name === 'Seller'
          ? <b> Seller</b>
          : this.props.answer.answerer_name},
          {' ' + dayjs(this.props.answer.date).format('MMMM DD, YYYY')} |
           Helpful?
          {this.state.isHelpful
          ? <u>Yes</u>
          : <u onClick={this.updateAnswerHelpfulCount}>Yes</u>
          }
          ({this.props.answer.helpfulness}) |
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

