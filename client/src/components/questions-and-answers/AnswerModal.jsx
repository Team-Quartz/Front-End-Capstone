import React from 'react';
import { Modal } from '../sharedComponents.jsx';

class AnswerModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: this.props.productName,
      questionBody: this.props.questionBody,
      questionEntry: '',
      nicknameEntry: '',
      photoUrlToAdd: '',
      photosList: [],
      emailEntry: ''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleNicknameChange = this.handleNicknameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhotoUrlChange = this.handlePhotoUrlChange.bind(this);
    this.uploadPhoto= this.uploadPhoto.bind(this);
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

  handlePhotoUrlChange(e) {
    e.preventDefault();
    this.setState({photoUrlToAdd: e.target.value});
  }
  //TODO: functions to check validity of inputs
  // checkInputValiditiy() {
  //   if
  // }

  uploadPhoto() {
    let updatedPhotosList = this.state.photosList.push(this.state.photoUrlToAdd);
    this.setState({ photosList: updatedPhotosList });
  }
  //TODO: create POST request to add question

  render() {
    return (
      <Modal onClose={this.props.onClose} show={this.props.show}>
        <h2>Submit Your Answer</h2>
        <h3>{this.state.productName}: {this.state.questionBody}</h3>
        <p>Your Answer</p>
        <input onChange={this.handleQuestionChange} />
        <p>For privacy reasons, do not use your full name or email address</p>
        <p>What is your nickname?</p>
        <input onChange={this.handleNicknameChange} />
        <p>For privacy reasons, do not use your full name or email address</p>
        <p>Your email</p>
        <input onChange={this.handleEmailChange} />
        <p>For authentication reasons, you will not be emailed</p>
        <input onChange={this.handlePhotoUrlChange} />
        <button onClick={this.uploadPhoto}>Upload your photos</button>
        <button>
          Submit Answer
        </button>
      </Modal>
    )
  }
}

export default AnswerModal;
