import React from 'react';
import { Modal } from '../sharedComponents.jsx';
import ErrorModal from './ErrorModal.jsx';
import utils from '../../Utils.js';

class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionInput: '',
      nicknameInput: '',
      emailInput: '',
      showErrorModal: false,
      errorMessage: 'inputs must not be blank and email address must be valid',
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.checkQuestionsInputValidity = this.checkQuestionsInputValidity.bind(this);
    this.openErrorModal = this.openErrorModal.bind(this);
    this.closeUponSuccess = this.closeUponSuccess.bind(this);
    this.cancelQuestionModal = this.cancelQuestionModal.bind(this);
  }

  handleQuestionChange(e) {
    e.preventDefault();
    this.setState({ questionInput: e.target.value });
  }

  handleNicknameChange(e) {
    e.preventDefault();
    this.setState({ nicknameInput: e.target.value });
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({ emailInput: e.target.value });
  }

  validateEmail(email) {
    let isValid = true;
    if (!email.match(/\w+@\w+\.\w\w+/)) {
      isValid = false;
    }
    return isValid;
  }

  checkQuestionsInputValidity() {
    if (!this.state.questionInput || !this.state.nicknameInput || !this.state.emailInput) {
      this.openErrorModal(true);
    } else if (!this.validateEmail(this.state.emailInput)) {
      this.openErrorModal(true);
    } else {
      utils
        .submitQuestion(
          this.state.questionInput,
          this.state.nicknameInput,
          this.state.emailInput,
          this.props.productId
        )
        .then(() => {
          this.closeUponSuccess();
          this.setState({
            questionInput: '',
            nicknameInput: '',
            emailInput: '',
          });
        })
        .catch(() => {
          this.openErrorModal(true);
        });
    }
  }

  openErrorModal(open) {
    this.setState({
      showErrorModal: open,
    });
  }

  closeUponSuccess() {
    this.props.success();
    this.props.onClose();
  }

  cancelQuestionModal() {
    this.props.onClose();
    this.setState({
      questionInput: '',
      nicknameInput: '',
      emailInput: '',
    });
  }

  render() {
    return (
      <Modal onClose={this.cancelQuestionModal} show={this.props.show}>
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
        <button onClick={this.checkQuestionsInputValidity}>Submit Question</button>
        <ErrorModal
          onClose={() => this.openErrorModal(false)}
          show={this.state.showErrorModal}
          message={this.state.errorMessage}
        />
      </Modal>
    );
  }
}

export default QuestionModal;
