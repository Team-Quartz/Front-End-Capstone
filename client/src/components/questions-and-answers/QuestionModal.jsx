import React from 'react';
import { Modal } from '../sharedComponents.jsx';
import ErrorModal from './ErrorModal.jsx';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionInput: '',
      nicknameInput: '',
      emailInput: '',
      showErrorModal: false,
      errorMessage: 'inputs must not be blank and email address must be valid'
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.checkQuestionsInputValidity = this.checkQuestionsInputValidity.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.openErrorModal = this.openErrorModal.bind(this);
    this.closeUponSuccess = this.closeUponSuccess.bind(this);
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

  closeUponSuccess() {
    this.props.success();
    this.props.onClose();
  }

  checkQuestionsInputValidity() {
    if (!this.state.questionInput || !this.state.nicknameInput || !this.state.emailInput) {
      this.openErrorModal(true);
    } else if (!this.validateEmail(this.state.emailInput)) {
      this.openErrorModal(true);
    } else {
      //TODO: invoke POST request
      this.closeUponSuccess();
    }
  }

  openErrorModal(open) {
    this.setState({
      showErrorModal: open,
    });
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
        <p>For privacy reasons, do not use your full name or email address</p>
        <p>Your email</p>
        <input onChange={this.handleEmailChange} />
        <p>For authentication reasons, you will not be emailed</p>
        <button onClick={this.checkQuestionsInputValidity}>
          Submit Question
        </button>
        <ErrorModal
          onClose={() => this.openErrorModal(false)}
          show={this.state.showErrorModal}
          message={this.state.errorMessage}
        />
      </Modal>
    )
  }
}

export default QuestionModal;
