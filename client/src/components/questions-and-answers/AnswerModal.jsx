import React from 'react';
import { Modal } from '../sharedComponents.jsx';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO create state for each input
      productName: 'test product',
      questionBody: 'question?',
      questionEntry: '',
      nicknameEntry: '',
      emailEntry: ''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  handleQuestionChange(e) {
    e.preventDefault();
    this.setState({questionEntry: e.target.value});
  }

  handleNicknameChange(e) {
    e.preventDefault();
    this.setState({nicknameEntry: e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({emailEntry: e.target.value});
  }
  //TODO: functions to check validity of inputs
  // checkInputValiditiy() {
  //   if
  // }

  //TODO: create POST request to add question

  render() {
    return (
      <Modal onClose={this.props.onClose} show={this.props.show}>
        <h2>Submit Your Answer</h2>
        <h3>{this.state.productName}: {this.state.questionBody}</h3>
        <p>Your Answer</p>
        <input onChange={this.handleQuestionChange} />
        <p>What is your nickname?</p>
        <input onChange={this.handleNicknameChange} />
        <p>Your email</p>
        <input onChange={this.handleEmailChange} />
        <button>
          Submit Answer
        </button>
      </Modal>
    )
  }
}

export default AnswerModal;
