import React from 'react';
import { Modal } from '../sharedComponents.jsx';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionInput: '',
      nicknameInput: '',
      emailInput: ''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.checkQuestionsInputValidity = this.checkQuestionsInputValidity.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
  }

  handleQuestionChange(e) {
    e.preventDefault();
    this.setState({questionInput: e.target.value});
  }

  handleNicknameChange(e) {
    e.preventDefault();
    this.setState({nicknameInput: e.target.value});
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({emailInput: e.target.value});
  }

  validateEmail(email) {
    let isValid = true;
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
    if (!email.match(regex)) {
      isValid = false;
    }
    return isValid;
  }

  checkQuestionsInputValidity() {
    if (!this.state.questionInput || !this.state.nicknameInput || !this.state.emailInput) {
      //TODO: add warning message
      console.log('one of your inputs is empty');
    } else if (!this.validateEmail(this.state.emailInput)) {
      //TODO: add warning message
      console.log('the email you entered is not valid');
    } else {
      //TODO: invoke POST request
      //TODO: create nice message alert to user?
      console.log('submission success!')
    }
  }

  //TODO: create POST request to add question

  render() {
    return (
      <Modal onClose={this.props.onClose} show={this.props.show}>
        <h2>Ask Your Question</h2>
        <h3>About the {this.props.productName}</h3>
        <p>Your Question</p>
        <input onChange={this.handleQuestionChange} />
        <p>What is your nickname?</p>
        <input onChange={this.handleNicknameChange} />
        <p>Your email</p>
        <input onChange={this.handleEmailChange} />
        <button onClick={this.checkQuestionsInputValidity} onClick={this.props.onClose}>
          Submit Question
        </button>
      </Modal>
    )
  }
}

export default QuestionModal;
